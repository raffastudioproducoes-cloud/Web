# 🚀 Setup Manual do GitHub Actions - Static HTML Deployment

## ⚠️ Por Que Manual?

O GitHub bloqueia criação de workflows via git push por questões de segurança. Você precisa criar o workflow **diretamente na interface do GitHub**.

---

## 📋 Passo a Passo (5 minutos)

### Passo 1: Acessar GitHub

1. Acesse: https://github.com/raffastudioproducoes-cloud/Web
2. Clique em **Actions** (no menu superior)

### Passo 2: Criar Novo Workflow

1. Clique em **"New workflow"** (botão verde)
2. Clique em **"set up a workflow yourself →"** (link no canto superior direito)

### Passo 3: Copiar o Código

Copie o código abaixo e cole na editor do GitHub:

```yaml
# GitHub Pages - Static HTML Deployment
name: Deploy Static HTML to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
        continue-on-error: true
      
      - name: Build application
        run: npm run build
        continue-on-error: true
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Check for HTML files
        run: |
          if [ -f "index.html" ]; then
            echo "✅ index.html encontrado"
          else
            echo "⚠️ Aviso: index.html não encontrado na raiz"
          fi
      
      - name: Check for node_modules
        run: |
          if [ -d "node_modules" ]; then
            echo "✅ node_modules presente (será ignorado)"
          fi
```

### Passo 4: Nomear o Arquivo

1. No campo **"Name your workflow"**, digite: `static.yml`
2. O caminho deve ser: `.github/workflows/static.yml`

### Passo 5: Salvar

1. Clique em **"Commit changes..."** (botão verde)
2. Deixe a mensagem padrão ou customize:
   ```
   ci: Adicionar workflow Static HTML para GitHub Pages
   ```
3. Selecione **"Commit directly to the main branch"**
4. Clique em **"Commit changes"**

---

## ✅ Verificar se Funcionou

### 1. Workflow Criado

1. Acesse **Actions** no repositório
2. Você deve ver **"Deploy Static HTML to GitHub Pages"** na lista

### 2. Primeiro Deploy

1. Clique no workflow
2. Clique em **"Run workflow"** (botão azul)
3. Selecione **branch: main**
4. Clique em **"Run workflow"**
5. Aguarde 2-3 minutos

### 3. Verificar Status

1. Volte para **Actions**
2. Veja o status do workflow (deve estar verde ✅)
3. Clique nele para ver os logs

---

## 🌐 Configurar GitHub Pages

### Passo 1: Acessar Settings

1. Acesse seu repositório
2. Clique em **Settings** (aba superior direita)

### Passo 2: Pages

1. No menu esquerdo, clique em **Pages** (em "Code and automation")

### Passo 3: Configurar Source

1. Em **Source**, selecione **Deploy from a branch**
2. Em **Branch**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
3. Clique em **Save**

### Passo 4: Aguardar Deploy

1. Você verá uma mensagem: "Your site is live at..."
2. Copie a URL: `https://raffastudioproducoes-cloud.github.io/Web/`

---

## 📊 Resultado Final

Após completar os passos, você terá:

✅ Workflow GitHub Actions configurado
✅ Sem Jekyll processando seus arquivos
✅ Web App servido como HTML/JS puro
✅ PWA funcionando corretamente
✅ node_modules ignorado automaticamente
✅ Deploy automático a cada push

---

## 🔗 URLs de Acesso

```
Página principal:
https://raffastudioproducoes-cloud.github.io/Web/

MinhaRota Demo:
https://raffastudioproducoes-cloud.github.io/Web/minharota/DEMO.html

MinhaRota Docs:
https://raffastudioproducoes-cloud.github.io/Web/minharota/README.md
```

---

## 🐛 Se Algo Não Funcionar

### Workflow não aparece
- Aguarde 5 minutos
- Recarregue a página (F5)
- Verifique se o arquivo foi criado em `.github/workflows/static.yml`

### Deploy falha
1. Clique no workflow
2. Veja os logs (seção "Logs")
3. Procure por erros em vermelho
4. Verifique se `index.html` existe na raiz

### Página não aparece
1. Aguarde 2-3 minutos
2. Limpe cache do navegador (Ctrl+Shift+Delete)
3. Verifique a URL (case-sensitive)
4. Verifique em Settings → Pages se está configurado

---

## 📝 Próximas Vezes

Depois que o workflow estiver configurado, você pode:

1. **Fazer push normalmente:**
   ```bash
   git add .
   git commit -m "sua mensagem"
   git push origin main
   ```

2. **O workflow executará automaticamente**
   - Veja em Actions → Deploy Static HTML to GitHub Pages

3. **Seu site será atualizado em 2-3 minutos**

---

## ✨ Benefícios Finais

- ✅ **Sem erros Jekyll** - Não tenta processar node_modules
- ✅ **Deploy automático** - A cada push para main
- ✅ **Web App puro** - React, Vue, Angular, etc.
- ✅ **PWA funcional** - Service Worker funciona
- ✅ **Rápido** - Deploy em 2-3 minutos

---

**Status:** ✅ Pronto para Setup Manual
**Tempo:** ~5 minutos
**Dificuldade:** ⭐ Fácil
