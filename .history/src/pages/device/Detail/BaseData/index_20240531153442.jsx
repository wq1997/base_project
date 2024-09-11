import React, { useState, useEffect } from "react";
import { Tabs, Drawer, Descriptions } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";

const Index = ({}) => {
    const realData = [
        { label: "设备状态", key: "", value: "" },
        { label: "当日发电量", key: "", value: "" },
        { label: "累计发电量", key: "", value: "" },
        { label: "功率因数", key: "", value: "" },
        { label: "有功功率", key: "", value: "" },
        { label: "无功功率", key: "", value: "" },
        { label: "逆变器额定功率", key: "", value: "" },
        { label: "电网频率", key: "", value: "" },
        { label: "输出方式", key: "", value: "" },
        { label: "内部温度", key: "", value: "" },
        { label: "电网A相电流", key: "", value: "" },
        { label: "电网A相电压", key: "", value: "" },
        { label: "电网B相电流", key: "", value: "" },
        { label: "电网B相电压", key: "", value: "" },
        { label: "电网C相电流", key: "", value: "" },
        { label: "电网C相电压", key: "", value: "" },
        { label: "开机时间", key: "", value: "" },
        { label: "关机时间", key: "", value: "" },
        { label: "", key: "", value: "" },
        { label: "", key: "", value: "" },
        { label: "", key: "", value: "" },
        { label: "", key: "", value: "" },
    ];

    return (
        <>
            <Descriptions title="基础信息"></Descriptions>
            <Descriptions title="实时数据">
                {realData?.map(item => (
                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                ))}
            </Descriptions>
        </>
    );
};

export default Index;
