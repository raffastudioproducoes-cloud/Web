# 🔐 Como Acessar Secrets do Manus para Configurar o Render

## 📍 Localização dos Secrets no Manus

### Opção 1: Via Painel Web (Mais Fácil)

#### Passo 1: Abra o Dashboard do Manus
```
https://manus.im/dashboard
```

#### Passo 2: Localize seu Projeto
- Procure por "minharota-app" na lista de projetos
- Clique no projeto para abrir

#### Passo 3: Acesse Settings
Na página do projeto, você verá várias abas/seções:
- **Preview** (visualizar site)
- **Code** (arquivos)
- **Database** (banco de dados)
- **Settings** ← **CLIQUE AQUI**

#### Passo 4: Vá para Secrets
Dentro de Settings, procure por:
- General
- Domains
- Notifications
- **Secrets** ← **CLIQUE AQUI**

#### Passo 5: Copie Todos os Valores
Você verá uma tabela com todas as variáveis:

```
DATABASE_URL = mysql://user:pass@host:port/database
JWT_SECRET = sk-proj-...
VITE_APP_ID = 550e8400-...
OAUTH_SERVER_URL = https://api.manus.im
VITE_OAUTH_PORTAL_URL = https://...
OWNER_OPEN_ID = user-...
OWNER_NAME = Seu Nome
BUILT_IN_FORGE_API_URL = https://...
BUILT_IN_FORGE_API_KEY = sk-forge-...
VITE_FRONTEND_FORGE_API_KEY = sk-frontend-...
VITE_FRONTEND_FORGE_API_URL = https://...
VITE_ANALYTICS_ENDPOINT = https://...
VITE_ANALYTICS_WEBSITE_ID = abc123...
```

---

### Opção 2: Via CLI (Se Tiver Acesso)

```bash
# Listar todos os secrets
manus secrets list

# Obter um secret específico
manus secrets get DATABASE_URL

# Exportar todos em formato .env
manus secrets export > .env.render
```

---

### Opção 3: Via Arquivo .env Local

Se você tiver o arquivo `.env` no seu projeto local:

```bash
# No seu computador
cat /home/ubuntu/minharota-app/.env

# Ou no servidor
cat /path/to/minharota-app/.env
```

---

## 🚀 Como Configurar no Render

### Passo 1: Criar Web Service no Render

1. Acesse: https://render.com
2. Clique em: **New** → **Web Service**
3. Selecione: Seu repositório GitHub
4. Configure:
   - **Name:** minharota
   - **Environment:** Node
   - **Build Command:** `cd minharota-app && pnpm install && pnpm build`
   - **Start Command:** `cd minharota-app && pnpm start`

### Passo 2: Adicionar Environment Variables

1. Na página do Web Service, procure por: **Environment**
2. Clique em: **Add Environment Variable**
3. Para cada secret, adicione:

```
KEY = VALUE
```

#### Exemplo:

```
DATABASE_URL = mysql://user:pass@host:port/database
JWT_SECRET = sk-proj-abc123xyz789...
VITE_APP_ID = 550e8400-e29b-41d4-a716-446655440000
OAUTH_SERVER_URL = https://api.manus.im
VITE_OAUTH_PORTAL_URL = https://oauth.manus.im
OWNER_OPEN_ID = user-12345
OWNER_NAME = Seu Nome
BUILT_IN_FORGE_API_URL = https://api.manus.im/forge
BUILT_IN_FORGE_API_KEY = sk-forge-abc123...
VITE_FRONTEND_FORGE_API_KEY = sk-frontend-abc123...
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im/forge
VITE_ANALYTICS_ENDPOINT = https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID = abc123xyz789
NODE_ENV = production
```

### Passo 3: Deploy

1. Clique em: **Create Web Service**
2. Aguarde 3-5 minutos
3. Seu app estará online em: `https://minharota.onrender.com`

---

## 📋 Checklist de Secrets

Antes de fazer deploy, verifique se você tem TODOS os valores:

