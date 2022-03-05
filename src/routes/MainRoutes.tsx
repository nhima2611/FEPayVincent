import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// tickets routing
const TicketsPage = Loadable(lazy(() => import('views/tickets')));
const CreateTicketPage = Loadable(lazy(() => import('views/tickets/create')));
const TicketDetailPage = Loadable(lazy(() => import('views/tickets/detail')));

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
            path: '/tickets',
            element: <TicketsPage />
        },
        {
            path: '/tickets/create-ticket',
            element: <CreateTicketPage />
        },
        {
            path: `/tickets/:ticketID`,
            element: <TicketDetailPage />
        }
    ]
};

export default MainRoutes;
