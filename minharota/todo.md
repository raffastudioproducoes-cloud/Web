# MinhaRota - TODO List - Fase de Integração Completa

## ✅ Fases Anteriores (Concluídas)

### Fase 1: Autenticação e Entrada
- [x] Splash screen animada (logo, nome, ano, 3 pontos, 3-5s fadeOut)
- [x] Onboarding com slider horizontal (flag hasSeenOnboarding)
- [x] Tela de login com Manus OAuth
- [x] Footer com assinatura "Desenvolvido por Raffa Studio Produções"

### Fase 2: Navegação e Layout
- [x] Bottom Navigation com FAB central elevado
- [x] Drawer lateral com efeito push (CSS Grid + translateX)
- [x] Botão hambúrguer com transformação em "X"
- [x] Layout responsivo e elegante

### Fase 3: Dashboard Principal
- [x] Cards em glassmorphism
- [x] Exibição de ganho diário
- [x] Meta diária com barra de progresso
- [x] Modo Riding (foco em campo, sem header/footer)

### Fase 4: Gestão de Turnos (UI)
- [x] Registro de início e fim de turno
- [x] Cálculo de quilômetros rodados
- [x] Ganhos por turno
- [x] Cálculo automático de km/litro

### Fase 5: Caixinhas Financeiras (UI)
- [x] Criação de caixinhas
- [x] Depósito e saque
- [x] Limite de 3 caixinhas no plano FREE
- [x] Caixinhas ilimitadas no plano PREMIUM

### Fase 6: Sistema de Planos
- [x] Plano FREE com restrições
- [x] Plano PREMIUM com paywall modal
- [x] Simulação de pagamento (CC, Pix, Google Pay, Boleto)
- [x] Flag isPro para controle de funcionalidades
- [x] Bloqueio visual com ícone 🔒 para funções PRO

### Fase 7: Smart Analytics
- [x] Heatmap 7×24 de horários de ouro (Chart.js)
- [x] Escala 6×1 com recálculo de meta diária
- [x] Alertas de clima via Geolocation API
- [x] Integração com APIs financeiras (rendimento simulado)

### Fase 8: PWA e Recursos Avançados
- [x] manifest.json com theme_color
- [x] Service worker com estratégia Cache-First
- [x] OCR via Tesseract.js para leitura de valores monetários
- [x] Permissões de Geolocation e Camera

### Fase 9: Refinamentos e Testes
- [x] Animações e micro-interações
- [x] Testes de funcionalidades críticas
- [x] Validação de responsividade
- [x] Performance e otimizações

---

## 🔄 Fase 10: Integração Completa (Em Progresso)

### 10.1 - Conectar UI de Turnos ao Backend tRPC
- [ ] Integrar `trpc.turnos.criar.useMutation()` na página de Turnos
- [ ] Integrar `trpc.turnos.listar.useQuery()` para listar turnos
- [ ] Integrar `trpc.turnos.finalizar.useMutation()` para finalizar
- [ ] Adicionar loading states e error handling
- [ ] Validação de inputs com Zod
- [ ] Testes de integração para Turnos

### 10.2 - Conectar UI de Caixinhas ao Backend tRPC
- [ ] Integrar `trpc.caixinhas.criar.useMutation()` na página de Caixinhas
- [ ] Integrar `trpc.caixinhas.listar.useQuery()` para listar caixinhas
- [ ] Integrar `trpc.caixinhas.depositar.useMutation()` para depositar
- [ ] Integrar `trpc.caixinhas.sacar.useMutation()` para sacar
- [ ] Validação de limite FREE (máximo 3)
- [ ] Testes de integração para Caixinhas

### 10.3 - Integrar Paywall com Sistema de Planos Real
- [ ] Criar procedure `trpc.subscricoes.upgrade.useMutation()`
- [ ] Implementar lógica de upgrade FREE → PREMIUM
- [ ] Salvar status `isPro` no banco de dados
- [ ] Validar limite de caixinhas baseado em `isPro`
- [ ] Mostrar bloqueio visual (🔒) para funções PRO
- [ ] Testes de upgrade de plano

### 10.4 - Integrar OCR com Upload de Imagens
- [ ] Implementar upload de imagem para Tesseract.js
- [ ] Extrair valores monetários da imagem
- [ ] Pré-preencher campo de ganho/valor com resultado OCR
- [ ] Adicionar preview da imagem antes de processar
- [ ] Tratamento de erros e validação
- [ ] Testes de OCR

### 10.5 - Implementar Geolocalização em Tempo Real
- [ ] Capturar localização do motorista com `navigator.geolocation`
- [ ] Armazenar coordenadas no banco de dados
- [ ] Exibir localização no Google Maps
- [ ] Calcular distância percorrida entre pontos
- [ ] Atualizar localização a cada 30 segundos
- [ ] Testes de geolocalização

### 10.6 - Integrar OpenWeatherMap para Alertas de Clima
- [ ] Obter chave de API do OpenWeatherMap
- [ ] Criar procedure `trpc.clima.obter.useQuery()`
- [ ] Buscar clima baseado em geolocalização
- [ ] Mostrar alertas em tempo real (chuva, vento, calor)
- [ ] Atualizar clima a cada 10 minutos
- [ ] Testes de integração com OpenWeatherMap

### 10.7 - Implementar Web Push Notifications
- [ ] Registrar permissão de notificações
- [ ] Implementar Service Worker para receber push
- [ ] Criar notificações para: pico de demanda, meta atingida, clima adverso
- [ ] Testar notificações em diferentes navegadores
- [ ] Adicionar opção de desabilitar notificações
- [ ] Testes de Web Push

### 10.8 - Implementar Background Sync API
- [ ] Sincronizar turnos criados offline
- [ ] Sincronizar caixinhas criadas offline
- [ ] Fila de sincronização com retry automático
- [ ] Indicador visual de sincronização
- [ ] Testes de Background Sync

### 10.9 - Testes Completos e Refinamentos Finais
- [ ] Testes end-to-end com Vitest
- [ ] Testes de performance
- [ ] Testes de acessibilidade
- [ ] Testes em múltiplos navegadores
- [ ] Otimização de bundle size
- [ ] Otimização de imagens e assets

### 10.10 - Entrega Final
- [ ] Documentação completa atualizada
- [ ] README com instruções de setup
- [ ] Guia de integração de APIs
- [ ] Changelog com todas as mudanças
- [ ] Checkpoint final
- [ ] Deploy no GitHub Pages

---

## 📊 Resumo de Progresso

**Fases Anteriores:** 9/9 ✅ (100%)
**Fase 10 - Integração:** 0/10 (Em Progresso)

**Total de Tarefas:** 50+ funcionalidades para implementar

---

## 🎯 Prioridade de Implementação

1. **CRÍTICA** (Fazer primeiro):
   - Conectar Turnos ao backend
   - Conectar Caixinhas ao backend
   - Integrar Paywall com planos reais

2. **ALTA** (Fazer depois):
   - OCR com upload real
   - Geolocalização em tempo real
   - Alertas de clima

3. **MÉDIA** (Fazer por último):
   - Web Push Notifications
   - Background Sync
   - Testes e refinamentos

---

## 🚀 Status Final Esperado

Após completar a Fase 10:
- ✅ 100% funcional
- ✅ Todas as APIs integradas
- ✅ Dados reais (não mock)
- ✅ Pronto para produção
- ✅ Totalmente testado
- ✅ Documentação completa
