import React, { useState, useEffect } from "react";
import { Tabs, Drawer, Descriptions, Spin } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";
import "./index.less";
import HistoryInfo from "./HistoryInfo";
import Settings from "./Settings";
import BaseData from "./BaseData";

const Index = ({ connectLoading, num, detailId, onClose }) => {
    const [deviceInfo, setDeviceInfo] = useState();

    const getDetail = async () => {
        const res = await getDeviceInfoServer(detailId);
        if (res?.data?.code == 200) {
            const info = res?.data?.data || {};
            setDeviceInfo({
                ...info,
                deviceSwitchHistoryList: info?.deviceSwitchHistoryList
                    ?.map(item => item.snNumber)
                    ?.join("，"),
            });
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
                    <Spin spinning={connectLoading} tip='设备连接中。。。'>
                        <Settings deviceInfo={deviceInfo} getDetail={getDetail} />
                    </Spin>
                    <BaseData deviceInfo={deviceInfo} />
                </>
            ),
        },
        {
            key: "2",
            label: "历史信息",
            children: "Content of Tab Pane 2",
            children: (
                <HistoryInfo
                    deviceInfo={deviceInfo}
                    signalPointTypes={deviceInfo?.signalPointTypes}
                />
            ),
        },
    ];

    useEffect(() => {
        getDetail();
    }, [num]);

    return (
        <Drawer
            title="设备详情"
            width={"calc(100% - 240px)"}
            open={Boolean(detailId)}
            onClose={() => onClose()}
        >
            <Descriptions title={`设备名称：${deviceInfo?.name}`} />
            <Tabs items={items} />
        </Drawer>
    );
};

export default Index;
