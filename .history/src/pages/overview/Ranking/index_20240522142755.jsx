import { useState, useEffect } from "react";
import { Button, DatePicker } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
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
                it
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
                            查询
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
