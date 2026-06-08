import { useState } from 'react';
import { X, Check, CreditCard, QrCode, Smartphone, FileText } from 'lucide-react';
import '../styles/paywall.css';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade?: () => void;
}

type PaymentMethod = 'cc' | 'pix' | 'google' | 'boleto';

export default function PaywallModal({ isOpen, onClose, onUpgrade }: PaywallModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cc');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simular processamento de pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);

    // Chamar callback de upgrade
    if (onUpgrade) {
      onUpgrade();
    }
    onClose();
  };

  const benefits = [
    { icon: '∞', text: 'Caixinhas ilimitadas' },
    { icon: '📈', text: 'Rendimento simulado' },
    { icon: '🔒', text: 'Sem anúncios' },
    { icon: '⚡', text: 'Prioridade no suporte' },
    { icon: '📊', text: 'Analytics avançados' },
    { icon: '🎯', text: 'Metas personalizadas' },
  ];

  const paymentMethods = [
    {
      id: 'cc' as PaymentMethod,
      name: 'Cartão de Crédito',
      icon: CreditCard,
      description: 'Visa, Mastercard, Elo',
    },
    {
      id: 'pix' as PaymentMethod,
      name: 'PIX',
      icon: QrCode,
      description: 'Transferência instantânea',
    },
    {
      id: 'google' as PaymentMethod,
      name: 'Google Pay',
      icon: Smartphone,
      description: 'Pagamento rápido',
    },
    {
      id: 'boleto' as PaymentMethod,
      name: 'Boleto',
      icon: FileText,
      description: 'Até 3 dias úteis',
    },
  ];

  return (
    <div className="paywall-overlay" onClick={onClose}>
      <div className="paywall-modal" onClick={(e) => e.stopPropagation()}>
        <button className="paywall-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="paywall-content">
          {/* Header */}
          <div className="paywall-header">
            <h2 className="paywall-title">Upgrade para Premium</h2>
            <p className="paywall-subtitle">Desbloqueie todas as funcionalidades</p>
          </div>

          {/* Preço */}
          <div className="paywall-price">
            <div className="price-display">
              <span className="currency">R$</span>
              <span className="amount">9,90</span>
              <span className="period">/mês</span>
            </div>
            <p className="price-note">Cancele quando quiser</p>
          </div>

          {/* Benefícios */}
          <div className="paywall-benefits">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <Check size={20} />
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Métodos de Pagamento */}
          <div className="payment-methods">
            <h3 className="methods-title">Escolha o método de pagamento</h3>

            <div className="methods-grid">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    className={`method-card ${paymentMethod === method.id ? 'active' : ''}`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <Icon size={28} />
                    <p className="method-name">{method.name}</p>
                    <p className="method-description">{method.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formulário de Pagamento */}
          {paymentMethod === 'cc' && (
            <div className="payment-form">
              <div className="form-group">
                <label>Número do Cartão</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  disabled={isProcessing}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Validade</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    maxLength={5}
                    disabled={isProcessing}
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={3}
                    disabled={isProcessing}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Nome do Titular</label>
                <input
                  type="text"
                  placeholder="João Silva"
                  disabled={isProcessing}
                />
              </div>
            </div>
          )}

          {paymentMethod === 'pix' && (
            <div className="payment-info">
              <p>Você será redirecionado para confirmar o pagamento via PIX</p>
            </div>
          )}

          {paymentMethod === 'google' && (
            <div className="payment-info">
              <p>Você será redirecionado para Google Pay</p>
            </div>
          )}

          {paymentMethod === 'boleto' && (
            <div className="payment-info">
              <p>Você receberá o código de barras por email</p>
            </div>
          )}

          {/* Botão de Pagamento */}
          <button
            className="paywall-pay-button"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="spinner"></span>
                Processando...
              </>
            ) : (
              `Pagar R$ 9,90 com ${paymentMethods.find((m) => m.id === paymentMethod)?.name}`
            )}
          </button>

          {/* Termos */}
          <p className="paywall-terms">
            Ao clicar em Pagar, você concorda com nossos Termos de Serviço e Política de Privacidade
          </p>
        </div>
      </div>
    </div>
  );
}
