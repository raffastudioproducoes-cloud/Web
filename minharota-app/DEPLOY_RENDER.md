# 🚀 Deploy MinhaRota no Render

## Passo a Passo (5 minutos)

### 1. Criar Conta no Render
- Acesse: https://render.com
- Clique em "Sign up"
- Faça login com GitHub (recomendado)

### 2. Conectar Repositório
- Clique em "New +"
- Selecione "Web Service"
- Selecione o repositório: `raffastudioproducoes-cloud/Web`
- Clique em "Connect"

### 3. Configurar Aplicação
- **Name:** `minharota`
- **Environment:** `Node`
- **Build Command:** `cd minharota-app && pnpm install && pnpm build`
- **Start Command:** `cd minharota-app && pnpm start`
- **Plan:** Free (gratuito)

### 4. Adicionar Variáveis de Ambiente
Clique em "Advanced" e adicione:

```
NODE_ENV=production
DATABASE_URL=<sua_url_do_banco>
JWT_SECRET=<sua_chave_secreta>
VITE_APP_ID=<seu_app_id>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=<seu_oauth_url>
OWNER_OPEN_ID=<seu_open_id>
OWNER_NAME=<seu_nome>
BUILT_IN_FORGE_API_URL=<url_da_api>
BUILT_IN_FORGE_API_KEY=<sua_chave_api>
VITE_FRONTEND_FORGE_API_KEY=<chave_frontend>
VITE_FRONTEND_FORGE_API_URL=<url_frontend>
VITE_ANALYTICS_ENDPOINT=<endpoint_analytics>
VITE_ANALYTICS_WEBSITE_ID=<id_analytics>
```

### 5. Deploy
- Clique em "Create Web Service"
- Aguarde o build (3-5 minutos)
- Você receberá uma URL pública como: `https://minharota.onrender.com`

---

## ✅ Seu Aplicativo Estará Online em:
```
https://minharota.onrender.com
```

---

## 📝 Próximos Passos

1. **Integrar Firebase**
   - Crie projeto em https://console.firebase.google.com
   - Configure Realtime Database
   - Adicione credenciais ao `.env`

2. **Conectar Banco de Dados Real**
   - Use Firebase ou outro banco
   - Substitua dados mock por dados reais

3. **Configurar Domínio Customizado** (opcional)
   - Compre domínio em registrador
   - Configure em Settings → Custom Domain

---

## 🐛 Troubleshooting

### Build falha
- Verifique se `pnpm` está instalado
- Confira se `package.json` existe
- Veja logs em "Logs" no Render

### Aplicativo não inicia
- Verifique variáveis de ambiente
- Confira se `pnpm start` funciona localmente
- Veja logs de erro

### Aplicativo fica offline
- Plano free do Render dorme após 15 min de inatividade
- Upgrade para plano pago para manter sempre online
- Ou use Vercel/Railway como alternativa

---

**Status:** ✅ Pronto para Deploy
**Tempo:** ~5 minutos
**Custo:** Gratuito (com limitações)
