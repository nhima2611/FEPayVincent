// types
import { ConfigProps } from 'types/config';

export const JWT_API = {
    secret: 'SECRET-KEY',
    timeout: '1 days'
};

export const FIREBASE_API = {
    apiKey: 'AIzaSyA7UNLCOY0llYv3la3e2PQZZLGhG7GXUtE',
    authDomain: 'payment-portal-5d663.firebaseapp.com',
    projectId: 'payment-portal-5d663',
    storageBucket: 'payment-portal-5d663.appspot.com',
    messagingSenderId: '989028546540',
    appId: '1:989028546540:web:b0951c5ac05a49fe7372c9',
    measurementId: 'G-QM50Z46SNN'
};

export const AUTH0_API = {
    client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
    domain: 'dev-w0-vxep3.us.auth0.com'
};

export const AWS_API = {
    poolId: 'us-east-1_AOfOTXLvD',
    appClientId: '3eau2osduslvb7vks3vsh9t7b0'
};

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
export const BASE_PATH = '';

export const DASHBOARD_PATH = '/dashboard';

const config: ConfigProps = {
    fontFamily: `'Be Vietnam Pro', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};

export default config;
