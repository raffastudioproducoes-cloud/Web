import { useMemo } from 'react';
import '../styles/heatmap.css';

interface HeatmapData {
  hora: number; // 0-23
  dia: number; // 0-6 (segunda-domingo)
  valor: number; // 0-100
}

interface HeatmapChartProps {
  data?: HeatmapData[];
  title?: string;
}

const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
const horas = Array.from({ length: 24 }, (_, i) => `${i}h`);

// Gerar dados mock realistas
const gerarDadosMock = (): HeatmapData[] => {
  const dados: HeatmapData[] = [];

  for (let dia = 0; dia < 7; dia++) {
    for (let hora = 0; hora < 24; hora++) {
      let valor = 20; // Base

      // Picos de demanda
      if (hora >= 7 && hora <= 9) valor += 30; // Manhã
      if (hora >= 12 && hora <= 14) valor += 25; // Almoço
      if (hora >= 17 && hora <= 22) valor += 40; // Noite (pico)

      // Fins de semana têm padrão diferente
      if (dia >= 5) {
        if (hora >= 10 && hora <= 12) valor += 20;
        if (hora >= 18 && hora <= 23) valor += 35;
      }

      // Adicionar variação
      valor += Math.random() * 15 - 7.5;
      valor = Math.max(0, Math.min(100, valor));

      dados.push({ hora, dia, valor: Math.round(valor) });
    }
  }

  return dados;
};

const getCorParaValor = (valor: number): string => {
  if (valor < 20) return '#0f172a'; // Muito escuro
  if (valor < 35) return '#1e3a8a'; // Azul escuro
  if (valor < 50) return '#3b82f6'; // Azul
  if (valor < 65) return '#10b981'; // Verde
  if (valor < 80) return '#f59e0b'; // Laranja
  return '#ef4444'; // Vermelho (pico)
};

export default function HeatmapChart({ data, title = 'Horários de Ouro (7×24)' }: HeatmapChartProps) {
  const chartData = useMemo(() => data || gerarDadosMock(), [data]);

  const dataMap = new Map(
    chartData.map((d) => [`${d.dia}-${d.hora}`, d.valor])
  );

  const getValor = (dia: number, hora: number) => {
    return dataMap.get(`${dia}-${hora}`) || 0;
  };

  const maxValor = Math.max(...chartData.map((d) => d.valor));

  return (
    <div className="heatmap-container">
      <h3 className="heatmap-title">{title}</h3>

      <div className="heatmap-wrapper">
        <div className="heatmap-labels-hora">
          <div className="heatmap-corner"></div>
          {horas.map((hora, i) => (
            <div key={i} className="heatmap-label-hora">
              {hora}
            </div>
          ))}
        </div>

        <div className="heatmap-content">
          {dias.map((dia, diaIdx) => (
            <div key={diaIdx} className="heatmap-row">
              <div className="heatmap-label-dia">{dia}</div>
              <div className="heatmap-cells">
                {horas.map((_, horaIdx) => {
                  const valor = getValor(diaIdx, horaIdx);
                  const cor = getCorParaValor(valor);
                  const percentual = (valor / maxValor) * 100;

                  return (
                    <div
                      key={`${diaIdx}-${horaIdx}`}
                      className="heatmap-cell"
                      style={{ backgroundColor: cor }}
                      title={`${dia} ${horaIdx}h: ${valor}% de demanda`}
                    >
                      <span className="heatmap-cell-value">{valor}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legenda */}
      <div className="heatmap-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#0f172a' }}></div>
          <span>Baixa (0-20%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#1e3a8a' }}></div>
          <span>Média-Baixa (20-35%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
          <span>Média (35-50%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
          <span>Média-Alta (50-65%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
          <span>Alta (65-80%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
          <span>Muito Alta (80-100%)</span>
        </div>
      </div>

      {/* Insights */}
      <div className="heatmap-insights">
        <h4 className="insights-title">📊 Insights</h4>
        <ul className="insights-list">
          <li>Picos de demanda: 18h-22h (noite)</li>
          <li>Melhor rentabilidade: Sexta a Domingo</li>
          <li>Horários intermediários: 7h-9h e 12h-14h</li>
          <li>Meta diária recomendada: Trabalhe nos horários vermelhos</li>
        </ul>
      </div>
    </div>
  );
}
