import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { theme } from "antd";

const Load = () => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
      const data = [400,700,300,400,500,300,200]
        setOptions({
            grid: {
                top: 10,
                bottom: 50
            },
            xAxis: {
                type: 'category',
                data: ['11/10', '11/11', '11/12', '11/13', '11/14', '11/15', '11/16'],
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: '#ffffff',
                    fontSize: 14,
                    margin: 20
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  color: 'white'
                },
                splitLine: {
                  show: false
                }
              },
            series: [
                {
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 4,
                        color: '#4F9CED'
                    }
                },
                areaStyle: { // 区域面积
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgb(78, 158, 242)' // 0% 处的颜色
                            },
                            {
                                offset: 0.2,
                                color: 'rgba(78, 158, 242, 50)' // 50% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(78, 158, 242, 0)' // 100% 处的颜色
                            }
                        ]
                    }
                },
                data,
                type: 'line'
              }
            ]
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{height: '100%'}} />;
};

export default Load;