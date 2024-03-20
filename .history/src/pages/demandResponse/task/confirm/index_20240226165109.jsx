import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { getWaitConfirmTasks as getWaitConfirmTasksServer } from "@/services/invitation";
import "./index.less";

const Confirm = () => {

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { confirmStatuses, splitStatuses, responseTypes, responseTimeTypes } =
                res?.data?.data;
            setConfirmStatusList(confirmStatuses);
            setSplitStatusList(splitStatuses);
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    

    return (
        <div className="confirm-task">
            <div className="wait-confirm">
                <div className="title">待处理任务</div>
                <div className="content"></div>
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
