import React, { useState, useEffect } from "react";
import { Tabs, Drawer, Descriptions } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";

const Index = ({}) => {

    const realData = [
        {label:'',key:'',value:''}
    ]

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
