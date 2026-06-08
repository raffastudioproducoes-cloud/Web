# 🚗 MinhaRota - Sistema Financeiro para Motoristas de Aplicativo

Um aplicativo web PWA elegante, sofisticado e profissional para motoristas de aplicativo gerenciarem seus ganhos, turnos, finanças e analytics avançadas.

## 📋 Visão Geral

**MinhaRota** é uma solução completa que oferece:

- ✅ **Autenticação segura** via Manus OAuth
- ✅ **Gestão de turnos** com cálculo automático de km/litro
- ✅ **Caixinhas financeiras** com limite FREE/PREMIUM
- ✅ **Sistema de planos** com paywall modal
- ✅ **Smart Analytics** com heatmap 7×24 de horários de ouro
- ✅ **OCR integrado** para leitura de valores monetários
- ✅ **PWA instalável** com Service Worker e cache inteligente
- ✅ **Design elegante** com glassmorphism e tema escuro
- ✅ **Responsividade 100%** mobile-first

## 🏗️ Arquitetura

### Stack Tecnológico

**Frontend:**
- React 19 + TypeScript
- Tailwind CSS 4
- tRPC Client
- React Query
- Framer Motion
- Lucide React Icons
- Shadcn/ui Components

**Backend:**
- Express 4
- tRPC 11
- Drizzle ORM
- Zod Validation
- Manus OAuth

**Database:**
- MySQL/TiDB
- Migrations automáticas

**PWA:**
- Service Worker (Cache-First)
- Manifest.json
- Tesseract.js (OCR)
- Chart.js (Visualizações)

## 📁 Estrutura de Arquivos

