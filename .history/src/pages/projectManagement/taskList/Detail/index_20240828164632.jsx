import React, { useState, useEffect } from "react";
import { Descriptions, Drawer } from "antd";
import { workOrderInfo as workOrderInfoServer } from "@/services/workOrder";
import StandardOrder from "./StandardOrder";
import ExceptionOrder from "./ExceptionOrder";
import ImplementOrder from "./ImplementOrder";
import ManualOrder from "./ManualOrder";
import styles from "./index.less";

const Detail = ({ detailId, processId, onClose }) => {
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState();
    const [isDetail, setIsDetail] = useState(false);
    const [isProcess, setIsProcess] = useState(false);

    const getInfo = async () => {
        const res = await workOrderInfoServer(detailId || processId);
        if (res?.data?.status == "SUCCESS") {
            setInfo(res?.data?.data);
        }
    };

    useEffect(() => {
        if (detailId || processId) {
            if (detailId) setIsDetail(true);
            if (processId) setIsProcess(true);
            setOpen(true);
            getInfo();
        } else {
            setOpen(false);
            setIsDetail(false);
            setIsProcess(false);
        }
    }, [detailId, processId]);

    return (
        <Drawer
            title={"工单详情"}
            width={"90%"}
            confirmLoading={true}
            open={open}
            footer={null}
            onClose={() => onClose()}
            className={styles.detail}
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
            <Descriptions title="业务信息"></Descriptions>
            <div style={{ color: "#fff", paddingLeft: isDetail ? "20px" : 0 }}>
            {isDetail && <Detail />}
            {isProcess && <Process />}
        </div>
            
        </Drawer>
    );
};

export default Detail;
