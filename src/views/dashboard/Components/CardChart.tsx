// material-ui
import { useTheme } from '@mui/material/styles';
// third party
import Chart, { Props as ChartProps } from 'react-apexcharts';
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ===========================|| REVENUE CHART CARD ||=========================== //

const CardChart = ({ chartData }: { chartData: ChartProps }) => {
    const theme = useTheme();

    return (
        <MainCard contentSX={{ padding: '0px 0px !important', height: '100%' }} sx={{ height: '160px' }}>
            <Chart {...chartData} />
        </MainCard>
    );
};

export default CardChart;
