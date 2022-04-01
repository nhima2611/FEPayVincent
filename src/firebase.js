import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: 'AIzaSyA7UNLCOY0llYv3la3e2PQZZLGhG7GXUtE',
    authDomain: 'payment-portal-5d663.firebaseapp.com',
    projectId: 'payment-portal-5d663',
    storageBucket: 'payment-portal-5d663.appspot.com',
    messagingSenderId: '989028546540',
    appId: '1:989028546540:web:b0951c5ac05a49fe7372c9',
    measurementId: 'G-QM50Z46SNN'
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
    return getToken(messaging, { vapidKey: 'BF8U0r1YSF4m93pBjjrqgjFX4bdxoR_JkV4m5cOJsuKOW7eMzoBPsjg4pylElTvEtkcJSVNIJ8q-yB72si3om2Y' })
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                setTokenFound(currentToken);
                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                console.log('No registration token available. Request permission to generate one.');
                setTokenFound(currentToken);
                // shows on the UI that permission is required
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // catch error while creating client token
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
