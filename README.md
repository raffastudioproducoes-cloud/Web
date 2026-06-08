# 🚀 Raffa Studio Produções - Web Projects

Repositório centralizado com todos os projetos web desenvolvidos pela **Raffa Studio Produções**.

## 📁 Projetos

### 🚗 [MinhaRota](./minharota/)

**Sistema Financeiro Elegante para Motoristas de Aplicativo**

Um aplicativo web PWA completo e sofisticado que oferece gestão de turnos, caixinhas financeiras, analytics avançadas e muito mais.

**Características Principais:**
- ✅ Autenticação segura via Manus OAuth
- ✅ Gestão completa de turnos com cálculo automático de km/litro
- ✅ Caixinhas financeiras com limite FREE (3) e PREMIUM (ilimitadas)
- ✅ Sistema de planos com paywall modal elegante
- ✅ Smart Analytics com heatmap 7×24 de horários de ouro
- ✅ OCR integrado com Tesseract.js para leitura de valores
- ✅ PWA instalável com Service Worker e cache inteligente
- ✅ Design elegante com glassmorphism e tema escuro
- ✅ Responsividade 100% mobile-first

**Stack Tecnológico:**
- Frontend: React 19 + TypeScript + Tailwind CSS 4
- Backend: Express 4 + tRPC 11 + Drizzle ORM
- Database: MySQL/TiDB
- PWA: Service Worker + Manifest.json
- Recursos: Chart.js, Tesseract.js, Shadcn/ui

**Status:** ✅ Pronto para Produção | Versão 1.0.0

**Documentação Completa:** [Ver README do MinhaRota](./minharota/README.md)

**Demo:** [Abrir DEMO.html](./minharota/DEMO.html)

---

## 🛠️ Como Usar

### Clonar o Repositório

```bash
git clone https://github.com/raffastudioproducoes-cloud/Web.git
cd Web
```

### Acessar um Projeto

```bash
cd minharota
pnpm install
pnpm dev
```

### Estrutura do Repositório

```
Web/
├── minharota/              # Sistema Financeiro para Motoristas
│   ├── client/             # Frontend React
│   ├── server/             # Backend Express + tRPC
│   ├── drizzle/            # Database Schema
│   ├── README.md           # Documentação completa
│   ├── DEMO.html           # Demo testável
│   ├── package.json        # Dependências
│   └── ...
├── README.md               # Este arquivo
└── .gitignore
```

---

## 📋 Requisitos

- **Node.js** 22.13.0+
- **pnpm** 10.15.1+
- **Git** 2.40+

### Instalação de Dependências

```bash
# Instalar pnpm globalmente
npm install -g pnpm

# Instalar dependências do projeto
cd minharota
pnpm install
```

---

## 🚀 Desenvolvimento

### MinhaRota

