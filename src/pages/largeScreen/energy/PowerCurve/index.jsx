import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";

const PowerCurve = ({plantId}) => {
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const xAxisData = ['04/04','04/05','04/06','04/08','04/09','04/10','04/11'];
        const data1 = [120, 132, 101, 134, 90, 230, 210];
        const data2 = [400,300,400,300,100,500,400];
        const data3 = [80,90,70,80,90,70,90];
        const data4 = [220, 182, 191, 234, 290, 330, 310];

        setOptions({
            color: ['#03B4B4', '#F7B03F', '#5876FF', '#CF2DE4'],
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['策略生成', '当前执行', 'VPP调度计划', '负荷预测功率'],
              textStyle: {
                color: 'white'
              },
              right: 0
            },
            grid: {
                top: 40,
                bottom: 20,
                right: 20
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              axisLine: {
                lineStyle: {
                    color: 'rgba(150, 164, 244, 0.3)'
                },
                width: 5
              },
            },
            yAxis: {
              type: 'value',
              splitLine: {
                show: true,
                lineStyle: {
                   color: 'rgba(150, 164, 244, 0.3)'
                }
              }
            },
            series: [
              {
                name: '策略生成',
                type: 'line',
                stack: 'Total',
                data: data1
              },
              {
                name: '当前执行',
                type: 'line',
                stack: 'Total',
                data: data2
              },
              {
                name: 'VPP调度计划',
                type: 'line',
                stack: 'Total',
                data: data3
              },
              {
                name: '负荷预测功率',
                type: 'line',
                stack: 'Total',
                data: data4
              },
            ]
          });
    };

    useEffect(() => {
        getOptions();
    }, [plantId]);

    return <ReactECharts option={options} style={{height: '100%'}} />;
}

export default PowerCurve;