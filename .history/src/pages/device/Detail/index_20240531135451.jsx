import React, { useState, useEffect } from "react";
import { Modal, Drawer, Descriptions } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";
import "./index.less";

const baseUrl = process.env.API_URL_1;

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
            width={1000}
            open={Boolean(detailId)}
            onClose={() => onClose()}
        ></Drawer>
    );
};

export default Index;
