# 📋 Guia Completo de Variáveis de Ambiente - Render

## 🎯 Objetivo

Este guia fornece **todas as variáveis de ambiente** necessárias para fazer deploy do MinhaRota no Render.

---

## 📥 Como Usar Este Guia

### Opção 1: Copiar e Colar (Recomendado)

1. Abra o arquivo `.env.render` neste repositório
2. Copie o conteúdo
3. No Render, vá para: **Web Service → Environment Variables**
4. Cole o conteúdo
5. Substitua os valores `<entre_colchetes>` pelos valores reais
6. Clique em **Save**

### Opção 2: Adicionar Manualmente

Siga a lista de variáveis abaixo e adicione uma por uma no Render.

---

## 📊 Tabela de Variáveis

| Variável | Tipo | Obrigatória | Descrição |
|----------|------|------------|-----------|
| `NODE_ENV` | String | ✅ Sim | Deve ser `production` |
| `DATABASE_URL` | String | ✅ Sim | URL de conexão com banco de dados |
| `JWT_SECRET` | String | ✅ Sim | Chave secreta para tokens JWT |
| `VITE_APP_ID` | String | ✅ Sim | ID da aplicação no Manus |
| `OAUTH_SERVER_URL` | String | ✅ Sim | URL do servidor OAuth (fixo) |
| `VITE_OAUTH_PORTAL_URL` | String | ✅ Sim | URL do portal OAuth do Manus |
| `OWNER_OPEN_ID` | String | ✅ Sim | ID único do proprietário |
| `OWNER_NAME` | String | ✅ Sim | Nome do proprietário |
| `BUILT_IN_FORGE_API_URL` | String | ✅ Sim | URL da API Forge (backend) |
| `BUILT_IN_FORGE_API_KEY` | String | ✅ Sim | Chave de API Forge (backend) |
| `VITE_FRONTEND_FORGE_API_URL` | String | ✅ Sim | URL da API Forge (frontend) |
| `VITE_FRONTEND_FORGE_API_KEY` | String | ✅ Sim | Chave de API Forge (frontend) |
| `VITE_ANALYTICS_ENDPOINT` | String | ❌ Não | Endpoint de analytics (opcional) |
| `VITE_ANALYTICS_WEBSITE_ID` | String | ❌ Não | ID do website para analytics (opcional) |

---

## 🔍 Onde Encontrar Cada Variável

### 1. DATABASE_URL
**Onde encontrar:** Seu provedor de banco de dados

**Formatos aceitos:**
```
MySQL:      mysql://user:password@host:3306/database
PostgreSQL: postgresql://user:password@host:5432/database
TiDB:       mysql://user:password@tidb-host:4000/database
```

**Exemplo:**
```
mysql://minharota_user:senha123@db.example.com:3306/minharota_db
```

---

### 2. JWT_SECRET
**Onde encontrar:** Você cria (deve ser uma string forte)

**Como gerar:**
- Use um gerador online: https://generate-random.org/
- Ou use: `openssl rand -base64 32`
- Mínimo 32 caracteres

**Exemplo:**
```
sk-proj-abc123xyz789def456ghi789jkl012mno345pqr
```

---

### 3. VITE_APP_ID
**Onde encontrar:** Manus Dashboard

1. Acesse seu painel Manus
2. Vá para **Settings → Integrations**
3. Copie o **App ID**

**Formato:** Geralmente um UUID

---

### 4. OAUTH_SERVER_URL
**Valor fixo:** `https://api.manus.im`

Não mude este valor.

---

### 5. VITE_OAUTH_PORTAL_URL
**Onde encontrar:** Manus Dashboard

1. Acesse seu painel Manus
2. Vá para **Settings → OAuth**
3. Copie a **Portal URL**

**Formato:** `https://oauth.manus.im` ou similar

---

### 6. OWNER_OPEN_ID
**Onde encontrar:** Seu perfil Manus

1. Clique no seu avatar (canto superior direito)
2. Vá para **Account Settings**
3. Copie o **Open ID**

**Formato:** String alfanumérica

---

### 7. OWNER_NAME
**Valor:** Seu nome completo

**Exemplo:** `João Silva`

---

### 8. BUILT_IN_FORGE_API_URL
**Onde encontrar:** Manus Dashboard

1. Acesse seu painel Manus
2. Vá para **Settings → API Keys**
3. Copie a **Forge API URL**

**Formato:** `https://api.manus.im/forge` ou similar

---

### 9. BUILT_IN_FORGE_API_KEY
**Onde encontrar:** Manus Dashboard

