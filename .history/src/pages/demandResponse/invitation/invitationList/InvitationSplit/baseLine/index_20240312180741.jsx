import React, { useState, useEffect } from "react";
import { Tabs, Modal, Select, Space, InputNumber } from "antd";
import { getCompanyBaseLine as getCompanyBaseLineServer } from "@/services/electricityLoad";
import "./index.less";

const BaseLine = ({ baseLineArgs, onClose }) => {
    const [open, setOpen] = useState(false);

    const Summary = () => {
        return (
            <div>
                <div>最大负载：1250KW 响应能力：1250KW</div>
            </div>
        );
    };
    
    const Listory = () => {
        return "";
    };

    const getCompanyBaseLine = async () => {
        let res = await getCompanyBaseLineServer(baseLineArgs);
        if (res?.data?.status == "SUCCESS") {
            const { energyStorageData } = res?.data?.data;
            
        }
    };

    useEffect(() => {
        if (baseLineArgs) {
            setOpen(true);
            getCompanyBaseLine();
        } else setOpen(false);
    }, [baseLineArgs]);

    const items = [
        {
            key: "1",
            label: "汇总基线",
            children: <Summary />,
        },
        {
            key: "2",
            label: "历史负载",
            children: <Listory />,
        },
    ];

    return (
        <Modal
            title="基线"
            width={700}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Tabs defaultActiveKey="1" items={items} />
        </Modal>
    );
};

export default BaseLine;
