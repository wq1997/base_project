import { useState, useEffect, useRef } from "react";
import { Button, DatePicker, Space, message } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import Card from "../Card";
import dayjs from "dayjs";
import { getPowerGeneration as getPowerGenerationServer } from "@/services/overview";
import classnames from "classnames";

const Index = ({ activePlant }) => {
    const dateRef = useRef();
    const [sum, setSum] = useState();
    const [type, setType] = useState("DAY");
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [options, setOptions] = useState({});

    const btns = [
        { name: "日", type: "DAY" },
        { name: "月", type: "MONTH" },
        { name: "年", type: "YEAR" },
        { name: "生命期", type: "TOTAL" },
    ];

    const getPowerGeneration = async () => {
        if (type != "TOTAL" && !date) return message.info("请先选择日期");
        const res = await getPowerGenerationServer({
            id: activePlant,
            type,
            date,
        });
        if (res?.data?.code == 200) {
            const { sum, chart } = res?.data?.data;
            getOptions(chart || {});
            setSum(sum);
        }
    };

    const getOptions = data => {
        setOptions({
            legend: {
                data: [`光伏发电${type == "DAY" ? "功率" : "量"}`],
                textStyle: {
                    color: "#999",
                    fontSize: 12,
                },
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    label: {
                        backgroundColor: "#6a7985",
                    },
                },
            },
            xAxis: {
                type: "category",
                data: Object.keys(data)?.sort((a, b) => {
                    return dayjs(`2024-06-05 ${a}`).unix() - dayjs(`2024-06-05 ${b}`).unix();
                }),
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: "#999",
                    showMaxLabel: true,
                },
                axisLine: {
                    lineStyle: {
                        color: "#999",
                    },
                },
            },
            yAxis: {
                type: "value",
                name: type == "DAY" ? "kW" : "kWh",
                axisLabel: {
                    color: "#999",
                },
                axisLine: {
                    lineStyle: {
                        color: "#999",
                        type: "dashed",
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(0,0,0,0.1)",
                        width: 1,
                        type: "dashed",
                    },
                },
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
                    data: Object.values(data),
                    type: type == "DAY" ? "line" : "bar",
                    name: `光伏发电${type == "DAY" ? "功率" : "量"}`,
                    barWidth: 20,
                    smooth: true,
                    showSymbol: false,
                    itemStyle: {
                        color:
                            type != "DAY"
                                ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                      { offset: 0, color: "#79E6FC" },
                                      { offset: 1, color: "#4499F5" },
                                  ])
                                : "#4499F5",
                    },
                },
            ],
        });
    };

    useEffect(() => {
        if (!activePlant) return setOptions({});
        getPowerGeneration();
    }, [activePlant]);

    const changeType = type => {
        setType(type);
        dateRef.current = undefined;
        setDate();
    };

    return (
        <Card
            title="能量管理"
            others={
                <div className={styles.powerGeneration} style={{ textAlign: "center" }}>
                    <Space>
                        {btns?.map(item => (
                            <div
                                className={classnames(
                                    styles.btn,

                                    item?.type == type ? styles.active : ""
                                )}
                                onClick={() => changeType(item?.type)}
                            >
                                {item.name}
                            </div>
                        ))}

                        {type != "TOTAL" && (
                            <DatePicker
                                style={{
                                    background: "#FFF",
                                    color: "rgba(0,0,0,0.35)",
                                }}
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
                        <div
                            className={classnames(styles.btn, styles.search)}
                            onClick={getPowerGeneration}
                        >
                            查询
                        </div>
                    </Space>
                </div>
            }
            content={
                <div style={{ height: "100%", position: "relative" }}>
                    <span
                        style={{
                            color: "#666",
                            fontSize: "12px",
                            position: "absolute",
                            right: "20px",
                        }}
                    >
                        {type == "TOTAL"
                            ? "总"
                            : `当${btns?.find(item => item.type == type)?.name}`}
                        发电量(截止目前)：{sum}kWh
                    </span>
                    <ReactECharts
                        option={options}
                        notMerge={true}
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
            }
        />
    );
};

export default Index;
