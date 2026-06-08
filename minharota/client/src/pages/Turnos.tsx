import { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { Clock, Play, Square, TrendingUp } from 'lucide-react';
import '../styles/turnos.css';

export default function Turnos() {
  const [quilometros, setQuilometros] = useState('');
  const [ganho, setGanho] = useState('');
  const [combustivel, setCombustivel] = useState('');

  // Queries
  const turnosQuery = trpc.turnos.list.useQuery({ limit: 10 });
  const ativoQuery = trpc.turnos.getAtivo.useQuery();

  // Mutations
  const criarMutation = trpc.turnos.criar.useMutation({
    onSuccess: () => {
      turnosQuery.refetch();
      ativoQuery.refetch();
    },
  });

  const finalizarMutation = trpc.turnos.finalizar.useMutation({
    onSuccess: () => {
      turnosQuery.refetch();
      ativoQuery.refetch();
      setQuilometros('');
      setGanho('');
      setCombustivel('');
    },
  });

  const handleIniciarTurno = () => {
    criarMutation.mutate();
  };

  const handleFinalizarTurno = () => {
    if (!ativoQuery.data) return;

    finalizarMutation.mutate({
      turnoId: ativoQuery.data.id,
      quilometrosRodados: parseFloat(quilometros) || 0,
      ganhoTurno: parseFloat(ganho) || 0,
      gastosCombustivel: parseFloat(combustivel) || 0,
    });
  };

  const turnoAtivo = ativoQuery.data;
  const turnos = turnosQuery.data || [];

  return (
    <MainLayout>
      <div className="turnos-container">
        <div className="turnos-header">
          <h1 className="turnos-title">Meus Turnos</h1>
          <p className="turnos-subtitle">Registre e acompanhe seus turnos de trabalho</p>
        </div>

        {/* Turno Ativo */}
        <div className="turno-ativo-section">
          {turnoAtivo ? (
            <div className="turno-ativo-card">
              <div className="turno-ativo-header">
                <div className="turno-status-badge">
                  <span className="status-dot"></span>
                  Turno Ativo
                </div>
                <Clock size={20} />
              </div>

              <div className="turno-ativo-content">
                <p className="turno-ativo-label">Iniciado em:</p>
                <p className="turno-ativo-time">
                  {new Date(turnoAtivo.dataInicio).toLocaleTimeString('pt-BR')}
                </p>

                <div className="turno-inputs">
                  <div className="input-group">
                    <label htmlFor="quilometros">Quilômetros Rodados</label>
                    <input
                      id="quilometros"
                      type="number"
                      step="0.1"
                      value={quilometros}
                      onChange={(e) => setQuilometros(e.target.value)}
                      placeholder="0.0"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="ganho">Ganho (R$)</label>
                    <input
                      id="ganho"
                      type="number"
                      step="0.01"
                      value={ganho}
                      onChange={(e) => setGanho(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="combustivel">Combustível (R$)</label>
                    <input
                      id="combustivel"
                      type="number"
                      step="0.01"
                      value={combustivel}
                      onChange={(e) => setCombustivel(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleFinalizarTurno}
                  disabled={finalizarMutation.isPending}
                  className="turno-finalizar-button"
                >
                  <Square size={18} />
                  {finalizarMutation.isPending ? 'Finalizando...' : 'Finalizar Turno'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="turno-inativo-card">
              <div className="turno-inativo-content">
                <Play size={32} />
                <p className="turno-inativo-text">Nenhum turno ativo</p>
                <p className="turno-inativo-subtitle">Clique abaixo para iniciar um novo turno</p>
              </div>

              <Button
                onClick={handleIniciarTurno}
                disabled={criarMutation.isPending}
                className="turno-iniciar-button"
              >
                {criarMutation.isPending ? 'Iniciando...' : 'Iniciar Turno'}
              </Button>
            </div>
          )}
        </div>

        {/* Histórico de Turnos */}
        <div className="turnos-historico">
          <h2 className="historico-title">Histórico de Turnos</h2>

          {turnosQuery.isLoading ? (
            <div className="loading-state">Carregando turnos...</div>
          ) : turnos.length === 0 ? (
            <div className="empty-state">
              <TrendingUp size={32} />
              <p>Nenhum turno registrado ainda</p>
            </div>
          ) : (
            <div className="turnos-list">
              {turnos.map((turno) => (
                <div key={turno.id} className="turno-item">
                  <div className="turno-item-header">
                    <div className="turno-item-date">
                      {new Date(turno.dataInicio).toLocaleDateString('pt-BR')}
                    </div>
                    <div className={`turno-item-status ${turno.status}`}>
                      {turno.status === 'finalizado' ? '✓ Finalizado' : '● Ativo'}
                    </div>
                  </div>

                  <div className="turno-item-details">
                    <div className="detail">
                      <span className="detail-label">Horário:</span>
                      <span className="detail-value">
                        {new Date(turno.dataInicio).toLocaleTimeString('pt-BR')}
                        {turno.dataFim && ` - ${new Date(turno.dataFim).toLocaleTimeString('pt-BR')}`}
                      </span>
                    </div>

                    <div className="detail">
                      <span className="detail-label">KM:</span>
                      <span className="detail-value">{turno.quilometrosRodados} km</span>
                    </div>

                    <div className="detail">
                      <span className="detail-label">Ganho:</span>
                      <span className="detail-value">R$ {turno.ganhoTurno}</span>
                    </div>

                    <div className="detail">
                      <span className="detail-label">Combustível:</span>
                      <span className="detail-value">R$ {turno.gastosCombustivel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
