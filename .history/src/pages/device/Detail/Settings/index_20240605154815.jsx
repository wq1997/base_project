import React, { useState, useEffect } from "react";
import { Button, Switch, Descriptions, Space, Input, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
    getDeviceInfo as getDeviceInfoServer,
    getConfigs as getConfigsServer,
} from "@/services/device";
import PowerOnOff from "./PowerOnOff";
import ChangeMachine from "./ChangeMachine";
import DCArcFaultClear from "./DCArcFaultClear";
import FaultReset

const Index = ({ deviceId, getDetail }) => {
    const [modal, contextHolder] = Modal.useModal();
    const [isPowerOn, setIsPowerOn] = useState(false);
    const [powerOnOffOpen, setPowerOnOffOpen] = useState(false);
    const [changeMachineOpen, setChangeMachineOpen] = useState(false);
    const [dCArcFaultClearOpen, setDCArcFaultClearOpen] = useState(false);

    const btns = [
        {
            type: "换机",
            click: () => setChangeMachineOpen(true),
        },
        {
            type: "直流电弧故障清楚",
            click: () => setDCArcFaultClearOpen(true),
        },
        {
            type: "故障复位",
            click: () => setChangeMachineOpen(true),
        },
        {
            type: "有功调节",
            click: () => setChangeMachineOpen(true),
        },
        {
            type: "无功调节",
            click: () => setChangeMachineOpen(true),
        },
        {
            type: "功率因数调节",
            click: () => setChangeMachineOpen(true),
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

    return (
        <>
            <PowerOnOff
                deviceId={deviceId}
                open={powerOnOffOpen}
                isPowerOn={isPowerOn}
                onClose={flag => {
                    setPowerOnOffOpen(false);
                    flag && getDetail();
                }}
            />
            <ChangeMachine
                deviceId={deviceId}
                open={changeMachineOpen}
                onClose={flag => {
                    setChangeMachineOpen(false);
                    flag && getDetail();
                }}
            />
            <DCArcFaultClear
                deviceId={deviceId}
                open={dCArcFaultClearOpen}
                onClose={flag => {
                    setDCArcFaultClearOpen(false);
                    flag && getDetail();
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
                        {btns?.map(btn => (
                            <Button type="primary" ghost size="small" onClick={btn.click}>
                                {btn.type}
                            </Button>
                        ))}
                    </Space>
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};

export default Index;
