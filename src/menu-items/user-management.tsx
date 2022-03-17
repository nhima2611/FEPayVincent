import { IconLayout2 } from '@tabler/icons';
import { FormattedMessage } from 'react-intl';

export const userManagement = {
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
};
