import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { theme } from "antd";

const NextBar = () => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
        setOptions({
            grid: {
                top: 10,
                bottom: 35,
                right: 0
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
                  name: 'Direct',
                  type: 'bar',
                  barWidth: '60%',
                  data: [10, 52, 200, 334, 390, 330, 220],
                  itemStyle: {
                    color: '#6FD5A8'
                  }
                }
              ]
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{height: '100%'}} />;
};

export default NextBar;