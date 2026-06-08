import { useState, useRef } from 'react';
import { Upload, Camera, Loader2, DollarSign } from 'lucide-react';
import Tesseract from 'tesseract.js';
import '../styles/ocr-scanner.css';

interface OCRResult {
  texto: string;
  valor?: number;
  confianca: number;
}

interface OCRScannerProps {
  onValorDetectado?: (valor: number) => void;
}

export default function OCRScanner({ onValorDetectado }: OCRScannerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultado, setResultado] = useState<OCRResult | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Extrair valor monetário do texto
  const extrairValor = (texto: string): number | undefined => {
    // Padrões para valores monetários
    const padroes = [
      /R\$\s*(\d+[.,]\d{2})/gi,
      /(\d+[.,]\d{2})\s*R\$/gi,
      /R\$\s*(\d+)/gi,
      /(\d+[.,]\d{2})/gi,
    ];

    for (const padrao of padroes) {
      const match = texto.match(padrao);
      if (match) {
        const valorStr = match[0].replace(/[^\d.,]/g, '').replace(',', '.');
        const valor = parseFloat(valorStr);
        if (!isNaN(valor) && valor > 0 && valor < 10000) {
          return valor;
        }
      }
    }

    return undefined;
  };

  // Processar imagem com OCR
  const processarImagem = async (file: File) => {
    setIsProcessing(true);
    setResultado(null);

    try {
      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Processar OCR
      const resultado = await Tesseract.recognize(file, 'por', {
        logger: (m) => {
          console.log('OCR Progress:', m.progress);
        },
      });

      const texto = resultado.data.text;
      const confianca = resultado.data.confidence;
      const valor = extrairValor(texto);

      const ocrResult: OCRResult = {
        texto: texto.trim(),
        valor,
        confianca: Math.round(confianca),
      };

      setResultado(ocrResult);

      if (valor && onValorDetectado) {
        onValorDetectado(valor);
      }
    } catch (erro) {
      console.error('Erro ao processar OCR:', erro);
      setResultado({
        texto: 'Erro ao processar imagem. Tente novamente.',
        confianca: 0,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processarImagem(file);
    }
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processarImagem(file);
    }
  };

  return (
    <div className="ocr-scanner-container">
      <h3 className="ocr-title">📸 Leitor de Valores (OCR)</h3>
      <p className="ocr-subtitle">Fotografe ou envie uma imagem para extrair valores monetários</p>

      {/* Botões de Upload */}
      <div className="ocr-buttons">
        <button
          className="ocr-button camera"
          onClick={() => cameraInputRef.current?.click()}
          disabled={isProcessing}
        >
          <Camera size={20} />
          Câmera
        </button>

        <button
          className="ocr-button upload"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
        >
          <Upload size={20} />
          Enviar Imagem
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCameraCapture}
          style={{ display: 'none' }}
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="ocr-preview">
          <img src={preview} alt="Preview" />
        </div>
      )}

      {/* Loading */}
      {isProcessing && (
        <div className="ocr-loading">
          <Loader2 size={32} className="spinner" />
          <p>Processando imagem...</p>
        </div>
      )}

      {/* Resultado */}
      {resultado && !isProcessing && (
        <div className={`ocr-resultado ${resultado.valor ? 'sucesso' : 'info'}`}>
          <div className="resultado-header">
            <h4>Resultado da Leitura</h4>
            <span className="confianca-badge">
              {resultado.confianca}% confiança
            </span>
          </div>

          {resultado.valor && (
            <div className="valor-detectado">
              <DollarSign size={24} />
              <p className="valor-text">R$ {resultado.valor.toFixed(2)}</p>
              <p className="valor-label">Valor Detectado</p>
            </div>
          )}

          <div className="texto-extraido">
            <p className="texto-label">Texto Extraído:</p>
            <p className="texto-content">{resultado.texto}</p>
          </div>

          <button
            className="ocr-button usar-valor"
            onClick={() => {
              if (resultado.valor && onValorDetectado) {
                onValorDetectado(resultado.valor);
              }
            }}
            disabled={!resultado.valor}
          >
            Usar Valor Detectado
          </button>
        </div>
      )}

      {/* Info */}
      <div className="ocr-info">
        <p className="info-title">💡 Dicas:</p>
        <ul className="info-list">
          <li>Fotografe o recibo ou comprovante de forma clara</li>
          <li>Certifique-se de que o valor está bem visível</li>
          <li>Boa iluminação melhora a precisão</li>
          <li>Suporta formatos: R$ 150,00 ou 150.00</li>
        </ul>
      </div>
    </div>
  );
}
