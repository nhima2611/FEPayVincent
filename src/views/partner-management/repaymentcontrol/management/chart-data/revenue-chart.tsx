import { Props } from 'react-apexcharts';

// ==============================|| WIDGET - REVENUE CHART ||============================== //

const chartData: Props = {
    height: 228,
    type: 'donut',
    options: {
        chart: {
            id: 'revenue-chart'
        },
        dataLabels: {
            enabled: true
        },
        labels: ['Daily Limit', 'Monthly Limit'],
        colors: ['#2F80ED', '#BB6BD9'],
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
