import { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import OCRScanner from '@/components/OCRScanner';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { Plus, TrendingUp, Lock } from 'lucide-react';
import '../styles/caixinhas.css';

export default function Caixinhas() {
  const [showCriarForm, setShowCriarForm] = useState(false);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState<'poupanca' | 'investimento' | 'emergencia' | 'meta'>('poupanca');
  const [descricao, setDescricao] = useState('');

  const [selectedCaixa, setSelectedCaixa] = useState<number | null>(null);
  const [operacao, setOperacao] = useState<'deposito' | 'saque' | null>(null);
  const [valor, setValor] = useState('');

  // Queries
  const caixinhasQuery = trpc.caixinhas.list.useQuery();
  const userQuery = trpc.auth.me.useQuery();

  // Mutations
  const criarMutation = trpc.caixinhas.criar.useMutation({
    onSuccess: () => {
      caixinhasQuery.refetch();
      setNome('');
      setTipo('poupanca');
      setDescricao('');
      setShowCriarForm(false);
    },
  });

  const depositarMutation = trpc.caixinhas.depositar.useMutation({
    onSuccess: () => {
      caixinhasQuery.refetch();
      setValor('');
      setOperacao(null);
      setSelectedCaixa(null);
    },
  });

  const sacarMutation = trpc.caixinhas.sacar.useMutation({
    onSuccess: () => {
      caixinhasQuery.refetch();
      setValor('');
      setOperacao(null);
      setSelectedCaixa(null);
    },
  });

  const handleCriarCaixa = () => {
    criarMutation.mutate({ nome, tipo, descricao });
  };

  const handleDepositar = () => {
    if (!selectedCaixa || !valor) return;
    depositarMutation.mutate({
      caixinhaId: selectedCaixa,
      valor: parseFloat(valor),
    });
  };

  const handleSacar = () => {
    if (!selectedCaixa || !valor) return;
    sacarMutation.mutate({
      caixinhaId: selectedCaixa,
      valor: parseFloat(valor),
    });
  };

  const caixinhas = caixinhasQuery.data || [];
  const user = userQuery.data;
  const isPro = user?.isPro || false;
  const limite = isPro ? '∞' : '3';
  const podeAdicionar = isPro || caixinhas.length < 3;

  const tiposLabel = {
    poupanca: '💰 Poupança',
    investimento: '📈 Investimento',
    emergencia: '🚨 Emergência',
    meta: '🎯 Meta',
  };

  return (
    <MainLayout>
      <div className="caixinhas-container">
        <div className="caixinhas-header">
          <div>
            <h1 className="caixinhas-title">Minhas Caixinhas</h1>
            <p className="caixinhas-subtitle">Organize seus ganhos e investimentos</p>
          </div>
          <div className="header-info">
            <span className="limite-badge">
              {caixinhas.length}/{limite}
            </span>
            {!isPro && <Lock size={16} className="lock-icon" />}
          </div>
        </div>

        {/* Botão Criar Caixa */}
        {podeAdicionar && (
          <Button
            onClick={() => setShowCriarForm(!showCriarForm)}
            className="criar-caixa-button"
          >
            <Plus size={20} />
            Nova Caixinha
          </Button>
        )}

        {/* Formulário Criar */}
        {showCriarForm && (
          <div className="criar-form">
            <h3>Criar Nova Caixinha</h3>

            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Poupança Carro"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tipo">Tipo</label>
              <select
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value as any)}
              >
                <option value="poupanca">💰 Poupança</option>
                <option value="investimento">📈 Investimento</option>
                <option value="emergencia">🚨 Emergência</option>
                <option value="meta">🎯 Meta</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="descricao">Descrição (opcional)</label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva o propósito desta caixinha..."
                rows={3}
              />
            </div>

            <div className="form-actions">
              <Button
                onClick={handleCriarCaixa}
                disabled={criarMutation.isPending || !nome}
                className="btn-criar"
              >
                {criarMutation.isPending ? 'Criando...' : 'Criar Caixinha'}
              </Button>
              <Button
                onClick={() => setShowCriarForm(false)}
                className="btn-cancelar"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Caixinhas Grid */}
        {caixinhasQuery.isLoading ? (
          <div className="loading-state">Carregando caixinhas...</div>
        ) : caixinhas.length === 0 ? (
          <div className="empty-state">
            <TrendingUp size={40} />
            <p>Nenhuma caixinha criada ainda</p>
            <p className="empty-subtitle">Crie sua primeira caixinha para começar a organizar seus ganhos</p>
          </div>
        ) : (
          <div className="caixinhas-grid">
            {caixinhas.map((caixa) => (
              <div key={caixa.id} className="caixa-card">
                <div className="caixa-header">
                  <h3 className="caixa-nome">{caixa.nome}</h3>
                  <span className="caixa-tipo">{tiposLabel[caixa.tipo as keyof typeof tiposLabel]}</span>
                </div>

                <div className="caixa-saldo">
                  <p className="saldo-label">Saldo</p>
                  <p className="saldo-valor">R$ {parseFloat(caixa.saldo.toString()).toFixed(2)}</p>
                </div>

                {caixa.descricao && (
                  <p className="caixa-descricao">{caixa.descricao}</p>
                )}

                <div className="caixa-actions">
                  <Button
                    onClick={() => {
                      setSelectedCaixa(caixa.id);
                      setOperacao('deposito');
                    }}
                    className="btn-depositar"
                  >
                    Depositar
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedCaixa(caixa.id);
                      setOperacao('saque');
                    }}
                    className="btn-sacar"
                  >
                    Sacar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Operação */}
        {selectedCaixa && operacao && (
          <div className="modal-overlay" onClick={() => setOperacao(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">
                {operacao === 'deposito' ? 'Depositar' : 'Sacar'}
              </h3>

              <div className="modal-form">
                <div className="form-group">
                  <label htmlFor="valor-modal">Valor (R$)</label>
                  <input
                    id="valor-modal"
                    type="number"
                    step="0.01"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder="0.00"
                    autoFocus
                  />
                </div>

                <div className="modal-actions">
                  <Button
                    onClick={operacao === 'deposito' ? handleDepositar : handleSacar}
                    disabled={depositarMutation.isPending || sacarMutation.isPending || !valor}
                    className="btn-confirmar"
                  >
                    {depositarMutation.isPending || sacarMutation.isPending
                      ? 'Processando...'
                      : 'Confirmar'}
                  </Button>
                  <Button
                    onClick={() => setOperacao(null)}
                    className="btn-cancelar"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OCR Scanner */}
        <div className="ocr-section">
          <OCRScanner onValorDetectado={(valor) => setValor(valor.toString())} />
        </div>

        {/* Info Premium */}
        {!isPro && (
          <div className="premium-info">
            <Lock size={20} />
            <div>
              <p className="premium-title">Plano Premium</p>
              <p className="premium-text">Crie caixinhas ilimitadas e acesse simulação de rendimento</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
