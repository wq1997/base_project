
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useState, useEffect } from "react";

const SocChart = () => {
    const [options, setOptions] = useState({});
    const getOptions = () => {
        setOptions({
            tooltip: {
              trigger: "axis",
              axisPointer: { type: "shadow" },
              // formatter:'{c}' ,
            },
            grid: {
              left: "0",
              top: "30",
              right: "15",
              bottom: "10",
              containLabel: true,
            },
            legend: {
              data: ["当前SOC", "AI策略SOC"],
              right: "center",
              top: 0,
              textStyle: {
                color: "#fff",
              },
              itemWidth: 12,
              itemHeight: 10,
              // itemGap: 35
            },
   
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                axisLabel: {
                  // rotate: -90,
                  textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12,
                  },
                },
                axisLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)",
                  },
                },
   
                data: [
                  "1:00",
                  "2:00",
                  "3:00",
                  "4:00",
                  "5:00",
                  "6:00",
                  "7:00",
                  "8:00",
                  "9:00",
                  "10:00",
                  "11:00",
                  "12:00",
                ],
              },
              {
                axisPointer: { show: false },
                axisLine: { show: false },
                position: "bottom",
                offset: 20,
              },
            ],
   
            yAxis: [
              {
                type: "value",
                axisTick: { show: false },
                // splitNumber: 6,
                axisLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)",
                  },
                },
                axisLabel: {
                  formatter: "{value} %",
                  textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 14,
                  },
                },
   
                splitLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)",
                  },
                },
              },
            ],
            series: [
              {
                name: "当前SOC",
                type: "line",
                smooth: true,
                symbol: "circle",
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    color: "rgba(228, 228, 126, 1)",
                    width: 2,
                  },
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: "rgba(228, 228, 126, .2)",
                        },
                        {
                          offset: 1,
                          color: "rgba(228, 228, 126, 0)",
                        },
                      ],
                      false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)",
                  },
                },
                itemStyle: {
                  normal: {
                    color: "rgba(228, 228, 126, 1)",
                    borderColor: "rgba(228, 228, 126, .1)",
                    borderWidth: 12,
                  },
                },
                data: [
                  12.5, 14.4, 16.1, 14.9, 20.1, 17.2, 17.0, 13.42, 20.12, 18.94,
                ],
              },
              {
                name: "AI策略SOC",
                type: "line",
                smooth: true,
                symbol: "circle",
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    color: "rgba(255, 128, 128, 1)",
                    width: 2,
                  },
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: "rgba(255, 128, 128,.2)",
                        },
                        {
                          offset: 1,
                          color: "rgba(255, 128, 128, 0)",
                        },
                      ],
                      false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)",
                  },
                },
                itemStyle: {
                  normal: {
                    color: "rgba(255, 128, 128, 1)",
                    borderColor: "rgba(255, 128, 128, .1)",
                    borderWidth: 12,
                  },
                },
                data: [
                  0, 0.1, 6.6, 11.2, 42.1, 26.0, 20.2, 18.31, 21.59, 24.42, 34.03,
                  32.9,
                ],
              },
            ],
          });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{height: "100%"}} />;
};

export default SocChart;