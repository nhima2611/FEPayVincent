// material-ui
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import PopularCard from '../Default/PopularCard';
import CardChart from './CardChart';
import CardInfo from './CardInfo';

const BodyDashboardDaily = () => {
    const theme = useTheme();
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography variant="h3" sx={{ mb: 3 }}>
                    All Channel - Transaction
                </Typography>
                <Grid container spacing={gridSpacing}>
                    {_.map([1, 2, 3], (item) => (
                        <Grid item xs={12} lg={3} sm={6}>
                            <CardInfo
                                key={item}
                                title="Total Paid Users"
                                value={Math.floor(Math.random() * 1000000)}
                                percentValue={Math.floor(-200 + Math.random() * (200 + 1 - -200))}
                                yesterdayValue={Math.floor(Math.random() * 1000)}
                                color={theme.palette.error.main}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12} lg={3} sm={6}>
                        <CardChart
                            chartData={{
                                height: '100%',
                                type: 'donut',
                                options: {
                                    chart: {
                                        id: 'online-chart',
                                        height: '100%'
                                    },
                                    fill: {
                                        colors: ['#F1C40F', '#f8d54866']
                                    },
                                    dataLabels: {
                                        enabled: true,
                                        distributed: true
                                    },
                                    legend: {
                                        show: true,
                                        position: 'left',
                                        fontFamily: 'inherit',
                                        labels: {
                                            colors: ['#F1C40F', '#f8d54866']
                                        }
                                    },
                                    colors: ['#F1C40F', '#f8d54866'],
                                    labels: ['Offline', 'Online']
                                },
                                series: [Math.floor(Math.random() * 1000000), Math.floor(Math.random() * 1000000)]
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h3" sx={{ mb: 3 }}>
                    All Channel - Repayment
                </Typography>
                <Grid container spacing={gridSpacing}>
                    {_.map([1, 2, 3, 4], (item) => (
                        <Grid item xs={12} lg={3} sm={6}>
                            <CardInfo
                                key={item}
                                title="Total Paid Users"
                                value={Math.floor(Math.random() * 1000000)}
                                percentValue={Math.floor(-200 + Math.random() * (200 + 1 - -200))}
                                yesterdayValue={Math.floor(Math.random() * 1000)}
                                color={theme.palette.error.main}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h3" sx={{ mb: 3 }}>
                    All Channel - Bucket
                </Typography>
                <Grid container spacing={gridSpacing}>
                    {_.map([1, 2, 3, 4], (item) => (
                        <Grid item xs={12} lg={3} sm={6}>
                            <CardInfo
                                key={item}
                                title="Total Paid Users"
                                value={Math.floor(Math.random() * 1000000)}
                                percentValue={Math.floor(-200 + Math.random() * (200 + 1 - -200))}
                                yesterdayValue={Math.floor(Math.random() * 1000)}
                                color={theme.palette.error.main}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default BodyDashboardDaily;
