import { z } from 'zod';
import { protectedProcedure, router } from '../_core/trpc';
import * as db from '../db';

export const turnosRouter = router({
  // Listar turnos do usuário
  list: protectedProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      return await db.getTurnosUsuario(ctx.user.id, input.limit);
    }),

  // Obter turno ativo
  getAtivo: protectedProcedure.query(async ({ ctx }) => {
    const turnos = await db.getTurnosAtivos(ctx.user.id);
    return turnos.length > 0 ? turnos[0] : null;
  }),

  // Criar novo turno
  criar: protectedProcedure.mutation(async ({ ctx }) => {
    // Verificar se já existe turno ativo
    const ativo = await db.getTurnosAtivos(ctx.user.id);
    if (ativo.length > 0) {
      throw new Error('Já existe um turno ativo');
    }

    return await db.criarTurno(ctx.user.id, new Date());
  }),

  // Finalizar turno com dados
  finalizar: protectedProcedure
    .input(
      z.object({
        turnoId: z.number(),
        quilometrosRodados: z.number().min(0),
        ganhoTurno: z.number().min(0),
        gastosCombustivel: z.number().min(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Validar que o turno pertence ao usuário
      const turnos = await db.getTurnosUsuario(ctx.user.id, 100);
      const turno = turnos.find((t) => t.id === input.turnoId);
      
      if (!turno) {
        throw new Error('Turno não encontrado');
      }

      await db.finalizarTurno(
        input.turnoId,
        input.quilometrosRodados,
        input.ganhoTurno,
        input.gastosCombustivel
      );

      // Atualizar ganho diário
      const hoje = new Date();
      const ganhoAtual = parseFloat(turno.ganhoTurno?.toString() || '0');
      const gastoAtual = parseFloat(turno.gastosCombustivel?.toString() || '0');
      const kmAtual = parseFloat(turno.quilometrosRodados?.toString() || '0');

      await db.criarOuAtualizarGanhoDiario(
        ctx.user.id,
        hoje,
        ganhoAtual + input.ganhoTurno,
        gastoAtual + input.gastosCombustivel,
        kmAtual + input.quilometrosRodados
      );

      return { success: true };
    }),

  // Calcular km/litro
  calcularKmLitro: protectedProcedure
    .input(
      z.object({
        quilometros: z.number().min(0),
        litros: z.number().min(0.1),
      })
    )
    .query(({ input }) => {
      if (input.litros === 0) {
        return 0;
      }
      return input.quilometros / input.litros;
    }),
});
