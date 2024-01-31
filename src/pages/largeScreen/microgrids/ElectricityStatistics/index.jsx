import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";

const ElectricityStatistics = () => {
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const data = {
                area: ['1/3', '1/4', '1/5', '1/6', '1/7', '1/8', '1/9'],
                legend: ['储能充电量', '储能放电量', '光伏发电量', '充电桩充电量'],
                data: [
                    [1320, 1302, 901, 634, 1390, 1330, 1320, 1000, 500],
                    [320, 302, 301, 334, 390, 330, 320, 100, 50],
                    [320, 302, 301, 334, 390, 330, 320, 100, 50],
                    [320, 302, 301, 334, 390, 330, 320, 100, 50],
                    [320, 302, 301, 334, 390, 330, 320, 100, 50],
                    [320, 302, 301, 334, 390, 330, 320, 100, 50],
                    [320, 302, 301, 334, 390, 330, 320, 100, 50]
                ]
        }
        const colors = ['#03B4B4', '#7F87FF', '#F09B14', '#1DA3FF']
        const option = {
            color: colors,
            legend: {
                top: 10,
                left: 200,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    fontSize: 14,
                    color: 'white',
                    padding: [3, 0, 0, 0]
                },
                data: data.legend
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '13%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: 'white'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(150, 164, 244, 0.3)'
                    },
                    width: 5
                },
                axisTick: {
                    show: false,
                },
                data: data.area
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'white'
                },
                axisLine: {
                    lineStyle: {
                        color: '#96A4F4'
                    },
                    width: 5
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(150, 164, 244, 0.3)'
                    }
                },
            },
            series: [
        
            ]
        };
        for (var i = 0; i < data.legend.length; i++) {
            option.series.push({
                name: data.legend[i],
                type: 'bar',
                stack: '总量',
                barWidth: '45%',
                label: {
                    show: false,
                    position: 'insideRight'
                },
                data: data.data[i]
            })
        }
        setOptions(option);
    };

    useEffect(() => {
        getOptions();
    }, []);
    
    return <ReactECharts option={options} style={{height: '100%'}} />;
}

export default ElectricityStatistics;