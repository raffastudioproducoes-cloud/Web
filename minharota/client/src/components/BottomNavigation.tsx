import { useState } from 'react';
import { Menu, Plus, Home, Clock, Wallet, BarChart3 } from 'lucide-react';
import { useLocation } from 'wouter';
import Drawer from './Drawer';
import '../styles/bottom-nav.css';

interface BottomNavigationProps {
  onFabClick?: () => void;
}

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard', id: 'dashboard' },
  { icon: Clock, label: 'Turnos', href: '/turnos', id: 'turnos' },
  { icon: Wallet, label: 'Caixinhas', href: '/caixinhas', id: 'caixinhas' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics', id: 'analytics' },
];

export default function BottomNavigation({ onFabClick }: BottomNavigationProps) {
  const [location, setLocation] = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNavigate = (href: string) => {
    setLocation(href);
  };

  const handleFabClick = () => {
    if (onFabClick) {
      onFabClick();
    }
  };

  return (
    <>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <nav className="bottom-nav">
        <div className="bottom-nav-container">
          {/* Menu Button */}
          <button
            className={`nav-button menu-button ${isDrawerOpen ? 'open' : ''}`}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
          </button>

          {/* Navigation Items Left */}
          <div className="nav-items">
            {navItems.slice(0, 2).map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <button
                  key={item.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavigate(item.href)}
                  title={item.label}
                >
                  <Icon size={24} />
                  <span className="nav-label">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* FAB Central */}
          <button
            className="fab-button"
            onClick={handleFabClick}
            aria-label="Nova acao"
          >
            <Plus size={28} />
          </button>

          {/* Navigation Items Right */}
          <div className="nav-items">
            {navItems.slice(2).map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <button
                  key={item.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavigate(item.href)}
                  title={item.label}
                >
                  <Icon size={24} />
                  <span className="nav-label">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
