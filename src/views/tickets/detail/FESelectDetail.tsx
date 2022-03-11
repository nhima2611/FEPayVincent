import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { IconCaretDown } from '@tabler/icons';
import { SyntheticEvent, useState } from 'react';

const FESelectDetail = ({ title }) => {
    const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
    const handleClick = (event: SyntheticEvent) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography sx={{ fontWeight: 700, color: '#4C4C4C' }}>{title}:</Typography>
            <Button sx={{ padding: 0, color: '#999999' }} onClick={handleClick} endIcon={<IconCaretDown />}>
                Options
            </Button>
            <Menu
                id="menu-followers-card"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                variant="selectedMenu"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuItem onClick={handleClose}>Assignee</MenuItem>
                <MenuItem onClick={handleClose}>Supporter</MenuItem>
            </Menu>
        </Stack>
    );
};

export default FESelectDetail;
