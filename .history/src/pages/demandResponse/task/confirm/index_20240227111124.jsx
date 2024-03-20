import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { getWaitConfirmTasks as getWaitConfirmTasksServer } from "@/services/task";
import "./index.less";
import { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Confirm = () => {
    const getTasks = async () => {
        const res = await getWaitConfirmTasksServer();
        if (res?.data?.status == "SUCCESS") {
        }
    };

    const options = {
        legend: {
            data: ["预计基线负荷（kW）", "签约响应量（kW）", "任务量（kW）"],
        },
        grid: {
            top: '15%'
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
            },
        },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {},
            },
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            // prettier-ignore
            data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45'],
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: "{value} W",
            },
            axisPointer: {
                snap: true,
            },
        },
        visualMap: {
            show: false,
            dimension: 0,
            pieces: [
                {
                    lte: 6,
                    color: "green",
                },
                {
                    gt: 6,
                    lte: 8,
                    color: "red",
                },
                {
                    gt: 8,
                    lte: 14,
                    color: "green",
                },
                {
                    gt: 14,
                    lte: 17,
                    color: "red",
                },
                {
                    gt: 17,
                    color: "green",
                },
            ],
        },
        series: [
            {
                name: "预计基线负荷（kW）",
                type: "line",
                smooth: true,
                // prettier-ignore
                data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
                markArea: {
                    itemStyle: {
                        color: 'rgba(255, 173, 177, 0.4)'
                    },
                    data: [
                        [
                            {
                                name: 'Morning Peak',
                                xAxis: '07:30'
                            },
                            {
                                xAxis: '10:00'
                            }
                        ],
                        [
                            {
                                name: 'Evening Peak',
                                xAxis: '17:30'
                            },
                            {
                                xAxis: '21:15'
                            }
                        ]
                    ]
                }
            },
            {
                name: "签约响应量（kW）",
                type: "line",
                smooth: true,
                // prettier-ignore
                data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            },
            {
                name: "任务量（kW）",
                type: "line",
                smooth: true,
                // prettier-ignore
                data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            },
        ],
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="confirm-task">
            <div className="wait-confirm">
                <div className="title">待处理任务</div>
                <div className="content">
                    <div className="desc">
                        <div>
                            <div className="name">响应类型</div>
                            <div className="value">削峰</div>
                        </div>
                        <div>
                            <div className="name">任务功率（kW）</div>
                            <div className="value">35</div>
                        </div>
                        <div>
                            <div className="name">预计收益（元）</div>
                            <div className="value">2385</div>
                        </div>
                    </div>
                    <div className="time">
                        <div>响应时间：2023/12/31 15:00 - 2023/12/31 15:30</div>
                        <div>确认截止时间：2023/12/30 15:00</div>
                    </div>
                    <div className="btns">
                        <Button>查看详情</Button>
                        <Space>
                            <Button type="primary" danger>
                                拒绝
                            </Button>
                            <Button type="primary">确认响应</Button>
                        </Space>
                    </div>
                </div>
            </div>
            <div className="response-suggest">
                <div className="title">响应建议</div>
                <div className="content">
                    <div className="expected">
                        <div className="name">预计执行成功率</div>
                        <div className="percent">95%</div>
                        <div className="suggest">建议参与响应</div>
                    </div>
                    <div className="illustrate">
                        <div className="name">响应说明</div>
                        <div className="value">
                            响应成功率为根据响应能力及响应历史行为得出，高于60%建议确认响应
                        </div>
                    </div>
                </div>
            </div>
            <div className="curve">
                <div className="title">用电曲线</div>
                <div className="content" style={{ pa }}>
                    <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
        </div>
    );
};

export default Confirm;
