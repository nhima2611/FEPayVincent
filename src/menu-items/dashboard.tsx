import { IconHome } from '@tabler/icons';
import { FormattedMessage } from 'react-intl';

export const dashboard: any = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    type: 'item',
    url: '/dashboard',
    icon: IconHome,
    breadcrumbs: false
};
