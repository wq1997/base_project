import { useState, useEffect } from "react";
import { Button, DatePicker } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import Card from "../Card";

const Index = () => {
    const [options, setOptions] = useState({});

    const getOptions = () => {
        setOptions({
            xAxis: {
                type: "value",
    
            },
            yAxis: {
                type: "category",
                data: ["嘉蕴"],
            },
            grid: {
                left: "5%",
                right: "0%",
                top: "15%",
                bottom: "20%",
                containLabel: true,
            },
            series: [
                {
                    data: [1.41],
                    type: "bar",
                    barWidth: 20,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                            { offset: 0, color: "#FAD477" },
                            { offset: 1, color: "#EF7C18" },
                        ]),
                    },
                    label: {
                        normal: {
                            show: true,
                            position: "right",
                            formatter: "{c} kWh/kWp",
                        },
                    },
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <Card
            title="当日电站排名(等价发电时)"
            content={
                <ReactECharts
                    option={options}
                    style={{ width: "calc(100% - 25px)", height: "100%" }}
                />
            }
        />
    );
};

export default Index;
