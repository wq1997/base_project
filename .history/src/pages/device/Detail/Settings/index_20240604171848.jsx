import React, { useState, useEffect } from "react";
import { Button, Switch, Descriptions, Space,In } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";

const Index = ({}) => {
    const [powerOn, setPowerOn] = useState(false);

    const onChange = () => {
        modal.confirm({
            title: `请选择截止时间`,
            icon: <ExclamationCircleOutlined />,
            content: (
                <DatePicker
                    showTime={{
                        format: "HH:mm",
                    }}
                    format="YYYY-MM-DD HH:mm"
                    style={{ width: "100%" }}
                    onChange={(_, dateStr) => (dateValue = dateStr)}
                />
            ),
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                if (!dateValue) {
                    message.info(`请选择截止时间`);
                    return Promise.reject();
                } else {
                    setDeadline(dateValue);
                }
            },
            onCancel: () => {
                setDeadline(deadline);
            },
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
