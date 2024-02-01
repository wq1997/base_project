import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { addColorAlpha } from "@/utils/utils";

const PowerCurve = () => {
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const data = {
                area: ['1/3', '1/4', '1/5', '1/6', '1/7', '1/8', '1/9'],
                legend: ['策略生成', '当前执行', 'VPP调度计划', '负荷预测功率'],
                data: [
                    [200, 400, 400, 300, 500, 600, 100],
                    [100, 400, 400, 300, 500, 400, 300],
                    [200, 300, 500, 400, 300, 500, 700],
                    [300, 500, 600, 700, 600, 500, 400],
                    [400, 400, 400, 500, 600, 700, 800],
                    [500, 302, 401, 334, 200, 400, 300],
                    [600, 500, 301, 301, 500, 600, 800]
                ]
        }
        const colors = ['#03B4B4', '#EB8B21', '#EE3059', '#109CE8']
        const option = {
            color: colors,
            legend: {
                top: 0,
                right: 0,
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
                left: 0,
                right: 0,
                bottom: 0,
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
                data: data.area,
                // boundaryGap: false,
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
                splitNumber: 4
            },
            series: [
        
            ]
        };
        for (var i = 0; i < data.legend.length; i++) {
            option.series.push({
                name: data.legend[i],
                type: 'line',
                smooth: true,
                symbolSize:0,
                areaStyle: {
                    normal: {
                       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                           { offset: 0,  color: colors[i]}, 
                           { offset: 0.7,  color: addColorAlpha(colors[i], 0.3)}
                       ], false),
    
                 }
             },
            data: data.data[i]}
        )};
        setOptions(option);
    };

    useEffect(() => {
        getOptions();
    }, []);
    
    return <ReactECharts option={options} style={{height: '100%'}} />;
}

export default PowerCurve;