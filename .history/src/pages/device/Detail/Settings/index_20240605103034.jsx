import React, { useState, useEffect } from "react";
import { Button, Switch, Descriptions, Space, Input, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
    getDeviceInfo as getDeviceInfoServer,
    getConfigs as getConfigsServer,
} from "@/services/device";

const Index = ({}) => {
    const [modal, contextHolder] = Modal.useModal();
    const [powerOn, setPowerOn] = useState(false);

    [
        {
            code: 0,
            displayName: "开机",
            name: "POWER_ON",
        },
        {
            code: 1,
            displayName: "关机",
            name: "POWER_OFF",
        },
        {
            code: 2,
            displayName: "换机",
            name: "REPLACE",
        },
        {
            code: 3,
            displayName: "直流电弧故障清除",
            name: "DC_ARC_FAULT_CLEAR",
        },
        {
            code: 4,
            displayName: "故障复位",
            name: "FAULT_RESET",
        },
        {
            code: 5,
            displayName: "有功调节",
            name: "ACTIVE_POWER_ADJUST",
        },
        {
            code: 6,
            displayName: "无功调节",
            name: "REACTIVE_POWER_ADJUST",
        },
        {
            code: 7,
            displayName: "功率因数调节",
            name: "POWER_FACTOR_ADJUST",
        },
    ];

    const getConfigs = async () => {
        const res = await getConfigsServer();
        if (res?.data?.code == 200) {
            console.log(res?.data?.data);
        }
    };

    useEffect(() => {
        getConfigs();
    }, []);

    const onChange = () => {
        console.log(999);
        Modal.confirm({
            title: "提示",
            icon: <ExclamationCircleOutlined />,
            content: (
                <div>
                    <div style={{ marginBottom: "10px" }}>
                        确认下发{powerOn ? "关机" : "开机"}指令？
                    </div>
                    <Input placeholder="请输入密码" />
                </div>
            ),
            okText: "确认",
            cancelText: "取消",
            zIndex: 99999,
            onOk: async () => {},
            onCancel: () => {},
        });
    };

    return (
        <Descriptions title="设备配置" column={1}>
            <Descriptions.Item label="">
                <Space>
                    <Switch
                        checkedChildren="开机"
                        unCheckedChildren="关机"
                        value={powerOn}
                        onClick={onChange}
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
