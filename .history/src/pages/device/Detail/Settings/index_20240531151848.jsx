import React, { useState, useEffect } from "react";
import { Button, Switch, Descriptions, Space } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";

const Index = ({}) => {
    return (
        <Descriptions title="设备配置">
            <Space>
                <Switch checkedChildren="开机" unCheckedChildren="关机" defaultChecked />
                <Button type="primary" ghost>
                    换机{" "}
                </Button>
            </Space>
        </Descriptions>
    );
};

export default Index;
