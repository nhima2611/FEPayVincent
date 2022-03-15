import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';
import { map } from 'lodash';
// third party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { gridSpacing } from 'store/constant';
// project imports
import Avatar from 'ui-component/extended/Avatar';

// ==============================|| DATA WIDGET - TASKS CARD ||============================== //

const datas = [
    {
        id: 1,
        desc: 'Nguyen Tuan Truong solved the ticket',
        date: '13/03/2022 - 8:30'
    },
    {
        id: 2,
        desc: 'Nguyen Tuan Truong solved the ticket',
        date: '13/03/2022 - 8:30'
    },
    {
        id: 3,
        desc: 'Nguyen Tuan Truong solved the ticket',
        date: '13/03/2022 - 8:30'
    }
];

const TasksCard = () => (
    <PerfectScrollbar style={{ width: '100%', minHeight: 200, overflowX: 'hidden' }}>
        {map(datas, (item, index) => (
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
                            height: 300,
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
                                    <Typography sx={{ fontSize: 10 }}>{item.desc}</Typography>
                                    <Typography sx={{ fontSize: 10 }}>{item.date}</Typography>
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
