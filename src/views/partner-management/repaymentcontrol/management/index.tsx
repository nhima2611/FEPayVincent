import { Grid } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { gridSpacing } from 'store/constant';
import { setMode } from 'store/slices/kanban';
import MainCard from 'ui-component/cards/MainCard';
// chart data
import chartData from './chart-data';
import LimitationListActions from './LimitationListActions';
import LimitationListStylePage1 from './List';
import RevenueChartCard from './RevenueChartCard';
import RevenueChartCardRed from './RevenueChartCardRed';

// ================================|| CHART ||================================ //
export default function ManagementPage() {
    const theme = useTheme();
    const dispatch = useDispatch();

    return (
        <>
            <Grid container spacing={gridSpacing} alignItems="center">
                <Grid item xs={12} sm={6} lg={3}>
                    <RevenueChartCard chartData={chartData.RevenueChartCardData} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <RevenueChartCard chartData={chartData.RevenueChartCardData} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <RevenueChartCardRed chartData={chartData.RevenueChartCardDataRed} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <RevenueChartCard chartData={chartData.RevenueChartCardData} />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex' }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <MainCard contentSX={{ p: 2 }}>
                                        <LimitationListActions
                                            onClickTransfer={() => dispatch(setMode())}
                                            urlAddTicket="/tickets/create-ticket"
                                        />
                                        <LimitationListStylePage1 />
                                    </MainCard>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
