import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';


// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/login',
            element: <AuthLogin />
        },
        // {
        //     path: '/register',
        //     element: <AuthRegister />
        // },
        {
            path: '/forgot',
            element: <AuthForgotPassword />
        }
    ]
};

export default LoginRoutes;
