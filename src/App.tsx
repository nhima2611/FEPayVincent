import Loading from 'components/Loading';
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import { TableProvider } from 'contexts/TableContext';
import { onMessageListener } from 'firebase';
import { MessagePayload } from 'firebase/messaging';
import NavigationScroll from 'layout/NavigationScroll';
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
    onMessageListener()
        .then((payload: MessagePayload) => {
            navigator.serviceWorker
                .getRegistration('/firebase-cloud-messaging-push-scope')
                .then((registration: ServiceWorkerRegistration | any) => {
                    registration.showNotification(payload.notification?.title, {
                        ...payload.notification
                    });
                });
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
