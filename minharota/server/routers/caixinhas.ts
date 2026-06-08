import { z } from 'zod';
import { protectedProcedure, router } from '../_core/trpc';
import * as db from '../db';

export const caixinhasRouter = router({
  // Listar caixinhas do usuário
  list: protectedProcedure.query(async ({ ctx }) => {
    return await db.getCaixinhasUsuario(ctx.user.id);
  }),

  // Criar nova caixinha
  criar: protectedProcedure
    .input(
      z.object({
        nome: z.string().min(1).max(255),
        tipo: z.enum(['poupanca', 'investimento', 'emergencia', 'meta']),
        descricao: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verificar limite de caixinhas para plano FREE
      if (!ctx.user.isPro) {
        const caixinhas = await db.getCaixinhasUsuario(ctx.user.id);
        if (caixinhas.length >= 3) {
          throw new Error('Limite de 3 caixinhas atingido. Upgrade para Premium para criar mais.');
        }
      }

      return await db.criarCaixinha(
        ctx.user.id,
        input.nome,
        input.tipo,
        input.descricao
      );
    }),

  // Depositar em caixinha
  depositar: protectedProcedure
    .input(
      z.object({
        caixinhaId: z.number(),
        valor: z.number().min(0.01),
        descricao: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Validar que a caixinha pertence ao usuário
      const caixinha = await db.getCaixinhaById(input.caixinhaId);
      if (!caixinha) {
        throw new Error('Caixinha não encontrada');
      }

      // Verificar se a caixinha pertence ao usuário
      if (caixinha.userId !== ctx.user.id) {
        throw new Error('Acesso negado');
      }

      return await db.depositar(input.caixinhaId, input.valor, input.descricao);
    }),

  // Sacar de caixinha
  sacar: protectedProcedure
    .input(
      z.object({
        caixinhaId: z.number(),
        valor: z.number().min(0.01),
        descricao: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Validar que a caixinha pertence ao usuário
      const caixinha = await db.getCaixinhaById(input.caixinhaId);
      if (!caixinha) {
        throw new Error('Caixinha não encontrada');
      }

      if (caixinha.userId !== ctx.user.id) {
        throw new Error('Acesso negado');
      }

      return await db.sacar(input.caixinhaId, input.valor, input.descricao);
    }),

  // Simular rendimento (PREMIUM)
  simularRendimento: protectedProcedure
    .input(
      z.object({
        caixinhaId: z.number(),
        taxaMensal: z.number().min(0).max(100),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.isPro) {
        throw new Error('Recurso disponível apenas no plano Premium');
      }

      const caixinha = await db.getCaixinhaById(input.caixinhaId);
      if (!caixinha || caixinha.userId !== ctx.user.id) {
        throw new Error('Caixinha não encontrada');
      }

      const saldo = parseFloat(caixinha.saldo.toString());
      const rendimento = saldo * (input.taxaMensal / 100);

      return await db.depositar(input.caixinhaId, rendimento, `Rendimento simulado (${input.taxaMensal}%)`);
    }),
});
