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
            legend: {
                data: ["中标容量", "实际响应", "评价指数"],
            },
            tooltip: {
                trigger: "axis",
            },
            legend: {
                data: ["2023-10-01", "2023-10-02", "2023-10-03", "2023-10-04", "2023-10-05"],
            },
            grid: {
                left: "3%",
                right: "6%",
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
                data: ["2023-06", "2023-07", "2023-08", "2023-09", "2023-10"],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    name: "江苏海四达动力科技有限公司",
                    type: "line",
                    stack: "Total",
                    data: [120, 132, 101, 134, 90, 230, 210],
                },
                {
                    name: "连云港华乐不锈钢有限公司",
                    type: "line",
                    stack: "Total",
                    data: [220, 182, 191, 234, 290, 330, 310],
                },
                {
                    name: "苏州京浜光电科技有限公司",
                    type: "line",
                    stack: "Total",
                    data: [150, 232, 201, 154, 190, 330, 410],
                },
                {
                    name: "江苏海四达新能源有限公司",
                    type: "line",
                    stack: "Total",
                    data: [320, 332, 301, 334, 390, 330, 320],
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
