
import { useDispatch, useSelector, history } from "umi";
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Select } from 'antd';
import { apiLiveSummary } from "@/services/device";
import CardData from '../../components/CardDataOut'
function RealtimeData(props) {
    const [option, setOption] = useState([]);
    const [currentOpt,setCurrentOpt]=useState();
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    const [orignData, setOrignData] = useState({
        batteryValue: {
            title: "电池状态",
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
                // { name: "SOE", value: "-", key: "soe" },
                { name: "累计充电电量", value: "-", key: "totalChargeEnergy" },
                { name: "累计放电电量", value: "-", key: "totalDischargeEnergy" },
                { name: "系统充放电循环次数", value: "-", key: "cycleCount" },
                { name: "充电可用电能量", value: "-", key: "allowChargeEnergy" },
                { name: "放电可用电能量", value: "-", key: "allowDischargeEnergy" },
                // { name: "堆可充电量", value: "-", key: "allowChargeCapacity" },
                // { name: "堆可放电量", value: "-", key: "allowDischargeCapacity" },
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
                { name: "正极最小绝缘电阻", value: "-", key: "positiveMinInResistance" },
                { name: "负极最小绝缘电阻", value: "-", key: "cathodeMinInResistance" },
                // { name: "日收益", value: "-", key: "dayEarning" },
                // { name: "总收益", value: "-", key: "sumEarning" },
                // { name: "月收益", value: "-", key: "monEarning" },
            ],
        },
        energyStorageMeter: {
            title: "储能关口计量",
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
                { name: "总收益", value: "-", key: "sumEarning" },
                { name: "日收益", value: "-", key: "dayEarning" },
                { name: "月收益", value: "-", key: "monEarning" },

            ],
        },
        pcsValue: {
            title: "PCS",
            data: [
                { name: "PCS状态", value: "-", key: "pcsState" },
                { name: "PCS告警状态", value: "-", key: "pcsWarnState" },
                { name: "PCS故障状态", value: "-", key: "pcsFaultState" },
                { name: "急停按钮状态", value: "-", key: "stopBtnState" },
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
                { name: "A相IGBT温度", value: "-", key: "phaseAIgbtTemp" },
                { name: "B相IGBT温度", value: "-", key: "phaseBIgbtTemp" },
                { name: "C相IGBT温度", value: "-", key: "phaseCIgbtTemp" },
                { name: "环境温度", value: "-", key: "envTemp" },
                { name: "日充电量", value: "-", key: "dayCEnergy" },
                { name: "日放电量", value: "-", key: "dayDEnergy" },
                { name: "总充电电量", value: "-", key: "totalCEnergy" },
                { name: "总放电电量", value: "-", key: "totalDEnergy" },
                {
                    name: "最大可充功率",
                    value: "-",
                    key: "maxCPower",
                },
                { name: "最大可放功率", value: "-", key: "maxDPower" },

                // { name: "频率", value: "-", key: "totalFreq" },

                { name: "绝缘阻抗", value: "-", key: "ir" },


            ],
        },
        totalElectricityMeter: {
            title: "户外柜电表",
            data: [
                { name: "总视在功率", value: "-", key: "totalApparentPower" },
                { name: "总有功功率", value: "-", key: "totalActivePower" },
                { name: "总无功功率", value: "-", key: "totalReactivePower" },
                { name: "总功率因数", value: "-", key: "totalFactor" },
                { name: "总频率", value: "-", key: "totalFreq" },
                { name: "A相视在功率", value: "-", key: "apparentAPower" },
                { name: "A相有功功率", value: "-", key: "phaseAActivePower" },
                { name: "A相无功功率", value: "-", key: "phaseAReactivePower" },
                { name: "A相功率因数", value: "-", key: "phaseAFactor" },
                { name: "A相电压", value: "-", key: "phaseAVol" },
                { name: "A相电流", value: "-", key: "phaseACur" },
                { name: "B相视在功率", value: "-", key: "apparentBPower" },
                { name: "B相有功功率", value: "-", key: "phaseBActivePower" },
                { name: "B相无功功率", value: "-", key: "phaseBReactivePower" },
                { name: "B相功率因数", value: "-", key: "phaseBFactor" },
                { name: "B相电压", value: "-", key: "phaseBVol" },
                { name: "B相电流", value: "-", key: "phaseBCur" },
                { name: "C相视在功率", value: "-", key: "apparentCPower" },
                { name: "C相有功功率", value: "-", key: "phaseCActivePower" },
                { name: "C相无功功率", value: "-", key: "phaseCReactivePower" },
                { name: "C相功率因数", value: "-", key: "phaseCFactor" },
                { name: "C相电压", value: "-", key: "phaseCVol" },
                { name: "C相电流", value: "-", key: "phaseCCur" },
                { name: "AB线电压", value: "-", key: "lineAbVol" },
                { name: "BC线电压", value: "-", key: "lineBcVol" },
                { name: "AC线电压", value: "-", key: "lineAcVol" },
            ],
        },
        peripheral: {
            title: "内部设备",
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
                // { name: "液冷故障1", value: "-", key: "lcFault1" },
                // { name: "液冷故障2", value: "-", key: "lcFault2" },


            ]
        },
        cellData: {
            title: "Pack数据详情",
            data: []
        },
        intervalInstance: null,
    });
    const { plantDetails, realData } = useSelector(function (state) {
        return state.device
    });
    useEffect(() => {
        dealSeletData(plantDetails.info.OC);
    }, [])
    useEffect(() => {
        initData();
    }, [currentOpt,option])

    const initData = async () => {
        const res = await apiLiveSummary({
            dtuId: currentOpt
        }).then(({ data }) => {
            let { Status, bms, cell, gmeter, pcs, tmeter } = data?.data;
            setOrignData(val => {
                // val.batteryValue?.data=initValue(orignData.batteryValue,bms);
                return {
                    ...val,
                    batteryValue: {
                        title: '电池状态',
                        data: initValue(orignData.batteryValue, bms),
                    },
                    pcsValue: {
                        title: 'PCS',
                        data:initValue(orignData.pcsValue, pcs),
                    },
                    energyStorageMeter: {
                        title: '储能关口计量',
                        data: initValue(orignData.energyStorageMeter, gmeter),
                    },
                    totalElectricityMeter: {
                        title: '户外柜电表',
                        data: initValue(orignData.totalElectricityMeter, tmeter),
                    },
                    peripheral: {
                        title: '内部设备',
                        data: initValue(orignData.peripheral, bms),
                    },
                    cellData: {
                        title: "Pack数据详情",
                        data: cell
                    },

                }
            });
           
        })
    };

    const changeData = (value) => {
        // initData(value);
        setCurrentOpt(value)
    }
    const initValue = (baseData, resData) => {
        let arr = []
        baseData.data?.map((item) => {
            if (resData && resData.hasOwnProperty(item.key)) {
                item.value = resData[item.key];
            }
            arr.push(item)
        });
        return arr
    };
    const dealSeletData = (data) => {
        let arr = [];
        data.map((it, index) => {
            arr.push({
                value: it.dtuId,
                label: it.name
            })
        });
        setOption(arr);
setCurrentOpt(arr[0]?.value)
    }
    return (
        <div className='content'>
            <Select
                showSearch
                style={{
                    width: 200,
                }}
                placeholder="请选择设备"
                defaultValue={option[0]?.label}
                key={option[0]?.label}
                onChange={changeData}
                options={option}
            />
            <CardData data={orignData.batteryValue} />
            <CardData data={orignData.pcsValue} />
            <CardData data={orignData.energyStorageMeter} />
            <CardData data={orignData.totalElectricityMeter} />
            <CardData data={orignData.peripheral} />
            {/* <CardData data={orignData.cellData} /> */}
        </div>
    )
}

export default RealtimeData