```bash
cd minharota

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

---

## 📊 Funcionalidades do MinhaRota

### Fase 1: Autenticação e Entrada
- Splash screen animada com 3 pontos (3-5 segundos)
- Onboarding com slider horizontal de 5 slides
- Login com Manus OAuth
- Footer com assinatura "Desenvolvido por Raffa Studio Produções"

### Fase 2: Navegação e Layout
- Bottom Navigation com 4 itens
- FAB central elevado e destacado
- Drawer lateral com efeito push (CSS Grid + translateX)
- Botão hambúrguer que se transforma em "X"
- Layout totalmente responsivo

### Fase 3: Dashboard Principal
- Cards em glassmorphism com 4 variantes de cor
- Exibição de ganho diário, meta e saldo
- Barra de progresso interativa da meta diária
- Modo Riding minimalista para operação em campo
- Dica do dia personalizada

### Fase 4: Gestão de Turnos
- Criar e finalizar turnos
- Cálculo automático de km/litro
- Atualização de ganhos diários
- Histórico completo de turnos

### Fase 5: Caixinhas Financeiras
- Criar caixinhas (4 tipos: poupança, investimento, emergência, meta)
- Depositar e sacar
- Limite de 3 caixinhas no plano FREE
- Caixinhas ilimitadas no plano PREMIUM

### Fase 6: Sistema de Planos
- Plano FREE com restrições
- Plano PREMIUM com paywall modal
- 4 métodos de pagamento: Cartão, PIX, Google Pay, Boleto
- Simulação de processamento de pagamento
- Flag isPro para controle de funcionalidades
- Bloqueio visual com ícone 🔒 para funções PRO

### Fase 7: Smart Analytics
- Heatmap 7×24 interativo com horários de ouro
- Alertas de clima com 3 tipos e 3 níveis de intensidade
- Metas diária, semanal e mensal com barras de progresso
- Recomendações personalizadas
- Estatísticas de ganho, km, eficiência e tempo

### Fase 8: PWA e Recursos Avançados
- Service Worker com estratégia Cache-First
- Manifest.json completo com ícones SVG
- Shortcuts para ações rápidas
- Share Target API
- Meta tags PWA (Apple, Android, tema)
- OCR com Tesseract.js para leitura de valores monetários
- Captura de câmera e upload de imagens

### Fase 9: Refinamentos e Testes
- Animações suaves em todos os componentes
- Micro-interações responsivas
- Validação de responsividade (mobile, tablet, desktop)
- Performance otimizada com cache
- Testes automatizados com Vitest
- Tema escuro elegante com glassmorphism
- Acessibilidade básica completa

---

## 🎨 Design System

**Cores:**
- Primary: #10b981 (Verde)
- Secondary: #3b82f6 (Azul)
- Warning: #f59e0b (Âmbar)
- Danger: #ef4444 (Vermelho)
- Background: #0f172a (Azul escuro)
- Foreground: #ffffff (Branco)

**Tipografia:**
- Font: Inter (Google Fonts)
- Weights: 400, 500, 600, 700

**Componentes:**
- Buttons com variantes (default, outline, ghost)
- Cards em glassmorphism
- Inputs com validação em tempo real
- Modals com animações suaves
- Toasts não-bloqueantes

---

## 🔐 Segurança

- ✅ Autenticação via Manus OAuth
- ✅ Validação com Zod
- ✅ HTTPS obrigatório
- ✅ Cookies seguros (httpOnly, secure, sameSite)
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ SQL injection prevention (Drizzle ORM)

---

## 📱 Responsividade

- ✅ Mobile (320px - 640px)
- ✅ Tablet (641px - 1024px)
- ✅ Desktop (1025px+)
- ✅ Media queries customizadas
- ✅ Flexbox e Grid layouts

---

## 🧪 Testes

```bash
cd minharota

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

---

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

---

## 🌐 Variáveis de Ambiente

Cada projeto possui seu próprio arquivo `.env.local`. Veja a documentação específica de cada projeto.

**MinhaRota:** [Ver variáveis de ambiente](./minharota/README.md#-variáveis-de-ambiente)

---

## 🚀 Deployment

Os projetos estão prontos para serem publicados via Manus. Clique no botão **Publish** na interface de gerenciamento.

### Checklist de Deploy
- ✅ Todas as variáveis de ambiente configuradas
- ✅ Database migrations aplicadas
- ✅ Testes passando
- ✅ Build sem erros
- ✅ Service Worker registrado (se PWA)
- ✅ Manifest.json válido (se PWA)

---

## 📚 Documentação

- [MinhaRota - README Completo](./minharota/README.md)
- [MinhaRota - DEMO.html](./minharota/DEMO.html)
- [MinhaRota - TODO List](./minharota/todo.md)

---

## 🤝 Contribuindo

Para contribuir com os projetos:

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

---

## 📝 Licença

Todos os projetos são licenciados sob a MIT License.

---

## 👨‍💻 Desenvolvido por

**Raffa Studio Produções**

- 🌐 Website: [Raffa Studio](https://raffastudio.com)
- 📧 Email: contato@raffastudio.com
- 🐙 GitHub: [@raffastudioproducoes-cloud](https://github.com/raffastudioproducoes-cloud)

---

## 📞 Suporte

Para suporte, abra uma issue no GitHub ou entre em contato através do email.

---

**Última Atualização:** Junho 2026

**Status:** ✅ Todos os Projetos Prontos para Produção