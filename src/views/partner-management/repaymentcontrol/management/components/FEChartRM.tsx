import { EChartsOption } from 'echarts';
import ReactEcharts from 'echarts-for-react';
import React from 'react';

const FEChartRM = () => {
    const option: EChartsOption = {
        polar: {
            radius: [30, '100%']
        },
        angleAxis: {
            max: 100,
            startAngle: 90,
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
        },
        radiusAxis: {
            type: 'category',
            data: ['Daily', 'Monthly'],
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
        },
        tooltip: {},
        colorBy: 'data',
        series: {
            type: 'bar',
            data: [25, 85],
            color: ['#3D83EA', '#285598'],

            coordinateSystem: 'polar',
            label: {
                show: true,
                position: 'middle', // or 'start', 'insideStart', 'end', 'insideEnd'
                formatter: '{c}%'
            }
        }
    };

    return <ReactEcharts option={option} />;
};

export default React.memo(FEChartRM);