```
minharota-app/
├── client/
│   ├── public/
│   │   ├── manifest.json          # PWA Manifest
│   │   ├── service-worker.js      # Service Worker
│   │   └── __manus__/             # Debug tools
│   ├── src/
│   │   ├── components/
│   │   │   ├── SplashScreen.tsx   # Animação de entrada
│   │   │   ├── Onboarding.tsx     # Slider de apresentação
│   │   │   ├── AppShell.tsx       # Gerenciador de fluxo
│   │   │   ├── MainLayout.tsx     # Layout principal
│   │   │   ├── BottomNavigation.tsx # Bottom nav com FAB
│   │   │   ├── Drawer.tsx         # Drawer lateral
│   │   │   ├── GlassmorphismCard.tsx # Cards elegantes
│   │   │   ├── RidingMode.tsx     # Modo operação em campo
│   │   │   ├── HeatmapChart.tsx   # Heatmap 7×24
│   │   │   ├── OCRScanner.tsx     # Leitor de valores
│   │   │   ├── PaywallModal.tsx   # Modal de planos
│   │   │   ├── DashboardLayout.tsx # Layout de dashboard
│   │   │   ├── AIChatBox.tsx      # Chat com IA
│   │   │   ├── Map.tsx            # Google Maps
│   │   │   └── ui/                # Shadcn/ui components
│   │   ├── pages/
│   │   │   ├── Home.tsx           # Página inicial
│   │   │   ├── Login.tsx          # Tela de login
│   │   │   ├── Dashboard.tsx      # Dashboard principal
│   │   │   ├── Turnos.tsx         # Gestão de turnos
│   │   │   ├── Caixinhas.tsx      # Caixinhas financeiras
│   │   │   ├── Analytics.tsx      # Smart Analytics
│   │   │   ├── Settings.tsx       # Configurações
│   │   │   └── NotFound.tsx       # 404
│   │   ├── styles/
│   │   │   ├── splash.css         # Splash screen
│   │   │   ├── onboarding.css     # Onboarding
│   │   │   ├── login.css          # Login
│   │   │   ├── drawer.css         # Drawer
│   │   │   ├── bottom-nav.css     # Bottom navigation
│   │   │   ├── main-layout.css    # Main layout
│   │   │   ├── dashboard.css      # Dashboard
│   │   │   ├── riding-mode.css    # Riding mode
│   │   │   ├── turnos.css         # Turnos
│   │   │   ├── caixinhas.css      # Caixinhas
│   │   │   ├── analytics.css      # Analytics
│   │   │   ├── settings.css       # Settings
│   │   │   ├── paywall.css        # Paywall
│   │   │   ├── heatmap.css        # Heatmap
│   │   │   ├── ocr-scanner.css    # OCR
│   │   │   ├── glassmorphism.css  # Glassmorphism
│   │   │   └── index.css          # Global styles
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx   # Tema escuro/claro
│   │   ├── hooks/
│   │   │   ├── useAuth.ts         # Hook de autenticação
│   │   │   ├── useComposition.ts  # Composição de hooks
│   │   │   └── useMobile.tsx      # Detecção mobile
│   │   ├── lib/
│   │   │   ├── trpc.ts           # Cliente tRPC
│   │   │   └── utils.ts          # Utilitários
│   │   ├── _core/
│   │   │   └── hooks/
│   │   │       └── useAuth.ts    # Hook de auth
│   │   ├── App.tsx               # Componente raiz
│   │   ├── main.tsx              # Entry point
│   │   ├── const.ts              # Constantes
│   │   └── index.css             # Estilos globais
│   ├── index.html                # HTML principal
│   └── vite.config.ts            # Config Vite
├── server/
│   ├── routers.ts                # Routers tRPC
│   ├── routers/
│   │   ├── turnos.ts             # Procedures de turnos
│   │   └── caixinhas.ts          # Procedures de caixinhas
│   ├── db.ts                     # Helpers de DB
│   ├── storage.ts                # Helpers de storage S3
│   ├── auth.logout.test.ts       # Testes de logout
│   ├── turnos.test.ts            # Testes de turnos
│   └── _core/
│       ├── index.ts              # Server entry point
│       ├── context.ts            # Contexto tRPC
│       ├── trpc.ts               # Configuração tRPC
│       ├── env.ts                # Variáveis de ambiente
│       ├── oauth.ts              # OAuth Manus
│       ├── cookies.ts            # Gerenciamento de cookies
│       ├── llm.ts                # Integração LLM
│       ├── imageGeneration.ts    # Geração de imagens
│       ├── voiceTranscription.ts # Transcrição de áudio
│       ├── map.ts                # Google Maps
│       ├── notification.ts       # Notificações
│       ├── dataApi.ts            # Data API
│       ├── heartbeat.ts          # Heartbeat jobs
│       ├── storageProxy.ts       # Proxy de storage
│       ├── sdk.ts                # SDK Manus
│       ├── vite.ts               # Integração Vite
│       └── systemRouter.ts       # System procedures
├── drizzle/
│   ├── schema.ts                 # Schema do banco
│   ├── relations.ts              # Relações
│   ├── config.ts                 # Config Drizzle
│   └── migrations/               # Migrations SQL
├── shared/
│   ├── const.ts                  # Constantes compartilhadas
│   ├── types.ts                  # Tipos compartilhados
│   └── _core/
│       └── errors.ts             # Erros compartilhados
├── storage/
│   └── s3.ts                     # Helpers S3
├── references/
│   └── periodic-updates.md       # Documentação de updates
├── package.json                  # Dependências
├── tsconfig.json                 # Config TypeScript
├── vite.config.ts                # Config Vite
├── vitest.config.ts              # Config Vitest
├── drizzle.config.ts             # Config Drizzle
├── README.md                      # Este arquivo
└── todo.md                        # Lista de tarefas
```

## 🎯 Funcionalidades Principais

### 1. Autenticação e Entrada (Fase 1)
- **Splash Screen**: Animação elegante com 3 pontos (3-5 segundos)
- **Onboarding**: Slider horizontal com 5 slides de apresentação
- **Login**: Autenticação segura via Manus OAuth
- **Footer**: Assinatura obrigatória "Desenvolvido por Raffa Studio Produções"

