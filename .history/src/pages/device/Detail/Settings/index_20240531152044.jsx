import React, { useState, useEffect } from "react";
import { Button, Switch, Descriptions, Space } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";

const Index = ({}) => {
    return (
        <Descriptions title="设备配置" column={1}>
             <Descriptions.Item label="UserName">
             <Space >
                <Switch checkedChildren="开机" unCheckedChildren="关机" defaultChecked />
                <Button type="primary" ghost>
                    换机
                </Button>
                <Button type="primary" ghost>
                    直流电弧故障清楚
                </Button>
                <Button type="primary" ghost>
                    直流电弧故障清楚
                </Button>
                <Button type="primary" ghost>
                    直流电弧故障清楚
                </Button>
                <Button type="primary" ghost>
                    直流电弧故障清楚
                </Button>
            </Space>
             </Descriptions.Item>
            
        </Descriptions>
    );
};

export default Index;
