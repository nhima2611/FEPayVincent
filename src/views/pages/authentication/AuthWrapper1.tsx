// material-ui
import { styled } from '@mui/material/styles';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light,
    backgroundImage: 'url(images/img_bg_login.png)',
    backgroundSize: 'cover',
    minHeight: '100vh'
}));

export default AuthWrapper1;
