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
                data: ["发电量"],
                left: "right",
            },
            xAxis: {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yAxis: {
                type: "value",
            },
            grid: {
                left: "5%",
                right: "0%",
                bottom: "0%",
                containLabel: true,
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: "bar",
                    name: "发电量",
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
                    <ReactECharts
                        option={options}
                        style={{ width: "calc(100% - 25px)", height: "100%" }}
                    />
                </div>
            }
        />
    );
};

export default Index;
