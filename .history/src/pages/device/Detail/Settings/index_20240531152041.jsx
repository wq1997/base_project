import React, { useState, useEffect } from "react";
import { Button, Switch, Descriptions, Space } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";

const Index = ({}) => {
    return (
        <Descriptions title="设备配置" column={1}>
             <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
            
        </Descriptions>
    );
};

export default Index;
