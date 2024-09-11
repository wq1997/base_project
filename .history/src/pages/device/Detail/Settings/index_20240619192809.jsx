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
import FaultReset from "./FaultReset";
import ActivePowerAdjust from "./ActivePowerAdjust";
import ReactivePowerAdjust from "./ReactivePowerAdjust";
import PowerFactor from "./PowerFactor";

const Index = ({ deviceInfo, getDetail }) => {
    const [modal, contextHolder] = Modal.useModal();
    const [isPowerOn, setIsPowerOn] = useState(false);
    const [powerOnOffOpen, setPowerOnOffOpen] = useState(false);
    const [changeMachineOpen, setChangeMachineOpen] = useState(false);
    const [dCArcFaultClearOpen, setDCArcFaultClearOpen] = useState(false);
    const [faultResetOpen, setFaultResetOpen] = useState(false);
    const [activePowerAdjustOpen, setActivePowerAdjustOpen] = useState(false);
    const [reactivePowerAdjustOpen, setReactivePowerAdjustOpen] = useState(false);
    const [powerFactorOpen, setPowerFactorOpen] = useState(false);

    const btns = [
        {
            type: "换机",
            click: () => setChangeMachineOpen(true),
        },
        {
            type: "直流电弧故障清除",
            click: () => setDCArcFaultClearOpen(true),
        },
        {
            type: "故障复位",
            click: () => setFaultResetOpen(true),
        },
        {
            type: "有功调节",
            click: () => setActivePowerAdjustOpen(true),
        },
        {
            type: "无功调节",
            click: () => setReactivePowerAdjustOpen(true),
        },
        {
            type: "功率因数调节",
            click: () => setPowerFactorOpen(true),
        },
    ];

    const getConfigs = async () => {
        const res = await getConfigsServer();
        if (res?.data?.code == 200) {
            console.log(res?.data?.data);
        }
    };

    useEffect(() => {
        // getConfigs();
        setIsPowerOn(
            !deviceInfo?.inverterInfo || ? false : true
        );
    }, [deviceInfo]);

    return (
        <>
            <PowerOnOff
                deviceId={deviceInfo?.id}
                open={powerOnOffOpen}
                isPowerOn={isPowerOn}
                onClose={() => {
                    setPowerOnOffOpen(false);
                }}
            />
            <ChangeMachine
                deviceId={deviceInfo?.id}
                open={changeMachineOpen}
                onClose={() => {
                    setChangeMachineOpen(false);
                }}
            />
            <DCArcFaultClear
                deviceId={deviceInfo?.id}
                open={dCArcFaultClearOpen}
                onClose={() => {
                    setDCArcFaultClearOpen(false);
                }}
            />
            <FaultReset
                deviceId={deviceInfo?.id}
                open={faultResetOpen}
                onClose={() => {
                    setFaultResetOpen(false);
                }}
            />
            <ActivePowerAdjust
                deviceInfo={deviceInfo}
                open={activePowerAdjustOpen}
                onClose={() => {
                    setActivePowerAdjustOpen(false);
                }}
            />
            <ReactivePowerAdjust
                deviceInfo={deviceInfo}
                open={reactivePowerAdjustOpen}
                onClose={() => {
                    setReactivePowerAdjustOpen(false);
                }}
            />
            <PowerFactor
                deviceInfo={deviceInfo}
                open={powerFactorOpen}
                onClose={() => {
                    setPowerFactorOpen(false);
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
