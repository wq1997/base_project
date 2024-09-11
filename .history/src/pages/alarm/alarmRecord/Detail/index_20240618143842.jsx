import React, { useState, useEffect } from "react";
import { Modal, Image, Descriptions } from "antd";
import { getAlarmInfo as getAlarmInfoServer } from "@/services/alarm";
import "./index.less";

const baseUrl = process.env.API_URL_1;

const baseItems = [
    {
        label: "告警名称",
        key: "name",
    },
    {
        label: "告警级别",
        key: "levelName",
    },
    {
        label: "设备名称",
        key: "deviceName",
    },
    {
        label: "设备类型",
        key: "deviceTypeName",
    },
    {
        label: "电站名称",
        key: "plantName",
    },
];

const Company = ({ activeKey, detailId, onClose }) => {
    const [items, setItems] = useState([]);
    const [detailInfo, setDetailInfo] = useState([]);

    const getDetail = async () => {
        const res = await getAlarmInfoServer(detailId);
        if (res?.data?.code == 200) {
            setDetailInfo(
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
            <Descriptions
                title="告警详情"
 
                column={2}
            >
                {items?.map(item => (
                    <Descriptions.Item label={item?.label}>
                        {detailInfo[item?.value]}
                    </Descriptions.Item>
                ))}
            </Descriptions>
        </Modal>
    );
};

export default Company;
