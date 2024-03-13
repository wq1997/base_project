import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { theme as antdTheme } from "antd";
import { useSelector } from "umi";

const TimeIncomeChart = () => {
    const { token } = antdTheme.useToken();
    const { theme } = useSelector(state => state.global);
    const [options, setOptions] = useState({});

    const getOptions = () => {
        const xAxisData = [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
        ];
        const data = [46250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        setOptions({
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
                formatter: function(params) {
                    return params[0].name + '<br>' + params[0].value + ' 元';
                }
            },
            xAxis: {
                type: "category",
                data: xAxisData,
                axisLabel: {
                    color: token.color11
                }
            },
            yAxis: {
                type: "value",
                name: '元',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: [token.color25]
                    }
                },
                axisLabel: {
                    color: token.color11
                }
            },
            grid: {
                left: 50,
                right: 50,
                bottom: 20,
            },
            series: [
                {
                    data,
                    type: "bar",
                    barWidth: 40,
                    itemStyle: {
                        barBorderRadius: [8, 8, 0, 0], // 圆角（左上、右上、右下、左下）
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: token.color23
                        }, {
                            offset: 1,
                            color: token.color24
                        }], false),
                    },
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, [theme]);

    return <ReactECharts option={options} style={{ height: "100%" }} />;
};

export default TimeIncomeChart;
