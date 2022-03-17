import { IconTicket } from '@tabler/icons';
import { FormattedMessage } from 'react-intl';

export const ticketPartner: any = {
    id: 'tickets-partner',
    title: <FormattedMessage id="tickets" />,
    type: 'item',
    icon: IconTicket,
    url: '/tickets',
    breadcrumbs: false
};
