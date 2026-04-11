importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDJ-K-AI2q-mPsDGaCMFrMLTn-lFSBd9LQ",
  authDomain: "gestion-turnos-mano-artesano.firebaseapp.com",
  databaseURL: "https://gestion-turnos-mano-artesano-default-rtdb.firebaseio.com",
  projectId: "gestion-turnos-mano-artesano",
  storageBucket: "gestion-turnos-mano-artesano.firebasestorage.app",
  messagingSenderId: "141305011827",
  appId: "1:141305011827:web:97530af4a95d105e535406",
  measurementId: "G-X68TDB39SV"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Notificación recibida:", payload);

  const title = payload.notification?.title || "Notificación";
  const body = payload.notification?.body || "Tienes una actualización";

  // 🔥 Diferenciar tipo
  const tipo = payload.data?.tipo || "general";

  self.registration.showNotification(title, {
    body: body,
    icon: "/img/logo.png",
    vibrate: [200, 100, 200, 100, 200],
    requireInteraction: true,
    tag: "turno-llamado",

    // 🔥 AQUÍ
    data: payload.data
  });
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    event.waitUntil(
      self.addEventListener('notificationclick', function(event) {
      event.notification.close();

      const turno = event.notification.data?.turno || "";
      const atraccion = event.notification.data?.atraccion || "";

      const url = `/?turno=${turno}&atraccion=${encodeURIComponent(atraccion)}`;

      event.waitUntil(
        clients.openWindow(url)
      );
    })
  );
});