import React, { useState, useEffect } from "react";
import { Tabs, Table, Descriptions, Divider } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";
import "./index.less";

const Index = ({ deviceInfo }) => {
    const [realData, setRealData] = useState([]);
    const [dataSource, setDataSource] = useState([["组串"], ["输入电压(V)"], ["输入电流(A)"]]);

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
