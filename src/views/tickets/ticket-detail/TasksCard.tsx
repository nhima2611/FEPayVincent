import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';
import { IconPoint } from '@tabler/icons';
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
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography sx={{ fontSize: 10 }}>{`${item?.user_fullname} ${item?.content}`}</Typography>
                                    <Typography sx={{ fontSize: 10 }}>{moment(item?.created_at).format('DD/MM/YYYY - HH:mm a')}</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        ))}
    </PerfectScrollbar>
);

export default TasksCard;
