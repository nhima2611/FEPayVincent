// project imports
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// tickets routing
const TicketsPage = Loadable(lazy(() => import('views/tickets')));
const AppKanbanBoard = Loadable(lazy(() => import('views/tickets/kanban/Board')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <Navigate to="/dashboard" />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/tickets/kanban',
            element: <TicketsPage />,
            children: [
                {
                    path: 'board',
                    element: <AppKanbanBoard />
                }
            ]
        }
    ]
};

export default MainRoutes;
