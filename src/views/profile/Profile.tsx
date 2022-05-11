import PropTypes from 'prop-types';

// material-ui
import {
    Box,
    Checkbox,
    Button,
    CardContent,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Stack,
    Typography,
    TextField,
    InputLabel
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';

// project imports
import useAuth from 'hooks/useAuth';
import Avatar from 'ui-component/extended/Avatar';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// assets// material-ui
import { useTheme } from '@mui/material/styles';
import { IconEdit, IconSettings } from '@tabler/icons';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';

import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import axios from 'axios';

// import Avatar3 from 'assets/images/users/avatar-3.png';
// progress
function LinearProgressWithLabel({ value, ...others }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    mr: 1
                }}
            >
                <LinearProgress value={value} {...others} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number
};

// personal details table
/** names Don&apos;t look right */
function createData(name, calories, fat, color) {
    return { name, calories, fat, color };
}

// ==============================|| PROFILE 1 - PROFILE ||============================== //

const Profile1 = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const rowsDetail = [
        createData('Full Name', ':', user?.fullname!, null),
        createData(
            'Status',
            ':',
            user?.status == '1' ? 'Active' : 'Deactive',
            user?.status == '1'
                ? { color: theme.palette.primary.main, fontWeight: 600 }
                : { color: theme.palette.error.main, fontWeight: 600 }
        ),
        createData('Phone', ':', user?.phone, null),
        createData('Email', ':', user?.email, null),
        createData('Last Login', ':', format(new Date(user?.last_login!), 'yyyy/MM/dd'), null)
    ];

    const profilePage = () => {
        window.location.href = '/UserProfile';
    };
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [active, setActive] = useState('');
    const [email, setEmail] = useState('');
    if (user?.partner) {
        setFullName(user?.partner.fullName);
        setPhone(user?.partner.phone);
        setActive(user?.partner.status);
        setEmail(user?.partner.email);
    }

    // const [address, setAddress] = useState(address);
    // const [code, setCode] = useState(user?.code);

    // const handleSubmit = (event) => {
    // event.preventDefault();
    // const dataUpdate = new FormData();
    // dataUpdate.append('fullName', fullName ?? user?.fullname);
    // dataUpdate.append('phone', phone ?? user?.phone);
    // dataUpdate.append('fullName', email ?? user?.email);
    // dataUpdate.append('address', address);

    //     editProfile();
    // };
    const fetch = async (id) => {
        try {
            const res = await axios.get(`https://payment-api2.neotime.vn/v1/users`);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetch(user?.id);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={4} xs={12}>
                <SubCard
                    title={
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>{/* <Avatar alt="User 1" src={Avatar3} /> */}</Grid>
                            <Grid style={{ display: 'flex' }} item xs zeroMinWidth>
                                <Chip
                                    sx={{
                                        height: '48px',
                                        alignItems: 'center',
                                        borderRadius: '27px',
                                        transition: 'all .2s ease-in-out',
                                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                                        backgroundColor: 'transparent'
                                    }}
                                    icon={
                                        <Avatar
                                            src="https://i.pravatar.cc/300"
                                            sx={{
                                                ...theme.typography.mediumAvatar,
                                                margin: '8px 0 8px 8px !important',
                                                cursor: 'pointer'
                                            }}
                                        />
                                    }
                                />
                                <div style={{ display: 'inline-block' }}>
                                    <Typography align="left" variant="subtitle2">
                                        {user?.fullname}
                                    </Typography>
                                    {'\n'}
                                    <Typography variant="subtitle1">{user?.role}</Typography>
                                </div>
                            </Grid>
                            <Grid item>
                                <Chip size="small" label="USER PROFILE" color="primary" />
                            </Grid>
                        </Grid>
                    }
                >
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItemButton>
                            <ListItemIcon>
                                <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Email</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    {user?.email}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <PhonelinkRingTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Phone</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    {user?.phone}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <PinDropTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Location</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    Melbourne
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                    </List>
                </SubCard>
            </Grid>
            <Grid item lg={8} xs={12}>
                <Grid container direction="column" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <SubCard title="Personal Infomation">
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table
                                            sx={{
                                                '& td': {
                                                    borderBottom: 'none'
                                                }
                                            }}
                                            size="small"
                                        >
                                            <TableBody>
                                                {rowsDetail.map((row) => (
                                                    <TableRow key={row.name}>
                                                        <TableCell variant="head">{row.name}</TableCell>
                                                        <TableCell>{row.calories}</TableCell>
                                                        <TableCell sx={row.color}>{row.fat}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item lg={4} xs={12} />
            {/* {user?.partner ? ( */}
            <Grid item lg={8} xs={12}>
                <Grid container direction="column" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <SubCard
                            title="Partner Infomation Edit"
                            secondary={
                                <AnimateButton>
                                    <Button variant="contained">Update Profile</Button>
                                </AnimateButton>
                            }
                        >
                            <form onSubmit={(e) => console.log(1)}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Stack direction="row" alignItems="center">
                                            <Grid item xs={8}>
                                                <Stack spacing={1}>
                                                    <InputLabel sx={{ color: theme.palette.primary.main, fontWeight: '600' }}>
                                                        Full Name
                                                    </InputLabel>
                                                    <Grid item xs={7}>
                                                        <TextField
                                                            type="text"
                                                            id="outlined-basic7"
                                                            name="fullName"
                                                            size="small"
                                                            fullWidth
                                                            value={fullName}
                                                            onChange={(e) => setFullName(e.target.value)}
                                                        />
                                                    </Grid>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Stack spacing={1}>
                                                    <InputLabel sx={{ color: theme.palette.primary.main, fontWeight: '600' }}>
                                                        Status
                                                    </InputLabel>
                                                    <TextField
                                                        type="text"
                                                        id="outlined-basic7"
                                                        name="status"
                                                        size="small"
                                                        value={active != '1' ? 'Active' : 'Deactive'}
                                                        disabled
                                                        fullWidth
                                                    />
                                                </Stack>
                                            </Grid>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack direction="row" alignItems="center">
                                            <Grid item xs={8}>
                                                <Stack spacing={1}>
                                                    <InputLabel sx={{ color: theme.palette.primary.main, fontWeight: '600' }}>
                                                        Email
                                                    </InputLabel>
                                                    <Grid item xs={7}>
                                                        <TextField
                                                            type="text"
                                                            id="outlined-basic7"
                                                            name="fullName"
                                                            size="small"
                                                            fullWidth
                                                            value={fullName}
                                                            onChange={(e) => setFullName(e.target.value)}
                                                        />
                                                    </Grid>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Stack spacing={1}>
                                                    <InputLabel sx={{ color: theme.palette.primary.main, fontWeight: '600' }}>
                                                        Phone
                                                    </InputLabel>
                                                    <TextField type="text" id="outlined-basic7" name="status" size="small" fullWidth />
                                                </Stack>
                                            </Grid>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </form>
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid>
            {/* ) : null} */}
        </Grid>
    );
};

export default Profile1;
