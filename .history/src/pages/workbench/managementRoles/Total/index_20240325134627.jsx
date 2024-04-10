import { Select, Space } from "antd";
import ReactECharts from "echarts-for-react";
import "./index.less";

const Total = () => {
    const allWorkorders = [
        { name: "在途异常工单", value: "15", color: "#1098EF" },
        { name: "在途其他工单", value: "52", color: "#ED9C0D" },
    ];

    const myWorkorders = [
        { name: "发起工单数", value: "67", color: "#10EF12" },
        { name: "已执行总数", value: "55", color: "#BB09FD" },
    ];

    const options = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {},
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
        ],
        yAxis: [
            {
                type: "value",
            },
        ],
        series: [
            {
                name: "Direct",
                type: "bar",
                emphasis: {
                    focus: "series",
                },
                data: [320, 332, 301, 334, 390, 330, 320],
            },
            {
                name: "Email",
                type: "bar",
                stack: "Ad",
                emphasis: {
                    focus: "series",
                },
                data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
                name: "Union Ads",
                type: "bar",
                stack: "Ad",
                emphasis: {
                    focus: "series",
                },
                data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
                name: "Video Ads",
                type: "bar",
                stack: "Ad",
                emphasis: {
                    focus: "series",
                },
                data: [150, 232, 201, 154, 190, 330, 410],
            },
            {
                name: "Search Engine",
                type: "bar",
                data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                emphasis: {
                    focus: "series",
                },
                markLine: {
                    lineStyle: {
                        type: "dashed",
                    },
                    data: [[{ type: "min" }, { type: "max" }]],
                },
            },
            {
                name: "Baidu",
                type: "bar",
                barWidth: 5,
                stack: "Search Engine",
                emphasis: {
                    focus: "series",
                },
                data: [620, 732, 701, 734, 1090, 1130, 1120],
            },
            {
                name: "Google",
                type: "bar",
                stack: "Search Engine",
                emphasis: {
                    focus: "series",
                },
                data: [120, 132, 101, 134, 290, 230, 220],
            },
            {
                name: "Bing",
                type: "bar",
                stack: "Search Engine",
                emphasis: {
                    focus: "series",
                },
                data: [60, 72, 71, 74, 190, 130, 110],
            },
            {
                name: "Others",
                type: "bar",
                stack: "Search Engine",
                emphasis: {
                    focus: "series",
                },
                data: [62, 82, 91, 84, 109, 110, 120],
            },
        ],
    };

    return (
        <div className="total">
            <div className="all workorders">
                <div className="title">全部在途工单</div>
                <div className="content">
                    {allWorkorders.map(item => (
                        <div className="order">
                            <span>{item.name}</span>
                            <span className="value" style={{ color: item.color }}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="my workorders">
                <div className="title">我发起的</div>
                <div className="content">
                    {myWorkorders.map(item => (
                        <div className="order">
                            <span>{item.name}</span>
                            <span className="value" style={{ color: item.color }}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="task-board">
                <div className="title">任务过程看板</div>
                <div className="content">
                    <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
        </div>
    );
};

export default Total;
