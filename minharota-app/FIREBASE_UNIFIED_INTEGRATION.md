# 🔥 Integração Firebase Unificada - MinhaRota

## 📱 Suporte Multi-Plataforma

O MinhaRota agora suporta **3 plataformas** com sincronização em tempo real:

| Plataforma | Arquivo Config | Status |
|---|---|---|
| 🤖 **Android** | `google-services.json` | ✅ Pronto |
| 🍎 **iOS** | `GoogleService-Info.plist` | ✅ Pronto |
| 🌐 **Web** | `firebase.ts` | ✅ Pronto |

---

## 🎯 Projeto Firebase Unificado

```
Project: minha-rota-42295
├── Project ID: minha-rota-42295
├── Project Number: 372497650027
├── Storage Bucket: minha-rota-42295.firebasestorage.app
└── Todas as plataformas compartilham os mesmos dados
```

---

## 📋 Credenciais Compartilhadas

### Autenticação

| Plataforma | Client ID |
|---|---|
| Android | 1:372497650027:android:80fd23fdafcc29efe2fc2e |
| iOS | 1:372497650027:ios:9577eb3d3996c6b6e2fc2e |
| Web | 372497650027-ehgmgi0m3o44cjd2vl1p2c705vrrp397 |

### API Keys

| Plataforma | API Key |
|---|---|
| Android | AIzaSyBbQZNBbhI2BhAULltqLHRjTBFNenEpUt8 |
| iOS | AIzaSyDnsAaQlVvCtHMJG6omqHZ14NUyFVOHJl0 |
| Web | AIzaSyDnsAaQlVvCtHMJG6omqHZ14NUyFVOHJl0 |

---

## 🗂️ Estrutura de Dados Sincronizada

```
Firebase Realtime Database
├── users/
│   └── {uid}/
│       ├── profile/
│       │   ├── name: string
│       │   ├── email: string
│       │   ├── isPro: boolean
│       │   ├── createdAt: timestamp
│       │   └── lastLogin: timestamp
│       │
│       ├── turnos/
│       │   └── {turnoId}/
│       │       ├── data: string (ISO)
│       │       ├── horaInicio: timestamp
│       │       ├── horaFim: timestamp
│       │       ├── ganho: number
│       │       ├── km: number
│       │       ├── combustivel: number
│       │       ├── kmLitro: number
│       │       ├── status: "ativo" | "finalizado"
│       │       └── localizacoes: array
│       │
│       ├── caixinhas/
│       │   └── {caixinhaId}/
│       │       ├── nome: string
│       │       ├── tipo: "poupanca" | "investimento" | "emergencia" | "meta"
│       │       ├── saldo: number
│       │       ├── rendimento: number
│       │       ├── taxaRendimento: number
│       │       ├── criadoEm: timestamp
│       │       └── ultimaAtualizacao: timestamp
│       │
│       ├── ganhosDiarios/
│       │   └── {data}/
│       │       ├── ganho: number
│       │       ├── km: number
│       │       ├── tempo: number
│       │       ├── turnos: number
│       │       └── eficiencia: number
│       │
│       └── subscricao/
│           ├── plano: "FREE" | "PREMIUM"
│           ├── isPro: boolean
│           ├── dataUpgrade: timestamp
│           ├── dataRenovacao: timestamp
│           └── metodo: "cartao" | "pix" | "boleto" | "google_pay"
│
├── analytics/
│   └── {userId}/
│       └── {data}/
│           ├── ganhoTotal: number
│           ├── kmTotal: number
│           ├── tempoTotal: number
│           ├── turnosTotal: number
│           ├── horariosOuro: object
│           └── clima: object
│
└── config/
    ├── app_version: string
    ├── min_version: string
    ├── maintenance: boolean
    └── features: object
```

---