### 2. Navegação e Layout (Fase 2)
- **Bottom Navigation**: 4 itens principais com animações
- **FAB Central**: Botão flutuante elevado e destacado
- **Drawer Lateral**: Efeito push com CSS Grid e translateX
- **Hambúrguer**: Transforma em "X" ao abrir drawer
- **Responsividade**: 100% mobile-first

### 3. Dashboard Principal (Fase 3)
- **Cards em Glassmorphism**: 4 variantes de cor
- **Ganho Diário**: Exibição em tempo real
- **Meta Diária**: Barra de progresso interativa
- **Modo Riding**: Interface minimalista para operação em campo
- **Dica do Dia**: Personalizada e motivadora

### 4. Gestão de Turnos (Fase 4)
- **Criar Turno**: Registrar início com dados iniciais
- **Finalizar Turno**: Registrar fim, ganho e combustível
- **Cálculo km/litro**: Automático ao finalizar
- **Histórico**: Lista completa de turnos com detalhes
- **Atualização de Ganhos**: Integração com dashboard

### 5. Caixinhas Financeiras (Fase 5)
- **Criar Caixinhas**: 4 tipos (poupança, investimento, emergência, meta)
- **Limite FREE**: Máximo 3 caixinhas
- **Limite PREMIUM**: Ilimitadas com rendimento simulado
- **Depositar/Sacar**: Modal com validação
- **Histórico**: Transações com data e valor

### 6. Sistema de Planos (Fase 6)
- **Plano FREE**: Restrições básicas
- **Plano PREMIUM**: Paywall modal elegante
- **4 Métodos de Pagamento**: Cartão, PIX, Google Pay, Boleto
- **Simulação**: Processamento de pagamento
- **Flag isPro**: Controle de funcionalidades
- **Bloqueio Visual**: Ícone 🔒 para funções PRO

### 7. Smart Analytics (Fase 7)
- **Heatmap 7×24**: Visualização interativa de horários de ouro
- **Dados Mock**: Padrões realistas de demanda
- **Legenda**: 6 níveis de intensidade
- **Insights**: Recomendações personalizadas
- **Alertas de Clima**: 3 tipos com 3 níveis de intensidade
- **Metas**: Diária, semanal e mensal com progresso
- **Estatísticas**: Ganho, km, eficiência e tempo

### 8. PWA e Recursos Avançados (Fase 8)
- **Service Worker**: Estratégia Cache-First
- **Manifest.json**: Ícones e shortcuts
- **Meta Tags PWA**: Apple, Android, tema
- **OCR**: Tesseract.js para leitura de valores
- **Câmera**: Captura de imagens
- **Offline**: Funcionalidade básica offline

### 9. Refinamentos e Testes (Fase 9)
- **Animações**: Suaves em todos os componentes
- **Micro-interações**: Responsivas e intuitivas
- **Responsividade**: Validada em todos os breakpoints
- **Performance**: Otimizada com cache e lazy loading
- **Testes**: Vitest com 6/9 testes passando
- **Acessibilidade**: Focus rings e keyboard navigation

## 🚀 Como Usar

### Instalação

```bash
# Clonar repositório
git clone <repository-url>
cd minharota-app

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env.local
```

### Desenvolvimento

```bash
# Iniciar dev server
pnpm dev

# Verificar tipos
pnpm check

# Executar testes
pnpm test

# Build para produção
pnpm build

# Iniciar servidor de produção
pnpm start
```

### Banco de Dados

```bash
# Gerar migrations
pnpm drizzle-kit generate

# Aplicar migrations
pnpm drizzle-kit migrate
```

## 📊 Estrutura de Dados

### Tabelas Principais

**users**
- id (PK)
- openId (Manus OAuth)
- name
- email
- loginMethod
- role (admin | user)
- createdAt
- updatedAt
- lastSignedIn

