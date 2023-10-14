import ReactECharts from 'echarts-for-react';
import { useState, useEffect } from 'react';
import * as echarts from "echarts";
import { addColorAlpha } from "@/utils/utils";
import { theme } from "antd";

const BarStatistical = () => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const barColor = addColorAlpha(token.colorPrimary, 1);
    const getOptions = () => {
        setOptions({
            color: barColor,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              right: 10,
              top: 10
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: 10,
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['06:00', '07:00', '08:00','09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
            },
            yAxis: {
              type: 'value',
              name: 'MWh'
            },
            series: [
              {
                name: '申报量',
                type: 'bar',
                barWidth: 30,
                stack: 'total',
                emphasis: {
                  focus: 'series'
                },
                data: [2,6,4,2,4,2,5,4,2,3,6,4,1],
                itemStyle: {
                    barBorderRadius:  [5, 5, 0, 0],
                    color: new echarts.graphic.LinearGradient(
                        0, 1, 0, 0,
                        [
                            {offset: 1, color: barColor},
                            {offset: 0, color: 'white'}
                        ]                
                    )
                }
              }
            ]
          })
    }

    useEffect(()=>{
        getOptions();
    }, [])
    
    return (
        <ReactECharts option={options} style={{height: 400}}/>
    )
}

export default BarStatistical;