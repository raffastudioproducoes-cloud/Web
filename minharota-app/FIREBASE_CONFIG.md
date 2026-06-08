# 🔥 Configuração Firebase - MinhaRota

## Informações do Projeto

| Campo | Valor |
|-------|-------|
| **Project ID** | minha-rota-42295 |
| **Project Number** | 372497650027 |
| **Storage Bucket** | minha-rota-42295.firebasestorage.app |
| **Package Name** | com.raffastudioproducoes.minharota |
| **API Key** | AIzaSyBbQZNBbhI2BhAULltqLHRjTBFNenEpUt8 |

---

## 📋 Arquivos de Configuração

### ✅ google-services.json
- Arquivo de configuração Android/Firebase
- Localizado em: `/minharota-app/google-services.json`
- Contém credenciais do projeto Firebase
- **Nunca compartilhe este arquivo publicamente**

---

## 🚀 Como Integrar ao Projeto

### Passo 1: Instalar Firebase SDK

```bash
cd /home/ubuntu/minharota-app
pnpm add firebase
```

### Passo 2: Criar arquivo de inicialização

Crie `client/src/lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "minha-rota-42295",
  storageBucket: "minha-rota-42295.firebasestorage.app",
  apiKey: "AIzaSyBbQZNBbhI2BhAULltqLHRjTBFNenEpUt8",
  appId: "1:372497650027:android:80fd23fdafcc29efe2fc2e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
```

### Passo 3: Usar no Projeto

```typescript
import { db } from '@/lib/firebase';
import { ref, set, get } from 'firebase/database';

// Salvar dados
await set(ref(db, 'turnos/' + userId), {
  ganho: 150.50,
  km: 25.3,
  data: new Date().toISOString()
});

// Ler dados
const snapshot = await get(ref(db, 'turnos/' + userId));
const dados = snapshot.val();
```

---

## 🔐 Segurança

### ⚠️ Importante

1. **Nunca commit credenciais reais** - Use `.env` para variáveis sensíveis
2. **Configure Firebase Rules** - Restrinja acesso apenas a usuários autenticados
3. **Use HTTPS** - Sempre em produção
4. **Rotacione API Keys** - Periodicamente no console Firebase

### Exemplo de Firebase Rules

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

---

## 📊 Estrutura de Dados Recomendada

```
firebase
├── users/
│   └── {userId}/
│       ├── profile
│       ├── turnos/
│       │   └── {turnoId}
│       └── caixinhas/
│           └── {caixinhaId}
├── analytics/
│   └── {userId}/
│       └── {data}
└── config/
    └── app_version
```

---

## 🧪 Testando a Conexão

```typescript
import { db } from '@/lib/firebase';
import { ref, set } from 'firebase/database';

// Teste simples
try {
  await set(ref(db, 'test'), { timestamp: Date.now() });
  console.log('✅ Firebase conectado com sucesso!');
} catch (error) {
  console.error('❌ Erro ao conectar Firebase:', error);
}
```

---

## 📚 Recursos Úteis

- [Firebase Console](https://console.firebase.google.com/project/minha-rota-42295)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Realtime Database Guide](https://firebase.google.com/docs/database)
- [Authentication Guide](https://firebase.google.com/docs/auth)

---

## 🆘 Troubleshooting

### Erro: "Permission denied"
- Verifique as Firebase Rules
- Confirme que o usuário está autenticado
- Cheque o UID do usuário

### Erro: "Invalid API Key"
- Regenere a chave no Firebase Console
- Verifique se a chave está correta
- Confirme que o projeto está ativo

### Erro: "Connection refused"
- Verifique a conexão de internet
- Confirme que o Firebase está online
- Cheque se o projeto está ativo

---

**Última atualização:** 2026-06-08
**Versão:** 1.0
**Status:** ✅ Pronto para integração
