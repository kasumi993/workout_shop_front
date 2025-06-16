import { useEffect } from 'react';
import { useToast } from '@/context/ToastContext';

export default function ServiceWorkerManager() {
  const { showInfo } = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker?.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                showInfo('Une nouvelle version est disponible. Rechargez la page pour la mettre à jour.', {
                  duration: 0,
                  action: {
                    label: 'Recharger',
                    onClick: () => window.location.reload()
                  }
                });
              }
            });
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, [showInfo]);

  return null;
}