1. Acesse seu painel Manus
2. Vá para **Settings → API Keys**
3. Copie a **Backend API Key**

**Formato:** String longa (token)

---

### 10. VITE_FRONTEND_FORGE_API_URL
**Onde encontrar:** Manus Dashboard

1. Acesse seu painel Manus
2. Vá para **Settings → API Keys**
3. Copie a **Frontend Forge API URL**

**Formato:** `https://api.manus.im/forge` ou similar

---

### 11. VITE_FRONTEND_FORGE_API_KEY
**Onde encontrar:** Manus Dashboard

1. Acesse seu painel Manus
2. Vá para **Settings → API Keys**
3. Copie a **Frontend API Key**

**Formato:** String longa (token)

---

### 12. VITE_ANALYTICS_ENDPOINT (Opcional)
**Onde encontrar:** Seu provedor de analytics

**Exemplos:**
```
https://analytics.umami.is
https://analytics.google.com
```

Se não tiver, deixe em branco.

---

### 13. VITE_ANALYTICS_WEBSITE_ID (Opcional)
**Onde encontrar:** Seu painel de analytics

Copie o ID do website configurado.

Se não tiver, deixe em branco.

---

## ⚙️ Passo a Passo no Render

### 1. Abrir Configurações
1. Acesse https://render.com
2. Clique no seu Web Service (MinhaRota)
3. Vá para **Environment** (no menu superior)

### 2. Adicionar Variáveis

**Opção A: Copiar e Colar (Mais Rápido)**
1. Clique em **Edit Environment Variables**
2. Copie o conteúdo do arquivo `.env.render`
3. Cole na caixa de texto
4. Clique em **Save**

**Opção B: Adicionar Manualmente**
1. Clique em **Add Environment Variable**
2. Digite a chave (ex: `NODE_ENV`)
3. Digite o valor (ex: `production`)
4. Clique em **Add**
5. Repita para cada variável

### 3. Salvar
Clique em **Save** após adicionar todas as variáveis.

### 4. Redeploy
1. Vá para **Deploy**
2. Clique em **Redeploy latest commit**
3. Aguarde o build completar (3-5 minutos)

---

## ✅ Checklist de Verificação

Antes de fazer deploy, verifique:

- [ ] `NODE_ENV` = `production`
- [ ] `DATABASE_URL` preenchida e válida
- [ ] `JWT_SECRET` forte (mínimo 32 caracteres)
- [ ] `VITE_APP_ID` copiada do Manus
- [ ] `OWNER_OPEN_ID` copiada do Manus
- [ ] `OWNER_NAME` preenchida
- [ ] Todas as chaves de API preenchidas
- [ ] Nenhuma variável com valor `<entre_colchetes>`

---

## 🐛 Troubleshooting

### Erro: "Invalid DATABASE_URL"
- Verifique o formato da URL
- Confirme que o banco de dados está acessível
- Teste a conexão localmente

### Erro: "JWT_SECRET is required"
- Adicione uma chave secreta forte
- Mínimo 32 caracteres

### Erro: "App won't start"
- Verifique todas as variáveis obrigatórias
- Veja os logs no Render
- Teste localmente com `pnpm dev`

### Erro: "OAuth not working"
- Verifique `VITE_APP_ID` e `OAUTH_SERVER_URL`
- Confirme que estão corretos no Manus
- Teste o login localmente

---

## 📝 Exemplo Completo

```
NODE_ENV=production
DATABASE_URL=mysql://minharota_user:senha123@db.example.com:3306/minharota_db
JWT_SECRET=sk-proj-abc123xyz789def456ghi789jkl012mno345pqr
VITE_APP_ID=550e8400-e29b-41d4-a716-446655440000
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OWNER_OPEN_ID=user-123456789
OWNER_NAME=João Silva
BUILT_IN_FORGE_API_URL=https://api.manus.im/forge
BUILT_IN_FORGE_API_KEY=sk-forge-abc123xyz789def456ghi789jkl012
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im/forge
VITE_FRONTEND_FORGE_API_KEY=sk-frontend-abc123xyz789def456ghi
VITE_ANALYTICS_ENDPOINT=https://analytics.umami.is
VITE_ANALYTICS_WEBSITE_ID=analytics-123456
```

---

## 🎉 Pronto!

Após adicionar todas as variáveis e fazer redeploy, seu MinhaRota estará online!

**URL:** `https://minharota.onrender.com` (ou seu domínio customizado)

---

**Versão:** 1.0.0  
**Data:** Junho 2026  
**Status:** ✅ Pronto para Deploy
