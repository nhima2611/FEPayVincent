import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
// material-ui
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { map } from 'lodash';
// third party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { gridSpacing } from 'store/constant';
// project imports
import Avatar from 'ui-component/extended/Avatar';

const TasksCard = ({ data = [] }: { data: any[] }) => (
    <PerfectScrollbar style={{ width: '100%', maxHeight: 500, overflowX: 'hidden' }}>
        {map(data, (item, index) => (
            <Box sx={{ marginY: 2 }} key={index}>
                <Grid
                    container
                    spacing={gridSpacing}
                    alignItems="center"
                    sx={{
                        position: 'relative',
                        '&>*': {
                            position: 'relative',
                            zIndex: '5'
                        },
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            top: 15,
                            left: 44,
                            width: 2,
                            height: '100%',
                            background: '#ebebeb',
                            zIndex: '1'
                        }
                    }}
                >
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Avatar color="primary" size="sm">
                                    <QueryBuilderOutlinedIcon />
                                </Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container justifyContent="space-between" spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <Tooltip title={`${item?.user_fullname} ${item?.content}`}>
                                            <Typography
                                                noWrap
                                                sx={{ fontSize: 10 }}
                                            >{`${item?.user_fullname} ${item?.content}`}</Typography>
                                        </Tooltip>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Tooltip title={moment(item?.created_at).format('DD/MM/YYYY - HH:mm a')}>
                                            <Typography noWrap sx={{ fontSize: 10, textAlign: 'right' }}>
                                                {moment(item?.created_at).format('DD/MM/YYYY - HH:mm a')}
                                            </Typography>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        ))}
    </PerfectScrollbar>
);

export default TasksCard;
