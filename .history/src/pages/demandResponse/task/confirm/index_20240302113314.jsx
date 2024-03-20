import { Button, Space, Badge } from "antd";
import { getWaitConfirmTasks as getWaitConfirmTasksServer } from "@/services/task";
import "./index.less";
import { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];
import { CheckCircleOutlined } from "@ant-design/icons";

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
            top: "10%",
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
            data: [
                "13:00",
                "13:15",
                "13:30",
                "13:45",
                "14:00",
                "14:15",
                "14:30",
                "14:45",
                "15:00",
                "15:15",
                "15:30",
                "15:45",
                "16:00",
            ],
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: "{value} kW",
            },
            axisPointer: {
                snap: true,
            },
        },
        series: [
            {
                name: "预计基线负荷（kW）",
                type: "line",
                smooth: true,
                data: [8532, 19231, 32643, 32763, 39232, 41204, 40401.6, 38804, 35804, 32811, 160, 150, 130],
                symbol: "none",
                lineStyle: {
                    width: 5,
                    shadowColor: "rgba(158,135,255, 0.3)",
                    shadowBlur: 10,
                    shadowOffsetY: 20,
                },
                itemStyle: {
                    normal: {
                        color: colorList[0],
                        borderColor: colorList[0],
                    },
                },
                // markArea: {
                //     itemStyle: {
                //         color: "rgba(255, 173, 177, 0.4)",
                //     },
                //     data: [
                //         [
                //             {
                //                 name: "Morning Peak",
                //                 xAxis: "07:30",
                //             },
                //             {
                //                 xAxis: "10:00",
                //             },
                //         ],
                //         [
                //             {
                //                 name: "Evening Peak",
                //                 xAxis: "17:30",
                //             },
                //             {
                //                 xAxis: "21:15",
                //             },
                //         ],
                //     ],
                // },
            },
            {
                name: "签约响应量（kW）",
                type: "line",
                smooth: true,
                symbol: "none",
                data: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
                lineStyle: {
                    width: 5,
                    shadowColor: "rgba(115,221,255, 0.3)",
                    shadowBlur: 10,
                    shadowOffsetY: 20,
                },
                itemStyle: {
                    normal: {
                        color: colorList[1],
                        borderColor: colorList[1],
                    },
                },
            },
            {
                name: "任务量（kW）",
                type: "line",
                smooth: true,
                symbol: "none",
                data: [120, 110, 0, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60],
                lineStyle: {
                    width: 5,
                    shadowColor: "rgba(254,154,139, 0.3)",
                    shadowBlur: 10,
                    shadowOffsetY: 20,
                },
                itemStyle: {
                    normal: {
                        color: colorList[2],
                        borderColor: colorList[2],
                    },
                },
            },
        ],
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="confirm-task">
            <div className="wait-confirm">
                <div className="title">
                    {/* <Badge count={5}>待处理任务</Badge> */}
                    <div>任务要求</div>
                    <div className="company">江苏海四达动力科技有限公司 </div>
                </div>
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
                    {/* <div className="btns">
                        <Button>查看详情</Button>
                        <Space>
                            <Button type="primary" danger>
                                拒绝
                            </Button>
                            <Button type="primary">确认响应</Button>
                        </Space>
                    </div> */}
                </div>
            </div>
            <div className="response-suggest">
                <div className="title">执行结果</div>
                <div className="content">
                    <div className="expected">
                        <div className="name">执行情况</div>
                        <div className="percent">成功</div>
                        {/* <div className="suggest">建议参与响应</div> */}
                    </div>
                    <div className="illustrate">
                        <div className="name">执行说明</div>
                        <div className="value">
                            <div>
                                <CheckCircleOutlined className="check-icon" />
                                响应时段最大负荷不高于基线最大负荷
                            </div>
                            <div>
                                <CheckCircleOutlined className="check-icon" />
                                响应差值大于等于响应能力确认值的 60%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="curve">
                <div className="title">用电曲线</div>
                <div className="content" style={{ paddingTop: "30px" }}>
                    <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
        </div>
    );
};

export default Confirm;
