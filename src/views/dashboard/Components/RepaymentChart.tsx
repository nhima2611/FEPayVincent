import { useTheme } from '@mui/material/styles';
import { EChartsOption } from 'echarts';
import ReactEcharts from 'echarts-for-react';
import React from 'react';

interface Props {
    data?: any[];
    dataType?: any[];
}

const RepaymentChart = ({ data = [], dataType = [] }: Props) => {
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
            data: dataType,
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
            // show: false,
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
        series: [
            {
                data: [
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000)
                ],
                type: 'bar',
                name: 'Cash',
                color: '#27ae60cc',
                barGap: 0.1,
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    borderRadius: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 5
                }
            },
            {
                data: [
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000)
                ],
                type: 'bar',
                name: 'E-Wallet',
                barGap: 0.1,
                color: '#FF0015',
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    borderRadius: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 5
                }
            },
            {
                data: [
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000)
                ],
                type: 'bar',
                name: 'l2B/M2B',
                barGap: 0.1,
                color: '#2F80ED',
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    borderRadius: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 5
                }
            },
            {
                data: [
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000),
                    Math.floor(Math.random() * 1000000)
                ],
                type: 'bar',
                name: 'ATM/CDM',
                barGap: 0.1,
                color: '#2f80ed99',
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    borderRadius: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 5
                }
            }
        ]
    };
    return <ReactEcharts option={option} />;
};

export default React.memo(RepaymentChart);
