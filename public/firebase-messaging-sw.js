// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: 'AIzaSyA7UNLCOY0llYv3la3e2PQZZLGhG7GXUtE',
    authDomain: 'payment-portal-5d663.firebaseapp.com',
    projectId: 'payment-portal-5d663',
    storageBucket: 'payment-portal-5d663.appspot.com',
    messagingSenderId: '989028546540',
    appId: '1:989028546540:web:b0951c5ac05a49fe7372c9',
    measurementId: 'G-QM50Z46SNN'
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//     console.log('Received background message ', payload);

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });
