import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { theme } from "antd";

const SOH = () => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
        setOptions({
          grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          },
          series: [
            {
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              center: ['50%', '75%'],
              radius: '150%',
              min: 0,
              max: 1,
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  width: 6,
                  color: [
                    [0.25, '#FF6E76'],
                    [0.5, '#FDDD60'],
                    [0.75, '#58D9F9'],
                    [1, '#7CFFB2']
                  ]
                }
              },
              pointer: {
                length: '50%',
                offsetCenter: [0, '-10%'],
              },
              title: {
                offsetCenter: [0, '20%'],
                fontSize: 20,
                color: 'white'
              },
              detail: {
                show: false
              },
              data: [
                {
                  value: 0.7,
                  name: 'SOH'
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
        </div>
    );
};

export default SOH