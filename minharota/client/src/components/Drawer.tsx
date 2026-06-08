import { useState } from 'react';
import { X, Home, Clock, Wallet, BarChart3, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';
import '../styles/drawer.css';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Clock, label: 'Turnos', href: '/turnos' },
  { icon: Wallet, label: 'Caixinhas', href: '/caixinhas' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Configurações', href: '/settings' },
];

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();

  const handleNavigate = (href: string) => {
    setLocation(href);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="drawer-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-user">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <p className="user-name">{user?.name}</p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>
          <button
            className="drawer-close"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="drawer-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <button
                key={item.href}
                className={`drawer-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavigate(item.href)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="drawer-footer">
          <button
            className="drawer-logout"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </>
  );
}
