import React, { useState, useEffect } from "react";
import { Tabs, Drawer, Descriptions } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";
import "./index.less";

const Index = ({ detailId, onClose }) => {
    const getDetail = async () => {
        const res = await getDeviceInfoServer(detailId);
        if (res?.data?.code == 200) {
            const plant = res?.data?.data;
        }
    };

    useEffect(() => {
        detailId && getDetail();
    }, [detailId]);

    return (
        <Drawer
            title="设备详情"
            width={"calc(100% - 240px)"}
            open={Boolean(detailId)}
            onClose={() => onClose()}
        >
            <div>
                设备名称：
            </div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
        </Drawer>
    );
};

export default Index;
