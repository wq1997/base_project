import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";

const TimeIncomeChart = () => {
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
            color: ["#D97559"],
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
            },
            yAxis: {
                type: "value",
                name: '元'
            },
            grid: {
                bottom: 20,
            },
            series: [
                {
                    data,
                    type: "bar",
                    barWidth: 40,
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{ height: "100%" }} />;
};

export default TimeIncomeChart;
