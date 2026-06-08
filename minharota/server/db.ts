import { eq, desc, and, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, turnos, caixinhas, contas, configuracoes, subscricoes, ganhosDiarios, transacoesCaixinhas } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ===== TURNOS =====
export async function criarTurno(userId: number, dataInicio: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(turnos).values({
    userId: userId as any,
    dataInicio,
    status: "ativo",
  });

  return result;
}

export async function finalizarTurno(turnoId: number, quilometrosRodados: number, ganhoTurno: number, gastosCombustivel: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.update(turnos).set({
    dataFim: new Date(),
    quilometrosRodados: quilometrosRodados as any,
    ganhoTurno: ganhoTurno as any,
    gastosCombustivel: gastosCombustivel as any,
    status: "finalizado",
  }).where(eq(turnos.id, turnoId));
}

export async function getTurnosAtivos(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(turnos).where(
    and(eq(turnos.userId, userId), eq(turnos.status, "ativo"))
  );
}

export async function getTurnosUsuario(userId: number, limit: number = 10) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(turnos)
    .where(eq(turnos.userId, userId))
    .orderBy(desc(turnos.dataInicio))
    .limit(limit);
}

// ===== CAIXINHAS =====
export async function criarCaixinha(userId: number, nome: string, tipo: string, descricao?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(caixinhas).values({
    userId,
    nome,
    tipo: tipo as any,
    descricao,
  });
}

export async function getCaixinhasUsuario(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(caixinhas)
    .where(and(eq(caixinhas.userId, userId), eq(caixinhas.ativa, true)))
    .orderBy(desc(caixinhas.createdAt));
}

export async function getCaixinhaById(caixinhaId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(caixinhas).where(eq(caixinhas.id, caixinhaId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function depositar(caixinhaId: number, valor: number, descricao?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Atualizar saldo
  const caixinha = await getCaixinhaById(caixinhaId);
  if (!caixinha) throw new Error("Caixinha não encontrada");

  const novoSaldo = parseFloat(caixinha.saldo.toString()) + valor;
  
  await db.update(caixinhas).set({
    saldo: novoSaldo as any,
  }).where(eq(caixinhas.id, caixinhaId));

  // Registrar transação
  return await db.insert(transacoesCaixinhas).values({
    caixinhaId,
    tipo: "deposito",
    valor: valor as any,
    descricao,
  });
}

export async function sacar(caixinhaId: number, valor: number, descricao?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const caixinha = await getCaixinhaById(caixinhaId);
  if (!caixinha) throw new Error("Caixinha não encontrada");

  const saldoAtual = parseFloat(caixinha.saldo.toString());
  if (saldoAtual < valor) throw new Error("Saldo insuficiente");

  const novoSaldo = saldoAtual - valor;
  
  await db.update(caixinhas).set({
    saldo: novoSaldo as any,
  }).where(eq(caixinhas.id, caixinhaId));

  return await db.insert(transacoesCaixinhas).values({
    caixinhaId,
    tipo: "saque",
    valor: valor as any,
    descricao,
  });
}

// ===== CONTAS =====
export async function criarConta(userId: number, banco: string, titular: string, tipo: string, agencia?: string, conta?: string, cpf?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(contas).values({
    userId,
    banco,
    titular,
    tipo: tipo as any,
    agencia,
    conta,
    cpf,
  });
}

export async function getContasUsuario(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(contas)
    .where(and(eq(contas.userId, userId), eq(contas.ativa, true)))
    .orderBy(desc(contas.createdAt));
}

// ===== CONFIGURAÇÕES =====
export async function getOuCriarConfiguracao(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existente = await db.select().from(configuracoes).where(eq(configuracoes.userId, userId)).limit(1);
  
  if (existente.length > 0) {
    return existente[0];
  }

  await db.insert(configuracoes).values({ userId });
  const novo = await db.select().from(configuracoes).where(eq(configuracoes.userId, userId)).limit(1);
  return novo[0];
}

export async function atualizarConfiguracao(userId: number, updates: Partial<typeof configuracoes.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.update(configuracoes).set(updates).where(eq(configuracoes.userId, userId));
}

// ===== GANHOS DIÁRIOS =====
export async function criarOuAtualizarGanhoDiario(userId: number, data: Date, ganhoTotal: number, gastoTotal: number, quilometrosTotal: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const dataInicio = new Date(data);
  dataInicio.setHours(0, 0, 0, 0);
  const dataFim = new Date(data);
  dataFim.setHours(23, 59, 59, 999);

  const existente = await db.select().from(ganhosDiarios).where(
    and(eq(ganhosDiarios.userId, userId), gte(ganhosDiarios.data, dataInicio), lte(ganhosDiarios.data, dataFim))
  ).limit(1);

  if (existente.length > 0) {
    return await db.update(ganhosDiarios).set({
      ganhoTotal: ganhoTotal as any,
      gastoTotal: gastoTotal as any,
      quilometrosTotal: quilometrosTotal as any,
    }).where(eq(ganhosDiarios.id, existente[0].id));
  }

  return await db.insert(ganhosDiarios).values({
    userId,
    data,
    ganhoTotal: ganhoTotal as any,
    gastoTotal: gastoTotal as any,
    quilometrosTotal: quilometrosTotal as any,
  });
}

export async function getGanhosDiarios(userId: number, dataInicio: Date, dataFim: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(ganhosDiarios)
    .where(and(eq(ganhosDiarios.userId, userId), gte(ganhosDiarios.data, dataInicio), lte(ganhosDiarios.data, dataFim)))
    .orderBy(desc(ganhosDiarios.data));
}

// ===== SUBSCRIÇÕES =====
export async function getSubscricaoAtiva(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(subscricoes)
    .where(and(eq(subscricoes.userId, userId), eq(subscricoes.ativa, true)))
    .orderBy(desc(subscricoes.dataInicio))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function criarSubscricao(userId: number, plano: string, dataInicio: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(subscricoes).values({
    userId,
    plano: plano as any,
    dataInicio,
  });
}
