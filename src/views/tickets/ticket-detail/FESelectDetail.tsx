import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { IconCaretDown } from '@tabler/icons';
import { SyntheticEvent, useEffect, useState } from 'react';

interface Props {
    title: string;
    status?: any;
    data: any;
    onDataSelect?: (val: any) => void;
    disabled?: boolean;
}
const FESelectDetail = ({ title, status, data = {}, onDataSelect, disabled }: Props) => {
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [val, setVal] = useState<any>();

    useEffect(() => {
        setVal(status);
    }, [status]);

    useEffect(() => {
        Boolean(val) && onDataSelect?.({ [_.toLower(title)]: _.toNumber(val) });
    }, [val]);

    const handleClick = (event: SyntheticEvent) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickItem = (item: any) => {
        handleClose();
        setVal(item);
    };
    return (
        <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography sx={{ fontWeight: 700, color: '#4C4C4C' }}>{title}:</Typography>
            <Button sx={{ padding: 0, color: '#999999' }} onClick={handleClick} endIcon={<IconCaretDown />} disabled={disabled}>
                {_.get(data, [val], 'Choose')}
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
                {_.map(data, (key, value) => (
                    <MenuItem key={value} value={value} onClick={() => onClickItem(value)}>
                        {key}
                    </MenuItem>
                ))}
            </Menu>
        </Stack>
    );
};

export default FESelectDetail;
