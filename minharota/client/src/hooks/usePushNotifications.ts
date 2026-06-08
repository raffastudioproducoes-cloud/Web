import { useEffect, useState } from 'react';

interface PushNotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  actions?: Array<{ action: string; title: string; icon?: string }>;
}

export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  // Verificar suporte
  useEffect(() => {
    const supported =
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      'Notification' in window;
    setIsSupported(supported);

    if (supported) {
      checkSubscription();
    }
  }, []);

  // Verificar se já está inscrito
  const checkSubscription = async () => {
    if (!('serviceWorker' in navigator)) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
      setIsSubscribed(!!sub);
    } catch (error) {
      console.error('Erro ao verificar subscrição:', error);
    }
  };

  // Inscrever em notificações push
  const subscribe = async () => {
    if (!isSupported) {
      console.error('Web Push não suportado');
      return false;
    }

    try {
      // Solicitar permissão
      if (Notification.permission === 'denied') {
        console.error('Permissão de notificação foi negada');
        return false;
      }

      if (Notification.permission !== 'granted') {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          return false;
        }
      }

      // Inscrever em push
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY || ''
        ),
      });

      setSubscription(sub);
      setIsSubscribed(true);

      // Enviar subscrição para o servidor
      await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sub),
      });

      return true;
    } catch (error) {
      console.error('Erro ao inscrever em notificações:', error);
      return false;
    }
  };

  // Desinscrever de notificações push
  const unsubscribe = async () => {
    if (!subscription) return false;

    try {
      await subscription.unsubscribe();
      setSubscription(null);
      setIsSubscribed(false);

      // Notificar servidor
      await fetch('/api/push-subscription', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      return true;
    } catch (error) {
      console.error('Erro ao desinscrever de notificações:', error);
      return false;
    }
  };

  // Enviar notificação local
  const sendNotification = async (options: PushNotificationOptions) => {
    if (!isSupported || Notification.permission !== 'granted') {
      console.error('Notificações não permitidas');
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const notificationOptions: NotificationOptions = {
        body: options.body,
        icon: options.icon || '/logo-192.png',
        badge: options.badge || '/badge-72.png',
        tag: options.tag || 'minharota-notification',
        requireInteraction: options.requireInteraction || false,
      };
      await registration.showNotification(options.title, notificationOptions);

      return true;
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      return false;
    }
  };

  // Converter VAPID key
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  };

  return {
    isSupported,
    isSubscribed,
    subscription,
    subscribe,
    unsubscribe,
    sendNotification,
  };
}
