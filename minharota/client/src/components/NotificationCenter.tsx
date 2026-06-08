import { useState, useEffect } from 'react';
import { Bell, BellOff, Send, Loader2 } from 'lucide-react';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { toast } from 'sonner';
import '../styles/notification-center.css';

export default function NotificationCenter() {
  const { isSupported, isSubscribed, subscribe, unsubscribe, sendNotification } =
    usePushNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [showTestForm, setShowTestForm] = useState(false);
  const [testTitle, setTestTitle] = useState('MinhaRota');
  const [testBody, setTestBody] = useState('Teste de notificação');

  const handleToggleNotifications = async () => {
    setIsLoading(true);

    try {
      if (isSubscribed) {
        const success = await unsubscribe();
        if (success) {
          toast.success('Notificações desativadas');
        } else {
          toast.error('Erro ao desativar notificações');
        }
      } else {
        const success = await subscribe();
        if (success) {
          toast.success('Notificações ativadas com sucesso!');
        } else {
          toast.error('Erro ao ativar notificações');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTestNotification = async () => {
    setIsLoading(true);

    try {
      const success = await sendNotification({
        title: testTitle,
        body: testBody,
        icon: '/logo-192.png',
        requireInteraction: false,
        actions: [
          { action: 'open', title: 'Abrir' },
          { action: 'close', title: 'Fechar' },
        ],
      });

      if (success) {
        toast.success('Notificação enviada!');
        setShowTestForm(false);
      } else {
        toast.error('Erro ao enviar notificação');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="notification-center">
        <div className="notification-unsupported">
          <BellOff size={32} />
          <p>Web Push Notifications não suportado neste navegador</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h3 className="notification-title">🔔 Central de Notificações</h3>
        <p className="notification-subtitle">Gerencie suas notificações push</p>
      </div>

      {/* Status */}
      <div className={`notification-status ${isSubscribed ? 'ativo' : 'inativo'}`}>
        <div className="status-indicator">
          {isSubscribed ? (
            <>
              <Bell size={20} className="status-icon ativo" />
              <span className="status-text">Notificações Ativadas</span>
            </>
          ) : (
            <>
              <BellOff size={20} className="status-icon inativo" />
              <span className="status-text">Notificações Desativadas</span>
            </>
          )}
        </div>
      </div>

      {/* Botão Toggle */}
      <button
        className={`notification-toggle ${isSubscribed ? 'desativar' : 'ativar'}`}
        onClick={handleToggleNotifications}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="spinner" />
            Processando...
          </>
        ) : isSubscribed ? (
          <>
            <BellOff size={18} />
            Desativar Notificações
          </>
        ) : (
          <>
            <Bell size={18} />
            Ativar Notificações
          </>
        )}
      </button>

      {/* Benefícios */}
      <div className="notification-benefits">
        <h4 className="benefits-title">✨ Benefícios</h4>
        <ul className="benefits-list">
          <li>📊 Alertas de meta diária atingida</li>
          <li>🌧️ Notificações de clima adverso</li>
          <li>📈 Picos de demanda na sua região</li>
          <li>💰 Oportunidades de ganho</li>
          <li>⏰ Lembretes de pausa</li>
          <li>🎯 Atualizações de funcionalidades</li>
        </ul>
      </div>

      {/* Teste de Notificação */}
      {isSubscribed && (
        <div className="notification-test">
          <button
            className="test-button"
            onClick={() => setShowTestForm(!showTestForm)}
          >
            {showTestForm ? 'Cancelar' : 'Enviar Notificação de Teste'}
          </button>

          {showTestForm && (
            <div className="test-form">
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  placeholder="Título da notificação"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label>Mensagem</label>
                <textarea
                  value={testBody}
                  onChange={(e) => setTestBody(e.target.value)}
                  placeholder="Corpo da notificação"
                  disabled={isLoading}
                  rows={3}
                />
              </div>

              <button
                className="send-button"
                onClick={handleSendTestNotification}
                disabled={isLoading || !testTitle || !testBody}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="spinner" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Enviar Teste
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Informações */}
      <div className="notification-info">
        <p className="info-title">💡 Informações:</p>
        <ul className="info-list">
          <li>Notificações funcionam mesmo com o app fechado</li>
          <li>Você pode desativar a qualquer momento</li>
          <li>Funciona offline com sincronização posterior</li>
          <li>Compatível com iOS 16+, Android 6+</li>
        </ul>
      </div>
    </div>
  );
}
