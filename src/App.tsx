import Loading from 'components/Loading';
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import { TableProvider } from 'contexts/TableContext';
import { fetchToken, onMessageListener } from 'firebase';
import { getToken, MessagePayload, onMessage } from 'firebase/messaging';
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from 'routes';
// import { messaging } from 'serviceWorker';
import ThemeCustomization from 'themes';
import Snackbar from 'ui-component/extended/Snackbar';
// project imports
import Locales from 'ui-component/Locales';
import RTLLayout from 'ui-component/RTLLayout';

// ==============================|| APP ||============================== //

const App = () => {
    // useEffect(() => {
    //     getToken(messaging, { vapidKey: 'BF8U0r1YSF4m93pBjjrqgjFX4bdxoR_JkV4m5cOJsuKOW7eMzoBPsjg4pylElTvEtkcJSVNIJ8q-yB72si3om2Y' })
    //         .then((currentToken) => {
    //             if (currentToken) {
    //                 localStorage.setItem('deviceId', currentToken);
    //             } else {
    //                 console.log('No registration token available. Request permission to generate one.');
    //             }
    //         })
    //         .catch((err) => {
    //             console.log('An error occurred while retrieving token. ', err);
    //         });
    //     onMessage(messaging, (payload: MessagePayload) => {
    //         navigator.serviceWorker
    //             .getRegistration('/firebase-cloud-messaging-push-scope')
    //             .then((registration: ServiceWorkerRegistration | any) => {
    //                 registration.showNotification(payload.notification?.title, {
    //                     ...payload.notification
    //                 });
    //             });
    //     });
    // }, [messaging]);

    onMessageListener()
        .then((payload) => {
            // setNotification({ title: payload.notification.title, body: payload.notification.body });
            // setShow(true);
            console.log(payload, 'payload');
        })
        .catch((err) => console.log('failed: ', err));

    const onShowNotificationClicked = () => {
        // setNotification({ title: 'Notification', body: 'This is a test notification' });
        // setShow(true);
    };

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
                                    <Loading />
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
