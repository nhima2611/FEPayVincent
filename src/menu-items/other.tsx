// assets
import { IconHome, IconCreditCard, IconLayout2, IconTicket, IconUsers, IconSettings, IconNotes } from '@tabler/icons';
// third-party
import { FormattedMessage } from 'react-intl';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
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
