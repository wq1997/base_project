import React, { useState, useEffect } from "react";
import { Tabs, Table, Descriptions, Divider } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";
import "./index.less";

const Index = ({ deviceInfo }) => {
    const [realData, setrealData] = useState(["组串"]);
    const [dataSource, setDataSource] = useState([["组串"], ["输入电压(V)"], ["输入电流(A)"]]);

    const realData = [
        { label: "设备状态", key: "inverterStatus", value: "" },
        { label: "当日发电量", key: "dailyGeneration", value: "" },
        { label: "累计发电量", key: "totalGeneration", value: "" },
        { label: "功率因数", key: "powerFactor", value: "" },
        { label: "有功功率", key: "activePower", value: "" },
        { label: "无功功率", key: "reactivePower", value: "" },
        { label: "逆变器额定功率", key: "ratedPower", value: "" },
        { label: "电网频率", key: "gridFrequency", value: "" },
        { label: "输出方式", key: "outputMode", value: "" },
        { label: "内部温度", key: "internalTemperature", value: "" },
        { label: "电网A相电流", key: "gridCurrentA", value: "" },
        { label: "电网A相电压", key: "gridVoltageA", value: "" },
        { label: "电网B相电流", key: "gridCurrentB", value: "" },
        { label: "电网B相电压", key: "gridVoltageB	", value: "" },
        { label: "电网C相电流", key: "gridCurrentC", value: "" },
        { label: "电网C相电压", key: "gridVoltageC", value: "" },
        { label: "开机时间", key: "inverterStartTime", value: "" },
        { label: "关机时间", key: "inverterStopTime", value: "" },
        { label: "绝缘阻抗值", key: "insulationResistance", value: "" },
    ];

    useEffect(() => {
        if (!deviceInfo) return;
        console.log("deviceInfo", deviceInfo);
        const { inverterInfo, realtimeList } = deviceInfo;
        const _dataSource = [...dataSource];
        Object.keys(realtimeList).forEach(key => {
            _dataSource[0].push(key);
            _dataSource[1].push(realtimeList?.[key]?.V);
            _dataSource[2].push(realtimeList?.[key]?.A);
        });
        setDataSource(_dataSource);
    }, [deviceInfo]);

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
