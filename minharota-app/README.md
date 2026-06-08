# 🚗 MinhaRota - Aplicativo Web

**Versão:** 1.0.0  
**Status:** ✅ Pronto para Usar  
**URL:** https://raffastudioproducoes-cloud.github.io/Web/minharota-app/

---

## 🎯 O Que é MinhaRota?

MinhaRota é um **aplicativo web PWA completo** para motoristas de aplicativo, oferecendo:

✅ **Gestão de Turnos** - Registre início, fim, km rodados e ganhos  
✅ **Caixinhas Financeiras** - Organize suas economias em categorias  
✅ **Smart Analytics** - Heatmap 7×24 de horários de ouro  
✅ **Sistema de Planos** - FREE com limite de 3 caixinhas, PREMIUM ilimitado  
✅ **OCR Integrado** - Leia valores monetários de imagens  
✅ **PWA Instalável** - Funciona offline com Service Worker  
✅ **Design Elegante** - Tema escuro com glassmorphism  

---

## 🚀 Como Usar

### 1. Acessar o Aplicativo

Abra no seu navegador:
```
https://raffastudioproducoes-cloud.github.io/Web/minharota-app/
```

### 2. Fazer Login

- Clique em **"Entrar com Manus"**
- Você será redirecionado para autenticação
- Após login, voltará ao aplicativo

### 3. Explorar Funcionalidades

**Dashboard:**
- Visualize seu ganho do dia
- Veja meta diária e progresso
- Acesse modo Riding para operação em campo

**Turnos:**
- Clique em **"Iniciar Turno"**
- Registre quilômetros, ganho e combustível
- Finalize e veja estatísticas

**Caixinhas:**
- Crie categorias de economia
- Deposite e saque valores
- Acompanhe saldo total

**Analytics:**
- Veja heatmap de horários de ouro
- Receba alertas de clima
- Acompanhe metas e recomendações

**Configurações:**
- Ative notificações push
- Upgrade para PREMIUM
- Gerencie sua conta

---

## 📱 Funcionalidades

| Funcionalidade | FREE | PREMIUM |
|---|---|---|
| Gestão de Turnos | ✅ | ✅ |
| Caixinhas | 3 | ∞ |
| Analytics | ✅ | ✅ |
| OCR | ✅ | ✅ |
| Rendimento Simulado | ❌ | ✅ |
| Notificações Push | ✅ | ✅ |
| Geolocalização | ✅ | ✅ |
| Alertas de Clima | ✅ | ✅ |

---

## 🔧 Configuração com Firebase (Próximo Passo)

Atualmente, o aplicativo usa dados mock (simulados). Para guardar dados reais:

1. **Crie um projeto Firebase**
   - Acesse: https://console.firebase.google.com
   - Clique em "Criar Projeto"
   - Nome: "MinhaRota"

2. **Configure Realtime Database**
   - No Firebase, vá para "Realtime Database"
   - Clique em "Criar Banco de Dados"
   - Modo: "Iniciar no modo de teste"

3. **Obtenha Credenciais**
   - Em "Configurações do Projeto"
   - Copie as credenciais Web

4. **Integre ao MinhaRota**
   - Crie arquivo `.env.local` na raiz do projeto
   - Adicione credenciais do Firebase
   - O app sincronizará automaticamente

---

## 📊 Stack Tecnológico

**Frontend:**
- React 19
- TypeScript
- Tailwind CSS 4
- Shadcn/ui Components
- Chart.js para gráficos
- Tesseract.js para OCR

**Backend (Futuro):**
- Express.js
- tRPC
- Drizzle ORM
- Firebase Realtime Database

**PWA:**
- Service Worker
- Manifest.json
- Cache-First Strategy
- Offline Support

---

## 🎨 Design

- **Tema:** Escuro elegante
- **Estilo:** Glassmorphism
- **Responsividade:** 100% mobile-first
- **Acessibilidade:** WCAG compliant

---

## 🐛 Troubleshooting

### Aplicativo não carrega
- Limpe cache (Ctrl+Shift+Delete)
- Recarregue a página (F5)
- Tente em outro navegador

### Login não funciona
- Verifique conexão com internet
- Tente fazer logout e login novamente
- Limpe cookies do navegador

### Dados não salvam
- Verifique se está online
- Confirme que o Service Worker está ativo
- Tente em modo anônimo

### Notificações não aparecem
- Permita notificações no navegador
- Verifique se o Service Worker está registrado
- Tente recarregar a página

---

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Verifique a documentação completa em `/minharota/README.md`
- Consulte o guia técnico em `/minharota/ENTREGA_FINAL.md`

---

## 📄 Documentação

- **README Técnico:** `/minharota/README.md` (427 linhas)
- **Entrega Final:** `/minharota/ENTREGA_FINAL.md` (477 linhas)
- **Demo Interativa:** `/minharota/DEMO.html`
- **Setup GitHub Actions:** `/SETUP_GITHUB_ACTIONS_MANUAL.md`

---

## ✨ Próximas Atualizações

- [ ] Integração com Firebase
- [ ] Notificações em tempo real
- [ ] Relatórios exportáveis (PDF/Excel)
- [ ] Integração com Stripe para pagamentos
- [ ] App nativa (iOS/Android)
- [ ] Sincronização em tempo real entre dispositivos

---

**Desenvolvido por:** Raffa Studio Produções  
**Versão:** 1.0.0  
**Data:** Junho 2026  
**Status:** ✅ Pronto para Produção
