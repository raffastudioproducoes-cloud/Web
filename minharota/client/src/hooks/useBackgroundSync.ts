import { useEffect, useState } from 'react';

interface SyncTask {
  id: string;
  type: 'turno' | 'caixinha' | 'ganho';
  data: Record<string, unknown>;
  timestamp: number;
  retries: number;
}

export function useBackgroundSync() {
  const [isSupported, setIsSupported] = useState(false);
  const [pendingTasks, setPendingTasks] = useState<SyncTask[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Verificar suporte
  useEffect(() => {
    const supported =
      'serviceWorker' in navigator &&
      'SyncManager' in window &&
      'indexedDB' in window;
    setIsSupported(supported);

    if (supported) {
      loadPendingTasks();
    }
  }, []);

  // Carregar tarefas pendentes do IndexedDB
  const loadPendingTasks = async () => {
    try {
      const db = await openDatabase();
      const tx = db.transaction('syncTasks', 'readonly');
      const store = tx.objectStore('syncTasks');
      const tasks = await new Promise<SyncTask[]>((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      setPendingTasks(tasks);
    } catch (error) {
      console.error('Erro ao carregar tarefas pendentes:', error);
    }
  };

  // Abrir banco de dados IndexedDB
  const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('MinhaRotaDB', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('syncTasks')) {
          db.createObjectStore('syncTasks', { keyPath: 'id' });
        }
      };
    });
  };

  // Adicionar tarefa de sincronização
  const addSyncTask = async (
    type: SyncTask['type'],
    data: Record<string, unknown>
  ) => {
    try {
      const task: SyncTask = {
        id: `${type}-${Date.now()}`,
        type,
        data,
        timestamp: Date.now(),
        retries: 0,
      };

      // Salvar no IndexedDB
      const db = await openDatabase();
      const tx = db.transaction('syncTasks', 'readwrite');
      const store = tx.objectStore('syncTasks');

      await new Promise<void>((resolve, reject) => {
        const request = store.add(task);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      // Registrar para sincronização em background
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        const registration = await navigator.serviceWorker.ready;
        await (registration as any).sync.register(`sync-${type}`);
      }

      setPendingTasks((prev) => [...prev, task]);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar tarefa de sincronização:', error);
      return false;
    }
  };

  // Sincronizar tarefas pendentes
  const syncTasks = async () => {
    if (!pendingTasks.length) return true;

    setIsSyncing(true);

    try {
      const db = await openDatabase();
      let successCount = 0;

      for (const task of pendingTasks) {
        try {
          // Simular envio para servidor
          const response = await fetch('/api/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
          });

          if (response.ok) {
            // Remover tarefa do banco de dados
            const tx = db.transaction('syncTasks', 'readwrite');
            const store = tx.objectStore('syncTasks');

            await new Promise<void>((resolve, reject) => {
              const request = store.delete(task.id);
              request.onsuccess = () => resolve();
              request.onerror = () => reject(request.error);
            });

            successCount++;
          } else {
            // Incrementar tentativas
            task.retries++;
            if (task.retries < 3) {
              const tx = db.transaction('syncTasks', 'readwrite');
              const store = tx.objectStore('syncTasks');

              await new Promise<void>((resolve, reject) => {
                const request = store.put(task);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
              });
            }
          }
        } catch (error) {
          console.error(`Erro ao sincronizar tarefa ${task.id}:`, error);
        }
      }

      // Recarregar tarefas pendentes
      await loadPendingTasks();

      return successCount === pendingTasks.length;
    } catch (error) {
      console.error('Erro ao sincronizar tarefas:', error);
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  // Limpar tarefas sincronizadas
  const clearSyncedTasks = async () => {
    try {
      const db = await openDatabase();
      const tx = db.transaction('syncTasks', 'readwrite');
      const store = tx.objectStore('syncTasks');

      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      setPendingTasks([]);
      return true;
    } catch (error) {
      console.error('Erro ao limpar tarefas sincronizadas:', error);
      return false;
    }
  };

  // Sincronizar quando voltar online
  useEffect(() => {
    const handleOnline = () => {
      console.log('Voltou online, sincronizando...');
      syncTasks();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [pendingTasks]);

  return {
    isSupported,
    pendingTasks,
    isSyncing,
    addSyncTask,
    syncTasks,
    clearSyncedTasks,
    loadPendingTasks,
  };
}
