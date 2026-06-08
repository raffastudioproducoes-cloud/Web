import { useEffect, useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import SplashScreen from './SplashScreen';
import Onboarding from './Onboarding';
import Login from '@/pages/Login';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Verificar se já viu onboarding
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding') === 'true';
    
    if (!hasSeenOnboarding && isAuthenticated) {
      setShowOnboarding(true);
    }
  }, [isAuthenticated]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  // Mostrar splash screen
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Mostrar onboarding
  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Aguardando autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Não autenticado - mostrar login
  if (!isAuthenticated) {
    return <Login />;
  }

  // Autenticado - mostrar conteúdo
  return <>{children}</>;
}
