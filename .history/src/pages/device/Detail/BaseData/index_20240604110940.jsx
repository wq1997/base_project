import React, { useState, useEffect } from "react";
import { Tabs, Table, Descriptions, Divider } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";
import "./index.less";

const Index = ({ deviceInfo }) => {
    const [realData, setRealData] = useState([
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
    ]);
    const [dataSource, setDataSource] = useState([["组串"], ["输入电压(V)"], ["输入电流(A)"]]);

    //方法
    const objectOrder = obj => {
        //排序的函数
        var newkey = Object.keys(obj).sort(); //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
        var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
        for (var i = 0; i < newkey.length; i++) {
            //遍历newkey数组
            newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
        }
        return newObj; //返回排好序的新对象
    };
{
    pv1:1,
    pv:2
}
    useEffect(() => {
        if (!deviceInfo) return;
        const { inverterInfo, realtimeList } = deviceInfo;
         
        const objArr =[]
        //循环中使用
        for (let item in objectOrder(realtimeList)) { 
            objArr.push(item);
        }
        console.log('objArr',objArr)
        const _dataSource = [...dataSource];
        Object.keys(realtimeList || {})
            .sort((a, b) => a - b)
            .forEach(key => {
                _dataSource[0].push(key);
                _dataSource[1].push(realtimeList?.[key]?.V);
                _dataSource[2].push(realtimeList?.[key]?.A);
            });
        setDataSource(_dataSource);
        setRealData(
            [...realData]?.map(item => ({
                ...item,
                value: inverterInfo?.[item.key],
            }))
        );
    }, [deviceInfo]);
    ["pv1", "pv2", "pA1"];
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
