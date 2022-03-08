// material-ui
import { useTheme } from '@mui/material/styles';
import { EChartsOption, PieSeriesOption } from 'echarts';
import ReactEcharts from 'echarts-for-react';
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ===========================|| REVENUE CHART CARD ||=========================== //
interface Props {
    datas?: PieSeriesOption['data'];
}
const CardOnlineChart = ({ datas }: Props) => {
    const theme = useTheme();
    const option: EChartsOption = {
        grid: {
            left: '0',
            right: '0',
            top: '0',
            bottom: '0'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            left: 'left',
            orient: 'vertical'
        },
        series: [
            {
                type: 'pie',
                color: ['#F1C40F', '#f8d54866'],
                radius: ['40%', '80%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 8,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter: (val: any) => `${val.percent}%`,
                    color: '#333'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                },
                data: datas
            }
        ]
    };
    return (
        <MainCard
            boxShadow
            shadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
            contentSX={{ padding: '0px 0px !important', height: '100%' }}
            sx={{ height: '160px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)', border: '1px solid #E5E5E5 !important' }}
        >
            <ReactEcharts style={{ width: '100%', height: '160px' }} option={option} />
        </MainCard>
    );
};

export default CardOnlineChart;
