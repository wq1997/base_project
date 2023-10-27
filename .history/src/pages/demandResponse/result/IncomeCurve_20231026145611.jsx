import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { addColorAlpha } from "@/utils/utils";
import { theme } from "antd";

const BarStatistical = () => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const barColor = addColorAlpha(token.colorPrimary, 1);
    const colors = ["#5470C6", "#91CC75", "#EE6666"];
    const getOptions = () => {
        setOptions({
            tooltip: {
                trigger: "axis",
            },
            toolbox: {
                show: false,
            },
            legend: {
                data: ["2023-10-01", "2023-10-02", "Video Ads", "Direct", "Search Engine"],
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    name: "Email",
                    type: "line",
                    stack: "Total",
                    data: [120, 132, 101, 134, 90, 230, 210],
                },
                {
                    name: "Union Ads",
                    type: "line",
                    stack: "Total",
                    data: [220, 182, 191, 234, 290, 330, 310],
                },
                {
                    name: "Video Ads",
                    type: "line",
                    stack: "Total",
                    data: [150, 232, 201, 154, 190, 330, 410],
                },
                {
                    name: "Direct",
                    type: "line",
                    stack: "Total",
                    data: [320, 332, 301, 334, 390, 330, 320],
                },
                {
                    name: "Search Engine",
                    type: "line",
                    stack: "Total",
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{ height: 400 }} />;
};

export default BarStatistical;
