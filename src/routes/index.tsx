import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthenticationRoutes from './AuthenticationRoutes';
import LoginRoutes from './LoginRoutes';
// routes
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const { user } = useAuth();
    return useRoutes([
        user
            ? {
                  path: MainRoutes.path,
                  element: MainRoutes.element,
                  children: _.filter(MainRoutes.children, (x) => _.includes(x.roles, user?.role))
              }
            : MainRoutes,
        LoginRoutes,
        AuthenticationRoutes,
        { path: '*', element: <Navigate to="/" /> }
    ]);
}
