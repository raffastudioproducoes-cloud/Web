# 🔧 Explicação da Configuração Jekyll (_config.yml)

## O Problema

O Jekyll estava tentando processar **TODOS** os arquivos Markdown do repositório, incluindo aqueles dentro de `node_modules/`. Isso causava erros de sintaxe Liquid porque:

1. **Arquivos de dependências** contêm código e documentação que não são compatíveis com Liquid
2. **Sintaxe especial** em READMEs de bibliotecas (como `{%` do React Query) confunde o Jekyll
3. **Processamento desnecessário** desacelera o build

## A Solução: Parâmetro `exclude`

O arquivo `_config.yml` que criei contém a configuração correta:

```yaml
exclude:
  - node_modules
  - package.json
  - package-lock.yaml
  - pnpm-lock.yaml
  # ... e muitos outros
```

### O que isso faz?

**O Jekyll irá IGNORAR completamente** estes arquivos e pastas durante o build:

- ✅ Não processa Markdown
- ✅ Não processa Liquid
- ✅ Não copia para o site final
- ✅ Acelera o build

## Estrutura do _config.yml

### 1. **Site Settings** (Configurações do Site)
```yaml
title: Raffa Studio Produções - Web Projects
description: Soluções web inovadoras, elegantes e profissionais
url: https://raffastudioproducoes-cloud.github.io/Web
baseurl: /Web
lang: pt-BR
```
Define informações básicas do site e URLs.

### 2. **Build Settings** (Configurações de Build)
```yaml
markdown: kramdown
theme: jekyll-default
```
Define o processador Markdown e o tema.

### 3. **Exclude** (O MAIS IMPORTANTE!)
```yaml
exclude:
  # Node.js e dependências
  - node_modules
  - package.json
  - pnpm-lock.yaml
  
  # Ferramentas de build
  - webpack.config.js
  - vite.config.ts
  - tsconfig.json
  
  # Controle de versão
  - .git
  - .gitignore
  
  # IDE
  - .vscode
  - .idea
  
  # Documentação interna
  - CONTRIBUTING.md
  - todo.md
```

**Estas pastas/arquivos são IGNORADOS pelo Jekyll.**

### 4. **Include** (Sobrescrever Exclusões)
```yaml
include:
  - .htaccess
  - _redirects
```
Se você precisar incluir algo que foi excluído, liste aqui.

### 5. **Keep Files** (Preservar Durante Build)
```yaml
keep_files:
  - minharota/node_modules
  - minharota/dist
```
Preserva estas pastas mesmo se não forem processadas.

### 6. **Plugins** (Extensões)
```yaml
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
```
Ativa plugins úteis para SEO e feeds.

## Por Que Isso Funciona?

### Antes (❌ Erro)
```
Jekyll processa:
├── index.html ✓
├── README.md ✓
├── minharota/
│   ├── DEMO.html ✓
│   ├── README.md ✓
│   └── node_modules/
│       └── @tanstack/react-query/README.md ❌ ERRO: Liquid syntax error
```

### Depois (✅ Funciona)
```
Jekyll processa:
├── index.html ✓
├── README.md ✓
├── minharota/
│   ├── DEMO.html ✓
│   ├── README.md ✓
│   └── node_modules/ ⏭️ IGNORADO
```

## Arquivos Excluídos Explicados

### 📦 Node.js e Dependências
- `node_modules/` - Pasta com 1000+ arquivos de dependências
- `package.json`, `pnpm-lock.yaml` - Metadados de dependências
- `.npmrc`, `.pnpmfile.cjs` - Configuração do gerenciador de pacotes

**Por que excluir?** Contêm código de terceiros com sintaxe incompatível com Liquid.

### 🛠️ Ferramentas de Build
- `webpack.config.js`, `vite.config.ts` - Configuração de bundlers
- `tsconfig.json`, `vitest.config.ts` - Configuração de TypeScript e testes
- `.prettierrc`, `.eslintrc.json` - Configuração de formatadores

**Por que excluir?** São arquivos de configuração, não conteúdo do site.

### 🔐 Controle de Versão
- `.git/` - Histórico completo do Git
- `.gitignore` - Arquivo de configuração

**Por que excluir?** Não fazem parte do site público e ocupam espaço.

### 💻 IDE e Editores
- `.vscode/`, `.idea/` - Configurações de editores
- `.DS_Store` - Arquivo do macOS
- `*.swp`, `*~` - Arquivos temporários

**Por que excluir?** São específicos da máquina do desenvolvedor.

### 📄 Documentação Interna
- `CONTRIBUTING.md` - Guia para contribuidores
- `todo.md` - Lista de tarefas do projeto
- `GITHUB_PAGES.md` - Instruções de configuração

**Por que excluir?** São para desenvolvedores, não para visitantes do site.

### 📁 Pastas de Desenvolvimento
- `minharota/client/src` - Código-fonte React (não compilado)
- `minharota/server` - Código-fonte do backend
- `minharota/drizzle` - Migrations do banco de dados
- `minharota/.manus-logs` - Logs de desenvolvimento

**Por que excluir?** São código-fonte, não arquivos publicáveis.

## Configurações Adicionais Úteis

### 1. **Liquid Error Mode**
```yaml
liquid:
  error_mode: strict
  strict_filters: true
```
Ajuda a identificar erros de Liquid mais facilmente.

### 2. **Kramdown (Processador Markdown)**
```yaml
kramdown:
  input: GFM
  hard_wrap: false
  auto_ids: true
```
Usa GitHub Flavored Markdown (GFM) e gera IDs automáticos para headings.

### 3. **Plugins**
```yaml
plugins:
  - jekyll-feed        # Gera feed RSS
  - jekyll-seo-tag     # Adiciona meta tags SEO
  - jekyll-sitemap     # Gera sitemap.xml
```

## Como Usar Este Arquivo

1. **Copie o arquivo `_config.yml`** para a raiz do repositório
2. **Faça commit e push**:
   ```bash
   git add _config.yml
   git commit -m "fix: Configurar Jekyll para ignorar node_modules e otimizar build"
   git push origin main
   ```
3. **O GitHub Pages irá usar esta configuração** automaticamente no próximo build

## Verificar se Funcionou

1. Acesse: https://github.com/raffastudioproducoes-cloud/Web/actions
2. Procure pelo workflow "pages build and deployment"
3. Se o build passou ✅, a configuração está funcionando!

## Erros Comuns

### ❌ "Liquid syntax error" ainda aparece
- Verifique se o `_config.yml` está na **raiz** do repositório
- Aguarde alguns minutos para o GitHub Pages reprocessar
- Limpe o cache do navegador

### ❌ Arquivos importantes desapareceram do site
- Verifique se você não excluiu acidentalmente arquivos necessários
- Use `include:` para adicionar exceções

### ❌ O build continua lento
- Adicione mais pastas à seção `exclude:`
- Remova plugins desnecessários

## Referências

- [Jekyll Configuration - Official Docs](https://jekyllrb.com/docs/configuration/)
- [GitHub Pages - Jekyll Configuration](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)
- [Kramdown - Markdown Processor](https://kramdown.gettalogical.org/)

---

**Status**: ✅ Configuração Pronta

**Última Atualização**: Junho 2026
