import { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import HeatmapChart from '@/components/HeatmapChart';
import { Cloud, CloudRain, Sun, Wind, AlertCircle } from 'lucide-react';
import '../styles/analytics.css';

interface WeatherAlert {
  id: string;
  tipo: 'rain' | 'wind' | 'heat' | 'cold';
  titulo: string;
  descricao: string;
  intensidade: 'baixa' | 'média' | 'alta';
  timestamp: Date;
}

interface MetaData {
  diaria: number;
  semanal: number;
  mensal: number;
  atingida: boolean;
}

export default function Analytics() {
  const [weatherAlerts, setWeatherAlerts] = useState<WeatherAlert[]>([]);
  const [metaData, setMetaData] = useState<MetaData>({
    diaria: 150,
    semanal: 1050,
    mensal: 4500,
    atingida: true,
  });

  // Simular alertas de clima
  useEffect(() => {
    const alerts: WeatherAlert[] = [
      {
        id: '1',
        tipo: 'rain',
        titulo: 'Chuva Moderada',
        descricao: 'Possibilidade de chuva nos próximos 2-3 horas',
        intensidade: 'média',
        timestamp: new Date(),
      },
      {
        id: '2',
        tipo: 'wind',
        titulo: 'Ventos Fortes',
        descricao: 'Rajadas de vento até 40 km/h',
        intensidade: 'alta',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: '3',
        tipo: 'heat',
        titulo: 'Calor Intenso',
        descricao: 'Temperatura máxima de 35°C',
        intensidade: 'média',
        timestamp: new Date(Date.now() - 7200000),
      },
    ];

    setWeatherAlerts(alerts);
  }, []);

  const getWeatherIcon = (tipo: string) => {
    switch (tipo) {
      case 'rain':
        return <CloudRain size={20} />;
      case 'wind':
        return <Wind size={20} />;
      case 'heat':
        return <Sun size={20} />;
      default:
        return <Cloud size={20} />;
    }
  };

  const getIntensidadeColor = (intensidade: string) => {
    switch (intensidade) {
      case 'baixa':
        return 'baixa';
      case 'média':
        return 'media';
      case 'alta':
        return 'alta';
      default:
        return 'media';
    }
  };

  return (
    <MainLayout>
      <div className="analytics-container">
        <div className="analytics-header">
          <h1 className="analytics-title">Smart Analytics</h1>
          <p className="analytics-subtitle">Análise inteligente de seus ganhos e horários</p>
        </div>

        {/* Metas */}
        <div className="metas-section">
          <h2 className="section-title">Metas</h2>

          <div className="metas-grid">
            <div className="meta-card">
              <p className="meta-label">Meta Diária</p>
              <p className="meta-value">R$ {metaData.diaria}</p>
              <div className="meta-progress">
                <div className="meta-bar" style={{ width: '100%' }}></div>
              </div>
              <p className="meta-status">✓ Atingida</p>
            </div>

            <div className="meta-card">
              <p className="meta-label">Meta Semanal</p>
              <p className="meta-value">R$ {metaData.semanal}</p>
              <div className="meta-progress">
                <div className="meta-bar" style={{ width: '75%' }}></div>
              </div>
              <p className="meta-status">75% atingida</p>
            </div>

            <div className="meta-card">
              <p className="meta-label">Meta Mensal</p>
              <p className="meta-value">R$ {metaData.mensal}</p>
              <div className="meta-progress">
                <div className="meta-bar" style={{ width: '60%' }}></div>
              </div>
              <p className="meta-status">60% atingida</p>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="heatmap-section">
          <HeatmapChart />
        </div>

        {/* Alertas de Clima */}
        <div className="weather-section">
          <h2 className="section-title">
            <AlertCircle size={20} />
            Alertas de Clima
          </h2>

          {weatherAlerts.length === 0 ? (
            <div className="empty-alerts">
              <Sun size={32} />
              <p>Nenhum alerta de clima no momento</p>
            </div>
          ) : (
            <div className="alerts-list">
              {weatherAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`alert-item alert-${getIntensidadeColor(alert.intensidade)}`}
                >
                  <div className="alert-icon">{getWeatherIcon(alert.tipo)}</div>

                  <div className="alert-content">
                    <p className="alert-titulo">{alert.titulo}</p>
                    <p className="alert-descricao">{alert.descricao}</p>
                    <p className="alert-tempo">
                      {new Date(alert.timestamp).toLocaleTimeString('pt-BR')}
                    </p>
                  </div>

                  <div className={`alert-badge ${getIntensidadeColor(alert.intensidade)}`}>
                    {alert.intensidade.charAt(0).toUpperCase() + alert.intensidade.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recomendações */}
        <div className="recommendations-section">
          <h2 className="section-title">📋 Recomendações</h2>

          <div className="recommendations-grid">
            <div className="recommendation-card">
              <h3>Melhor Horário para Trabalhar</h3>
              <p className="recommendation-value">18h - 22h</p>
              <p className="recommendation-desc">Pico de demanda com melhor rentabilidade</p>
            </div>

            <div className="recommendation-card">
              <h3>Dia Mais Lucrativo</h3>
              <p className="recommendation-value">Sexta-feira</p>
              <p className="recommendation-desc">Maior volume de corridas e ganhos</p>
            </div>

            <div className="recommendation-card">
              <h3>Meta Recomendada</h3>
              <p className="recommendation-value">R$ 200</p>
              <p className="recommendation-desc">Baseado em seu histórico de ganhos</p>
            </div>

            <div className="recommendation-card">
              <h3>Economia Estimada</h3>
              <p className="recommendation-value">R$ 450/mês</p>
              <p className="recommendation-desc">Combustível economizado com otimização</p>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="stats-section">
          <h2 className="section-title">📊 Estatísticas</h2>

          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Ganho Médio/Dia</p>
              <p className="stat-value">R$ 185</p>
              <p className="stat-change">↑ 12% vs semana anterior</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Km Médio/Dia</p>
              <p className="stat-value">45 km</p>
              <p className="stat-change">↓ 3% vs semana anterior</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Eficiência</p>
              <p className="stat-value">R$ 4,10/km</p>
              <p className="stat-change">↑ 8% vs semana anterior</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Tempo Médio</p>
              <p className="stat-value">8h 30m</p>
              <p className="stat-change">→ Sem variação</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
