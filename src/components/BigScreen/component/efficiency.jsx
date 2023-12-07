import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";

const Efficiency = () => {
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const data = [50, 40, 30, 20, 10];
        const xData = ['设备型号1', '设备型号2', '设备型号3', '设备型号4', '设备型号5'];
        setOptions({
            grid: {
                left: '10',
                right: '30',
                bottom: '-10',
                top: '10',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function(params) {
                    return "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                    params[0].seriesName + ' : ' + Number(params[0].value).toLocaleString() + ' %<br/>'
                }
            },
            backgroundColor: 'rgb(20,28,52)',
            xAxis: {
                show: false,
                type: 'value'
            },
            yAxis: [
              {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    textStyle: {
                        color: '#ffffff',
                        fontSize: '12'
                    },
                    formatter: function(value) {
                        return `NO.${value}`
                    },
                },
                data: [1,2,3,4,5]
            },
            {
                type: 'category',
                inverse: true,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    },
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                data: xData
            }],
            series: [{
                    name: '充放电效率',
                    type: 'bar',
                    zlevel: 1,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 10,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#006888'
                            }, {
                                offset: 1,
                                color: '#00f58a'
                            }]),
                        },
                    },
                    barWidth: 10,
                    data
                },
                {
                    name: '',
                    type: 'bar',
                    barWidth: 10,
                    barGap: '-100%',
                    data: new Array(data?.length).fill(100),
                    itemStyle: {
                        normal: {
                            color: 'rgba(24,31,68,1)',
                            barBorderRadius: 10,
                        }
                    },
                },
            ]
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <ReactECharts option={options} style={{height: '100%'}} />
    );
}

export default Efficiency;