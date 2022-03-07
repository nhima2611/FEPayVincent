import { red } from '@mui/material/colors';
import { Props } from 'react-apexcharts';
import TotalRevenueCard from 'views/dashboard/Analytics/TotalRevenueCard';

// ==============================|| WIDGET - REVENUE CHART ||============================== //

const chartData: Props = {
    height: 228,
    type: 'donut',
    options: {
        chart: {
            id: 'revenue-chart-red'
        },
        dataLabels: {
            enabled: true
        },
        labels: ['Daily Limit', 'Monthly Limit'],
        colors: ['#f44336', '#F2994A'],
        legend: {
            show: false,
            position: 'bottom',
            fontFamily: 'inherit',
            labels: {
                colors: 'inherit'
            },
            itemMargin: {
                horizontal: 10,
                vertical: 10
            }
        }
    },
    series: [75, 25]
};
export default chartData;
