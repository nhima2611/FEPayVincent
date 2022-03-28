import { IconCreditCard, IconLayout2, IconUsers } from '@tabler/icons';
import { FormattedMessage } from 'react-intl';

export const partnerManagement = {
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
                    id: 'sub-partner',
                    title: <FormattedMessage id="sub_partner" />,
                    type: 'item',
                    url: '/sub-partner'
                },
                {
                    id: 'pos',
                    title: <FormattedMessage id="pos" />,
                    type: 'item',
                    url: '/pos'
                }
            ]
        },
        {
            id: 'repaymentcontrol',
            title: <FormattedMessage id="repayment_control" />,
            type: 'item',
            url: '/repaymentcontrol',
            icon: IconCreditCard,
            breadcrumbs: false
        },
        {
            id: 'disbursement-control',
            title: <FormattedMessage id="disbursement_control" />,
            type: 'item',
            url: '#',
            icon: IconCreditCard,
            breadcrumbs: false
        }
    ]
};
