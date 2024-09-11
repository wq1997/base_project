import React, { useState, useEffect } from "react";
import {
    message,
    Button,
    Form,
    Input,
    Modal,
    Steps,
    DatePicker,
    Space,
    Select,
    Row,
    Col,
    Badge,
    Descriptions,
    Drawer,
} from "antd";
import dayjs from "dayjs";
import { Title } from "@/components";
import { ExclamationCircleOutlined, FileTextFilled } from "@ant-design/icons";
import { workOrderInfo as workOrderInfoServer } from "@/services/workOrder";
import StandardOrder from "./StandardOrder";
import ExceptionOrder from "./ExceptionOrder";
import ImplementOrder from "./ImplementOrder";
import ManualOrder from "./ManualOrder";
import "./index.less";

const Detail = ({ detailId, onClose }) => {
    const detailRow = {};
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(3);
    const [info, setInfo] = useState([]);

    const getInfo = async () => {
        const res = await workOrderInfoServer(detailId);
        if (res?.data?.status == "SUCCESS") {
            setInfo(res?.data?.data);
        }
    };

    const onFinish = async values => {
        return;
    };

    useEffect(() => {
        if (detailId) {
            setOpen(true);
            getInfo();
        } else {
            setOpen(false);
        }
    }, [detailId]);

    return (
        <Drawer
            title={"工单详情"}
            width={"90%"}
            confirmLoading={true}
            open={open}
            footer={null}
            onClose={() => onClose(false)}
        >
            <Descriptions title="基础信息">
                <Descriptions.Item label="工单名称">{info?.title}</Descriptions.Item>
                <Descriptions.Item label="关联项目名称">{info?.project?.name}</Descriptions.Item>
                <Descriptions.Item label="工单状态">
                    <span style={{ color: info?.statusZh == "已完成" ? "#1BE72B" : "" }}>
                        {info?.statusZh}
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="工单类型">{info?.typeZh}</Descriptions.Item>
                <Descriptions.Item label="计划开始时间">{info?.planStartDate}</Descriptions.Item>
                <Descriptions.Item label="计划结束时间">{info?.planEndDate}</Descriptions.Item>
                <Descriptions.Item label="当前处理人">
                    {info?.statusZh == "已完成" ? "" : info?.currentProcessorName}
                </Descriptions.Item>
                <Descriptions.Item label="实际处理人">
                    {info?.statusZh == "已完成" ? info?.currentProcessorName : ""}
                </Descriptions.Item>
                <Descriptions.Item label="发起人">{info?.initiatorName}</Descriptions.Item>
            </Descriptions>
            {/* 标准工单 */}
            {["CYCLE_INSPECTION", "MANUAL_INSPECTION"].includes(info?.type) && <StandardOrder info={info}/>}
            {/* 非标准工单 */}
            {["MANUAL_FB_INSPECTION", "MANUAL_OTHER"].includes(info?.type) && <ManualOrder info={info}/>}
            {/* 异常工单 */}
            {["SYS_EXCEPTION", "MANUAL_EXCEPTION"].includes(info?.type) && <ExceptionOrder info={info}/>}
            {/* 实施工单 */}
            {["IMPLEMENT"].includes(info?.type) && <ImplementOrder info={info}/>}
        </Drawer>
    );
};

export default Detail;
