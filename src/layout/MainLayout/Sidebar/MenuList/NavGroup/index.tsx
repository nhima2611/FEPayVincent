import { ReactNode, useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
import { GenericCardProps } from 'types';
import useAuth from 'hooks/useAuth';
import { ROLE } from 'constants/auth';
import { dashboard } from 'menu-items/dashboard';
import { partnerManagement } from 'menu-items/partner-management';
import { userManagement } from 'menu-items/user-management';
import { tickets } from 'menu-items/tickets';
import { ticketPartner } from 'menu-items/ticket-partner';
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
    const menuTicket = user?.role === ROLE.PARTNER ? ticketPartner : tickets;

    const [childrenItem, setChildrenItem] = useState<any>(item.children);

    useEffect(() => {
        setChildrenItem([dashboard, partnerManagement, userManagement, menuTicket, ...childrenItem]);
    }, []);

    console.log(childrenItem);

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
