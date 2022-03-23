// routing
import { FIREBASE_API } from 'config';
// auth provider
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import { TableProvider } from 'contexts/TableContext';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, MessagePayload, onMessage } from 'firebase/messaging';
import NavigationScroll from 'layout/NavigationScroll';
import { ToastContainer } from 'react-toastify';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import Snackbar from 'ui-component/extended/Snackbar';
// project imports
import Locales from 'ui-component/Locales';
import RTLLayout from 'ui-component/RTLLayout';

// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const app = initializeApp(FIREBASE_API);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
const App = () => {
    // Add the public key generated from the console here.
    console.log(faker.internet.password());
    getToken(messaging, { vapidKey: 'BF8U0r1YSF4m93pBjjrqgjFX4bdxoR_JkV4m5cOJsuKOW7eMzoBPsjg4pylElTvEtkcJSVNIJ8q-yB72si3om2Y' })
        .then((currentToken) => {
            if (currentToken) {
                console.log(currentToken);
                onMessage(messaging, (payload: MessagePayload) => {
                    console.log(1);
                    console.log('Message received. ', payload);
                    // const notificationTitle = 'Background Message Title';
                    // const notificationOptions = {
                    //     body: 'Background Message body.'
                    //     // icon: '/firebase-logo.png'
                    // };
                    // const self: any = window.self;
                    // self.showNotification(notificationTitle, notificationOptions);
                    // ...
                });
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });

    // onBackgroundMessage(messaging, (payload) => {
    //     console.log('[firebase-messaging-sw.js] Received background message ', payload);
    //     // Customize notification here
    //     const notificationTitle = 'Background Message Title';
    //     const notificationOptions = {
    //         body: 'Background Message body.',
    //         icon: '/firebase-logo.png'
    //     };
    //     const self: any = window.self;
    //     self.showNotification(notificationTitle, notificationOptions);
    // });

    return (
        <ThemeCustomization>
            {/* RTL layout */}
            <RTLLayout>
                <Locales>
                    <NavigationScroll>
                        <AuthProvider>
                            <TableProvider>
                                <>
                                    <Routes />
                                    <Snackbar />
                                    <ToastContainer />
                                </>
                            </TableProvider>
                        </AuthProvider>
                    </NavigationScroll>
                </Locales>
            </RTLLayout>
        </ThemeCustomization>
    );
};

export default App;
