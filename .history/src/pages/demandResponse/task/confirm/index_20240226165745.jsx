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
        getTasks()
    }, [])


    return (
        <div className="confirm-task">
            <div className="wait-confirm">
                <div className="title">待处理任务</div>
                <div className="content">
                    
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
