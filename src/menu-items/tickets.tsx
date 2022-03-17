import { IconTicket } from '@tabler/icons';
import { FormattedMessage } from 'react-intl';

export const tickets: any = {
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
};
