# 🍎 Configuração Firebase iOS - MinhaRota

## Informações do Projeto iOS

| Campo | Valor |
|-------|-------|
| **Bundle ID** | com.raffastudioproducoes.minharota |
| **Project ID** | minha-rota-42295 |
| **Google App ID** | 1:372497650027:ios:9577eb3d3996c6b6e2fc2e |
| **Client ID** | 372497650027-ehgmgi0m3o44cjd2vl1p2c705vrrp397.apps.googleusercontent.com |
| **Storage Bucket** | minha-rota-42295.firebasestorage.app |
| **GCM Sender ID** | 372497650027 |

---

## 📋 Arquivos de Configuração

### ✅ GoogleService-Info.plist
- Arquivo de configuração iOS/Firebase
- Localizado em: `/minharota-app/GoogleService-Info.plist`
- Contém credenciais do projeto Firebase para iOS
- **Nunca compartilhe este arquivo publicamente**

### ✅ google-services.json
- Arquivo de configuração Android/Firebase
- Localizado em: `/minharota-app/google-services.json`
- Contém credenciais do projeto Firebase para Android

---

## 🚀 Como Integrar ao Projeto iOS

### Passo 1: Instalar Firebase SDK (CocoaPods)

```bash
# No diretório do projeto iOS
pod install
```

### Passo 2: Adicionar GoogleService-Info.plist ao Xcode

1. Abra seu projeto no Xcode
2. Clique em "File" → "Add Files to Project"
3. Selecione `GoogleService-Info.plist`
4. Certifique-se de que está marcado "Copy items if needed"
5. Selecione seu target
6. Clique em "Add"

### Passo 3: Importar Firebase no AppDelegate

```swift
import Firebase

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        FirebaseApp.configure()
        return true
    }
}
```

### Passo 4: Usar Firebase no Projeto

```swift
import Firebase

// Autenticação
let auth = Auth.auth()

// Realtime Database
let db = Database.database().reference()

// Cloud Storage
let storage = Storage.storage().reference()

// Firestore
let firestore = Firestore.firestore()
```

---

## 🔐 Configuração de Segurança

### Firebase Rules para iOS

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        "turnos": {
          ".indexOn": ["data", "ganho"]
        },
        "caixinhas": {
          ".indexOn": ["tipo", "saldo"]
        }
      }
    }
  }
}
```

---

## 📊 Estrutura de Dados para iOS

```
Firebase Realtime Database
├── users/
│   └── {uid}/
│       ├── profile/
│       │   ├── name
│       │   ├── email
│       │   └── isPro
│       ├── turnos/
│       │   └── {turnoId}/
│       │       ├── data
│       │       ├── ganho
│       │       ├── km
│       │       └── combustivel
│       └── caixinhas/
│           └── {caixinhaId}/
│               ├── tipo
│               ├── saldo
│               └── rendimento
```

---

## 🧪 Testando a Conexão iOS

```swift
import Firebase

func testFirebaseConnection() {
    let db = Database.database().reference()
    
    db.child("test").setValue(["timestamp": Date().timeIntervalSince1970]) { error, _ in
        if let error = error {
            print("❌ Erro ao conectar Firebase: \(error.localizedDescription)")
        } else {
            print("✅ Firebase conectado com sucesso!")
        }
    }
}
```

---

## 📱 Funcionalidades iOS Habilitadas

| Funcionalidade | Status |
|---|---|
| Sign In | ✅ Ativado |
| GCM (Push Notifications) | ✅ Ativado |
| App Invites | ✅ Ativado |
| Analytics | ⚠️ Desativado |
| Ads | ⚠️ Desativado |

---

## 🔄 Sincronização Android ↔️ iOS

Ambas as plataformas compartilham o mesmo Firebase Project:

```
Project: minha-rota-42295
├── Android (google-services.json)
│   └── Package: com.raffastudioproducoes.minharota
├── iOS (GoogleService-Info.plist)
│   └── Bundle ID: com.raffastudioproducoes.minharota
└── Web (firebase.ts)
    └── Project ID: minha-rota-42295
```

**Dados sincronizados em tempo real entre todas as plataformas!**

---

## 📚 Recursos Úteis

- [Firebase Console](https://console.firebase.google.com/project/minha-rota-42295)
- [Firebase iOS Documentation](https://firebase.google.com/docs/ios/setup)
- [Realtime Database for iOS](https://firebase.google.com/docs/database/ios/start)
- [Authentication for iOS](https://firebase.google.com/docs/auth/ios/start)
- [Cloud Storage for iOS](https://firebase.google.com/docs/storage/ios/start)

---

## 🆘 Troubleshooting iOS

### Erro: "GoogleService-Info.plist not found"
- Verifique se o arquivo está no diretório raiz do projeto
- Confirme que está adicionado ao target correto no Xcode
- Limpe o build: Cmd+Shift+K

### Erro: "FirebaseApp.configure() not called"
- Adicione `FirebaseApp.configure()` no AppDelegate
- Importe Firebase: `import Firebase`
- Verifique se o arquivo plist está correto

### Erro: "Permission denied"
- Verifique as Firebase Rules
- Confirme que o usuário está autenticado
- Cheque o UID do usuário

### Erro: "Invalid API Key"
- Regenere a chave no Firebase Console
- Verifique se a chave está correta
- Confirme que o projeto está ativo

---

## 🔗 Integração com Web App

O MinhaRota Web App usa a mesma configuração Firebase:

```typescript
// client/src/lib/firebase.ts
const firebaseConfig = {
  projectId: "minha-rota-42295",
  storageBucket: "minha-rota-42295.firebasestorage.app",
  apiKey: "AIzaSyDnsAaQlVvCtHMJG6omqHZ14NUyFVOHJl0",
  appId: "1:372497650027:ios:9577eb3d3996c6b6e2fc2e"
};
```

**Todos os dados são sincronizados em tempo real!**

---

**Última atualização:** 2026-06-08
**Versão:** 1.0
**Status:** ✅ Pronto para integração iOS
