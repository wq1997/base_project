import { Select, Space } from "antd";
import "./index.less";

const Total = () => {

    const allWorkorders = [
        { name: "在途异常工单", value: "15", color: '#1098EF' },
        { name: "在途其他工单", value: "52", color: '#ED9C0D' },
    ];

    const myWorkorders = [
        { name: "发起工单数", value: "67" },
        { name: "已执行总数", value: "55" },
    ];

    return (
        <div className="total">
            <div className="all workorders">
                <div className="title">全部在途工单</div>
                <div className="content">
                    {allWorkorders.map(item => (
                        <div className="order">
                            <span>{item.name}</span>
                            <span className="value">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="my workorders">
                <div className="title">我发起的</div>
            </div>
            <div className="task-board">
                <div className="title">任务过程看板</div>
            </div>
        </div>
    );
};

export default Total;
