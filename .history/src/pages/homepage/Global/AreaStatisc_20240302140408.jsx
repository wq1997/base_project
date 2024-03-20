import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

const AreaStatisc = () => {
    const [options, setOptions] = useState({});

    const getOptions = () => {
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
                    data: ["连云港", "苏州", "南通"],
                    axisTick: {
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
            series: [
                {
                    type: "bar",
                    barWidth: 25,
                    label: {
                        normal: {
                            show: true,
                            position: "right",
                        },
                    },
                    data: [{
                        value: 70,
                        itemStyle: {
                            normal: { color: 'blue' }
                        }},],
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />;
};

export default AreaStatisc;
