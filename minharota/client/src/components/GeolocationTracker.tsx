import { useState, useEffect, useRef } from 'react';
import { MapPin, AlertCircle, Loader2, Navigation } from 'lucide-react';
import '../styles/geolocation.css';

interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  speed?: number;
}

interface GeolocationTrackerProps {
  onLocationUpdate?: (location: Location) => void;
  updateInterval?: number; // em segundos
}

export default function GeolocationTracker({
  onLocationUpdate,
  updateInterval = 30,
}: GeolocationTrackerProps) {
  const [location, setLocation] = useState<Location | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const watchIdRef = useRef<number | null>(null);
  const previousLocationRef = useRef<Location | null>(null);

  // Calcular distância entre dois pontos (Haversine)
  const calcularDistancia = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Raio da Terra em km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Iniciar rastreamento
  const iniciarRastreamento = () => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada neste navegador');
      return;
    }

    setIsTracking(true);
    setError(null);

    // Obter localização inicial
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now(),
          speed: position.coords.speed || undefined,
        };

        setLocation(newLocation);
        previousLocationRef.current = newLocation;

        if (onLocationUpdate) {
          onLocationUpdate(newLocation);
        }
      },
      (err) => {
        setError(`Erro ao obter localização: ${err.message}`);
        setIsTracking(false);
      }
    );

    // Rastrear mudanças de localização
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now(),
          speed: position.coords.speed || undefined,
        };

        setLocation(newLocation);

        // Calcular distância percorrida
        if (previousLocationRef.current) {
          const distancia = calcularDistancia(
            previousLocationRef.current.latitude,
            previousLocationRef.current.longitude,
            newLocation.latitude,
            newLocation.longitude
          );

          setDistance((prev) => prev + distancia);
        }

        previousLocationRef.current = newLocation;

        if (onLocationUpdate) {
          onLocationUpdate(newLocation);
        }
      },
      (err) => {
        setError(`Erro ao rastrear: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
  };

  // Parar rastreamento
  const pararRastreamento = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
    setDistance(0);
    previousLocationRef.current = null;
  };

  // Limpar ao desmontar
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <div className="geolocation-tracker">
      <div className="tracker-header">
        <h3 className="tracker-title">📍 Rastreamento de Localização</h3>
        <p className="tracker-subtitle">Acompanhe sua localização em tempo real</p>
      </div>

      {/* Status */}
      <div className={`tracker-status ${isTracking ? 'ativo' : 'inativo'}`}>
        <div className="status-indicator">
          {isTracking ? (
            <>
              <span className="status-dot ativo"></span>
              <span className="status-text">Rastreando</span>
            </>
          ) : (
            <>
              <span className="status-dot inativo"></span>
              <span className="status-text">Parado</span>
            </>
          )}
        </div>
      </div>

      {/* Erro */}
      {error && (
        <div className="tracker-error">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {/* Localização Atual */}
      {location && (
        <div className="location-info">
          <div className="info-item">
            <span className="label">Latitude:</span>
            <span className="value">{location.latitude.toFixed(6)}°</span>
          </div>

          <div className="info-item">
            <span className="label">Longitude:</span>
            <span className="value">{location.longitude.toFixed(6)}°</span>
          </div>

          <div className="info-item">
            <span className="label">Precisão:</span>
            <span className="value">±{Math.round(location.accuracy)}m</span>
          </div>

          {location.speed !== undefined && (
            <div className="info-item">
              <span className="label">Velocidade:</span>
              <span className="value">
                {location.speed ? (location.speed * 3.6).toFixed(1) : '0'} km/h
              </span>
            </div>
          )}

          <div className="info-item">
            <span className="label">Distância Percorrida:</span>
            <span className="value">{distance.toFixed(2)} km</span>
          </div>

          <div className="info-item">
            <span className="label">Última Atualização:</span>
            <span className="value">
              {new Date(location.timestamp).toLocaleTimeString('pt-BR')}
            </span>
          </div>
        </div>
      )}

      {/* Botões */}
      <div className="tracker-buttons">
        {!isTracking ? (
          <button
            className="btn-iniciar"
            onClick={iniciarRastreamento}
            disabled={isTracking}
          >
            <Navigation size={18} />
            Iniciar Rastreamento
          </button>
        ) : (
          <button
            className="btn-parar"
            onClick={pararRastreamento}
            disabled={!isTracking}
          >
            <Loader2 size={18} className="spinner" />
            Parar Rastreamento
          </button>
        )}
      </div>

      {/* Google Maps */}
      {location && (
        <div className="map-container">
          <iframe
            title="Mapa de Localização"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '8px' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${
              import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDummyKey'
            }&q=${location.latitude},${location.longitude}&zoom=15`}
          ></iframe>
        </div>
      )}

      {/* Info */}
      <div className="tracker-info">
        <p className="info-title">💡 Informações:</p>
        <ul className="info-list">
          <li>Ative a localização no seu dispositivo</li>
          <li>Melhor precisão com GPS ativado</li>
          <li>Atualiza a cada {updateInterval} segundos</li>
          <li>Funciona offline (dados locais)</li>
        </ul>
      </div>
    </div>
  );
}
