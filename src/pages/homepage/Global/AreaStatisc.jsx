import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { theme as antdTheme } from "antd";
import { useSelector } from "umi";

const AreaStatisc = ({ dataSource }) => {
    const { token } = antdTheme.useToken();
    const [options, setOptions] = useState({});
    const { theme } = useSelector(state => state.global);

    const getOptions = () => {
        const y = dataSource?Object.keys(dataSource):[];
        const x = y.map(name => dataSource[name]);
        setOptions({
            color: ["#9E87FF", "#73DDFF", "#fe9a8b"],
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
                    barWidth: 25,
                    label: {
                        show: true,
                        position: "right",
                        color: token.color11
                    },
                    itemStyle: {
                        barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）
                    },
                    data: x,
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
