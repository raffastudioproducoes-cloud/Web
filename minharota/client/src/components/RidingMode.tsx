import { X } from 'lucide-react';
import '../styles/riding-mode.css';

interface RidingModeProps {
  ganhoAtual: string;
  metaDiaria: string;
  percentualMeta: number;
  onClose: () => void;
}

export default function RidingMode({
  ganhoAtual,
  metaDiaria,
  percentualMeta,
  onClose,
}: RidingModeProps) {
  return (
    <div className="riding-mode-overlay">
      <button
        className="riding-close-button"
        onClick={onClose}
        aria-label="Sair do modo Riding"
      >
        <X size={28} />
      </button>

      <div className="riding-container">
        {/* Display Gigante de Ganho */}
        <div className="riding-ganho-display">
          <p className="riding-label">Ganho Hoje</p>
          <p className="riding-value">{ganhoAtual}</p>
        </div>

        {/* Barra de Progresso da Meta */}
        <div className="riding-meta-section">
          <div className="riding-meta-info">
            <p className="riding-meta-label">Meta Diária</p>
            <p className="riding-meta-value">{metaDiaria}</p>
          </div>

          <div className="riding-progress-bar">
            <div
              className="riding-progress-fill"
              style={{ width: `${Math.min(percentualMeta, 100)}%` }}
            />
          </div>

          <p className="riding-progress-text">{percentualMeta.toFixed(0)}% da meta</p>
        </div>

        {/* Botão de Ação Gigante */}
        <button className="riding-fab-large">
          <span>Finalizar Turno</span>
        </button>
      </div>
    </div>
  );
}
