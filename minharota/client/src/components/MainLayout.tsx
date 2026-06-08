import { useState } from 'react';
import BottomNavigation from './BottomNavigation';
import '../styles/main-layout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [showFabMenu, setShowFabMenu] = useState(false);

  const handleFabClick = () => {
    setShowFabMenu(!showFabMenu);
  };

  return (
    <div className="main-layout">
      <main className="main-content">
        {children}
      </main>
      <BottomNavigation onFabClick={handleFabClick} />
    </div>
  );
}
