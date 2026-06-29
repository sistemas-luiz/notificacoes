/**
 * Service Worker App 2 - Notificações
 * Status: Confirmado e 100% Atualizado com as novas credenciais pontoweb-dc8dd
 */

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCn89LRlH1lksZ811--jb2jlB2iZS5NH1s",
  authDomain: "pontoweb-dc8dd.firebaseapp.com",
  projectId: "pontoweb-dc8dd",
  storageBucket: "pontoweb-dc8dd.firebasestorage.app",
  messagingSenderId: "465750633035",
  appId: "1:465750633035:web:282efd14b807e2a3823bce"
};

try {
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  console.log('[SW-Alertas] Firebase inicializado com sucesso.');

  messaging.onBackgroundMessage((payload) => {
    console.log('[SW-Alertas] Mensagem recebida no background:', payload);
    
    const notificationTitle = payload.data.title || payload.notification?.title || 'Nova Notificação';
    const notificationOptions = {
      body: payload.data.body || payload.notification?.body || '',
      icon: 'https://github.com/luizhenrinq1-svg/testepontoweb/blob/main/Icone.png?raw=true',
      vibrate: [200, 100, 200],
      data: payload.data
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (e) {
  console.error('[SW-Alertas] Erro ao inicializar Firebase:', e);
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: 'window'}).then( windowClients => {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});
