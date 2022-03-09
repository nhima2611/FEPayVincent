import { Box, Button, InputAdornment, ListItemIcon, Menu, MenuItem, OutlinedInput, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import { IconPlus, IconSearch, IconUserPlus } from '@tabler/icons';
import DownloadIcon from 'assets/images/icons/download.svg';
import TransferIcon from 'assets/images/icons/transfer.svg';
import TrashIcon from 'assets/images/icons/trash.svg';
import UploadIcon from 'assets/images/icons/upload.svg';
import { map } from 'lodash';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'store';
import eventEmitter from 'utils/eventEmitter';

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    height: 36,
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: 100,
        // marginLeft: 4,
        background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
    }
}));

const icons = [TransferIcon, DownloadIcon, UploadIcon, TrashIcon];

const ActionKanban = ({ onClickTransfer, urlAddTicket }) => {
    const theme = useTheme();
    const { mode } = useSelector((state) => state.kanban);

    const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
    const handleClick = (event: SyntheticEvent) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [value, setValue] = useState<string>('');
    const [hasSelected, setHasSelected] = useState<boolean>(false);

    useEffect(() => {
        eventEmitter.emit('SEARCH_TICKET_LIST', { value });
    }, [value]);

    useEffect(() => {
        eventEmitter.addListener('HAS_SELECTED', onSelectedRow);
    }, []);

    const onSelectedRow = ({ isSelected }) => setHasSelected(isSelected);

    const renderActionList = () => (
        <Stack direction="row" spacing={1.5} sx={{ marginBottom: 1 }}>
            {map(icons, (icon, index) => (
                <Button
                    onClick={() => {
                        switch (index) {
                            case 0:
                                onClickTransfer();
                                break;

                            default:
                                break;
                        }
                    }}
                    key={index}
                    sx={{ minWidth: 32, padding: 0 }}
                >
                    <img src={icon} alt="" />
                </Button>
            ))}

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{}}>
                <OutlineInputStyle
                    id="input-search-header"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{ 'aria-label': 'weight' }}
                    sx={{ height: 36 }}
                />
            </Box>

            <Button
                disabled={Boolean(!hasSelected)}
                variant="outlined"
                sx={{ borderColor: '#E5E5E5', color: '#008345', borderRadius: 2, height: 36, fontSize: 12, fontWeight: 'bold' }}
                startIcon={<IconUserPlus size={18} />}
                onClick={handleClick}
            >
                Assign To
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
                <MenuItem onClick={handleClose} sx={{ color: '#008345', fontSize: 12, fontWeight: 'bold' }}>
                    Assignee
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ color: '#008345', fontSize: 12, fontWeight: 'bold' }}>
                    Supporter
                </MenuItem>
            </Menu>

            <Button
                variant="outlined"
                sx={{ borderColor: '#E5E5E5', color: '#008345', borderRadius: 2, height: 36, fontSize: 12, fontWeight: 'bold' }}
                startIcon={<IconPlus color="#008345" size={18} />}
                component={Link}
                to={urlAddTicket}
            >
                Add Ticket
            </Button>
        </Stack>
    );

    const renderActionKanban = () => (
        <Stack direction="row" spacing={1.5} sx={{ marginBottom: 1 }}>
            <Button onClick={onClickTransfer} sx={{ minWidth: 32, padding: 0 }}>
                <img src={TransferIcon} alt="" />
            </Button>
            <Button
                variant="outlined"
                sx={{ borderColor: '#E5E5E5', color: '#008345', borderRadius: 2, height: 36, fontSize: 12, fontWeight: 'bold' }}
                startIcon={<IconPlus color="#008345" size={18} />}
                component={Link}
                to={urlAddTicket}
            >
                Add Ticket
            </Button>
        </Stack>
    );
    return mode === 'kanban' ? renderActionKanban() : renderActionList();
};

export default ActionKanban;