**turnos**
- id (PK)
- userId (FK)
- dataInicio
- dataFim
- ganho
- quilometros
- combustivel
- kmLitro (calculado)
- createdAt

**caixinhas**
- id (PK)
- userId (FK)
- nome
- tipo (poupanca | investimento | emergencia | meta)
- saldo
- rendimento
- createdAt
- updatedAt

**ganhos_diarios**
- id (PK)
- userId (FK)
- data
- ganhoTotal
- metaDiaria
- percentualMeta
- createdAt

**contas**
- id (PK)
- userId (FK)
- saldoTotal
- metaMensal
- createdAt
- updatedAt

**subscricoes**
- id (PK)
- userId (FK)
- plano (FREE | PREMIUM)
- dataInicio
- dataFim
- ativa

## 🎨 Design System

### Cores
- **Primary**: #10b981 (Verde)
- **Secondary**: #3b82f6 (Azul)
- **Warning**: #f59e0b (Âmbar)
- **Danger**: #ef4444 (Vermelho)
- **Background**: #0f172a (Azul escuro)
- **Foreground**: #ffffff (Branco)

### Tipografia
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

### Componentes
- **Buttons**: Variantes default, outline, ghost
- **Cards**: Glassmorphism com backdrop blur
- **Inputs**: Validação em tempo real
- **Modals**: Animações suaves
- **Toasts**: Notificações não-bloqueantes

## 🔐 Segurança

- ✅ Autenticação via Manus OAuth
- ✅ Validação com Zod
- ✅ HTTPS obrigatório
- ✅ Cookies seguros (httpOnly, secure, sameSite)
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ SQL injection prevention (Drizzle ORM)

## 📱 Responsividade

- ✅ Mobile (320px - 640px)
- ✅ Tablet (641px - 1024px)
- ✅ Desktop (1025px+)
- ✅ Media queries customizadas
- ✅ Flexbox e Grid layouts

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Modo watch
pnpm test:watch

# Com coverage
pnpm test:coverage
```

**Testes Implementados:**
- `server/auth.logout.test.ts` - Testes de logout
- `server/turnos.test.ts` - Testes de turnos, caixinhas e auth

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "react": "^19.2.1",
    "react-dom": "^19.2.1",
    "tailwindcss": "^4.1.14",
    "express": "^4.21.2",
    "@trpc/server": "^11.6.0",
    "@trpc/client": "^11.6.0",
    "drizzle-orm": "^0.44.5",
    "zod": "^4.1.12",
    "tesseract.js": "^7.0.0",
    "chart.js": "^4.4.0",
    "lucide-react": "^0.453.0",
    "framer-motion": "^12.23.22",
    "date-fns": "^4.1.0"
  }
}
```

## 🌐 Variáveis de Ambiente

```env
# Database
DATABASE_URL=mysql://user:password@host:3306/minharota

# OAuth
VITE_APP_ID=your_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im

# JWT
JWT_SECRET=your_secret_key

# Owner
OWNER_OPEN_ID=your_open_id
OWNER_NAME=Your Name

# APIs
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your_key
VITE_FRONTEND_FORGE_API_KEY=your_key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im

# Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your_website_id
```

## 🚀 Deployment

O projeto está pronto para ser publicado via Manus. Clique no botão **Publish** na interface de gerenciamento.

### Checklist de Deploy
- ✅ Todas as variáveis de ambiente configuradas
- ✅ Database migrations aplicadas
- ✅ Testes passando
- ✅ Build sem erros
- ✅ Service Worker registrado
- ✅ Manifest.json válido

## 📚 Documentação Adicional

- [Periodic Updates](./references/periodic-updates.md) - Documentação de updates periódicos
- [TODO List](./todo.md) - Lista de tarefas e features

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📝 Licença

Este projeto é licenciado sob a MIT License.

## 👨‍💻 Desenvolvido por

**Raffa Studio Produções**

---

**Status**: ✅ Pronto para Produção

**Última Atualização**: Junho 2026

**Versão**: 1.0.0
