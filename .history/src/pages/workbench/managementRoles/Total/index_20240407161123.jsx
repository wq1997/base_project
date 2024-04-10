import React, { useState } from "react";
import { Select, Radio, theme } from "antd";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import styles from "./index.less";
import classNames from "classnames";

const Total = () => {
    const { token } = theme.useToken();
    const [type, setType] = useState("week");

    const allWorkorders = [
        { name: "在途异常工单", value: "1", color: token.color4 },
        { name: "在途其他工单", value: "37", color: token.color5 },
    ];

    const myWorkorders = [
        { name: "发起工单数", value: "128", color: token.color6 },
        { name: "已执行总数", value: "128", color: token.color7 },
    ];

    const options = {
        color: [token.color8, token.color10],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {
            textStyle: {
                color: token.color1,
            },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data:
                    type == "week"
                        ? ["04-02", "04-03", "04-04", "04-05", "04-06", "04-07", "04-08", "04-09"]
                        : ["1月", "2月", "3月", "4月"],
            },
        ],
        yAxis: [
            {
                type: "value",
                splitLine: {
                    lineStyle: {
                        color: [token.color9],
                    },
                },
            },
        ],
        series: [
            {
                name: "进行中",
                type: "bar",
                stack: "Ad",
                barWidth: 40,
                data:type == "week" ? [8, 6, 2, 10, 5, 2, 4, 3]:[]
            },
            {
                name: "已完成",
                type: "bar",
                stack: "Ad",
                barWidth: 40,
                data: [6, 5, 0, 5, 2, 5, 3, 7],
            },
        ],
    };

    return (
        <div className={styles.total}>
            <div className={classNames(styles.all, styles.workorders)}>
                <div className={"title"}>全部在途工单</div>
                <div className={styles.content}>
                    {allWorkorders.map(item => (
                        <div className={styles.order}>
                            <span>{item.name}</span>
                            <span className={styles.value} style={{ color: item.color }}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={classNames(styles.my, styles.workorders)}>
                <div className={"title"}>我发起的</div>
                <div className={styles.content}>
                    {myWorkorders.map(item => (
                        <div className={styles.order}>
                            <span>{item.name}</span>
                            <span className={styles.value} style={{ color: item.color }}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.taskBoard}>
                <div className={"title"}>
                    <span>任务过程看板</span>
                    <Radio.Group defaultValue={type} onChange={e => setType(e.target.value)}>
                        <Radio.Button value="week">周</Radio.Button>
                        <Radio.Button value="month">月</Radio.Button>
                    </Radio.Group>
                </div>
                <div className={styles.content}>
                    <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
        </div>
    );
};

export default Total;
