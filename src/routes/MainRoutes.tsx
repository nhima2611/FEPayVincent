import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

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
