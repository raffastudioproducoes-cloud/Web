import { useEffect } from 'react';
import { getLoginUrl } from '@/const';
import { Button } from '@/components/ui/button';
import '../styles/login.css';

export default function Login() {
  const loginUrl = getLoginUrl();

  const handleGoogleLogin = () => {
    window.location.href = loginUrl;
  };

  const handleEmailLogin = () => {
    window.location.href = loginUrl;
  };

  const handleAppleLogin = () => {
    window.location.href = loginUrl;
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>

      <div className="login-content">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">
            <svg width="48" height="48" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="2"/>
              <path d="M40 20V60M20 40H60" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="login-title">MinhaRota</h1>
          <p className="login-subtitle">Seu sistema financeiro para motoristas</p>
        </div>

        {/* Login Form */}
        <div className="login-form">
          <div className="login-section">
            <h2 className="login-form-title">Entrar na sua conta</h2>
            <p className="login-form-description">
              Acesse sua conta para gerenciar seus ganhos, turnos e investimentos
            </p>
          </div>

          <div className="login-buttons">
            <Button
              onClick={handleGoogleLogin}
              className="login-button google-button"
              size="lg"
            >
              <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar com Google
            </Button>

            <Button
              onClick={handleAppleLogin}
              className="login-button apple-button"
              size="lg"
            >
              <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 13.5c-.91 0-1.82.55-2.64 1.64.93.64 1.66 1.59 1.66 2.86 0 2.14-1.78 3.63-3.98 3.63-2.15 0-3.98-1.49-3.98-3.63 0-1.27.73-2.22 1.66-2.86-.82-1.09-1.73-1.64-2.64-1.64-2.15 0-3.98 1.49-3.98 3.63 0 2.14 1.78 3.63 3.98 3.63 1.07 0 2.09-.38 2.93-1.04 1.78 1.39 4.05 2.2 6.56 2.2 4.42 0 8-3.58 8-8s-3.58-8-8-8c-2.51 0-4.78.81-6.56 2.2-.84-.66-1.86-1.04-2.93-1.04-2.2 0-3.98 1.49-3.98 3.63 0 2.14 1.78 3.63 3.98 3.63.91 0 1.82-.55 2.64-1.64-.93-.64-1.66-1.59-1.66-2.86 0-2.14 1.78-3.63 3.98-3.63 2.15 0 3.98 1.49 3.98 3.63 0 1.27-.73 2.22-1.66 2.86.82 1.09 1.73 1.64 2.64 1.64 2.15 0 3.98-1.49 3.98-3.63 0-2.14-1.78-3.63-3.98-3.63z"/>
              </svg>
              Continuar com Apple
            </Button>

            <div className="login-divider">
              <span>ou</span>
            </div>

            <Button
              onClick={handleEmailLogin}
              className="login-button email-button"
              size="lg"
            >
              <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              Continuar com Email
            </Button>
          </div>

          <div className="login-terms">
            <p>
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="login-link">Termos de Serviço</a>
              {' '}e{' '}
              <a href="#" className="login-link">Política de Privacidade</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="login-footer">
        <p>Desenvolvido por Raffa Studio Produções</p>
      </footer>
    </div>
  );
}
