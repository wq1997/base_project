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

function Com({deviceVersion}) {
    const { token } = theme.useToken();
    const id = getQueryString("id");
    const [showLoadMeterData, setShowLoadMeterData] = useState(false);

    const [pcsData, setPcsData] = useState({
        title: "PCS信息",
        data: [
            { name: "PCS运行状态", value: "-", key: "pcsState" },
            { name: "PCS告警状态", value: "-", key: "pcsWarnState" },
            { name: "PCS故障状态", value: "-", key: "pcsFaultState" },
            { name: "IGBT风机状态", value: "-", key: "igbtFanState" },
            { name: "防雷器状态", value: "-", key: "lightingArresterState" },
            { name: "直流接触器状态", value: "-", key: "dcContactorState" },
            { name: "绝缘检测接触器状态", value: "-", key: "irContactorState" },
            { name: "直流电压", value: "-", key: "batVol" },
            { name: "直流电流", value: "-", key: "batCur" },
            { name: "直流功率", value: "-", key: "batPower" },
            { name: "电网电压", value: "-", key: "gridVol" },
            { name: "电网电流", value: "-", key: "ac" },
            { name: "电网频率", value: "-", key: "totalFreq" },
            { name: "总功率因数", value: "-", key: "totalFactor" },
            { name: "总有功功率", value: "-", key: "totalActivePower" },
            { name: "总无功功率", value: "-", key: "totalReactivePower" },
            { name: "总视在功率", value: "-", key: "totalApparentPower" },
            { name: "A相IGBT温度", value: "-", key: "phaseAIgbtTemp" },
            { name: "B相IGBT温度", value: "-", key: "phaseBIgbtTemp" },
            { name: "C相IGBT温度", value: "-", key: "phaseCIgbtTemp" },
            { name: "环境温度", value: "-", key: "envTemp" },
            { name: "日充电量", value: "-", key: "dayCEnergy" },
            { name: "日放电量", value: "-", key: "dayDEnergy" },
            { name: "总充电电量", value: "-", key: "totalCEnergy" },
            { name: "总放电电量", value: "-", key: "totalDEnergy" },
            { name: "最大可充功率", value: "-", key: "maxCPower" },
            { name: "最大可放功率", value: "-", key: "maxDPower" },
            { name: "绝缘阻抗", value: "-", key: "ir" }
        ],
    });

    const [bmsData, setBmsData] = useState({
        title: "BMS信息",
        data: [
            { name: "BMS系统状态", value: "-", key: "bmsRunStatus" },
            { name: "BMS充放电状态", value: "-", key: "batCdState" },
            { name: "电池禁止充电状态", value: "-", key: "batFCFlag" },
            { name: "电池禁止放电状态", value: "-", key: "batFDFlag" },
            { name: "电压", value: "-", key: "vol" },
            { name: "电流", value: "-", key: "cur" },
            { name: "功率", value: "-", key: "power" },
            { name: "SOC", value: "-", key: "soc" },
            { name: "SOH", value: "-", key: "soh" },
            { name: "累计充电电量", value: "-", key: "totalChargeEnergy" },
            { name: "累计放电电量", value: "-", key: "totalDischargeEnergy" },
            { name: "系统充放电循环次数", value: "-", key: "cycleCount" },
            { name: "充电可用电能量", value: "-", key: "allowChargeEnergy" },
            { name: "放电可用电能量", value: "-", key: "allowDischargeEnergy" },
            { name: "单体最高电压", value: "-", key: "cellVolMax" },
            { name: "单体最高电压电芯序号", value: "-", key: "cellVolMaxNo" },
            { name: "单体最低电压", value: "-", key: "cellVolMin" },
            { name: "单体最低电压电芯序号", value: "-", key: "cellVolMinNo" },
            { name: "堆单体压差", value: "-", key: "cellVolDiff" },
            { name: "单体最高温度", value: "-", key: "cellTempMax" },
            { name: "单体最高温度电芯序号", value: "-", key: "cellTempMaxNo" },
            { name: "单体最低温度", value: "-", key: "cellTempMin" },
            { name: "单体最低温度电芯序号", value: "-", key: "cellTempMinNo" },
            { name: "堆单体温差", value: "-", key: "cellTempDiff" },
            { name: "充电电压限值", value: "-", key: "chargeVolLimit" },
            { name: "充电电流限值", value: "-", key: "allowMaxChargeCur" },
            { name: "充电功率限值", value: "-", key: "allowMaxChargePower" },
            { name: "放电电压限值", value: "-", key: "dischargeVolLimit" },
            { name: "放电电流限值", value: "-", key: "allowMaxDischargeCur" },
            { name: "放电功率限值", value: "-", key: "allowMaxDischargePower" },
            { name: "BCMU最高软件版本", value: "-", key: "bcmuMaxSoftwareVersion" },
            { name: "BCMU最高硬件版本", value: "-", key: "bcmuMaxHardwareVersion" },
            { name: "正极最小绝缘电阻", value: "-", key: "positiveMinInResistance" },
            { name: "负极最小绝缘电阻", value: "-", key: "cathodeMinInResistance" },
        ],
    });

    const [loadMeterData, setLoadMeterData] = useState({
        title: "负载电表",
        data: [
            { name: "总有功功率", value: "-", key: "totalActivePower" },
            { name: "A相有功功率", value: "-", key: "phaseAActivePower" },
            { name: "B相有功功率", value: "-", key: "phaseBActivePower" },
            { name: "C相有功功率", value: "-", key: "phaseCActivePower" },
            { name: "总无功功率", value: "-", key: "totalReactivePower" },
            { name: "A相无功功率", value: "-", key: "phaseAReactivePower" },
            { name: "B相无功功率", value: "-", key: "phaseBReactivePower" },
            { name: "C相无功功率", value: "-", key: "phaseCReactivePower" },
            { name: "总视在功率", value: "-", key: "totalApparentPower" },
            { name: "A相视在功率", value: "-", key: "apparentAPower" },
            { name: "B相视在功率", value: "-", key: "apparentBPower" },
            { name: "C相视在功率", value: "-", key: "apparentCPower" },
            { name: "A相电压", value: "-", key: "phaseAVol" },
            { name: "B相电压", value: "-", key: "phaseBVol" },
            { name: "C相电压", value: "-", key: "phaseCVol" },
            { name: "A相电流", value: "-", key: "phaseACur" },
            { name: "B相电流", value: "-", key: "phaseBCur" },
            { name: "C相电流", value: "-", key: "phaseCCur" },
            { name: "总频率", value: "-", key: "totalFreq" },
            { name: "总功率因数", value: "-", key: "totalFactor" },
            { name: "负载电表通讯状态", value: "-", key: "loadMeterState" },
        ],
    });

    const [measureMeterData, setMeasureMeterData] = useState({
        title: '计量电表',
        data: [
            { name: "总视在功率", value: "-", key: "totalApparentPower" },
            { name: "总有功功率", value: "-", key: "totalActivePower" },
            { name: "总无功功率", value: "-", key: "totalReactivePower" },
            { name: "总功率因数", value: "-", key: "totalFactor" },
            { name: "总频率", value: "-", key: "totalFreq" },
            { name: "A相视在功率", value: "-", key: "apparentAPower" },
            { name: "A相有功功率", value: "-", key: "phaseAActivePower" },
            { name: "A相无功功率", value: "-", key: "phaseAReactivePower" },
            { name: "A功率因数", value: "-", key: "phaseAFactor" },
            { name: "A相电压", value: "-", key: "phaseAVol" },
            { name: "A相电流", value: "-", key: "phaseACur" },
            { name: "B相视在功率", value: "-", key: "apparentBPower" },
            { name: "B相有功功率", value: "-", key: "phaseBActivePower" },
            { name: "B相无功功率", value: "-", key: "phaseBReactivePower" },
            { name: "B功率因数", value: "-", key: "phaseBFactor" },
            { name: "B相电压", value: "-", key: "phaseBVol" },
            { name: "B相电流", value: "-", key: "phaseBCur" },
            { name: "C相视在功率", value: "-", key: "apparentCPower" },
            { name: "C相有功功率", value: "-", key: "phaseCActivePower" },
            { name: "C相无功功率", value: "-", key: "phaseCReactivePower" },
            { name: "C功率因数", value: "-", key: "phaseCFactor" },
            { name: "C相电压", value: "-", key: "phaseCVol" },
            { name: "C相电流", value: "-", key: "phaseCCur" },
            { name: "AB线电压", value: "-", key: "lineAbVol" },
            { name: "BC线电压", value: "-", key: "lineBcVol" },
            { name: "AC线电压", value: "-", key: "lineAcVol" },
        ]
    })

    const [measureDataData, setMeasureDataData] = useState({
        title: '计量数据',
        data: [
            { name: "总充电电量", value: "-", key: "totalCEnergy" },
            { name: "总放电电量", value: "-", key: "totalDEnergy" },
            { name: "日放电电量", value: "-", key: "dayDischargeEnergy" },
            { name: "日充电电量", value: "-", key: "dayChargeEnergy" },
            { name: "月充电电量", value: "-", key: "monChargeEnergy" },
            { name: "月放电电量", value: "-", key: "monDischargeEnergy" },
            { name: "尖时段总充电电量", value: "-", key: "totalTipCEnergy" },
            { name: "峰时段总充电电量", value: "-", key: "totalPeakCEnergy" },
            { name: "平时段总充电电量", value: "-", key: "totalFlatCEnergy" },
            { name: "谷时段总充电电量", value: "-", key: "totalValleyCEnergy" },
            { name: "尖时段总放电电量", value: "-", key: "totalTipDEnergy" },
            { name: "峰时段总放电电量", value: "-", key: "totalPeakDEnergy" },
            { name: "平时段总放电电量", value: "-", key: "totalFlatDEnergy" },
            { name: "谷时段总放电电量", value: "-", key: "totalValleyDEnergy" },
            { name: "尖时段日充电电量", value: "-", key: "tipChargeEnergy" },
            { name: "峰时段日充电电量", value: "-", key: "peakChargeEnergy" },
            { name: "平时段日充电电量", value: "-", key: "flatChargeEnergy" },
            { name: "谷时段日充电电量", value: "-", key: "valleyChargeEnergy" },
            { name: "尖时段日放电电量", value: "-", key: "tipDischargeEnergy" },
            { name: "峰时段日放电电量", value: "-", key: "peakDischargeEnergy" },
            { name: "平时段日放电电量", value: "-", key: "flatDischargeEnergy" },
            { name: "谷时段日放电电量", value: "-", key: "valleyDischargeEnergy" },
            { name: "尖时段月充电电量", value: "-", key: "monTipCEnergy" },
            { name: "峰时段月充电电量", value: "-", key: "monPeakCEnergy" },
            { name: "平时段月充电电量", value: "-", key: "monFlatCEnergy" },
            { name: "谷时段月充电电量", value: "-", key: "monValleyCEnergy" },
            { name: "尖时段月放电电量", value: "-", key: "monTipDEnergy" },
            { name: "峰时段月放电电量", value: "-", key: "monPeakDEnergy" },
            { name: "平时段月放电电量", value: "-", key: "monFlatDEnergy" },
            { name: "谷时段月放电电量", value: "-", key: "monValleyDEnergy" },
            { name: "日收益", value: "-", key: "dayEarning" },
            { name: "月收益", value: "-", key: "monEarning" },
            { name: "总收益", value: "-", key: "sumEarning" },
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
            setShowLoadMeterData(data?.hasOwnProperty("load-meter"));
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

            const newMeasureMeterData = cloneObject(measureMeterData); // 计量电表
            newMeasureMeterData.data = newMeasureMeterData.data?.map(item => {
                const newItem = cloneObject(item);
                newItem.value = data?.tmeter?.[newItem.key]||"-";
                return newItem;
            })

            const newLoadMeterData = cloneObject(loadMeterData); // 负载电表
            newLoadMeterData.data = newLoadMeterData.data?.map(item => {
                const newItem = cloneObject(item);
                newItem.value = data?.["load-meter"]?.[newItem.key]||"-";
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
            setMeasureMeterData(newMeasureMeterData);
            setMeasureDataData(newMeasureDataData);
            setOtherData(newOtherData);
            setLoadMeterData(newLoadMeterData);
        }
    }

    useEffect(()=>{
        getDtuDetailInfo();
    }, [])

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
            <DetalisCard data={measureMeterData} />
            {showLoadMeterData&&<DetalisCard data={loadMeterData} />}
            <DetalisCard data={measureDataData} />
            <DetalisCard data={otherData} />
        </div>
    )
}

export default Com