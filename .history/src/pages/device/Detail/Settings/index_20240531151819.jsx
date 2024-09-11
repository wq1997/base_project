import React, { useState, useEffect } from "react";
import { Tabs, Switch, Descriptions, Space } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";

const Index = ({}) => {
    return (
        <Descriptions title="设备配置">
            <Space>
                <Switch checkedChildren="开机" unCheckedChildren="关机" defaultChecked />
                <Button type="primary" ghost form="form" onClick={() => onFinish(false)}>
                            保存
                        </Button>
            </Space>
        </Descriptions>
    );
};

export default Index;
