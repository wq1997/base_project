import React, { useState, useEffect } from "react";
import { Button, Switch, Descriptions, Space } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";

const Index = ({}) => {
    const onChange = checked => {
        console.log(checked);
    };

    return (
        <Descriptions title="设备配置" column={1}>
            <Descriptions.Item label="">
                <Space>
                    <Switch
                        checkedChildren="开机"
                        unCheckedChildren="关机"
                         
                        onChange={onChange}
                    />
                    <Button type="primary" ghost size="small">
                        换机
                    </Button>
                    <Button type="primary" ghost size="small">
                        直流电弧故障清楚
                    </Button>
                    <Button type="primary" ghost size="small">
                        故障复位
                    </Button>
                    <Button type="primary" ghost size="small">
                        有功调节
                    </Button>
                    <Button type="primary" ghost size="small">
                        无功调节
                    </Button>
                    <Button type="primary" ghost size="small">
                        功率因数调节
                    </Button>
                </Space>
            </Descriptions.Item>
        </Descriptions>
    );
};

export default Index;
