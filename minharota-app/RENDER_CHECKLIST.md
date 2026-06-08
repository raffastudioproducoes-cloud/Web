# ✅ Checklist de Deploy - Render

## 📋 Antes de Começar

- [ ] Conta criada no Render (https://render.com)
- [ ] GitHub conectado ao Render
- [ ] Repositório `raffastudioproducoes-cloud/Web` acessível
- [ ] Todos os valores de variáveis obtidos do Manus

---

## 🔧 Configuração do Web Service

- [ ] Nome do serviço: `minharota`
- [ ] Ambiente: `Node`
- [ ] Build Command: `cd minharota-app && pnpm install && pnpm build`
- [ ] Start Command: `cd minharota-app && pnpm start`
- [ ] Plano: `Free` (ou pago se preferir)

---

## 🔐 Variáveis Obrigatórias (12 total)

### Ambiente
- [ ] `NODE_ENV` = `production`

### Banco de Dados
- [ ] `DATABASE_URL` = `mysql://...` (preenchida e testada)

### Autenticação
- [ ] `JWT_SECRET` = chave forte (mín. 32 caracteres)
- [ ] `VITE_APP_ID` = copiada do Manus
- [ ] `OAUTH_SERVER_URL` = `https://api.manus.im`
- [ ] `VITE_OAUTH_PORTAL_URL` = copiada do Manus

### Proprietário
- [ ] `OWNER_OPEN_ID` = copiada do Manus
- [ ] `OWNER_NAME` = seu nome completo

### APIs
- [ ] `BUILT_IN_FORGE_API_URL` = copiada do Manus
- [ ] `BUILT_IN_FORGE_API_KEY` = copiada do Manus
- [ ] `VITE_FRONTEND_FORGE_API_URL` = copiada do Manus
- [ ] `VITE_FRONTEND_FORGE_API_KEY` = copiada do Manus

---

## 📊 Variáveis Opcionais (2 total)

- [ ] `VITE_ANALYTICS_ENDPOINT` = (deixar em branco se não tiver)
- [ ] `VITE_ANALYTICS_WEBSITE_ID` = (deixar em branco se não tiver)

---

## 🚀 Processo de Deploy

### Passo 1: Criar Web Service
- [ ] Acesse https://render.com
- [ ] Clique em "New +"
- [ ] Selecione "Web Service"
- [ ] Conecte repositório `raffastudioproducoes-cloud/Web`

### Passo 2: Configurar Aplicação
- [ ] Nome: `minharota`
- [ ] Ambiente: `Node`
- [ ] Build: `cd minharota-app && pnpm install && pnpm build`
- [ ] Start: `cd minharota-app && pnpm start`
- [ ] Plano: `Free`

### Passo 3: Adicionar Variáveis
- [ ] Clique em "Advanced"
- [ ] Copie o arquivo `.env.render`
- [ ] Cole em "Environment Variables"
- [ ] Substitua todos os valores `<entre_colchetes>`
- [ ] Verifique que nenhuma variável está vazia

### Passo 4: Deploy
- [ ] Clique em "Create Web Service"
- [ ] Aguarde o build (3-5 minutos)
- [ ] Verifique se não há erros nos logs

### Passo 5: Verificação
- [ ] Build completou com sucesso ✅
- [ ] Aplicativo está rodando (status: "Live")
- [ ] URL pública gerada (ex: `https://minharota.onrender.com`)

---

## 🧪 Testes Pós-Deploy

- [ ] Acesse a URL pública
- [ ] Página carrega sem erros
- [ ] Botão "Entrar com Manus" aparece
- [ ] Clique em login
- [ ] Redirecionamento para OAuth funciona
- [ ] Volta para o app após login
- [ ] Dashboard carrega com dados
- [ ] Clique em "Turnos" - página carrega
- [ ] Clique em "Caixinhas" - página carrega
- [ ] Clique em "Analytics" - página carrega
- [ ] Clique em "Configurações" - página carrega

---

## 🐛 Troubleshooting

### Build falha
- [ ] Verifique os logs em "Logs"
- [ ] Procure por erros em vermelho
- [ ] Confirme que `pnpm` está disponível
- [ ] Teste o build localmente: `cd minharota-app && pnpm build`

### Aplicativo não inicia
- [ ] Verifique se `pnpm start` funciona localmente
- [ ] Confirme todas as variáveis obrigatórias
- [ ] Veja os logs de erro

### Erro de conexão com banco
- [ ] Verifique `DATABASE_URL`
- [ ] Confirme que o banco está acessível
- [ ] Teste a conexão localmente

### Erro de autenticação
- [ ] Verifique `VITE_APP_ID`
- [ ] Confirme `OAUTH_SERVER_URL`
- [ ] Verifique `VITE_OAUTH_PORTAL_URL`

### Aplicativo fica offline
- [ ] Plano Free dorme após 15 min de inatividade
- [ ] Upgrade para plano pago para manter online
- [ ] Ou use Railway/Vercel como alternativa

---

## 📞 Próximas Etapas

Após deploy bem-sucedido:

1. **Integrar Firebase** (opcional)
   - Crie projeto em https://console.firebase.google.com
   - Configure Realtime Database
   - Atualize variáveis de ambiente

2. **Configurar Domínio Customizado** (opcional)
   - Compre domínio em registrador
   - Configure em Render → Settings → Custom Domain

3. **Monitorar Aplicação**
   - Verifique logs regularmente
   - Configure alertas
   - Monitore performance

4. **Backup de Dados**
   - Configure backup automático do banco
   - Teste restauração

---

## ✨ Sucesso!

Se tudo passou no checklist, seu MinhaRota está **online e pronto para usar**! 🎉

**URL:** `https://minharota.onrender.com`

---

**Versão:** 1.0.0  
**Data:** Junho 2026  
**Status:** ✅ Pronto para Deploy
