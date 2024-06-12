import { useState, useEffect, useRef } from "react";
import { Button, DatePicker, Space } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import Card from "../Card";
import dayjs from "dayjs";

const Index = () => {
    const dateRef = useRef();
    const [type, setType] = useState("DAY");
    const [date, setDate] = useState();
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
                left: "2%",
                right: "2%",
                top: "15%",
                bottom: "5%",
                containLabel: true,
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: "bar",
                    name: "发电量",
                    barWidth: 20,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "#79E6FC" },
                            { offset: 1, color: "#4499F5" },
                        ]),
                    },
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    const changeType = type => {
        setType(type);
        dateRef.current = undefined;
        setDate();
    };

    return (
        <Card
            title="发电量统计"
            others={
                <div style={{ textAlign: "center" }}>
                    <Space>
                        <Button
                            size="small"
                            type={type == "DAY" ? "primary" : "dashed"}
                            onClick={() => changeType("DAY")}
                        >
                            日
                        </Button>
                        <Button
                            size="small"
                            type={type == "MONTH" ? "primary" : "dashed"}
                            onClick={() => changeType("MONTH")}
                        >
                            月
                        </Button>
                        <Button
                            size="small"
                            type={type == "YEAR" ? "primary" : "dashed"}
                            onClick={() => changeType("YEAR")}
                        >
                            年
                        </Button>
                        <Button
                            size="small"
                            type={type == "TOTAL" ? "primary" : "dashed"}
                            onClick={() => changeType("TOTAL")}
                        >
                            生命期
                        </Button>
                        {type != "TOTAL" && (
                            <DatePicker
                                style={{ background: "#FFF" }}
                                picker={
                                    {
                                        DAY: "day",
                                        MONTH: "month",
                                        YEAR: "year",
                                    }[type]
                                }
                                size="small"
                                onChange={(date, dateStr) => {
                                    dateRef.current = dateStr;
                                    setDate(dateStr);
                                }}
                                value={date ? dayjs(date) : null}
                            />
                        )}

                        <Button size="small" type="primary">
                            查询
                        </Button>
                    </Space>
                </div>
            }
            content={
                <div style={{ height: "100%" }}>
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
