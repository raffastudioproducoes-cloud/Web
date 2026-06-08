import { useEffect, useState } from 'react';
import '../styles/splash.css';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Duração aleatória entre 3 e 5 segundos
    const duration = Math.random() * 2000 + 3000;
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Aguardar a animação de fadeOut completar
      setTimeout(onComplete, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="splash-screen">
      <div className="splash-container">
        {/* Logo placeholder - será substituído por imagem real */}
        <div className="splash-logo">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="2"/>
            <path d="M40 20V60M20 40H60" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Nome do app */}
        <h1 className="splash-title">MinhaRota</h1>

        {/* Ano */}
        <p className="splash-year">© 2026</p>

        {/* Animação de 3 pontos */}
        <div className="splash-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
}
