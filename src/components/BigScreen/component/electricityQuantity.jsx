import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { theme } from "antd";

const ElectricityQuantity = () => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const cData = [300,400,500,400,300,100,400];
        const fData = [200,300,400,300,200,200,300]
        setOptions({
            grid: {
                left: 40,
                top: 10,
                bottom: 60,
                right: 5
            },
            legend: {
                icon: "rect",
                itemWidth: 30,
                itemHeight: 20,
                top: 0,
                right: 5,
                data: [
                    {
                        name: '充电',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "#01B4F0"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(0,0,0,0)"
                                }
                            ], false)
                        },
                        textStyle: {
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    {
                        name: '放电',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "#DDC72C"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(0,0,0,0)"
                                }
                            ], false)
                        },
                        textStyle: {
                            color: 'rgba(0,0,0,0)'
                        }
                    }
                ]
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
                  name: '充电',
                  type: "bar",
                  barWidth: 30,
                  barGap: 0,
                  itemStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                              offset: 0,
                              color: "#01B4F0"
                          },
                          {
                              offset: 1,
                              color: "rgba(0,0,0,0)"
                          }
                      ], false)
                  },
                  data: cData
              },
              {
                name: '放电',
                type: "bar",
                barWidth: 30,
                barGap: 0,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "#DDC72C"
                        },
                        {
                            offset: 1,
                            color: "rgba(0,0,0,0)"
                        }
                    ], false)
                },
                data: fData
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