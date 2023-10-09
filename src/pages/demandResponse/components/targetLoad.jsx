import ReactECharts from 'echarts-for-react';
import { useState, useEffect } from 'react';
import { theme } from 'antd';

const TargetLoad = () => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});

    useEffect(()=>{
        setOptions({
            color: ['#95D38D', '#1E8DFF', token.colorPrimary],
            grid: {
                left: 40,
                bottom: 30,
            },
            legend: {
              data: ['基线负荷', '目标负荷', '运行监测负荷'],
              right: 10,
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
              type: 'category',
              boundaryGap: false
            },
            yAxis: {
              type: 'value',
              name: 'MW'
            },
            series: [
              {
                name: '基线负荷',
                type: 'line',
                smooth: 0.6,
                symbol: 'none',
                lineStyle: {
                  color: '#95D38D',
                  width: 2
                },
                data: [
                  ['09:00', 1],
                  ['10:00', 2],
                  ['11:00', 3],
                  ['12:00', 2],
                  ['13:00', 1],
                  ['14:00', 4],
                  ['15:00', 6],
                  ['16:00', 4],
                  ['17:00', 2]
                ]
              },
               {
                name: '目标负荷',
                type: 'line',
                smooth: 0.6,
                symbol: 'none',
                lineStyle: {
                  color: '#1E8DFF',
                  width: 2
                },
                data: [
                  ['09:00', 2],
                  ['10:00', 2],
                  ['11:00', 1],
                  ['12:00', 3],
                  ['13:00', 3],
                  ['14:00', 4],
                  ['15:00', 6],
                  ['16:00', 4],
                  ['17:00', 1]
                ]
              },
              {
                name: '运行监测负荷',
                type: 'line',
                smooth: 0.6,
                symbol: 'none',
                lineStyle: {
                  color: token.colorPrimary,
                  width: 2
                },
                data: [
                  ['09:00', 4],
                  ['10:00', 2],
                  ['11:00', 1],
                  ['12:00', 5],
                  ['13:00', 2],
                  ['14:00', 4],
                  ['15:00', 4],
                  ['16:00', 2],
                  ['17:00', 7]
                ]
              }
            ]
        })
    }, [])
    return (
        <ReactECharts option={options} style={{width: '760px', height: '400px'}}/>
    )
}

export default TargetLoad;