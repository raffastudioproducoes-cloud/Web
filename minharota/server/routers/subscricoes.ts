import { z } from 'zod';
import { protectedProcedure, router } from '../_core/trpc';
import { getDb } from '../db';
import { users } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

export const subscricoesRouter = router({
  // Obter status de subscrição do usuário
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    return {
      userId: ctx.user.id,
      isPro: ctx.user.isPro,
      plan: ctx.user.isPro ? 'PREMIUM' : 'FREE',
      createdAt: ctx.user.createdAt,
    };
  }),

  // Fazer upgrade para PREMIUM (simula pagamento)
  upgrade: protectedProcedure
    .input(
      z.object({
        metodo: z.enum(['cartao', 'pix', 'google_pay', 'boleto']),
        valor: z.number().min(9.99).max(99.99),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Simular processamento de pagamento
      // Em produção, aqui você integraria com Stripe, PagSeguro, etc.
      
      // Validar valor (deve ser entre 9.99 e 99.99)
      if (input.valor < 9.99 || input.valor > 99.99) {
        throw new Error('Valor inválido para upgrade');
      }

      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Atualizar usuário para isPro = true
      const db = await getDb();
      if (!db) {
        throw new Error('Database não disponível');
      }

      await db
        .update(users)
        .set({ isPro: true })
        .where(eq(users.id, ctx.user.id));

      // Registrar transação (em produção, salvar em tabela de transações)
      console.log(`[Subscrição] Upgrade bem-sucedido para usuário ${ctx.user.id}`);
      console.log(`[Subscrição] Método: ${input.metodo}, Valor: R$ ${input.valor.toFixed(2)}`);

      return {
        success: true,
        message: 'Upgrade realizado com sucesso!',
        plan: 'PREMIUM',
        isPro: true,
        metodo: input.metodo,
        valor: input.valor,
        timestamp: new Date(),
      };
    }),

  // Cancelar subscrição PREMIUM (downgrade para FREE)
  cancelar: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.user.isPro) {
      throw new Error('Usuário não possui plano Premium');
    }

    const db = await getDb();
    if (!db) {
      throw new Error('Database não disponível');
    }

    await db
      .update(users)
      .set({ isPro: false })
      .where(eq(users.id, ctx.user.id));

    console.log(`[Subscrição] Cancelamento bem-sucedido para usuário ${ctx.user.id}`);

    return {
      success: true,
      message: 'Subscrição cancelada. Você retornou ao plano FREE.',
      plan: 'FREE',
      isPro: false,
    };
  }),

  // Verificar se pode fazer upgrade (validação)
  canUpgrade: protectedProcedure.query(async ({ ctx }) => {
    return {
      canUpgrade: !ctx.user.isPro,
      currentPlan: ctx.user.isPro ? 'PREMIUM' : 'FREE',
      message: ctx.user.isPro 
        ? 'Você já possui o plano Premium' 
        : 'Você pode fazer upgrade para Premium',
    };
  }),

  // Listar benefícios do plano PREMIUM
  getBeneficios: protectedProcedure.query(() => {
    return {
      free: [
        'Até 3 caixinhas',
        'Gestão básica de turnos',
        'Dashboard com analytics',
        'Modo Riding',
      ],
      premium: [
        'Caixinhas ilimitadas',
        'Rendimento simulado em caixinhas',
        'Smart Analytics avançado',
        'Alertas de clima em tempo real',
        'Notificações push',
        'Sincronização em background',
        'Suporte prioritário',
      ],
    };
  }),
});
