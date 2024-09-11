import React, { useState, useEffect } from "react";
import { Button, Switch, Descriptions, Space, Input, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
    getDeviceInfo as getDeviceInfoServer,
    getConfigs as getConfigsServer,
} from "@/services/device";
import PowerOnOff from "./PowerOnOff";

const Index = ({}) => {
    const [modal, contextHolder] = Modal.useModal();
    const [powerOn, setPowerOn] = useState(false);

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
       
    );
};

export default Index;
