// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { getBurDeviceDetailInfo2 } from '@/services/deviceTotal'
import { getQueryString } from "@/utils/utils";
import DetalisCard from "../../../DetailsCard";
import { Table, } from 'antd';
import { useSelector, useIntl } from "umi";

function Com(props) {
    const [data, setData] = useState('');
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const [dataTable1, setDataTable1] = useState([]);

    const tableClum1 = [
        {
            title: '',
            dataIndex: 0,
            key: 0,
            align:'center'
        },
        {
            title: '0:00--1:00',
            dataIndex: 1,
            key: 1,
            align:'center'

        }, {
            title: '1:00--2:00',
            dataIndex: 2,
            key: 2,
            align:'center'

        }, {
            title: '2:00--3:00',
            dataIndex: 3,
            key: 3,
            align:'center'

        },
        {
            title: '3:00--4:00',
            dataIndex: 4,
            align:'center',
            key: 4,
        }, {
            title: '4:00--5:00',
            dataIndex: 5,
            align:'center',
            key: 5,
        }, 
        {
            title: '5:00--6:00',
            dataIndex: 6,
            align:'center',
            key: 6,
        }, 
        {
            title: '6:00--7:00',
            dataIndex: 7,
            align:'center',
            key: 7,
        },
        {
            title: '7:00--8:00',
            dataIndex: 8,
            align:'center',
            key: 8,
        }, {
            title: '8:00--9:00',
            dataIndex: 9,
            align:'center',
            key: 9,
        }, {
            title: '9:00--10:00',
            dataIndex: 10,
            align:'center',
            key: 10,
        },
        {
            title: '10:00--11:00',
            dataIndex: 11,
            align:'center',
            key: 11,
        }, {
            title: '11:00--12:00',
            dataIndex: 12,
            align:'center',
            key: 12,
        }, 
    ]
    const tableClum2 = [
        {
            title: '',
            dataIndex: 0,
            align:'center',
            key: 0,
        },
        {
            title: '12:00--13:00',
            dataIndex: 13,
            align:'center',
            key: 13,
        },{
            title: '13:00--14:00',
            dataIndex: 14,
            align:'center',
            key: 14,
        }, {
            title: '14:00--15:00',
            dataIndex: 15,
            align:'center',
            key: 15,
        }, {
            title: '15:00--16:00',
            dataIndex: 16,
            align:'center',
            key: 16,
        }, {
            title: '16:00--17:00',
            dataIndex: 17,
            align:'center',
            key: 17,
        }, {
            title: '17:00--18:00',
            dataIndex: 18,
            align:'center',
            key: 18,
        }, {
            title: '18:00--19:00',
            dataIndex: 19,
            align:'center',
            key: 19,
        }, {
            title: '19:00--20:00',
            dataIndex: 20,
            align:'center',
            key: 20
        }, {
            title: '20:00--21:00',
            dataIndex: 21,
            align:'center',
            key: 21,
        }, {
            title: '21:00--22:00',
            dataIndex: 22,
            align:'center',
            key: 22,
        },
        {
            title: '22:00--23:00',
            dataIndex: 23,
            align:'center',
            key: 23
        }, {
            title: '23:00--00:00',
            dataIndex: 24,
            align:'center',
            key: 24
        },
    ]
    const [pcsData, setPcsData] = useState({
        title: "PCS信息",
        data: [
            { name: "运行状态", value: "-", key: "status" },
            { name: "并网状态", value: "-", key: "gridState" },
            { name: "总报警状态", value: "-", key: "warnState" },
            { name: "累计充电量", value: "-", key: "acTotalChargeEnergy" },
            { name: "累计放电量", value: "-", key: "acTotalDischargeEnergy" },
            { name: "总有功功率", value: "-", key: "totalActivePower" },
            { name: "总视在功率", value: "-", key: "totalApparentPower" },
            { name: "总功率因数", value: "-", key: "totalFactor" },
            { name: "输入功率", value: "-", key: "inputPower" },
            { name: "输入电流", value: "-", key: "inputCur" },
            { name: "A相输出有功功率", value: "-", key: "phaseAActivePower" },
            { name: "B相输出有功功率", value: "-", key: "phaseBActivePower" },
            { name: "A相输出无功功率", value: "-", key: "phaseAReactivePower" },
            { name: "B相输出无功功率", value: "-", key: "phaseBReactivePower" },
            { name: "C相输出无功功率", value: "-", key: "phaseCReactivePower" },
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
            { name: "充电可用电量", value: "-", key: "allowChargeEnergy" },
            { name: "放电可用电量", value: "-", key: "allowDischargeEnergy" },
            { name: "累计充电电量", value: "-", key: "totalChargeCapacity" },
            { name: "累计放电电量", value: "-", key: "totalDischargeCapacity" },
            { name: "系统充放电循环次数", value: "-", key: "cycleCount" },
            { name: "单体压差", value: "-", key: "cellVolDiff" },
            { name: "单体温差", value: "-", key: "cellTempDiff" },
            { name: "系统正极绝缘电阻阻值", value: "-", key: "positiveResistance" },
            { name: "系统负极绝缘电阻阻值", value: "-", key: "negativeResistance" },
        ],
    })
    
    const [bmsNoData, setBmsNoData] = useState({
        title: "BMS版本信息",
        data: [
            { name: "BMS软件版本", value: "-", key: "softwareVersion" },
            { name: "BMS硬件版本", value: "-", key: "hardwareVersion" },
            { name: "BCMU最高软件版本", value: "-", key: "bcmuHighestSoftwareVersion" },
            { name: "BCMU最高硬件版本", value: "-", key: "bcmuHighestHardwareVersion" },
            { name: "BCMU最低软件版本", value: "-", key: "bcmuLowestSoftwareVersion" },
            { name: "BCMU最低硬件版本", value: "-", key: "bcmuLowestHardwareVersion" },
            
        ],
    })
    const [meterData, setMeterData] = useState({
        title: "计量电表",
        data: [
            { name: "总有功功率", value: "-", key: "totalActivePower" },
            { name: "总无功功率", value: "-", key: "totalReactivePower" },
            { name: "总视在功率", value: "-", key: "totalApparentPower" },
            { name: "总功率因数", value: "-", key: "totalFactor" },
            { name: "A相电流", value: "-", key: "phaseACur" },
            { name: "B相电流", value: "-", key: "phaseBCur" },
            { name: "C相电流", value: "-", key: "phaseCCur" },
            { name: "AB线电压", value: "-", key: "lineAbVol" },
            { name: "BC线电压", value: "-", key: "lineBcVol" },
            { name: "CA线电压", value: "-", key: "lineCaVol" },
            { name: "A相有功功率", value: "-", key: "phaseAActivePower" },
            { name: "B相有功功率", value: "-", key: "phaseBActivePower" },
            { name: "C相有功功率", value: "-", key: "phaseCActivePower" },
            { name: "A相无功功率", value: "-", key: "phaseAReactivePower" },
            { name: "B相无功功率", value: "-", key: "phaseBReactivePower" },
            { name: "C相无功功率", value: "-", key: "phaseCReactivePower" },
            { name: "A相视在功率", value: "-", key: "apparentAPower" },
            { name: "B相视在功率", value: "-", key: "apparentBPower" },
            { name: "C相视在功率", value: "-", key: "apparentCPower" },
            { name: "总正向有功电能", value: "-", key: "apparentBPower" },
            { name: "总反向有功电能", value: "-", key: "apparentCPower" },
        ],
    })
    const [energyData, setEnergyData] = useState({
        title: "计量数据",
        data: [
            { name: "日充电电量", value: "-", key: "dayChargeEnergy" },
            { name: "日放电电量", value: "-", key: "dayDischargeEnergy" },
            { name: "月充电电量", value: "-", key: "monChargeEnergy" },
            { name: "月放电电量", value: "-", key: "monDischargeEnergy" },
            { name: "累计充电电量", value: "-", key: "totalCEnergy" },
            { name: "累计放电电量", value: "-", key: "totalDEnergy" },

        ],
    })
    const [ic1Data, setlc1Data] = useState({
        title: "其他设备",
        data: [
            { name: "除湿机当前温度", value: "-", key: "deTemp" },
            { name: "除湿机当前湿度", value: "-", key: "deHum" },
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
            { name: "液冷回水温度", value: "-", key: "lcBackTemp" },
            { name: "液冷排气温度", value: "-", key: "lcExhaustTemp" },
            { name: "液冷进水压力", value: "-", key: "lcInletPressure" },
            { name: "液冷出水压力", value: "-", key: "lcOutletPressure" },
            { name: "液冷环境温度", value: "-", key: "lcEnvTemp" },
        ],
    })
    const [Dcdc1, setDcdc1] = useState({
        title: "DCDC1",
        data: [
            { name: "机器运行状态", value: "-", key: "status" },
            { name: "故障码", value: "-", key: "fault" },
            { name: "累计电量", value: "-", key: "totalEnergy" },
            { name: "当前运行功率", value: "-", key: "power" },
            { name: "允许运行功率", value: "-", key: "allowPower" },
            { name: "模块最高温度", value: "-", key: "maxTemp" },
            { name: "PV侧电压", value: "-", key: "batVol" },
            { name: "BUS侧电压", value: "-", key: "busVol" },
            { name: "BUS侧电流", value: "-", key: "BUS侧电流" },
            { name: "PV侧电流", value: "-", key: "batCur" },
        ],
    })
    const [Dcdc2, setDcdc2] = useState({
        title: "DCDC2",
        data: [
            { name: "机器运行状态", value: "-", key: "status" },
            { name: "故障码", value: "-", key: "fault" },
            { name: "累计电量", value: "-", key: "totalEnergy" },
            { name: "当前运行功率", value: "-", key: "power" },
            { name: "允许运行功率", value: "-", key: "allowPower" },
            { name: "模块最高温度", value: "-", key: "maxTemp" },
            { name: "PV侧电压", value: "-", key: "batVol" },
            { name: "BUS侧电压", value: "-", key: "busVol" },
            { name: "BUS侧电流", value: "-", key: "busCur" },
            { name: "PV侧电流", value: "-", key: "batCur" },
        ],
    })
    const id = getQueryString("id");

    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        let { data } = await getBurDeviceDetailInfo2({ id });
        setData(data?.data);
        dealData(data?.data?.pcs, pcsData, setPcsData);
        dealData(data?.data?.bms, bmsData, setBmsData);
        dealData(data?.data?.bms, bmsNoData, setBmsNoData)
        dealData(data?.data?.tmeter, meterData, setMeterData);
        dealData(data?.data?.gmeter, energyData, setEnergyData);
        dealData(data?.data?.bms, ic1Data, setlc1Data);
        dealData(data?.data?.d2c?.[0], Dcdc2, setDcdc1);
        dealData(data?.data?.d2c?.[1], Dcdc2, setDcdc2);
        let arr=[];
        let obj1={};
        let obj2={};
        data.data.gmeter?.hourChargeEnergy.map((it,index)=>{
            obj1={...obj1,0:t('充电电量'),[index+1]:it}
        });
        data.data.gmeter?.hourDischargeEnergy.map((it,index)=>{
            obj2={...obj2,0:t('放电电量'),[index+1]:it}
        });

        arr.push(obj1);
        arr.push(obj2);
        setDataTable1([...arr])
    }
    const dealData = (data, baseData, handlBase) => {
        baseData.data.map(it => {
            data[it.key] ? it.value = data[it.key] : null
        });
        handlBase({ ...baseData });
    };
  
    return (
        <div className={styles.details}>
            <DetalisCard data={pcsData} />
            <DetalisCard data={bmsData} />
            <DetalisCard data={bmsNoData} />
            <DetalisCard data={meterData} />
            <DetalisCard data={energyData} table={{tableClum1,tableClum2,dataTable1}}/>
            <DetalisCard data={ic1Data} />
            <DetalisCard data={Dcdc1} />
            <DetalisCard data={Dcdc2} />

        </div>
    )
}

export default Com