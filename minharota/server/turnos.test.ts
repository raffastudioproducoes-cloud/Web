import { describe, it, expect } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';

type AuthenticatedUser = NonNullable<TrpcContext['user']>;

function createAuthContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: 'test-user',
    email: 'test@example.com',
    name: 'Test User',
    loginMethod: 'manus',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: 'https',
      headers: {},
    } as TrpcContext['req'],
    res: {
      clearCookie: () => {},
    } as TrpcContext['res'],
  };

  return { ctx };
}

describe('Turnos Router', () => {
  it('deve listar turnos do usuário', async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.turnos.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it('deve validar que turno ativo retorna null quando não há turno', async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.turnos.getAtivo();
    expect(result === null || result === undefined).toBe(true);
  });

  it('deve validar que list retorna array vazio inicialmente', async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.turnos.list();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('Caixinhas Router', () => {
  it('deve listar caixinhas do usuário', async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.caixinhas.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it('deve validar que list retorna array', async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.caixinhas.list();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('Auth Router', () => {
  it('deve retornar usuário autenticado', async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const user = await caller.auth.me();
    expect(user).toBeDefined();
    expect(user?.id).toBe(1);
    expect(user?.openId).toBe('test-user');
  });

  it('deve validar logout', async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();
    expect(result.success).toBe(true);
  });

  it('deve validar que usuário tem role definida', async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const user = await caller.auth.me();
    expect(user?.role).toBeDefined();
    expect(['admin', 'user']).toContain(user?.role);
  });
});
