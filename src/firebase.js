import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from 'serviceWorker';

export const fetchToken = (setTokenFound) => {
    return getToken(messaging, { vapidKey: 'BF8U0r1YSF4m93pBjjrqgjFX4bdxoR_JkV4m5cOJsuKOW7eMzoBPsjg4pylElTvEtkcJSVNIJ8q-yB72si3om2Y' })
        .then((currentToken) => {
            if (currentToken) {
                // console.log('current token for client: ', currentToken);
                setTokenFound(currentToken);
            } else {
                console.log('No registration token available. Request permission to generate one.');
                setTokenFound(currentToken);
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
