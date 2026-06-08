import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Wind, Thermometer, AlertTriangle, Loader2 } from 'lucide-react';
import '../styles/weather-alerts.css';

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  alerts: WeatherAlert[];
}

interface WeatherAlert {
  type: 'chuva' | 'vento' | 'calor' | 'frio';
  intensidade: 'baixa' | 'media' | 'alta';
  mensagem: string;
  recomendacao: string;
}

interface WeatherAlertsProps {
  latitude?: number;
  longitude?: number;
}

export default function WeatherAlerts({ latitude, longitude }: WeatherAlertsProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obter clima da localização
  const obterClima = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      // Usar OpenWeatherMap API (versão gratuita)
      // Nota: Em produção, você deve usar uma chave de API real
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo';
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
      );

      if (!response.ok) {
        throw new Error('Erro ao obter dados de clima');
      }

      const data = await response.json();

      // Processar dados e gerar alertas
      const temp = data.main.temp;
      const windSpeed = data.wind.speed;
      const humidity = data.main.humidity;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;

      const alerts: WeatherAlert[] = [];

      // Alerta de chuva
      if (data.rain || data.clouds.all > 80) {
        alerts.push({
          type: 'chuva',
          intensidade: data.rain ? 'alta' : 'media',
          mensagem: 'Chuva prevista na região',
          recomendacao: 'Reduza velocidade e aumente distância de segurança',
        });
      }

      // Alerta de vento
      if (windSpeed > 30) {
        alerts.push({
          type: 'vento',
          intensidade: windSpeed > 50 ? 'alta' : 'media',
          mensagem: `Vento forte: ${windSpeed.toFixed(1)} km/h`,
          recomendacao: 'Tenha cuidado com rajadas, especialmente em curvas',
        });
      }

      // Alerta de calor
      if (temp > 35) {
        alerts.push({
          type: 'calor',
          intensidade: temp > 40 ? 'alta' : 'media',
          mensagem: `Temperatura alta: ${temp.toFixed(1)}°C`,
          recomendacao: 'Beba água regularmente e faça pausas frequentes',
        });
      }

      // Alerta de frio
      if (temp < 5) {
        alerts.push({
          type: 'frio',
          intensidade: temp < 0 ? 'alta' : 'media',
          mensagem: `Temperatura baixa: ${temp.toFixed(1)}°C`,
          recomendacao: 'Cuidado com possível gelo nas vias',
        });
      }

      setWeather({
        temp,
        feelsLike: data.main.feels_like,
        humidity,
        windSpeed,
        description,
        icon,
        alerts,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao obter clima');
      
      // Simular dados se a API falhar
      setWeather({
        temp: 28,
        feelsLike: 30,
        humidity: 65,
        windSpeed: 12,
        description: 'Parcialmente nublado',
        icon: '02d',
        alerts: [
          {
            type: 'vento',
            intensidade: 'baixa',
            mensagem: 'Vento leve na região',
            recomendacao: 'Condições normais de operação',
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  // Obter localização e clima
  useEffect(() => {
    if (latitude && longitude) {
      obterClima(latitude, longitude);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          obterClima(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Se não conseguir geolocalizar, usar localização padrão (São Paulo)
          obterClima(-23.5505, -46.6333);
        }
      );
    }
  }, [latitude, longitude]);

  const getAlertIcon = (type: WeatherAlert['type']) => {
    switch (type) {
      case 'chuva':
        return <CloudRain size={20} />;
      case 'vento':
        return <Wind size={20} />;
      case 'calor':
        return <Thermometer size={20} />;
      case 'frio':
        return <Cloud size={20} />;
      default:
        return <AlertTriangle size={20} />;
    }
  };

  const getAlertColor = (intensidade: WeatherAlert['intensidade']) => {
    switch (intensidade) {
      case 'alta':
        return 'alta';
      case 'media':
        return 'media';
      case 'baixa':
        return 'baixa';
      default:
        return 'media';
    }
  };

  return (
    <div className="weather-alerts-container">
      <div className="weather-header">
        <h3 className="weather-title">🌤️ Alertas de Clima</h3>
        <p className="weather-subtitle">Condições meteorológicas em tempo real</p>
      </div>

      {loading && (
        <div className="weather-loading">
          <Loader2 size={32} className="spinner" />
          <p>Obtendo dados de clima...</p>
        </div>
      )}

      {error && (
        <div className="weather-error">
          <AlertTriangle size={20} />
          <p>{error}</p>
        </div>
      )}

      {weather && !loading && (
        <>
          {/* Condição Atual */}
          <div className="weather-current">
            <div className="current-main">
              <Cloud size={48} className="weather-icon" />
              <div className="current-info">
                <p className="current-temp">{weather.temp.toFixed(1)}°C</p>
                <p className="current-description">{weather.description}</p>
              </div>
            </div>

            <div className="current-details">
              <div className="detail">
                <p className="detail-label">Sensação Térmica</p>
                <p className="detail-value">{weather.feelsLike.toFixed(1)}°C</p>
              </div>

              <div className="detail">
                <p className="detail-label">Umidade</p>
                <p className="detail-value">{weather.humidity}%</p>
              </div>

              <div className="detail">
                <p className="detail-label">Vento</p>
                <p className="detail-value">{weather.windSpeed.toFixed(1)} km/h</p>
              </div>
            </div>
          </div>

          {/* Alertas */}
          {weather.alerts.length > 0 && (
            <div className="weather-alerts-list">
              <h4 className="alerts-title">⚠️ Alertas Ativos</h4>

              {weather.alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`alert-item ${getAlertColor(alert.intensidade)}`}
                >
                  <div className="alert-icon">
                    {getAlertIcon(alert.type)}
                  </div>

                  <div className="alert-content">
                    <p className="alert-message">{alert.mensagem}</p>
                    <p className="alert-recommendation">{alert.recomendacao}</p>
                  </div>

                  <div className={`alert-badge ${alert.intensidade}`}>
                    {alert.intensidade === 'alta'
                      ? '🔴'
                      : alert.intensidade === 'media'
                      ? '🟡'
                      : '🟢'}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recomendações */}
          <div className="weather-recommendations">
            <h4 className="recommendations-title">💡 Recomendações</h4>
            <ul className="recommendations-list">
              {weather.temp > 30 && (
                <li>Mantenha-se hidratado durante o turno</li>
              )}
              {weather.windSpeed > 20 && (
                <li>Tenha cuidado com rajadas de vento</li>
              )}
              {weather.humidity > 80 && (
                <li>Piso pode estar escorregadio</li>
              )}
              {weather.alerts.length === 0 && (
                <li>Condições normais para operação</li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
