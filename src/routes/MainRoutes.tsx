// project imports
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// tickets routing
const MyTicketsPage = Loadable(lazy(() => import('views/tickets/my-tickets')));
const WaitingTicketsPage = Loadable(lazy(() => import('views/tickets/waiting-tickets')));
const CreateTicketPage = Loadable(lazy(() => import('views/tickets/create')));
const TicketDetailPage = Loadable(lazy(() => import('views/tickets/ticket-detail')));

// partner management
const UpdatePartnerPage = Loadable(lazy(() => import('views/partner-management/update-partner')));
const PartnerPage = Loadable(lazy(() => import('views/partner-management/partner')));
const SubPartnerPage = Loadable(lazy(() => import('views/partner-management/sub-partner')));
const PosPage = Loadable(lazy(() => import('views/partner-management/pos')));
const RepaymentControlPage = Loadable(lazy(() => import('views/partner-management/repaymentcontrol')));

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
            element: <Navigate to="/dashboard" replace />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/tickets',
            element: <MyTicketsPage />
        },
        {
            path: '/waiting-tickets',
            element: <WaitingTicketsPage />
        },
        {
            path: `/waiting-tickets/:ticketID`,
            element: <TicketDetailPage />
        },
        {
            path: '/tickets/create-ticket',
            element: <CreateTicketPage />
        },
        {
            path: `/tickets/:ticketID`,
            element: <TicketDetailPage />
        },
        {
            path: `/repaymentcontrol`,
            element: <RepaymentControlPage />
        },
        {
            path: `/partner`,
            element: <PartnerPage />
        },
        {
            path: `/sub-partner`,
            element: <SubPartnerPage />
        },
        {
            path: `/pos`,
            element: <PosPage />
        },
        {
            path: `/partner/create`,
            element: <UpdatePartnerPage />
        },
        {
            path: `/partner/:partnerId`,
            element: <UpdatePartnerPage />
        }
    ]
};

export default MainRoutes;
