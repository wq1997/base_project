import React, { useState, useEffect } from "react";
import { Tabs, Drawer, Descriptions } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";
import "./index.less";
import HistoryInfo from "./HistoryInfo";
import Settings from "./Settings";
import BaseData from "./BaseData";

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

    const items = [
        {
            key: "1",
            label: "详细信息",
            children: (
                <>
                    <Settings />
                    <BaseData />
                </>
            ),
        },
        {
            key: "2",
            label: "历史信息",
            children: "Content of Tab Pane 2",
            children: (
                
                   
             
            ),
        },
    ];

    return (
        <Drawer
            title="设备详情"
            width={"calc(100% - 240px)"}
            open={Boolean(detailId)}
            onClose={() => onClose()}
        >
            <Descriptions title={`设备名称：`} />

            <Tabs items={items} />
        </Drawer>
    );
};

export default Index;
