import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { theme } from "antd";

const HOC = () => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
        setOptions({
            grid: {
                top: 0
            },
            tooltip: {
              formatter: '{c}%'
            },
            series: [
              {
                name: 'SOC',
                type: 'gauge',
                axisLine: {
                    lineStyle: {
                        color: [[1, 'white']]
                    },
                },
                progress: {
                  show: true,
                  itemStyle: {
                    color: '#FDFD01'
                  }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                // 仪表盘指针样式
                itemStyle: {
                    color: 'white'
                },
                detail: {
                  valueAnimation: true,
                  formatter: '{value}',
                  color: 'white',
                  offsetCenter: [0, '60%']
                },
                data: [
                  {
                    value: 80,
                  }
                ]
              }
            ]
          });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <div style={{height: '100%'}}>
            <ReactECharts option={options} style={{height: '100%'}} />
            <div 
                style={{
                    color: 'white', 
                    position: 'absolute', 
                    bottom: 20, 
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
            >
                HOC
            </div>
        </div>
    );
};

export default HOC