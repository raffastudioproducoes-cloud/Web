import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import '../styles/onboarding.css';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    title: 'Bem-vindo ao MinhaRota',
    description: 'Seu companheiro inteligente para maximizar ganhos e gerenciar sua vida financeira como motorista de aplicativo.',
    icon: '🚗',
  },
  {
    title: 'Rastreie seus Turnos',
    description: 'Registre início e fim de cada turno, quilômetros rodados e ganhos em tempo real com cálculos automáticos.',
    icon: '⏱️',
  },
  {
    title: 'Organize suas Caixinhas',
    description: 'Crie poupanças e investimentos personalizados. No plano Premium, receba rendimentos automáticos.',
    icon: '💰',
  },
  {
    title: 'Analise seus Horários de Ouro',
    description: 'Descubra os melhores horários para trabalhar com heatmaps inteligentes e recomendações baseadas em dados.',
    icon: '📊',
  },
  {
    title: 'Modo Riding para Campo',
    description: 'Interface focada e minimalista para quando você está na rua, mostrando apenas o essencial.',
    icon: '🎯',
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    onComplete();
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-header">
        <button className="onboarding-skip" onClick={handleSkip}>
          Pular
        </button>
        <div className="onboarding-progress">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="onboarding-content">
        <div className={`slide ${isAnimating ? 'animating' : ''}`}>
          <div className="slide-icon">{slides[currentSlide].icon}</div>
          <h2 className="slide-title">{slides[currentSlide].title}</h2>
          <p className="slide-description">{slides[currentSlide].description}</p>
        </div>
      </div>

      <div className="onboarding-footer">
        <button
          className="nav-button prev"
          onClick={handlePrev}
          disabled={currentSlide === 0}
        >
          <ChevronLeft size={20} />
        </button>

        <Button
          onClick={handleNext}
          className="onboarding-action-button"
          size="lg"
        >
          {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
        </Button>

        <button
          className="nav-button next"
          onClick={handleNext}
          disabled={currentSlide === slides.length - 1}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
