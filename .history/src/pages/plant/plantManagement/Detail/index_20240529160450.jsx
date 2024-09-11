import React, { useState, useEffect } from "react";
import { Modal, Table, Space, Descriptions } from "antd";
import { getPlantInfoById as getPlantInfoByIdServer } from "@/services/plant";
import "./index.less";

const items = [
    {
        
        label: "电站名称",
    },
    {
        key: "2",
        label: "Telephone",
    },
    {
        key: "3",
        label: "Live",
    },
    {
        key: "4",
        label: "Remark",
    },
    {
        key: "5",
        label: "Address",
    },
];

const Company = ({ detailId, onClose }) => {
    const [detail, setDetail] = useState();

    const getDetail = async () => {
        const res = await getPlantInfoByIdServer(detailId);
        if (res?.data?.code == 200) {
            setDetail(res?.data?.data);
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
            <Descriptions title="电站详情" items={items} />;
        </Modal>
    );
};

export default Company;
