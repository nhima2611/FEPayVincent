// project imports
import { ROLE } from 'constants/auth';
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// tickets routing
const KanbanTicketPage = Loadable(lazy(() => import('views/tickets/kanban-ticket')));
const MyTicketsPage = Loadable(lazy(() => import('views/tickets/my-tickets')));
const WaitingTicketsPage = Loadable(lazy(() => import('views/tickets/waiting-tickets')));
const CreateTicketPage = Loadable(lazy(() => import('views/tickets/create')));
const EditTicketPage = Loadable(lazy(() => import('views/tickets/edit')));
const TicketDetailPage = Loadable(lazy(() => import('views/tickets/ticket-detail')));

// partner management
const UpdatePartnerPage = Loadable(lazy(() => import('views/partner-management/update-partner')));
const PartnerPage = Loadable(lazy(() => import('views/partner-management/partner')));
const SubPartnerPage = Loadable(lazy(() => import('views/partner-management/sub-partner')));
const UpdateSubPartnerPage = Loadable(lazy(() => import('views/partner-management/update-sub-partner')));
const PosPage = Loadable(lazy(() => import('views/partner-management/pos')));
const UpdatePOSPage = Loadable(lazy(() => import('views/partner-management/update-pos')));
const RepaymentControlPage = Loadable(lazy(() => import('views/partner-management/repaymentcontrol')));

// user management
const UserPage = Loadable(lazy(() => import('views/user-management/user-list')));
const UpdateUserPage = Loadable(lazy(() => import('views/user-management/update')));

// profile page
const ProfilePage = Loadable(lazy(() => import('views/profile')));
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
            element: <WaitingTicketsPage />,
            roles: [ROLE.PARTNER, ROLE.PARTNER_STAFF]
        },
        // {
        //     path: '/',
        //     element: <Navigate to="/dashboard" />,
        //     roles: [ROLE.SUPER_ADMIN]
        // },
        {
            path: '/userProfile',
            element: <ProfilePage />,
            roles: [ROLE.SUPER_ADMIN, ROLE.PARTNER, ROLE.PARTNER_STAFF]
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />,
            roles: [ROLE.SUPER_ADMIN]
        },
        {
            path: '/tickets',
            element: <MyTicketsPage />,
            roles: [ROLE.SUPER_ADMIN, ROLE.PARTNER, ROLE.PARTNER_STAFF]
        },
        {
            path: '/kanban-ticket',
            element: <KanbanTicketPage />,
            roles: [ROLE.SUPER_ADMIN, ROLE.PARTNER, ROLE.PARTNER_STAFF]
        },
        {
            path: '/waiting-tickets',
            element: <WaitingTicketsPage />,
            roles: [ROLE.SUPER_ADMIN]
        },
        {
            path: '/tickets/create-ticket',
            element: <CreateTicketPage />,
            roles: [ROLE.SUPER_ADMIN, ROLE.PARTNER, ROLE.PARTNER_STAFF]
        },
        {
            path: '/tickets/edit-ticket/:ticket_id',
            element: <EditTicketPage />,
            roles: [ROLE.SUPER_ADMIN, ROLE.PARTNER, ROLE.PARTNER_STAFF]
        },
        {
            path: `/tickets/:ticketID`,
            element: <TicketDetailPage />,
            roles: [ROLE.SUPER_ADMIN, ROLE.PARTNER, ROLE.PARTNER_STAFF]
        },
        {
            path: `/repaymentcontrol`,
            element: <RepaymentControlPage />,
            roles: [ROLE.SUPER_ADMIN]
        },
        {
            path: `/partner`,
            element: <PartnerPage />,
            roles: [ROLE.SUPER_ADMIN]
        },
        {
            path: `/sub-partner`,
            element: <SubPartnerPage />,
            roles: [ROLE.SUPER_ADMIN]
        },
        {
            path: `/sub-partner/create`,
            element: <UpdateSubPartnerPage />
        },
        {
            path: `/sub-partner/:id`,
            element: <UpdateSubPartnerPage />
        },
        {
            path: `/pos`,
            element: <PosPage />,
            roles: [ROLE.SUPER_ADMIN]
        },
        {
            path: `/pos/create`,
            element: <UpdatePOSPage />,
            roles: [ROLE.SUPER_ADMIN]
        },
        {
            path: `/pos/:id`,
            element: <UpdatePOSPage />,
            roles: [ROLE.SUPER_ADMIN]
        },
        {
            path: `/partner/create`,
            element: <UpdatePartnerPage />,
            roles: [ROLE.SUPER_ADMIN]
        },
        {
            path: `/partner/:partnerId`,
            element: <UpdatePartnerPage />,
            roles: [ROLE.SUPER_ADMIN]
        },
        {
            path: `/user`,
            element: <UserPage />,
            roles: [ROLE.SUPER_ADMIN, ROLE.PARTNER]
        },
        {
            path: `/user/create`,
            element: <UpdateUserPage />,
            roles: [ROLE.SUPER_ADMIN, ROLE.PARTNER]
        },
        {
            path: `/user/:id`,
            element: <UpdateUserPage />,
            roles: [ROLE.SUPER_ADMIN, ROLE.PARTNER]
        }
    ]
};

export default MainRoutes;
