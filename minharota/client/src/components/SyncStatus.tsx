import { useEffect, useState } from 'react';
import { Wifi, WifiOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useBackgroundSync } from '@/hooks/useBackgroundSync';
import '../styles/sync-status.css';

export default function SyncStatus() {
  const { pendingTasks, isSyncing, syncTasks } = useBackgroundSync();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState<number | null>(null);

  // Monitorar status de conexão
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sincronizar quando voltar online
  useEffect(() => {
    if (isOnline && pendingTasks.length > 0 && !isSyncing) {
      const timer = setTimeout(() => {
        syncTasks();
        setLastSync(Date.now());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOnline, pendingTasks.length, isSyncing, syncTasks]);

  const getLastSyncText = () => {
    if (!lastSync) return 'Nunca sincronizado';

    const diff = Date.now() - lastSync;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `Há ${hours}h`;
    if (minutes > 0) return `Há ${minutes}m`;
    if (seconds > 0) return `Há ${seconds}s`;
    return 'Agora';
  };

  return (
    <div className={`sync-status ${isOnline ? 'online' : 'offline'}`}>
      <div className="sync-indicator">
        {isOnline ? (
          <>
            <Wifi size={16} className="status-icon online" />
            <span className="status-text">Online</span>
          </>
        ) : (
          <>
            <WifiOff size={16} className="status-icon offline" />
            <span className="status-text">Offline</span>
          </>
        )}
      </div>

      {pendingTasks.length > 0 && (
        <div className="sync-info">
          {isSyncing ? (
            <>
              <Loader2 size={14} className="spinner" />
              <span className="sync-text">Sincronizando...</span>
            </>
          ) : isOnline ? (
            <>
              <CheckCircle size={14} className="success" />
              <span className="sync-text">
                {pendingTasks.length} item(ns) sincronizado(s)
              </span>
            </>
          ) : (
            <>
              <AlertCircle size={14} className="warning" />
              <span className="sync-text">
                {pendingTasks.length} item(ns) aguardando sincronização
              </span>
            </>
          )}
        </div>
      )}

      {lastSync && (
        <div className="sync-time">
          <span className="time-label">Última sincronização:</span>
          <span className="time-value">{getLastSyncText()}</span>
        </div>
      )}
    </div>
  );
}
