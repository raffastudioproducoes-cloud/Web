import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/MainLayout';
import GlassmorphismCard from '@/components/GlassmorphismCard';
import RidingMode from '@/components/RidingMode';
import { TrendingUp, Target, Wallet, Zap } from 'lucide-react';
import '../styles/dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [isRidingMode, setIsRidingMode] = useState(false);

  // Mock data - será substituído por dados reais do banco
  const ganhoHoje = 'R$ 245,50';
  const metaDiaria = 'R$ 300,00';
  const percentualMeta = 81.8;
  const saldoTotal = 'R$ 1.250,00';
  const caixinhasAtivas = 3;

  if (isRidingMode) {
    return (
      <RidingMode
        ganhoAtual={ganhoHoje}
        metaDiaria={metaDiaria}
        percentualMeta={percentualMeta}
        onClose={() => setIsRidingMode(false)}
      />
    );
  }

  return (
    <MainLayout>
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Bem-vindo, {user?.name?.split(' ')[0]}!</h1>
            <p className="dashboard-subtitle">Acompanhe seus ganhos em tempo real</p>
          </div>
          <Button onClick={() => logout()} variant="outline" size="sm">
            Sair
          </Button>
        </div>

        {/* Cards Principais */}
        <div className="dashboard-cards-grid">
          <GlassmorphismCard
            title="Ganho Hoje"
            value={ganhoHoje}
            subtitle="Em tempo real"
            icon={<TrendingUp size={24} />}
            variant="success"
          />

          <GlassmorphismCard
            title="Meta Diária"
            value={metaDiaria}
            subtitle={`${percentualMeta.toFixed(0)}% atingido`}
            icon={<Target size={24} />}
            variant="info"
          />

          <GlassmorphismCard
            title="Saldo Total"
            value={saldoTotal}
            subtitle="Em suas caixinhas"
            icon={<Wallet size={24} />}
            variant="success"
          />

          <GlassmorphismCard
            title="Caixinhas Ativas"
            value={caixinhasAtivas.toString()}
            subtitle="Limite: 3 (FREE)"
            icon={<Zap size={24} />}
            variant="warning"
          />
        </div>

        {/* Barra de Progresso da Meta */}
        <div className="dashboard-progress-section">
          <div className="progress-header">
            <h3 className="progress-title">Progresso da Meta</h3>
            <span className="progress-percentage">{percentualMeta.toFixed(0)}%</span>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(percentualMeta, 100)}%` }}
              />
            </div>
          </div>

          <div className="progress-info">
            <p className="progress-current">Ganho: {ganhoHoje}</p>
            <p className="progress-remaining">Faltam: R$ 54,50</p>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="dashboard-actions">
          <h3 className="actions-title">Ações Rápidas</h3>

          <div className="actions-grid">
            <Button
              onClick={() => setIsRidingMode(true)}
              className="action-button riding-button"
            >
              <span className="button-icon">🎯</span>
              <span>Modo Riding</span>
            </Button>

            <Button
              className="action-button turnos-button"
            >
              <span className="button-icon">⏱️</span>
              <span>Iniciar Turno</span>
            </Button>

            <Button
              className="action-button caixinhas-button"
            >
              <span className="button-icon">💰</span>
              <span>Depositar</span>
            </Button>

            <Button
              className="action-button analytics-button"
            >
              <span className="button-icon">📊</span>
              <span>Analytics</span>
            </Button>
          </div>
        </div>

        {/* Seção de Dicas */}
        <div className="dashboard-tips">
          <h3 className="tips-title">💡 Dica do Dia</h3>
          <p className="tips-text">
            Os horários entre 18h e 22h são seus melhores horários. Aumente sua presença nesse período para maximizar seus ganhos!
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
