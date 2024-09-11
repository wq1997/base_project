import { useState, useEffect } from "react";
import { Button, DatePicker } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import Card from "../Card";

const Index = () => {
    const [options, setOptions] = useState({});

    const getOptions = () => {
        setOptions({
            legend: {
                orient: 'vertical',
                left: 'left'
              },
            xAxis: {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: "bar",
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <Card
            title="发电量统计"
            content={
                <div style={{ height: "100%" }}>
                    <div style={{ textAlign: "center" }}>
                        <DatePicker size="small" style={{ marginRight: "8px" }} />
                        <Button size="small" type="primary">
                            搜索
                        </Button>
                    </div>
                    <ReactECharts option={options} style={{ width: , height: "100%" }} />
                </div>
            }
        />
    );
};

export default Index;
