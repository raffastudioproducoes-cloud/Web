import '../styles/glassmorphism.css';

interface GlassmorphismCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export default function GlassmorphismCard({
  title,
  value,
  subtitle,
  icon,
  onClick,
  className = '',
  variant = 'default',
}: GlassmorphismCardProps) {
  return (
    <div
      className={`glassmorphism-card glassmorphism-${variant} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="card-content">
        {icon && <div className="card-icon">{icon}</div>}
        <div className="card-text">
          <p className="card-title">{title}</p>
          <p className="card-value">{value}</p>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
