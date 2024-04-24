import { Select, Space } from "antd";
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
            trigger: "item",
        },
        legend: {
            orient: "vertical",
            left: "left",
        },
        series: [
            {
                type: "pie",
                radius: "50%",
                data: [
                    { value: 701, name: "维保项目" },
                    { value: 37, name: "实施项目" },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
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
                <ReactECharts option={options} style={{ width: "100%", height: "500px" }} />
            </div>
        </div>
    );
};

export default Total;
