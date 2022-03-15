// material-ui
import { Box } from '@mui/material';
// project import
import MainCard, { MainCardProps } from 'ui-component/cards/MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }: MainCardProps) => (
    <MainCard
        boxShadow
        shadow="0px 4px 16px rgba(0, 0, 0, 0.25)"
        sx={{
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.25)',
            border: '1px solid #CCCCCC',
            borderRadius: '24px',
            maxWidth: { xs: 450, lg: 420 },
            margin: { xs: 1.5, md: 3 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        content={false}
        {...other}
    >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
);

export default AuthCardWrapper;
