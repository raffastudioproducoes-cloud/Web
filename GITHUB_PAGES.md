# 🚀 GitHub Pages - Instruções de Configuração

## Como Ativar o GitHub Pages

Para que o seu repositório seja acessível via GitHub Pages, siga os passos abaixo:

### 1. Acesse as Configurações do Repositório

1. Vá para: https://github.com/raffastudioproducoes-cloud/Web
2. Clique em **Settings** (Configurações)
3. No menu lateral, procure por **Pages** (ou acesse diretamente: https://github.com/raffastudioproducoes-cloud/Web/settings/pages)

### 2. Configure a Fonte do GitHub Pages

1. Em **Source**, selecione:
   - **Branch**: `main`
   - **Folder**: `/ (root)`

2. Clique em **Save**

### 3. Aguarde a Publicação

- O GitHub Pages pode levar alguns minutos para publicar
- Você verá uma mensagem verde confirmando que o site foi publicado
- O URL será algo como: `https://raffastudioproducoes-cloud.github.io/Web/`

## 📱 URLs Disponíveis

Após ativar o GitHub Pages, os seguintes URLs estarão disponíveis:

### Página Principal
- **URL**: `https://raffastudioproducoes-cloud.github.io/Web/`
- **Arquivo**: `index.html`
- **Conteúdo**: Dashboard principal com links para todos os projetos

### MinhaRota - DEMO
- **URL**: `https://raffastudioproducoes-cloud.github.io/Web/minharota/DEMO.html`
- **Arquivo**: `minharota/DEMO.html`
- **Conteúdo**: Demo interativa do MinhaRota com splash screen e preview

### MinhaRota - README
- **URL**: `https://raffastudioproducoes-cloud.github.io/Web/minharota/README.md`
- **Arquivo**: `minharota/README.md`
- **Conteúdo**: Documentação completa do projeto

### Repositório Principal
- **URL**: `https://github.com/raffastudioproducoes-cloud/Web`
- **Conteúdo**: Código-fonte completo

## 🔧 Estrutura do Repositório

```
Web/
├── index.html                    # Página principal (GitHub Pages)
├── DEMO.html                     # Demo do MinhaRota
├── README.md                     # Documentação do repositório
├── GITHUB_PAGES.md              # Este arquivo
├── minharota/
│   ├── DEMO.html                # Demo interativa
│   ├── README.md                # Documentação completa
│   ├── package.json             # Dependências
│   ├── client/                  # Frontend React
│   ├── server/                  # Backend Express + tRPC
│   ├── drizzle/                 # Database Schema
│   └── ...
└── .git/                        # Repositório Git
```

## 🎯 O que Você Pode Fazer

### 1. Compartilhar o Link Principal
```
https://raffastudioproducoes-cloud.github.io/Web/
```
Compartilhe este link para mostrar todos os seus projetos web.

### 2. Compartilhar o Demo do MinhaRota
```
https://raffastudioproducoes-cloud.github.io/Web/minharota/DEMO.html
```
Este link mostra uma versão interativa do MinhaRota com splash screen, onboarding e preview do dashboard.

### 3. Compartilhar o Repositório
```
https://github.com/raffastudioproducoes-cloud/Web
```
Link para o código-fonte completo no GitHub.

## 📝 Notas Importantes

- ✅ O GitHub Pages é **gratuito** para repositórios públicos
- ✅ As atualizações são **automáticas** - basta fazer push para `main`
- ✅ O site é servido via **HTTPS** (seguro)
- ✅ Não há limite de largura de banda
- ⚠️ O site é **público** - qualquer pessoa pode acessar
- ⚠️ Não é recomendado para aplicações com dados sensíveis

## 🔄 Atualizar o Site

Para atualizar o site após fazer mudanças:

1. Faça as alterações localmente
2. Commit e push para o repositório:
   ```bash
   git add .
   git commit -m "Descrição das mudanças"
   git push origin main
   ```
3. O GitHub Pages será atualizado automaticamente em alguns minutos

## ❌ Solução de Problemas

### O site não está aparecendo
- Verifique se o GitHub Pages está ativado em Settings > Pages
- Certifique-se de que o branch é `main` e a pasta é `/ (root)`
- Aguarde alguns minutos para a publicação

### O site está mostrando 404
- Verifique se o arquivo `index.html` existe na raiz do repositório
- Verifique se o caminho do arquivo está correto

### As mudanças não aparecem
- Aguarde alguns minutos para o GitHub Pages atualizar
- Tente limpar o cache do navegador (Ctrl+Shift+Delete)

## 📚 Recursos Adicionais

- [Documentação Oficial do GitHub Pages](https://docs.github.com/pt/pages)
- [Configurar um site com GitHub Pages](https://docs.github.com/pt/pages/getting-started-with-github-pages)
- [Solução de Problemas do GitHub Pages](https://docs.github.com/pt/pages/getting-started-with-github-pages/troubleshooting-common-issues-with-github-pages)

---

**Status**: ✅ Pronto para GitHub Pages

**Última Atualização**: Junho 2026
