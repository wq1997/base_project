import React, { useState, useEffect } from "react";
import { Modal, Image, Descriptions } from "antd";
import { getAlarmInfo as getAlarmInfoServer } from "@/services/alarm";
import "./index.less";

const baseUrl = process.env.API_URL_1;

const baseItems = [
    {
        title: "告警名称",
        key: "name",
    },
    {
        title: "告警级别",
        key: "levelName",
    },
    {
        title: "设备名称",
        key: "deviceName",
    },
    {
        title: "设备类型",
        key: "deviceTypeName",
    },
    {
        title: "电站名称",
        key: "plantName",
    },
    {
        title: "发生时间",
        key: "Begin",
    },
];

const Company = ({ detailId, onClose }) => {
    const [items, setItems] = useState();
    const getDetail = async () => {
        const res = await getAlarmInfoServer(detailId);
        if (res?.data?.code == 200) {
            setItems(
                baseItems?.map(item => {
                    return {
                        ...item,
                        children: res?.data?.data?.[item.key],
                    };
                })
            );
        }
    };

    useEffect(() => {
        detailId && getDetail();
    }, [detailId]);

    return (
        <Modal
            title=""
            width={1000}
            open={Boolean(detailId)}
            onOk={() => onClose()}
            onCancel={() => onClose()}
        >
            <Descriptions title="告警详情" items={items} column={2} />
        </Modal>
    );
};

export default Company;
