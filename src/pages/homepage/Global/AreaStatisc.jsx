import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { theme as antdTheme } from "antd";
import { useSelector } from "umi";
import * as echarts from "echarts";

const colorList = [['#FFC35F', '#FF3725'], ['#FF82A1', '#C416F8'], ['#79FBFF', '#3595FF']];

const AreaStatisc = ({ dataSource }) => {
    const { token } = antdTheme.useToken();
    const [options, setOptions] = useState({});
    const { theme } = useSelector(state => state.global);

    const getOptions = () => {
        const y = dataSource?Object.keys(dataSource):[];
        const x = y.map(name => dataSource[name]);
        setOptions({
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: null,
                },
                formatter: "{b} : {c}",
            },
            grid: {
                left: "3%",
                right: "4%",
                top: "10%",
                containLabel: true,
            },
            xAxis: [
                {
                    type: "value",
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                },
            ],
            yAxis: [
                {
                    type: "category",
                    boundaryGap: true,
                    data: y,
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: token.colorPrimary
                        }
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        color: token.color11
                    }
                },
            ],
            series: [
                {
                    type: "bar",
                    barWidth: 20,
                    gap:15,
                    label: {
                        show: true,
                        position: "right",
                        color: token.color11
                    },
                    itemStyle: {
                        barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下)
                    },
                    data: x.map((xItem, index) => {
                        return {
                            value: xItem,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        1, 0, 0, 0, [
                                            {
                                                offset: 0,
                                                color: colorList?.[index]?.[0]||token.colorPrimary
                                            },
                                            {
                                                offset: 1,
                                                color: colorList?.[index]?.[1]||token.colorPrimary
                                            }
                                        ]
                                    )
                                }
                            }
                        }
                    }),
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, [theme, dataSource]);

    return <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />;
};

export default AreaStatisc;
