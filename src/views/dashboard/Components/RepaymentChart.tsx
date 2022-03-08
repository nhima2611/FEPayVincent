import { useTheme } from '@mui/material/styles';
import { BarSeriesOption, EChartsOption } from 'echarts';
import ReactEcharts from 'echarts-for-react';
import React from 'react';

interface Props {
    series?: EChartsOption['series'];
    labels?: string[];
}

const RepaymentChart = ({ series, labels }: Props) => {
    const theme = useTheme();
    const option: EChartsOption = {
        grid: {
            top: '15%',
            bottom: '10%',
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 5
        },
        legend: {
            itemGap: 20,
            itemStyle: {
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 5
            },
            icon: 'roundRect',
            orient: 'horizontal',
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack'] },
                restore: { show: false },
                saveAsImage: { show: true }
            }
        },
        xAxis: {
            type: 'category',
            data: labels,
            nameLocation: 'start',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: theme.palette.text.secondary,
                fontSize: 14,
                fontFamily: 'roboto'
            }
        },
        yAxis: {
            type: 'value',
            nameLocation: 'start',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto'
            }
        },
        series: _.map(series, (item: BarSeriesOption) => {
            return {
                type: 'bar',
                barGap: 0.1,
                color: '#2f80ed99',
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    borderRadius: 5
                },
                ...item
            };
        })
    };
    return <ReactEcharts option={option} />;
};

export default React.memo(RepaymentChart);
