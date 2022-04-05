// material-ui
import { Grid, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useMemo } from 'react';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    marginBottom: 8,
    borderRadius: '10px',
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = ({ data, onClickItem }: { data: any; onClickItem: (item: any) => void }) => {
    const theme = useTheme();

    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const newData = useMemo(
        () =>
            data.reduce((acc, cur) => {
                return acc.concat(_.get(cur, 'data'));
            }, []),
        [data]
    );
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
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {_.map(newData, (item) => (
                <ListItemWrapper
                    key={item.id}
                    sx={{ backgroundColor: item.is_readed === 0 ? 'rgba(0, 131, 69, 0.05)' : '#fff' }}
                    onClick={(e) => onClickItem(item)}
                >
                    <ListItem alignItems="center" sx={{ mb: 1 }}>
                        <ListItemText primary={_.get(item, 'title', '')} />
                        <ListItemSecondaryAction>
                            <Typography variant="caption">{moment(_.get(item, 'created_at', new Date())).fromNow()}</Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Grid container direction="column">
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">{_.get(item, 'message', '')}</Typography>
                        </Grid>
                    </Grid>
                </ListItemWrapper>
            ))}
            {Boolean(newData.length === 0) && (
                <Box alignItems="center">
                    <Typography variant="caption" fontStyle="italic">
                        *Empty Notification
                    </Typography>
                </Box>
            )}
        </List>
    );
};

export default NotificationList;
