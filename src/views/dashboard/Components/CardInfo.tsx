import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';
// project imports
import AnimatedNumber from 'animated-number-react';
import numeral from 'numeral';
import MainCard from 'ui-component/cards/MainCard';

// ============================|| HOVER DATA CARD ||============================ //

interface CardInfoProps {
    title?: string;
    value?: number | any;
    percentValue?: number | any;
    yesterdayValue?: number | any;
    color?: string;
}

const DURATION = 500;
const CardInfo = ({ title, color, value, percentValue, yesterdayValue }: CardInfoProps) => {
    const arrowUpwardIcon = <ArrowUpwardIcon fontSize="small" sx={{ width: 16, height: 16, color }} />;
    const arrowDownwardIcon = <ArrowDownwardIcon fontSize="small" sx={{ width: 16, height: 16, color }} />;
    const numberValue = (val: number) => (
        <AnimatedNumber value={val} formatValue={(res) => numeral(res).format('0,0')} duration={DURATION} />
    );
    return (
        <MainCard contentSX={{ padding: '16px 12px !important' }}>
            <Grid container justifyContent="space-between" direction="column">
                <Grid item sm={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="inherit" color="inherit" sx={{ fontSize: 12, lineHeight: '28px', fontWeight: 700 }}>
                                {title}
                            </Typography>
                        </Box>
                        <Box>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <Typography variant="inherit" sx={{ fontSize: 12, lineHeight: '28px', color }}>
                                    {numberValue(percentValue)}%
                                </Typography>
                                {Boolean(percentValue > 0) && arrowUpwardIcon}
                                {Boolean(percentValue < 0) && arrowDownwardIcon}
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
                <Grid item sm={12} textAlign="center" sx={{ my: '16px' }}>
                    <Typography variant="inherit" color="inherit" sx={{ fontSize: 26, lineHeight: '40px', fontWeight: 700, color }}>
                        {numberValue(value)}
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: 10, lineHeight: '28px' }}>
                        <b>Yesterday: </b>
                        {numberValue(yesterdayValue)}
                    </Typography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CardInfo;
