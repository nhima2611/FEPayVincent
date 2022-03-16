// material-ui
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import User1 from 'assets/images/users/user-round.svg';
import { faker } from '@faker-js/faker';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    borderRadius: '10px',
    '&:hover': {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = () => {
    const theme = useTheme();

    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const chipErrorSX = {
        ...chipSX,
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light,
        marginRight: '5px'
    };

    const chipWarningSX = {
        ...chipSX,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light
    };

    const chipSuccessSX = {
        ...chipSX,
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light,
        height: 28
    };

    return (
        <List
            sx={{
                width: 430,
                maxWidth: 430,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {[0, 1, 2, 3, 4, 5, 6].map((item) => (
                <ListItemWrapper key={item}>
                    <ListItem alignItems="center">
                        <ListItemAvatar>
                            <Avatar alt="John Doe" src={User1} />
                        </ListItemAvatar>
                        <ListItemText primary="Nguyen Van A submitted a ticket" />
                        <ListItemSecondaryAction>
                            <Grid container justifyContent="flex-end">
                                <Grid item xs={12}>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        2 min ago
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Grid container direction="column" className="list-container">
                        <Grid item xs={12} sx={{ pb: 2 }}>
                            <Typography variant="subtitle2">{faker.lorem.paragraph()}</Typography>
                        </Grid>
                    </Grid>
                </ListItemWrapper>
            ))}
        </List>
    );
};

export default NotificationList;
