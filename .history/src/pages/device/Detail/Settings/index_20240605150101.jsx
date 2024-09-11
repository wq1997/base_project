import React, { useState, useEffect } from "react";
import { Button, Switch, Descriptions, Space, Input, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
    getDeviceInfo as getDeviceInfoServer,
    getConfigs as getConfigsServer,
} from "@/services/device";
import PowerOnOff from "./PowerOnOff";

const Index = ({ deviceId }) => {
    const [modal, contextHolder] = Modal.useModal();
    const [isPowerOn, setIsPowerOn] = useState(fa);
    const [powerOnOffOpen, setPowerOnOffOpen] = useState(false);

    const getConfigs = async () => {
        const res = await getConfigsServer();
        if (res?.data?.code == 200) {
            console.log(res?.data?.data);
        }
    };

    useEffect(() => {
        getConfigs();
    }, []);

    return (
        <>
            <PowerOnOff
                deviceId={deviceId}
                open={powerOnOffOpen}
                isPowerOn={isPowerOn}
                onClose={() => {
                    setPowerOnOffOpen(false);
                }}
            />
            <Descriptions title="设备配置" column={1}>
                <Descriptions.Item label="">
                    <Space>
                        <Switch
                            checkedChildren="开机"
                            unCheckedChildren="关机"
                            value={isPowerOn}
                            onClick={() => setPowerOnOffOpen(true)}
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
        </>
    );
};

export default Index;
