import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import Card from "../Card";

const Index = () => {
    const [options, setOptions] = useState({});

    const getOptions = () => {
        setOptions({
            tooltip: {
                trigger: "item",
            },
            legend: {
                orient: "vertical",
                right: 10,
                top: 20,
                bottom: 20,
                data: data.legendData,
            },
            series: [
                {
                    name: "Access From",
                    type: "pie",
                    radius: ["70%", "80%"],

                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: "#fff",
                        borderWidth: 2,
                    },
                    label: {
                        show: false,
                        position: "center",
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: "bold",
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        { value: 1, name: "正常" },
                        { value: 2, name: "故障" },
                        { value: 3, name: "断链" },
                    ],
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <Card
            title="电站状态"
            content={<ReactECharts option={options} style={{ width: "100%", height: "100%" }} />}
        />
    );
};

export default Index;
