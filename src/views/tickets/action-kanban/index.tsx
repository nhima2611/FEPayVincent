import { Box, Button, InputAdornment, OutlinedInput } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import { IconPlus, IconSearch } from '@tabler/icons';
import DownloadIcon from 'assets/images/icons/download.svg';
import TransferIcon from 'assets/images/icons/transfer.svg';
import TrashIcon from 'assets/images/icons/trash.svg';
import UploadIcon from 'assets/images/icons/upload.svg';
import { map } from 'lodash';
import { Link } from 'react-router-dom';

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

    return (
        <Box>
            <div style={{ marginLeft: 8, marginBottom: 8 }}>Kanban</div>
            <Box sx={{ display: 'flex' }}>
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
                        sx={{ minWidth: 32, padding: 0, marginX: 1, mb: 1 }}
                    >
                        <img src={icon} alt="" />
                    </Button>
                ))}

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{}}>
                    <OutlineInputStyle
                        id="input-search-header"
                        // value={'value'}
                        // onChange={(e) => setValue(e.target.value)}
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
                    Add Ticket
                </Button>
            </Box>
        </Box>
    );
};

export default ActionKanban;
