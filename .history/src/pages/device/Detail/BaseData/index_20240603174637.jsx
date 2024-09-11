import React, { useState, useEffect } from "react";
import { Tabs, Table, Descriptions, Divider } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";
import "./index.less";

const realtimeList = {
    PV10: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV20: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV12: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV11: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV18: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV17: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV1: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV19: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV3: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV14: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV2: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV13: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV5: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV16: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV4: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV15: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV7: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV6: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV9: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
    PV8: {
        A: 0.5695659268443883,
        V: 1.9020811809117344,
    },
};

const Index = ({deviceInfo}) => {
    const [columns, setColumns] = useState(["组串"]);
    const [dataSource, setDataSource] = useState([["组串"], ["输入电压(V)"], ["输入电流(A)"]]);

    const realData = [
        { label: "设备状态", key: "", value: "" },
        { label: "当日发电量", key: "", value: "" },
        { label: "累计发电量", key: "", value: "" },
        { label: "功率因数", key: "", value: "" },
        { label: "有功功率", key: "", value: "" },
        { label: "无功功率", key: "", value: "" },
        { label: "逆变器额定功率", key: "", value: "" },
        { label: "电网频率", key: "", value: "" },
        { label: "输出方式", key: "", value: "" },
        { label: "内部温度", key: "", value: "" },
        { label: "电网A相电流", key: "", value: "" },
        { label: "电网A相电压", key: "", value: "" },
        { label: "电网B相电流", key: "", value: "" },
        { label: "电网B相电压", key: "", value: "" },
        { label: "电网C相电流", key: "", value: "" },
        { label: "电网C相电压", key: "", value: "" },
        { label: "开机时间", key: "", value: "" },
        { label: "关机时间", key: "", value: "" },
        { label: "绝缘阻抗值", key: "", value: "" },
    ];

    useEffect(() => {
        const _dataSource = [...dataSource];
        Object.keys(realtimeList).forEach(key => {
            _dataSource[0].push(key);
            _dataSource[1].push(key?.V);
            _dataSource[2].push(key?.A);
        });

        setDataSource(_dataSource);
    }, []);

    return (
        <>
            <Descriptions title="基础信息"></Descriptions>
            <Descriptions title="实时数据">
                <Descriptions.Item label="" span={3}>
                    <div className="table">
                        {dataSource?.map(item => (
                            <div className="item">
                                {item?.map(value => (
                                    <div className="cell">{value}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                </Descriptions.Item>
                {realData?.map(item => (
                    <Descriptions.Item label={item.label}>{item.value}</Descriptions.Item>
                ))}
            </Descriptions>
        </>
    );
};

export default Index;
