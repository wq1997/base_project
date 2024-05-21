// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { theme } from "antd";
import { getQueryString } from "@/utils/utils";
import DetalisCard from "../DetailsCard";

function Com(props) {
    const { token } = theme.useToken();
    const id = getQueryString("id");

    const [pcsData, setPcsData] = useState({
        title: "PCS信息",
        data: [
            { name: "运行状态", value: "-", key: "statusAll" },
            { name: "并网状态", value: "-", key: "statusAll2" },
            { name: "总报警状态", value: "-", key: "faultState" },
            { name: "总故障状态", value: "-", key: "warnState" },
            { name: "累计充电量", value: "-", key: "todayChargeEnergy" },
            { name: "累计放电量", value: "-", key: "todayDischargeEnergy" },
            { name: "总有功功率", value: "-", key: "totalChargeEnergy" },
            { name: "总无功功率", value: "-", key: "totalDischargeEnergy" },
            { name: "总视在功率", value: "-", key: "activePower" },
            { name: "总功率因数", value: "-", key: "reactivePower" },
            { name: "输入功率", value: "-", key: "apparentPower" },
            { name: "输入电压", value: "-", key: "powerFactor" },
            { name: "输入电流", value: "-", key: "power" },
            { name: "A相输出有功功率", value: "-", key: "power2" },
            { name: "B相输出有功功率", value: "-", key: "vol" },
            { name: "C相输出有功功率", value: "-", key: "vol2" },
            { name: "A相输出无功功率", value: "-", key: "cur" },
            { name: "B相输出无功功率", value: "-", key: "cur2" },
            { name: "C相输出无功功率", value: "-", key: "moduleTemp" },
            { name: "散热器温度", value: "-", key: "cabinetTemp" },
        ],
    });

    const [bmsData, setBmsData] = useState({
        title: "BMS信息",
        data: [
            { name: "BMS系统状态", value: "-", key: "statusAll" },
            { name: "电池充放电状态", value: "-", key: "" },
            { name: "电池禁止放电标志", value: "-", key: "" },
            { name: "电池禁止充电标志", value: "-", key: "" },
            { name: "SOE", value: "-", key: "" },
            { name: "SOC", value: "-", key: "" },
            { name: "SOH", value: "-", key: "" },
            { name: "电压", value: "-", key: "" },
            { name: "电流", value: "-", key: "" },
            { name: "功率", value: "-", key: "" },
            { name: "充电功率限值", value: "-", key: "" },
            { name: "放电功率限值", value: "-", key: "" },
            { name: "充电可用电量", value: "-", key: "" },
            { name: "放电可用电量", value: "-", key: "" },
            { name: "累计充电电量", value: "-", key: "" },
            { name: "累计放电电量", value: "-", key: "" },
            { name: "系统充放电循环次数", value: "-", key: "" },
            { name: "堆单体压差", value: "-", key: "" },
            { name: "堆单体温差", value: "-", key: "" },
            { name: "系统正极绝缘电阻阻值", value: "-", key: "" },
            { name: "系统负极绝缘电阻阻值", value: "-", key: "" },
        ],
    });

    const [bmsVersionData,setBmsVersionData] = useState({
        title: 'BMS版本信息',
        data: [
            { name: "BMS堆软件版本", value: "-", key: "" },
            { name: "BMS堆硬件版本", value: "-", key: "" },
            { name: "BCMU最高软件版本", value: "-", key: "" },
            { name: "BCMU最高硬件版本", value: "-", key: "" },
        ]
    })

    const [measureMeterData, setMeasureMeterData] = useState({
        title: '计量电表',
        data: [
            { name: "总有功功率", value: "-", key: "" },
            { name: "总无功功率", value: "-", key: "" },
            { name: "总视在功率", value: "-", key: "" },
            { name: "总功率因数", value: "-", key: "" },
            { name: "A相电流", value: "-", key: "" },
            { name: "B相电流", value: "-", key: "" },
            { name: "C相电流", value: "-", key: "" },
            { name: "A相电压", value: "-", key: "" },
            { name: "B相电压", value: "-", key: "" },
            { name: "C相电压", value: "-", key: "" },
            { name: "A相有功功率", value: "-", key: "" },
            { name: "B相有功功率", value: "-", key: "" },
            { name: "C相有功功率", value: "-", key: "" },
            { name: "A相无功功率", value: "-", key: "" },
            { name: "B相无功功率", value: "-", key: "" },
            { name: "C相无功功率", value: "-", key: "" },
            { name: "A相视在功率", value: "-", key: "" },
            { name: "B相视在功率", value: "-", key: "" },
            { name: "C相视在功率", value: "-", key: "" },
        ]
    })

    const [measureDataData, setMeasureDataData] = useState({
        title: '计量数据',
        data: [
            { name: "日充电电量", value: "-", key: "" },
            { name: "日放电电量", value: "-", key: "" },
            { name: "月充电电量", value: "-", key: "" },
            { name: "月放电电量", value: "-", key: "" },
            { name: "总充电电量", value: "-", key: "" },
            { name: "总放电电量", value: "-", key: "" },
            { name: "日收益", value: "-", key: "" },
            { name: "月收益", value: "-", key: "" },
            { name: "总收益", value: "-", key: "" },
            { name: "尖时段日充电电量", value: "-", key: "" },
            { name: "尖时段日放电电量", value: "-", key: "" },
            { name: "峰时段日充电电量", value: "-", key: "" },
            { name: "峰时段日放电电量", value: "-", key: "" },
            { name: "平时段日充电电量", value: "-", key: "" },
            { name: "平时段日放电电量", value: "-", key: "" },
            { name: "谷时段日充电电量", value: "-", key: "" },
            { name: "谷时段日放电电量", value: "-", key: "" },
            { name: "尖时段月充电电量", value: "-", key: "" },
            { name: "尖时段月放电电量", value: "-", key: "" },
            { name: "峰时段月充电电量", value: "-", key: "" },
            { name: "峰时段月放电电量", value: "-", key: "" },
            { name: "平时段月充电电量", value: "-", key: "" },
            { name: "平时段月放电电量", value: "-", key: "" },
            { name: "谷时段月充电电量", value: "-", key: "" },
            { name: "谷时段月放电电量", value: "-", key: "" },
            { name: "尖时段总充电电量", value: "-", key: "" },
            { name: "尖时段总放电电量", value: "-", key: "" },
            { name: "峰时段总充电电量", value: "-", key: "" },
            { name: "峰时段总放电电量", value: "-", key: "" },
            { name: "平时段总充电电量", value: "-", key: "" },
            { name: "平时段总放电电量", value: "-", key: "" },
            { name: "谷时段总充电电量", value: "-", key: "" },
            { name: "谷时段总放电电量", value: "-", key: "" },
        ]
    })

    const [otherData, setOtherData] = useState({
        title: '其他设备',
        data: [
            { name: "除湿机当前温度", value: "-", key: "" },
            { name: "除湿机当前湿度", value: "-", key: "" },
            { name: "除湿机温度启动值", value: "-", key: "" },
            { name: "除湿机温度停止值", value: "-", key: "" },
            { name: "除湿机湿度启动值", value: "-", key: "" },
            { name: "除湿机湿度停止值", value: "-", key: "" },
            { name: "液冷当前模式", value: "-", key: "" },
            { name: "水泵状态", value: "-", key: "" },
            { name: "压缩机状态", value: "-", key: "" },
            { name: "液冷制冷点", value: "-", key: "" },
            { name: "液冷加热点", value: "-", key: "" },
            { name: "液冷制冷回差", value: "-", key: "" },
            { name: "液冷加热回差", value: "-", key: "" },
            { name: "液冷出水温度", value: "-", key: "" },
            { name: "液冷回水温度", value: "-", key: "" },
            { name: "液冷排气温度", value: "-", key: "" },
            { name: "液冷进水压力", value: "-", key: "" },
            { name: "液冷出水压力", value: "-", key: "" },
            { name: "液冷环境温度", value: "-", key: "" },
        ]
    })
    
    return (
        <div className={styles.details} style={{width: '100%', height: 'auto', minHeight: '100%', padding: '40px 30px',  background: token.bgcColorB_l}}>
            <DetalisCard data={pcsData} />
            <DetalisCard data={bmsData} />
            <DetalisCard data={bmsVersionData} />
            <DetalisCard data={measureMeterData} />
            <DetalisCard data={measureDataData} />
            <DetalisCard data={otherData} />
        </div>
    )
}

export default Com