- [ ] DATABASE_URL - URL de conexão MySQL
- [ ] JWT_SECRET - Chave secreta para sessões
- [ ] VITE_APP_ID - ID da aplicação Manus
- [ ] OAUTH_SERVER_URL - URL do servidor OAuth
- [ ] VITE_OAUTH_PORTAL_URL - URL do portal de login
- [ ] OWNER_OPEN_ID - ID único do proprietário
- [ ] OWNER_NAME - Nome do proprietário
- [ ] BUILT_IN_FORGE_API_URL - URL da API Forge
- [ ] BUILT_IN_FORGE_API_KEY - Chave da API Forge (backend)
- [ ] VITE_FRONTEND_FORGE_API_KEY - Chave da API Forge (frontend)
- [ ] VITE_FRONTEND_FORGE_API_URL - URL da API Forge (frontend)
- [ ] VITE_ANALYTICS_ENDPOINT - Endpoint de analytics
- [ ] VITE_ANALYTICS_WEBSITE_ID - ID do website para analytics
- [ ] NODE_ENV = production

---

## ⚠️ Valores Que Você Pode Deixar em Branco

Se não souber algum valor, você pode deixar em branco por enquanto:

```
VITE_ANALYTICS_ENDPOINT = (deixar em branco)
VITE_ANALYTICS_WEBSITE_ID = (deixar em branco)
```

Mas **NUNCA** deixe em branco:
- DATABASE_URL
- JWT_SECRET
- VITE_APP_ID
- OAUTH_SERVER_URL

---

## 🆘 Se Não Conseguir Encontrar os Secrets

### Opção A: Contate o Suporte Manus
- Email: support@manus.im
- Explique que precisa dos secrets para deploy

### Opção B: Use Valores de Teste
```
DATABASE_URL = mysql://test:test@localhost:3306/test
JWT_SECRET = test_secret_key_123
VITE_APP_ID = test_app_id
OAUTH_SERVER_URL = https://api.manus.im
NODE_ENV = production
```

### Opção C: Verifique o Arquivo .env.render
Criamos um arquivo `RENDER_PASTE_HERE.txt` com um template pronto:
```
/minharota-app/RENDER_PASTE_HERE.txt
```

---

## 🔒 Segurança

### ⚠️ NUNCA:
- ❌ Compartilhe secrets com ninguém
- ❌ Comite secrets no Git
- ❌ Coloque secrets em arquivos públicos
- ❌ Envie secrets por email ou chat

### ✅ SEMPRE:
- ✅ Use variáveis de ambiente
- ✅ Mantenha secrets no Render/Manus
- ✅ Rotacione secrets periodicamente
- ✅ Use HTTPS em produção

---

## 📊 Estrutura de Variáveis

### Variáveis Obrigatórias (13)
```
DATABASE_URL
JWT_SECRET
VITE_APP_ID
OAUTH_SERVER_URL
VITE_OAUTH_PORTAL_URL
OWNER_OPEN_ID
OWNER_NAME
BUILT_IN_FORGE_API_URL
BUILT_IN_FORGE_API_KEY
VITE_FRONTEND_FORGE_API_KEY
VITE_FRONTEND_FORGE_API_URL
NODE_ENV
```

### Variáveis Opcionais (2)
```
VITE_ANALYTICS_ENDPOINT
VITE_ANALYTICS_WEBSITE_ID
```

---

## 🧪 Teste de Conexão

Após fazer deploy, teste se os secrets estão corretos:

```bash
# SSH no Render
render ssh minharota

# Verifique as variáveis
echo $DATABASE_URL
echo $JWT_SECRET
echo $VITE_APP_ID

# Teste a conexão com o banco
npm run db:test
```

---

## 📱 Próximos Passos

1. ✅ Obter todos os secrets do Manus
2. ✅ Adicionar ao Render
3. ✅ Fazer deploy
4. ✅ Testar a conexão
5. ✅ Integrar Firebase (dados reais)
6. ✅ Publicar no App Store/Google Play

---

**Última atualização:** 2026-06-08
**Versão:** 1.0
**Status:** ✅ Pronto para deploy
