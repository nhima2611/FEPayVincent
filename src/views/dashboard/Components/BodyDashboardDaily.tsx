// material-ui
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { gridSpacing } from 'store/constant';
import CardChart from './CardChart';
import CardInfo from './CardInfo';
import ChannelDetail from './ChannelDetail';
import RepaymentControl from './RepaymentControl';

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
                    <FormattedMessage id="all_channel_transaction" />
                </Typography>
                <Grid container spacing={gridSpacing}>
                    {_.map(['total_transactions', 'total_offline', 'total_online'], (item) => (
                        <Grid item xs={12} lg={3} sm={6} key={item}>
                            <CardInfo
                                title={<FormattedMessage id={item} />}
                                value={Math.floor(Math.random() * 1000000)}
                                percentValue={Math.floor(-200 + Math.random() * (200 + 1 - -200))}
                                yesterdayValue={Math.floor(Math.random() * 1000)}
                                color={theme.palette.error.main}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12} lg={3} sm={6}>
                        <CardChart
                            datas={[
                                { value: Math.floor(Math.random() * 1000000), name: 'Offline' },
                                { value: Math.floor(Math.random() * 1000000), name: 'Online' }
                            ]}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h3" sx={{ mb: 3 }}>
                    <FormattedMessage id="all_channel_repayment" />
                </Typography>
                <Grid container spacing={gridSpacing}>
                    {_.map(['total_e_wallet', 'total_l2b', 'total_auto_deduct', 'total_cash'], (item) => (
                        <Grid item xs={12} lg={3} sm={6} key={item}>
                            <CardInfo
                                title={<FormattedMessage id={item} />}
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
                    <FormattedMessage id="all_channel_bucket" />
                </Typography>
                <Grid container spacing={gridSpacing}>
                    {_.map(['total_pre_due', 'total_b1', 'total_b2', 'total_b3_b6'], (item) => (
                        <Grid item xs={12} lg={3} sm={6} key={item}>
                            <CardInfo
                                title={<FormattedMessage id={item} />}
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
                    <Grid item xs={12} md={8}>
                        <RepaymentControl title={<FormattedMessage id="repayment_control" />} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <ChannelDetail isLoading={isLoading} title={<FormattedMessage id="channel_detail" />} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default BodyDashboardDaily;