## 🔐 Firebase Security Rules

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        "profile": {
          ".validate": "newData.hasChildren(['name', 'email'])"
        },
        "turnos": {
          ".indexOn": ["data", "ganho", "status"],
          "$turnoId": {
            ".validate": "newData.hasChildren(['data', 'ganho', 'km'])"
          }
        },
        "caixinhas": {
          ".indexOn": ["tipo", "saldo"],
          "$caixinhaId": {
            ".validate": "newData.hasChildren(['nome', 'tipo', 'saldo'])"
          }
        },
        "ganhosDiarios": {
          ".indexOn": ["ganho"],
          "$data": {
            ".validate": "newData.hasChildren(['ganho', 'km'])"
          }
        },
        "subscricao": {
          ".validate": "newData.hasChildren(['plano', 'isPro'])"
        }
      }
    },
    "analytics": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "config": {
      ".read": true,
      ".write": false
    }
  }
}
```

---

## 🚀 Implementação por Plataforma

### Android

```kotlin
// Arquivo: google-services.json
// Localização: app/
// Sincronização automática via Firebase SDK
```

**Passos:**
1. Coloque `google-services.json` em `app/`
2. Adicione plugin: `com.google.gms.google-services`
3. Importe Firebase: `import com.google.firebase.database.FirebaseDatabase`

### iOS

```swift
// Arquivo: GoogleService-Info.plist
// Localização: Raiz do projeto
// Adicionar ao Xcode target
```

**Passos:**
1. Adicione `GoogleService-Info.plist` ao Xcode
2. Instale pods: `pod install`
3. Importe Firebase: `import Firebase`

### Web

```typescript
// Arquivo: client/src/lib/firebase.ts
// Sincronização automática via Firebase SDK
```

**Passos:**
1. Instale: `pnpm add firebase`
2. Crie `firebase.ts` com configuração
3. Use em componentes React

---

## 📊 Sincronização em Tempo Real

Todos os dados são sincronizados automaticamente:

```
Android App ←→ Firebase ←→ iOS App
              ↓
           Web App
```

**Exemplo de fluxo:**

1. Usuário cria turno no Android
2. Firebase salva e sincroniza
3. iOS recebe atualização em tempo real
4. Web App exibe dados atualizados
5. Analytics são agregados automaticamente

---

## 🔄 Offline-First Architecture

Cada plataforma suporta sincronização offline:

```typescript
// Web - IndexedDB
const offlineQueue = await getOfflineQueue();
await syncWhenOnline(offlineQueue);

// Android - SQLite
val offlineDb = Room.databaseBuilder(context, OfflineDb::class.java, "offline").build()

// iOS - Core Data
let offlineStore = NSPersistentContainer(name: "Offline")
```

---

## 🧪 Teste de Sincronização

### Android
```kotlin
val db = FirebaseDatabase.getInstance().reference
db.child("test").setValue(mapOf("timestamp" to System.currentTimeMillis()))
```

### iOS
```swift
let db = Database.database().reference()
db.child("test").setValue(["timestamp": Date().timeIntervalSince1970])
```

### Web
```typescript
import { db } from '@/lib/firebase';
import { ref, set } from 'firebase/database';
await set(ref(db, 'test'), { timestamp: Date.now() });
```

---

## 📈 Monitoramento

### Firebase Console
- https://console.firebase.google.com/project/minha-rota-42295

### Métricas Disponíveis
- ✅ Usuários ativos
- ✅ Leituras/Escritas por segundo
- ✅ Armazenamento utilizado
- ✅ Transferência de dados
- ✅ Erros e exceções

---

## 🔒 Boas Práticas de Segurança

1. **Nunca commitar credenciais** - Use `.env` para variáveis sensíveis
2. **Rotacionar API Keys** - Periodicamente no Firebase Console
3. **Usar HTTPS** - Sempre em produção
4. **Validar dados** - No backend antes de salvar
5. **Limitar acesso** - Apenas usuários autenticados
6. **Monitorar uso** - Alertas para picos anormais

---

## 📚 Documentação Relacionada

- `FIREBASE_CONFIG.md` - Guia Web/Android
- `FIREBASE_IOS_CONFIG.md` - Guia iOS
- `RENDER_ENV_GUIDE.md` - Deploy no Render
- `RENDER_CHECKLIST.md` - Checklist de deploy

---

## 🆘 Suporte

### Problemas Comuns

| Problema | Solução |
|---|---|
| Dados não sincronizam | Verifique Firebase Rules e autenticação |
| Erro "Permission denied" | Confirme UID e Firebase Rules |
| API Key inválida | Regenere no Firebase Console |
| Conexão recusada | Verifique internet e firewall |

---

**Última atualização:** 2026-06-08
**Versão:** 1.0
**Status:** ✅ Pronto para produção multi-plataforma
