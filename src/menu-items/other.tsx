// assets
import { IconHome, IconCreditCard, IconLayout2, IconTicket, IconUsers, IconSettings, IconNotes } from '@tabler/icons';
// third-party
import { FormattedMessage } from 'react-intl';

// constant
const icons = {};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/dashboard',
            icon: IconHome,
            breadcrumbs: false
        },
        {
            id: 'partner_management',
            title: <FormattedMessage id="partner_management" />,
            type: 'collapse',
            icon: IconLayout2,
            children: [
                {
                    id: 'partner_list',
                    title: <FormattedMessage id="partner_list" />,
                    type: 'collapse',
                    icon: IconUsers,
                    children: [
                        {
                            id: 'partner',
                            title: <FormattedMessage id="partner" />,
                            type: 'item',
                            url: '/partner'
                        },
                        {
                            id: 'sub_partner',
                            title: <FormattedMessage id="sub_partner" />,
                            type: 'item',
                            url: '#'
                        },
                        {
                            id: 'pos',
                            title: <FormattedMessage id="pos" />,
                            type: 'item',
                            url: '#'
                        }
                    ]
                },
                {
                    id: 'repayment_control',
                    title: <FormattedMessage id="repayment_control" />,
                    type: 'item',
                    url: '/repaymentcontrol',
                    icon: IconCreditCard,
                    breadcrumbs: false
                },
                {
                    id: 'disbursement_control',
                    title: <FormattedMessage id="disbursement_control" />,
                    type: 'item',
                    url: '#',
                    icon: IconCreditCard,
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'user_management',
            title: <FormattedMessage id="user_management" />,
            type: 'collapse',
            icon: IconLayout2,
            children: [
                {
                    id: 'user_list',
                    title: <FormattedMessage id="user_list" />,
                    type: 'item',
                    url: '#'
                },
                {
                    id: 'role_and_privileges',
                    title: <FormattedMessage id="role_and_privileges" />,
                    type: 'item',
                    url: '#'
                }
            ]
        },
        {
            id: 'tickets',
            title: <FormattedMessage id="tickets" />,
            type: 'collapse',
            icon: IconTicket,
            children: [
                {
                    id: 'my_tickets',
                    title: <FormattedMessage id="my_tickets" />,
                    type: 'item',
                    url: '/tickets',
                    breadcrumbs: false
                },
                {
                    id: 'waiting_tickets',
                    title: <FormattedMessage id="waiting_tickets" />,
                    type: 'item',
                    url: '/waiting-tickets',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'activity_logs',
            title: <FormattedMessage id="activity_logs" />,
            type: 'item',
            url: '#',
            icon: IconNotes,
            breadcrumbs: false
        },
        {
            id: 'settings',
            title: <FormattedMessage id="settings" />,
            type: 'item',
            url: '#',
            icon: IconSettings,
            breadcrumbs: false
        }
    ]
};

export default other;
