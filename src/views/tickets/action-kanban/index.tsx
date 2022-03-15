import { Box, Button, InputAdornment, Menu, MenuItem, OutlinedInput, Stack, IconButton, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import { IconArrowsLeftRight, IconDownload, IconPlus, IconSearch, IconTrash, IconUpload, IconUserPlus } from '@tabler/icons';
import TableContext from 'contexts/TableContext';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
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

const Input = styled('input')({
    display: 'none'
});

const ActionKanban = ({ onClickTransfer, urlAddTicket, onClickDownload, onUploadFile, onClickTrash }) => {
    const theme = useTheme();
    const { mode } = useSelector((state) => state.kanban);
    const [{ selectedIds }] = useContext(TableContext);

    const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
    const handleClick = (event: SyntheticEvent) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [value, setValue] = useState<string>('');

    useEffect(() => {
        eventEmitter.emit('SEARCH_TICKET_LIST', { value });
    }, [value]);

    const handleFileSelect = (event) => {
        onUploadFile?.(event.target.files[0]);
    };

    const renderActionList = () => (
        <>
            <Typography sx={{ mb: 1 }}>{`My Ticket List - ${_.keys(selectedIds).length} Selected`}</Typography>
            <Stack direction="row" spacing={1.5} sx={{ marginBottom: 1 }}>
                <Button sx={{ ...styles.btn, minWidth: 36, padding: 0 }} variant="outlined" onClick={onClickTransfer}>
                    <IconArrowsLeftRight size={18} />
                </Button>

                <Button sx={{ ...styles.btn, minWidth: 36, padding: 0 }} variant="outlined" onClick={onClickDownload}>
                    <IconDownload size={18} />
                </Button>

                <label style={{ display: 'flex' }} htmlFor="contained-button-file">
                    <Input accept=".xlsx, .xls, .csv" type="file" id="contained-button-file" onChange={handleFileSelect} />
                    <Button sx={{ ...styles.btn, minWidth: 36, padding: 0 }} component="span" variant="outlined">
                        <IconUpload size={18} />
                    </Button>
                </label>

                <Button onClick={onClickTrash} sx={{ ...styles.btn, minWidth: 36, padding: 0 }} variant="outlined">
                    <IconTrash size={18} />
                </Button>

                <Box sx={{ flexGrow: 1 }} />

                <Box>
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
                    disabled={!_.keys(selectedIds).length}
                    variant="outlined"
                    sx={{ ...styles.btn, borderRadius: 2, height: 36, fontSize: 12, fontWeight: 'bold' }}
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
        </>
    );

    const renderActionKanban = () => (
        <>
            <Typography sx={{ mb: 1 }}>Kanban</Typography>
            <Stack direction="row" spacing={1.5} sx={{ marginBottom: 1 }}>
                <Button sx={{ ...styles.btn, minWidth: 36, padding: 0 }} variant="outlined" onClick={onClickTransfer}>
                    <IconArrowsLeftRight size={18} />
                </Button>
                <Button
                    variant="outlined"
                    sx={{ ...styles.btn, borderRadius: 2, fontSize: 12, fontWeight: 'bold' }}
                    startIcon={<IconPlus color="#008345" size={18} />}
                    component={Link}
                    to={urlAddTicket}
                >
                    Add Ticket
                </Button>
            </Stack>
        </>
    );
    return mode === 'kanban' ? renderActionKanban() : renderActionList();
};

export default ActionKanban;

const styles = {
    btn: {
        borderColor: '#E5E5E5',
        height: 36
    }
};
