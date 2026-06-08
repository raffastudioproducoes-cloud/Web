import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // MinhaRota specific fields
  isPro: boolean("isPro").default(false).notNull(),
  birthDate: timestamp("birthDate"),
  profilePicture: text("profilePicture"), // URL to profile picture in storage
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Turnos (Shifts) - Registro de períodos de trabalho do motorista
 */
export const turnos = mysqlTable("turnos", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  dataInicio: timestamp("dataInicio").notNull(),
  dataFim: timestamp("dataFim"),
  
  quilometrosRodados: decimal("quilometrosRodados", { precision: 10, scale: 2 }).default("0"),
  ganhoTurno: decimal("ganhoTurno", { precision: 10, scale: 2 }).default("0"),
  gastosCombustivel: decimal("gastosCombustivel", { precision: 10, scale: 2 }).default("0"),
  
  status: mysqlEnum("status", ["ativo", "finalizado"]).default("ativo").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Turno = typeof turnos.$inferSelect;
export type InsertTurno = typeof turnos.$inferInsert;

/**
 * Caixinhas (Financial Boxes) - Poupanças e investimentos do motorista
 */
export const caixinhas = mysqlTable("caixinhas", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  nome: varchar("nome", { length: 255 }).notNull(),
  descricao: text("descricao"),
  saldo: decimal("saldo", { precision: 15, scale: 2 }).default("0").notNull(),
  
  // Tipo de caixinha: poupança, investimento, emergência, etc
  tipo: mysqlEnum("tipo", ["poupanca", "investimento", "emergencia", "meta"]).default("poupanca").notNull(),
  
  // Rendimento simulado (apenas para PREMIUM)
  rendimentoMensal: decimal("rendimentoMensal", { precision: 10, scale: 2 }).default("0"),
  ultimoRendimento: timestamp("ultimoRendimento"),
  
  // Meta de economia (opcional)
  metaValor: decimal("metaValor", { precision: 15, scale: 2 }),
  
  ativa: boolean("ativa").default(true).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Caixinha = typeof caixinhas.$inferSelect;
export type InsertCaixinha = typeof caixinhas.$inferInsert;

/**
 * Transações de Caixinhas - Histórico de depósitos e saques
 */
export const transacoesCaixinhas = mysqlTable("transacoesCaixinhas", {
  id: int("id").autoincrement().primaryKey(),
  caixinhaId: int("caixinhaId").notNull(),
  
  tipo: mysqlEnum("tipo", ["deposito", "saque", "rendimento"]).notNull(),
  valor: decimal("valor", { precision: 15, scale: 2 }).notNull(),
  descricao: text("descricao"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TransacaoCaixinha = typeof transacoesCaixinhas.$inferSelect;
export type InsertTransacaoCaixinha = typeof transacoesCaixinhas.$inferInsert;

/**
 * Contas (Bank Accounts) - Contas bancárias vinculadas
 */
export const contas = mysqlTable("contas", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  banco: varchar("banco", { length: 255 }).notNull(),
  agencia: varchar("agencia", { length: 10 }),
  conta: varchar("conta", { length: 20 }),
  tipo: mysqlEnum("tipo", ["corrente", "poupanca"]).default("corrente").notNull(),
  
  titular: varchar("titular", { length: 255 }).notNull(),
  cpf: varchar("cpf", { length: 11 }),
  
  ativa: boolean("ativa").default(true).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Conta = typeof contas.$inferSelect;
export type InsertConta = typeof contas.$inferInsert;

/**
 * Ganhos Diários - Registro de ganhos por dia para analytics
 */
export const ganhosDiarios = mysqlTable("ganhosDiarios", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  data: timestamp("data").notNull(),
  ganhoTotal: decimal("ganhoTotal", { precision: 10, scale: 2 }).default("0").notNull(),
  gastoTotal: decimal("gastoTotal", { precision: 10, scale: 2 }).default("0").notNull(),
  quilometrosTotal: decimal("quilometrosTotal", { precision: 10, scale: 2 }).default("0").notNull(),
  
  // Para heatmap de horários de ouro
  horariosAtivos: json("horariosAtivos"), // Array de { hora: 0-23, ganho: number }
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GanhoDiario = typeof ganhosDiarios.$inferSelect;
export type InsertGanhoDiario = typeof ganhosDiarios.$inferInsert;

/**
 * Configurações de Usuário - Preferências e flags
 */
export const configuracoes = mysqlTable("configuracoes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  
  // Flags de onboarding
  hasSeenOnboarding: boolean("hasSeenOnboarding").default(false).notNull(),
  tutorialStepDashboard: boolean("tutorialStepDashboard").default(false).notNull(),
  tutorialStepTurnos: boolean("tutorialStepTurnos").default(false).notNull(),
  tutorialStepCaixinhas: boolean("tutorialStepCaixinhas").default(false).notNull(),
  
  // Preferências
  notificacoesAtivas: boolean("notificacoesAtivas").default(true).notNull(),
  temaEscuro: boolean("temaEscuro").default(false).notNull(),
  
  // Meta diária padrão
  metaDiariaValor: decimal("metaDiariaValor", { precision: 10, scale: 2 }).default("100"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Configuracao = typeof configuracoes.$inferSelect;
export type InsertConfiguracao = typeof configuracoes.$inferInsert;

/**
 * Subscrições PREMIUM - Histórico de planos
 */
export const subscricoes = mysqlTable("subscricoes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  plano: mysqlEnum("plano", ["free", "premium"]).default("free").notNull(),
  valor: decimal("valor", { precision: 10, scale: 2 }).default("9.99"),
  
  dataInicio: timestamp("dataInicio").notNull(),
  dataFim: timestamp("dataFim"),
  
  ativa: boolean("ativa").default(true).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscricao = typeof subscricoes.$inferSelect;
export type InsertSubscricao = typeof subscricoes.$inferInsert;
