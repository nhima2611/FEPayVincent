import { Divider, List, Typography } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
import { ROLE } from 'constants/auth';
import useAuth from 'hooks/useAuth';
import { dashboard } from 'menu-items/dashboard';
import { partnerManagement } from 'menu-items/partner-management';
import { ticketPartner } from 'menu-items/ticket-partner';
import { tickets } from 'menu-items/tickets';
import { userManagement } from 'menu-items/user-management';
import { ReactNode, useEffect, useState } from 'react';
import { GenericCardProps } from 'types';
import NavCollapse from '../NavCollapse';
// project imports
import NavItem from '../NavItem';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

export interface NavGroupProps {
    item: {
        id?: string;
        type?: string;
        icon?: GenericCardProps['iconPrimary'];
        children?: NavGroupProps['item'][];
        title?: ReactNode | string;
        caption?: ReactNode | string;
        color?: 'primary' | 'secondary' | 'default' | undefined;
    };
}

const NavGroup = ({ item }: NavGroupProps) => {
    const theme = useTheme();
    const { user } = useAuth();
    const menuTicket = user?.user_type === 2 ? ticketPartner : tickets;

    const [childrenItem, setChildrenItem] = useState<any>(item.children);

    useEffect(() => {
        if (user?.user_type === 2) {
            if (user?.role === ROLE.PARTNER) setChildrenItem([userManagement, menuTicket]);
            else setChildrenItem([menuTicket]);
        } else if (user?.role === ROLE.SUPER_ADMIN) {
            setChildrenItem([dashboard, partnerManagement, userManagement, menuTicket, ...childrenItem]);
        } else setChildrenItem([menuTicket]);
    }, []);

    // menu list collapse & items
    const items = childrenItem?.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <>
            <List
                subheader={
                    item.title && (
                        <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                            {item.title}
                            {item.caption && (
                                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                {items}
            </List>

            {/* group divider */}
            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
        </>
    );
};

export default NavGroup;
