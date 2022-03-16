import { Box, Button, InputAdornment, OutlinedInput, Stack, Tooltip, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import { IconDownload, IconPlus, IconSearch, IconTrash, IconUpload, IconUser } from '@tabler/icons';
import TableContext from 'contexts/TableContext';
import useAuth from 'hooks/useAuth';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

const ActionPartner = ({ onClickUser, urlAddTicket, onClickDownload, onUploadFile, onClickTrash }) => {
    const theme = useTheme();
    const { user } = useAuth();

    const [{ selectedIds }] = useContext(TableContext);

    const [value, setValue] = useState<string>('');

    useEffect(() => {
        eventEmitter.emit('SEARCH_TICKET_LIST', { value });
    }, [value]);

    const handleFileSelect = (event) => {
        onUploadFile?.(event.target.files[0]);
    };

    const renderActionList = () => (
        <>
            <Typography sx={{ mb: 1 }}>{`Partner List - ${_.keys(selectedIds).length} Selected`}</Typography>
            <Stack direction="row" spacing={1.5} sx={{ marginBottom: 1 }}>
                <Tooltip title="Download">
                    <Button sx={{ ...styles.btn, minWidth: 36, padding: 0 }} variant="outlined" onClick={onClickDownload}>
                        <IconDownload size={18} />
                    </Button>
                </Tooltip>

                <Tooltip title="Upload">
                    <label style={{ display: 'flex' }} htmlFor="contained-button-file">
                        <Input
                            accept=".xlsx, .xls, .csv"
                            type="file"
                            id="contained-button-file"
                            onChange={handleFileSelect}
                            onClick={(e: any) => {
                                e.target.value = null;
                            }}
                        />
                        <Button sx={{ ...styles.btn, minWidth: 36, padding: 0 }} component="span" variant="outlined">
                            <IconUpload size={18} />
                        </Button>
                    </label>
                </Tooltip>

                <Tooltip title="Delete">
                    <Button onClick={onClickTrash} sx={{ ...styles.btn, minWidth: 36, padding: 0 }} variant="outlined">
                        <IconTrash size={18} />
                    </Button>
                </Tooltip>

                <Tooltip title="Toggle Mode">
                    <Button sx={{ ...styles.btn, minWidth: 36, padding: 0 }} variant="outlined" onClick={onClickUser}>
                        <IconUser size={18} />
                    </Button>
                </Tooltip>

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
                    variant="outlined"
                    sx={{ borderColor: '#E5E5E5', color: '#008345', borderRadius: 2, height: 36, fontSize: 12, fontWeight: 'bold' }}
                    startIcon={<IconPlus color="#008345" size={18} />}
                    component={Link}
                    to={urlAddTicket}
                >
                    Add New
                </Button>
            </Stack>
        </>
    );

    return renderActionList();
};

export default ActionPartner;

const styles = {
    btn: {
        borderColor: '#E5E5E5',
        height: 36
    }
};
