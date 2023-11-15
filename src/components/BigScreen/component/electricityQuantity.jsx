import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { theme } from "antd";

const ElectricityQuantity = () => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
      const yData = [200,400,500,400,300,100,400]
        setOptions({
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
                  type: "pictorialBar",
                  label: {
                      show: true, 
                      position: ['20', '-30'],
                      color: '#01E4FF',
                      fontSize: 14
                  },
                  symbolSize: [40, 20],
                  symbolOffset: [0, 10],
                  z: 12,
                  itemStyle: { 
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                              offset: 0,
                              color: "rgba(31,155,255,1)"
                          },
                          {
                              offset: 1,
                              color: "rgba(0,229,255,1)"
                          }
                      ])
                  },
                  data: yData
              },
              {
                  type: 'bar',
                  barWidth: 40,
                  barGap: '0%',
                  itemStyle: { 
                      color: {
                          "x": 0,
                          "y": 0,
                          "x2": 0,
                          "y2": 1,
                          "type": "linear",
                          "global": false,
                          "colorStops": [{
                              "offset": 0, 
                              "color": "rgba(0,229,255,0.5)"
                          }, {
                              "offset": 1, 
                              "color": "#1F9BFF"
                          }]
                      }
                  },
                  data: yData
              },
              {
                  type: "pictorialBar",
                  symbolSize: [40, 20],
                  symbolOffset: [0, -10],
                  z: 12,
                  symbolPosition: "end",
                  itemStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                              offset: 0,
                              color: "rgba(31,155,255,1)"
                          },
                          {
                              offset: 1,
                              color: "rgba(0,229,255,1)"
                          }
                      ], false)
                  },
                  data: yData
              }
          ]
          });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{height: '100%'}} />;
};

export default ElectricityQuantity