// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconHelp, IconSitemap, IconHome, IconTicket, IconLayout2, IconUsers } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSitemap
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'Dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/dashboard',
            icon: IconHome,
            breadcrumbs: false
        },
        {
            id: 'Tickets',
            title: <FormattedMessage id="tickets" />,
            type: 'item',
            url: '/tickets',
            icon: IconTicket,
            breadcrumbs: false
            // external: true,
            // target: true
        },

        {
            id: 'menu-level',
            title: <FormattedMessage id="menu-level" />,
            type: 'collapse',
            icon: IconLayout2,
            children: [
                {
                    id: 'Repayment Control',
                    title: <FormattedMessage id="Repayment Control" />,
                    type: 'item',
                    url: '/repaymentcontrol',
                    icon: IconTicket,
                    breadcrumbs: false
                    // external: true,
                    // target: true
                },
                {
                    id: 'Repayment Control',
                    title: <FormattedMessage id="Repayment Control" />,
                    type: 'item',
                    url: '/repaymentcontrol',
                    icon: IconTicket,
                    breadcrumbs: false
                    // external: true,
                    // target: true
                },
                {
                    id: 'menu-level-1.2',
                    title: (
                        <>
                            <FormattedMessage id="level" /> 1
                        </>
                    ),
                    type: 'collapse',
                    icon: IconUsers,
                    children: [
                        {
                            id: 'menu-level-2.1',
                            title: (
                                <>
                                    <FormattedMessage id="level" /> 2
                                </>
                            ),
                            type: 'item',
                            url: '#'
                        }
                    ]
                }
            ]
        }
    ]
};

export default other;
