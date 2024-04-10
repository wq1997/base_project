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
                data: ["3-14", "3-15", "3-16", "3-17", "3-18", "3-19", "3-20"],
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
                stack: "Ad",
                data: [320, 332, 301, 334, 390, 330, 320],
            },
            {
                name: "Email",
                type: "bar",
                stack: "Ad",
                data: [120, 132, 101, 134, 90, 230, 210],
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
