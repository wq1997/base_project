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
            color: [barColor, '#FAC958'],
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
              data: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00', '07:00', '08:00','09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
            },
            yAxis: {
              type: 'value',
              name: 'MWh'
            },
            series: [
              {
                name: '预测负荷量',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                showSymbol: false,
 smooth: true,
                data: [1000, 3200,3000, 1000, 800, 600, 1200, 1400, 1500, 1600, 4200, 4400, 4000, 1200, 1300, 1200, 4000, 2000, 1000, 3000,2000,1000, 800, 600],
                areaStyle: {
                  opacity: 0.8,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: barColor
                    },
                    {
                      offset: 1,
                      color: 'white'
                    }
                  ])
                }
              },
              {
                name: '实际负荷量',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                showSymbol: false,
                smooth: true,
                data: [1000, 3100,2900, 900, 700, 500, 1100, 1300, 1200, 1500, 3000, 3800, 3900, 1100, 1500, 1100, 3900, 1900, 700, 2500, 1400, 600, 400, 100],
                areaStyle: {
                  opacity: 0.8,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#FAC958'
                    },
                    {
                      offset: 1,
                      color: 'white'
                    }
                  ])
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