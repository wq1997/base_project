// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { theme } from "antd";
import { getQueryString, cloneObject } from "@/utils/utils";
import {
    getDtuDetailInfo as getDtuDetailInfoServe,
} from "@/services";
import DetalisCard from "../DetailsCard";
import { useSelector } from "umi";

function Com({deviceVersion}) {
    const { token } = theme.useToken();
    const id = getQueryString("id");
    const { locale } = useSelector(state => state.global);

    const [pcsData, setPcsData] = useState({
        title: "PCS信息",
        data: [
            { name: "运行状态", value: "-", key: "pcsState" },
            { name: "并网状态", value: "-", key: "gridOn" },
            { name: "总报警状态", value: "-", key: "pcsWarnState" },
            { name: "总故障状态", value: "-", key: "pcsFaultState" },
            { name: "累计充电量", value: "-", key: "ACTotalChEnergy" },
            { name: "累计放电量", value: "-", key: "ACTotalDischEnergy" },
            { name: "总有功功率", value: "-", key: "totalActivePower" },
            { name: "总无功功率", value: "-", key: "totalReactivePower" },
            { name: "总视在功率", value: "-", key: "totalApparentPower" },
            { name: "总功率因数", value: "-", key: "totalFactor" },
            { name: "输入功率", value: "-", key: "inputPower" },
            { name: "输入电压", value: "-", key: "inputVol" },
            { name: "输入电流", value: "-", key: "inputCur" },
            { name: "A相输出有功功率", value: "-", key: "phaseAActivePower" },
            { name: "B相输出有功功率", value: "-", key: "phaseBActivePower" },
            { name: "C相输出有功功率", value: "-", key: "phaseCActivePower" },
            { name: "A相输出无功功率", value: "-", key: "phaseAReactivePower" },
            { name: "B相输出无功功率", value: "-", key: "phaseBReactivePower" },
            { name: "C相输出无功功率", value: "-", key: "phaseCReactivePower" },
            { name: "散热器温度", value: "-", key: "RadiatorTemp" },
        ],
    });

    const [bmsData, setBmsData] = useState({
        title: "BMS信息",
        data: [
            { name: "BMS系统状态", value: "-", key: "bmsRunStatus" },
            { name: "电池充放电状态", value: "-", key: "batCdState" },
            { name: "电池禁止放电标志", value: "-", key: "batFDFlag" },
            { name: "电池禁止充电标志", value: "-", key: "batFCFlag" },
            { name: "SOE", value: "-", key: "soe" },
            { name: "SOC", value: "-", key: "soc" },
            { name: "SOH", value: "-", key: "soh" },
            { name: "电压", value: "-", key: "vol" },
            { name: "电流", value: "-", key: "cur" },
            { name: "功率", value: "-", key: "power" },
            { name: "充电功率限值", value: "-", key: "allowMaxChargePower" },
            { name: "放电功率限值", value: "-", key: "allowMaxDischargePower" },
            { name: "充电可用电量", value: "-", key: "allowChargeCapacity" },
            { name: "放电可用电量", value: "-", key: "allowDischargeCapacity" },
            { name: "累计充电电量", value: "-", key: "totalChargeEnergy" },
            { name: "累计放电电量", value: "-", key: "totalDischargeEnergy" },
            { name: "系统充放电循环次数", value: "-", key: "cycleCount" },
            { name: "堆单体压差", value: "-", key: "cellVolDiff" },
            { name: "堆单体温差", value: "-", key: "cellTempDiff" },
            { name: "系统正极绝缘电阻阻值", value: "-", key: "positiveMinInResistance" },
            { name: "系统负极绝缘电阻阻值", value: "-", key: "cathodeMinInResistance" },
        ],
    });

    const [bmsVersionData,setBmsVersionData] = useState({
        title: 'BMS版本信息',
        data: [
            { name: "BMS堆软件版本", value: "-", key: "softwareVersion" },
            { name: "BMS堆硬件版本", value: "-", key: "hardwareVersion" },
            { name: "BCMU最高软件版本", value: "-", key: "bcmuMaxSoftwareVersion" },
            { name: "BCMU最高硬件版本", value: "-", key: "bcmuMaxHardwareVersion" },
            { name: "BCMU最低软件版本", value: "-", key: "bcmuMinSoftwareVersion" },
            { name: "BCMU最低硬件版本", value: "-", key: "bcmuMinHardwareVersion" },
        ]
    })

    const [measureMeterData, setMeasureMeterData] = useState({
        title: '计量电表',
        data: [
            { name: "总有功功率", value: "-", key: "totalActivePower" },
            { name: "总无功功率", value: "-", key: "totalReactivePower" },
            { name: "总视在功率", value: "-", key: "totalApparentPower" },
            { name: "总功率因数", value: "-", key: "totalFactor" },
            { name: "A相电流", value: "-", key: "phaseACur" },
            { name: "B相电流", value: "-", key: "phaseBCur" },
            { name: "C相电流", value: "-", key: "phaseCCur" },
            { name: "A相电压", value: "-", key: "phaseAVol" },
            { name: "B相电压", value: "-", key: "phaseBVol" },
            { name: "C相电压", value: "-", key: "phaseCVol" },
            { name: "A相有功功率", value: "-", key: "phaseAActivePower" },
            { name: "B相有功功率", value: "-", key: "phaseBActivePower" },
            { name: "C相有功功率", value: "-", key: "phaseCActivePower" },
            { name: "A相无功功率", value: "-", key: "phaseAReactivePower" },
            { name: "B相无功功率", value: "-", key: "phaseBReactivePower" },
            { name: "C相无功功率", value: "-", key: "phaseCReactivePower" },
            { name: "A相视在功率", value: "-", key: "apparentAPower" },
            { name: "B相视在功率", value: "-", key: "apparentBPower" },
            { name: "C相视在功率", value: "-", key: "apparentCPower" },
        ]
    })

    const [measureDataData, setMeasureDataData] = useState({
        title: '计量数据',
        data: [
            { name: "日充电电量", value: "-", key: "dayChargeEnergy" },
            { name: "日放电电量", value: "-", key: "dayDischargeEnergy" },
            { name: "月充电电量", value: "-", key: "monChargeEnergy" },
            { name: "月放电电量", value: "-", key: "monDischargeEnergy" },
            { name: "总充电电量", value: "-", key: "totalCEnergy" },
            { name: "总放电电量", value: "-", key: "totalDEnergy" },
            { name: "日收益", value: "-", key: "dayEarning" },
            { name: "月收益", value: "-", key: "monEarning" },
            { name: "总收益", value: "-", key: "sumEarning" },
            { name: "尖时段日充电电量", value: "-", key: "tipChargeEnergy" },
            { name: "尖时段日放电电量", value: "-", key: "tipDischargeEnergy" },
            { name: "峰时段日充电电量", value: "-", key: "peakChargeEnergy" },
            { name: "峰时段日放电电量", value: "-", key: "peakDischargeEnergy" },
            { name: "平时段日充电电量", value: "-", key: "flatChargeEnergy" },
            { name: "平时段日放电电量", value: "-", key: "flatDischargeEnergy" },
            { name: "谷时段日充电电量", value: "-", key: "valleyChargeEnergy" },
            { name: "谷时段日放电电量", value: "-", key: "valleyDischargeEnergy" },
            { name: "尖时段月充电电量", value: "-", key: "monTipCEnergy" },
            { name: "尖时段月放电电量", value: "-", key: "monTipDEnergy" },
            { name: "峰时段月充电电量", value: "-", key: "monPeakCEnergy" },
            { name: "峰时段月放电电量", value: "-", key: "monPeakDEnergy" },
            { name: "平时段月充电电量", value: "-", key: "monFlatCEnergy" },
            { name: "平时段月放电电量", value: "-", key: "monFlatDEnergy" },
            { name: "谷时段月充电电量", value: "-", key: "monValleyCEnergy" },
            { name: "谷时段月放电电量", value: "-", key: "monValleyDEnergy" },
            { name: "尖时段总充电电量", value: "-", key: "totalTipCEnergy" },
            { name: "尖时段总放电电量", value: "-", key: "totalTipDEnergy" },
            { name: "峰时段总充电电量", value: "-", key: "totalPeakCEnergy" },
            { name: "峰时段总放电电量", value: "-", key: "totalPeakDEnergy" },
            { name: "平时段总充电电量", value: "-", key: "totalFlatCEnergy" },
            { name: "平时段总放电电量", value: "-", key: "totalFlatDEnergy" },
            { name: "谷时段总充电电量", value: "-", key: "totalValleyCEnergy" },
            { name: "谷时段总放电电量", value: "-", key: "totalValleyDEnergy" },
        ]
    })

    const [otherData, setOtherData] = useState({
        title: '其他设备',
        data: [
            { name: "除湿机当前温度", value: "-", key: "deTemp" },
            { name: "除湿机当前湿度", value: "-", key: "deHum" },
            { name: "除湿机温度启动值", value: "-", key: "deTempStart" },
            { name: "除湿机温度停止值", value: "-", key: "deTempStop" },
            { name: "除湿机湿度启动值", value: "-", key: "deHumStart" },
            { name: "除湿机湿度停止值", value: "-", key: "deHumStop" },
            { name: "液冷当前模式", value: "-", key: "lcMode" },
            { name: "水泵状态", value: "-", key: "wpState" },
            { name: "压缩机状态", value: "-", key: "csState" },
            { name: "液冷制冷点", value: "-", key: "lcRePoint" },
            { name: "液冷加热点", value: "-", key: "lcHeatPoint" },
            { name: "液冷制冷回差", value: "-", key: "lcCoolDiff" },
            { name: "液冷加热回差", value: "-", key: "lcHeatDiff" },
            { name: "液冷出水温度", value: "-", key: "lcOutletTemp" },
            { name: "液冷回水温度", value: "-", key: "lcCoolTemp" },
            { name: "液冷排气温度", value: "-", key: "lcExhaustTemp" },
            { name: "液冷进水压力", value: "-", key: "lcInletPressure" },
            { name: "液冷出水压力", value: "-", key: "lcOutletPressure" },
            { name: "液冷环境温度", value: "-", key: "lcEnvTemp" },
        ]
    })

    const getDtuDetailInfo = async () => {
        const res = await getDtuDetailInfoServe({dtuId: id, type: deviceVersion});
        if(res?.data?.data){
            const data = res?.data?.data;
            const newPcsData = cloneObject(pcsData); // PCS信息
            newPcsData.data = newPcsData.data?.map(item => {
                const newItem = cloneObject(item);
                newItem.value = data?.pcs?.[newItem.key]||"-";
                return newItem;
            })

            const newBmsData = cloneObject(bmsData); // BMS信息
            newBmsData.data = newBmsData.data?.map(item => {
                const newItem = cloneObject(item);
                newItem.value = data?.bms?.[newItem.key]||"-";
                return newItem;
            })

            const newBmsVersionData = cloneObject(bmsVersionData); // BMS版本信息
            newBmsVersionData.data = newBmsVersionData.data?.map(item => {
                const newItem = cloneObject(item);
                newItem.value = data?.bms?.[newItem.key]||"-";
                return newItem;
            })

            const newMeasureMeterData = cloneObject(measureMeterData); // 计量电表
            newMeasureMeterData.data = newMeasureMeterData.data?.map(item => {
                const newItem = cloneObject(item);
                newItem.value = data?.tmeter?.[newItem.key]||"-";
                return newItem;
            })

            const newMeasureDataData = cloneObject(measureDataData); // 计量数据
            newMeasureDataData.data = newMeasureDataData.data?.map(item => {
                const newItem = cloneObject(item);
                newItem.value = data?.gmeter?.[newItem.key]||"-";
                return newItem;
            })

            const newOtherData = cloneObject(otherData); //其他设备
            newOtherData.data = newOtherData.data?.map(item => {
                const newItem = cloneObject(item);
                newItem.value = data?.bms?.[newItem.key]||"-";
                return newItem;
            })

            setPcsData(newPcsData);
            setBmsData(newBmsData);
            setBmsVersionData(newBmsVersionData);
            setMeasureMeterData(newMeasureMeterData);
            setMeasureDataData(newMeasureDataData);
            setOtherData(newOtherData);
        }
    }

    useEffect(()=>{
        getDtuDetailInfo();
    }, [locale])
    
    return (
        <div 
            className={styles.details} 
            style={{
                width: '100%', 
                height: 'auto', 
                minHeight: '100%', 
                padding: '0px 85px',  
                background: token.bgcColorB_l
            }}>
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