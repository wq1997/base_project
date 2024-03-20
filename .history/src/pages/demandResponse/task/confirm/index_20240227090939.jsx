import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { getWaitConfirmTasks as getWaitConfirmTasksServer } from "@/services/task";
import "./index.less";
import { useEffect } from "react";

const Confirm = () => {
    const getTasks = async () => {
        const res = await getWaitConfirmTasksServer();
        if (res?.data?.status == "SUCCESS") {
        }
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
                            <div>削峰</div>
                        </div>
                        <div>
                            <div>任务功率（kW）</div>
                            <div>35</div>
                        </div>
                        <div>
                            <div>预计收益（元）</div>
                            <div>2385</div>
                        </div>
                    </div>
                    <div className="time">
                        <div>响应时间：2023/12/31 15:00 - 2023/12/31 15:30</div>
                        <div>确认截止时间：2023/12/30 15:00</div>
                    </div>
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
            <div className="response-suggest"></div>
            <div className="curve"></div>
        </div>
    );
};

export default Confirm;
