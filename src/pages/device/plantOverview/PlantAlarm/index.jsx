import { useState, useEffect } from "react";
import { Button, message, theme as antdTheme } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import Card from "../Card";
import * as echarts from "echarts";

const colorList = [
    ["#D901FF", "#FD709A"],
    ["#FF180F", "#FFA16B"],
    ["#FA9B0E", "#F8D461"],
    ["#019AFC", "#43E8FE"],
];

const Index = ({ data }) => {
    const { token } = antdTheme.useToken();
    const [alarms, setAlarms] = useState([
        {
            value: 0,
            name: "紧急",
            key: "urgent",
            color: "linear-gradient( 316deg, #EE7B97 0%, #C72AF6 100%)",
        },
        {
            value: 0,
            name: "重要",
            key: "important",
            color: "linear-gradient( 316deg, #EA3323 0%, #F3AE7C 100%)",
        },
        {
            value: 0,
            name: "次要",
            key: "minor",
            color: "linear-gradient( 186deg, #F2D674 0%, #EC9B37 100%)",
        },
        {
            value: 0,
            name: "提示",
            key: "prompt",
            color: "linear-gradient( 206deg, #79E6FC 0%, #4499F5 100%)",
        },
    ]);
    const [options, setOptions] = useState({});

    const getOptions = _alarms => {
        setOptions({
            tooltip: {
                trigger: "item",
            },
            legend: {
                show: false,
            },
            series: [
                {
                    name: "Access From",
                    type: "pie",
                    radius: ["65%", "75%"],
                    avoidLabelOverlap: false,
                    padAngle: _alarms?.length > 1 ? 2 : 0,
                    itemStyle: {
                        borderColor: "#fff",
                        borderWidth: 0,
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
                    data: _alarms?.map((item, index) => {
                        return {
                            ...item,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                        {
                                            offset: 0,
                                            color: colorList?.[index]?.[0] || token.colorPrimary,
                                        },
                                        {
                                            offset: 1,
                                            color: colorList?.[index]?.[1] || token.colorPrimary,
                                        },
                                    ]),
                                },
                            },
                        };
                    }),
                },
            ],
        });
    };

    useEffect(() => {
        const _alarms = alarms?.map(item => ({
            ...item,
            value: data?.[item.key] || 0,
        }));
        setAlarms(_alarms);
        getOptions(_alarms);
    }, [data]);

    return (
        <Card
            title="活动告警"
            content={
                <div style={{ height: "100%", display: "flex" }}>
                    <div style={{ flex: 2, position: "relative" }}>
                        <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textAlign: "center",
                            }}
                        >
                            <div
                                className={styles.totalCount}
                                style={{
                                    fontSize: 30,
                                    fontFamily: "DingTalkJinBuTi",
                                    color: "#49A2F8",
                                    textAlign: "center",
                                }}
                            >
                                {alarms?.reduce((prev, curr) => +prev + +curr?.value, 0)}
                            </div>
                            <div className={styles.totalText} style={{color: token.descriptionColor}}>
                                告警总数
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            height: "80%",
                            margin: "auto",
                        }}
                    >
                        {alarms?.map(item => (
                            <div className={styles.legend}>
                                <div
                                    style={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        background: item.color,
                                    }}
                                ></div>
                                <div className={styles.name} style={{color: token.descriptionColor}}> {item.name}</div>
                                <div className={styles.value} style={{color: token.color1}}>{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        />
    );
};

export default Index;