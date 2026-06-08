import { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import PaywallModal from '@/components/PaywallModal';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Crown, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import '../styles/settings.css';

export default function Settings() {
  const [showPaywall, setShowPaywall] = useState(false);
  const userQuery = trpc.auth.me.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      window.location.href = '/';
    },
  });

  const user = userQuery.data;
  const isPro = user?.isPro || false;

  const handleUpgradeSuccess = () => {
    // Refetch do usuário para atualizar isPro
    userQuery.refetch();
  };

  return (
    <MainLayout>
      <div className="settings-container">
        <div className="settings-header">
          <h1 className="settings-title">Configurações</h1>
          <p className="settings-subtitle">Gerencie sua conta e preferências</p>
        </div>

        {/* Seção de Plano */}
        <div className="settings-section">
          <h2 className="section-title">Plano Atual</h2>

          <div className={`plan-card ${isPro ? 'premium' : 'free'}`}>
            <div className="plan-header">
              <div className="plan-info">
                <h3 className="plan-name">{isPro ? 'Premium' : 'Free'}</h3>
                <p className="plan-description">
                  {isPro
                    ? 'Você tem acesso a todas as funcionalidades'
                    : 'Upgrade para desbloquear funcionalidades premium'}
                </p>
              </div>
              {isPro && <Crown size={32} className="plan-icon" />}
            </div>

            {!isPro && (
              <Button
                onClick={() => setShowPaywall(true)}
                className="upgrade-button"
              >
                Fazer Upgrade
              </Button>
            )}

            {isPro && (
              <div className="plan-benefits">
                <p className="benefits-title">Benefícios inclusos:</p>
                <ul className="benefits-list">
                  <li>✓ Caixinhas ilimitadas</li>
                  <li>✓ Rendimento simulado</li>
                  <li>✓ Analytics avançados</li>
                  <li>✓ Suporte prioritário</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Seção de Notificações */}
        <div className="settings-section">
          <h2 className="section-title">Notificações</h2>

          <div className="settings-item">
            <div className="item-header">
              <Bell size={20} />
              <div className="item-content">
                <p className="item-title">Alertas de Meta Diária</p>
                <p className="item-description">Notificação quando atingir a meta</p>
              </div>
            </div>
            <input type="checkbox" className="toggle-switch" defaultChecked />
          </div>

          <div className="settings-item">
            <div className="item-header">
              <Bell size={20} />
              <div className="item-content">
                <p className="item-title">Alertas de Clima</p>
                <p className="item-description">Notificação sobre picos de demanda</p>
              </div>
            </div>
            <input type="checkbox" className="toggle-switch" defaultChecked />
          </div>

          <div className="settings-item">
            <div className="item-header">
              <Bell size={20} />
              <div className="item-content">
                <p className="item-title">Atualizações do App</p>
                <p className="item-description">Novidades e melhorias</p>
              </div>
            </div>
            <input type="checkbox" className="toggle-switch" defaultChecked />
          </div>
        </div>

        {/* Seção de Privacidade */}
        <div className="settings-section">
          <h2 className="section-title">Privacidade e Segurança</h2>

          <div className="settings-item">
            <div className="item-header">
              <Shield size={20} />
              <div className="item-content">
                <p className="item-title">Autenticação de Dois Fatores</p>
                <p className="item-description">Aumente a segurança da sua conta</p>
              </div>
            </div>
            <Button className="item-button">Configurar</Button>
          </div>

          <div className="settings-item">
            <div className="item-header">
              <Shield size={20} />
              <div className="item-content">
                <p className="item-title">Dados Pessoais</p>
                <p className="item-description">Visualize e edite seus dados</p>
              </div>
            </div>
            <Button className="item-button">Editar</Button>
          </div>
        </div>

        {/* Seção de Ajuda */}
        <div className="settings-section">
          <h2 className="section-title">Ajuda e Suporte</h2>

          <div className="settings-item">
            <div className="item-header">
              <HelpCircle size={20} />
              <div className="item-content">
                <p className="item-title">Central de Ajuda</p>
                <p className="item-description">Dúvidas frequentes e tutoriais</p>
              </div>
            </div>
            <Button className="item-button">Acessar</Button>
          </div>

          <div className="settings-item">
            <div className="item-header">
              <HelpCircle size={20} />
              <div className="item-content">
                <p className="item-title">Contatar Suporte</p>
                <p className="item-description">Fale com nosso time</p>
              </div>
            </div>
            <Button className="item-button">Enviar Mensagem</Button>
          </div>
        </div>

        {/* Seção de Conta */}
        <div className="settings-section">
          <h2 className="section-title">Conta</h2>

          <div className="settings-item">
            <div className="item-header">
              <LogOut size={20} />
              <div className="item-content">
                <p className="item-title">Sair da Conta</p>
                <p className="item-description">Desconecte-se do MinhaRota</p>
              </div>
            </div>
            <Button
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className="item-button logout"
            >
              {logoutMutation.isPending ? 'Saindo...' : 'Sair'}
            </Button>
          </div>
        </div>

        {/* Informações */}
        <div className="settings-info">
          <p className="info-version">MinhaRota v1.0.0</p>
          <p className="info-text">Desenvolvido por Raffa Studio Produções</p>
        </div>
      </div>

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onUpgradeSuccess={handleUpgradeSuccess}
      />
    </MainLayout>
  );
}
