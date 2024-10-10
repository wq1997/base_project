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
    const {locale} = useSelector(state => state.global);

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
            { name: "PCS支路1运行状态", value: "-", key: "statusAll" },
            { name: "PCS支路2运行状态", value: "-", key: "statusAll2" },
            { name: "系统故障状态", value: "-", key: "faultState" },
            { name: "系统告警状态", value: "-", key: "warnState" },
            { name: "当天交流充电电量", value: "-", key: "todayChargeEnergy" },
            { name: "当天交流放电电量", value: "-", key: "todayDischargeEnergy" },
            { name: "总充电电量", value: "-", key: "totalChargeEnergy" },
            { name: "总放电电量", value: "-", key: "totalDischargeEnergy" },
            { name: "交流母线总有功功率", value: "-", key: "activePower" },
            { name: "交流母线总无功功率", value: "-", key: "reactivePower" },
            { name: "交流母线总视在功率", value: "-", key: "apparentPower" },
            { name: "交流母线总功率因数", value: "-", key: "powerFactor" },
            { name: "支路1功率", value: "-", key: "power" },
            { name: "支路2功率", value: "-", key: "power2" },
            { name: "支路1电压", value: "-", key: "vol" },
            { name: "支路2电压", value: "-", key: "vol2" },
            { name: "支路1电流", value: "-", key: "cur" },
            { name: "支路2电流", value: "-", key: "cur2" },
            { name: "模块温度", value: "-", key: "moduleTemp" },
            { name: "机柜温度", value: "-", key: "cabinetTemp" },
            { name: "环境温度", value: "-", key: "envTemp" },
            { name: "交流母线频率", value: "-", key: "freq" },
        ],
    });
    const [pcsData1, setPcsData1] = useState({
        title: "PCS信息",
        data: [
            { name: "PCS支路1运行状态", value: "-", key: "statusAll" },
            { name: "系统故障状态", value: "-", key: "faultState" },
            { name: "系统告警状态", value: "-", key: "warnState" },
            { name: "当天交流充电电量", value: "-", key: "todayChargeEnergy" },
            { name: "当天交流放电电量", value: "-", key: "todayDischargeEnergy" },
            { name: "总充电电量", value: "-", key: "totalChargeEnergy" },
            { name: "总放电电量", value: "-", key: "totalDischargeEnergy" },
            { name: "交流母线总有功功率", value: "-", key: "activePower" },
            { name: "交流母线总无功功率", value: "-", key: "reactivePower" },
            { name: "交流母线总视在功率", value: "-", key: "apparentPower" },
            { name: "交流母线总功率因数", value: "-", key: "powerFactor" },
            { name: "支路1功率", value: "-", key: "power" },
            { name: "支路1电压", value: "-", key: "vol" },
            { name: "支路1电流", value: "-", key: "cur" },
            { name: "模块温度", value: "-", key: "moduleTemp" },
            { name: "机柜温度", value: "-", key: "cabinetTemp" },
            { name: "环境温度", value: "-", key: "envTemp" },
            { name: "交流母线频率", value: "-", key: "freq" },
        ],
    });
    const [bms1Data, setBms1Data] = useState({
        title: "BMS簇0信息",
        data: [
            { name: "BMS系统状态", value: "-", key: "bmcRunStatus" },
            { name: "电池充放电状态", value: "-", key: "batCdState" },
            { name: "电池禁止放电标志", value: "-", key: "batFDFlag" },
            { name: "电池禁止充电标志", value: "-", key: "batFCFlag" },
            { name: "接触器状态", value: "-", key: "contactState" },
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
    const [bms2Data, setBms2Data] = useState({
        title: "BMS簇1信息",
        data: JSON.parse(JSON.stringify(bms1Data.data)),
    })
    const [bmsData, setBmsData] = useState({
        title: "BMS版本信息",
        data: [
            { name: "BMS堆软件版本", value: "-", key: "softwareVersion" },
            { name: "BMS堆硬件版本", value: "-", key: "hardwareVersion" },
            // { name: "BMS堆2软件版本", value: "-", key: "BMS2softwareVersion" },
            // { name: "BMS堆2硬件版本", value: "-", key: "BMS2hardwareVersion" },
            { name: "BMS簇1/BCMU软件版本", value: "-", key: "BMC1softwareVersion" },
            { name: "BMS簇2/BCMU软件版本", value: "-", key: "BMC2softwareVersion" },
            { name: "BMS簇1/BCMU硬件版本", value: "-", key: "BMC1hardwareVersion" },
            { name: "BMS簇2/BCMU硬件版本", value: "-", key: "BMC2hardwareVersion" },
            { name: "BMS簇1/BMU最高软件版本", value: "-", key: "BMC1bmuHighestSoftwareVersion" },
            { name: "BMS簇2/BMU最高软件版本", value: "-", key: "BMC2bmuHighestSoftwareVersion" },
            { name: "BMS簇1/BMU最低软件版本", value: "-", key: "BMC1bmuLowestSoftwareVersion" },
            { name: "BMS簇2/BMU最低软件版本", value: "-", key: "BMC2bmuLowestSoftwareVersion" },
            { name: "BMS簇1/BMU最高硬件版本", value: "-", key: "BMC1bmuHighestHardwareVersion" },
            { name: "BMS簇2/BMU最高硬件版本", value: "-", key: "BMC2bmuHighestHardwareVersion" },
            { name: "BMS簇1/BMU最低硬件版本", value: "-", key: "BMC1bmuLowestHardwareVersion" },
            { name: "BMS簇2/BMU最低硬件版本", value: "-", key: "BMC2bmuLowestHardwareVersion" },
        ],
    })
    const [bmsData1, setBmsData1] = useState({
        title: "BMS版本信息",
        data: [
            { name: "BMS堆软件版本", value: "-", key: "softwareVersion" },
            { name: "BMS堆硬件版本", value: "-", key: "hardwareVersion" },
            // { name: "BMS堆2软件版本", value: "-", key: "BMS2softwareVersion" },
            // { name: "BMS堆2硬件版本", value: "-", key: "BMS2hardwareVersion" },
            { name: "BMS簇1/BCMU软件版本", value: "-", key: "BMC1softwareVersion" },
            { name: "BMS簇1/BCMU硬件版本", value: "-", key: "BMC1hardwareVersion" },
            { name: "BMS簇1/BMU最高软件版本", value: "-", key: "BMC1bmuHighestSoftwareVersion" },
            { name: "BMS簇1/BMU最低软件版本", value: "-", key: "BMC1bmuLowestSoftwareVersion" },
            { name: "BMS簇1/BMU最高硬件版本", value: "-", key: "BMC1bmuHighestHardwareVersion" },
            { name: "BMS簇1/BMU最低硬件版本", value: "-", key: "BMC1bmuLowestHardwareVersion" },
        ],
    })
    const [meterData, setMeterData] = useState({
        title: "计量电表",
        data: [
            { name: "总有功功率", value: "-", key: "totalActivePower" },
            { name: "总无功功率", value: "-", key: "totalReactivePower" },
            { name: "总视在功率", value: "-", key: "totalApparentPower" },
            { name: "总功率因数", value: "-", key: "totalFactor" },
            { name: "频率", value: "-", key: "totalFreq" },
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
        title: "液冷机1数据",
        data: [
            { name: "制冷点", value: "-", key: "lcRePoint" },
            { name: "加热点", value: "-", key: "lcHeatPoint" },
            { name: "出水温度", value: "-", key: "lcOutletTemp" },
            { name: "回水温度", value: "-", key: "lcBackTemp" },
            { name: "出水压力", value: "-", key: "lcOutletPressure" },
            { name: "进水压力", value: "-", key: "lcInletPressure" },
            { name: "制冷回差", value: "-", key: "lcCoolDiff" },
            { name: "加热回差", value: "-", key: "lcHeatDiff" },
            { name: "环境温度", value: "-", key: "lcEnvTemp" },
            { name: "排气温度", value: "-", key: "lcExhaustTemp" },
            { name: "水泵状态", value: "-", key: "wpState" },
            { name: "压缩机状态", value: "-", key: "csState" },
            { name: "液冷机当前模式", value: "-", key: "lcMode" },

        ],
    })
    const [ic2Data, setlc2Data] = useState({
        title: "液冷机2数据",
        data: JSON.parse(JSON.stringify(ic1Data.data)),
    })
    const id = getQueryString("id");

    useEffect(() => {
        getData();
    }, [locale])
    const getData = async () => {
        let { data } = await getBurDeviceDetailInfo2({ id });
        if ( data.data.pcsBranch[1]|| data.data.bmc[1]) {
        data.data.pcsBranch[1].statusAll2 = data.data.pcsBranch[1]?.statusAll;
        data.data.pcsBranch[1].power2 = data.data.pcsBranch[1].power;
        data.data.pcsBranch[1].cur2 = data.data.pcsBranch[1].cur;
        data.data.pcsBranch[1].vol2 = data.data.pcsBranch[1].vol;
        data.data.pcsBranch[1].statusAll = data.data.pcsBranch[0]?.statusAll;
        data.data.pcsBranch[1].power = data.data.pcsBranch[0].power;
        data.data.pcsBranch[1].cur = data.data.pcsBranch[0].cur;
        data.data.pcsBranch[1].vol = data.data.pcsBranch[0].vol;
        data.data.bmc[1].BMC2bmuHighestSoftwareVersion = data.data.bmc[1].bmuHighestSoftwareVersion;
        data.data.bmc[1].BMC2bmuLowestSoftwareVersion = data.data.bmc[1].bmuLowestSoftwareVersion;
        data.data.bmc[1].BMC2bmuHighestHardwareVersion = data.data.bmc[1].bmuHighestHardwareVersion;
        data.data.bmc[1].BMC2bmuLowestHardwareVersion = data.data.bmc[1].bmuLowestHardwareVersion;
        data.data.bmc[1].BMC2softwareVersion = data.data.bmc[1].softwareVersion;
        data.data.bmc[1].BMC2hardwareVersion = data.data.bmc[1].hardwareVersion;
        }
        
        // data.data.bms[1].BMS2softwareVersion = data.data.bms[1].softwareVersion;
        // data.data.bms[1].BMS2hardwareVersion = data.data.bms[1].hardwareVersion;
        data.data.bmc[0].BMC1bmuHighestSoftwareVersion = data.data.bmc[0].bmuHighestSoftwareVersion;
        data.data.bmc[0].BMC1bmuLowestSoftwareVersion = data.data.bmc[0].bmuLowestSoftwareVersion;
        data.data.bmc[0].BMC1bmuHighestHardwareVersion = data.data.bmc[0].bmuHighestHardwareVersion;
        data.data.bmc[0].BMC1bmuLowestHardwareVersion = data.data.bmc[0].bmuLowestHardwareVersion;
        data.data.bmc[0].BMC1softwareVersion = data.data.bmc[0].softwareVersion;
        data.data.bmc[0].BMC1hardwareVersion = data.data.bmc[0].hardwareVersion;
        data.data.bms[0].BMS1softwareVersion = data.data.bms[0].softwareVersion;
        data.data.bms[0].BMS1hardwareVersion = data.data.bms[0].hardwareVersion;
        // setBms2Data({...bms2Data,data:[...bms1Data.data],})
        // ic2Data.data=[...ic1Data.data]
        setData(data?.data);
        dealData(data?.data?.pcs, pcsData, setPcsData);
        dealData(data?.data?.pcsBranch[0], pcsData, setPcsData);
        dealData(data?.data?.pcsBranch[1], pcsData, setPcsData);
        dealData(data?.data?.pcs, pcsData1, setPcsData1);
        dealData(data?.data?.pcsBranch[0], pcsData1, setPcsData1);
        dealData(data?.data?.bmc[0], bms1Data, setBms1Data);
        dealData(data?.data?.bmc[1], bms2Data, setBms2Data);
        dealData(data?.data?.bmc[0], bmsData, setBmsData);
        dealData(data?.data?.bms[0], bmsData, setBmsData)
        dealData(data?.data?.bmc[1], bmsData, setBmsData);
        dealData(data?.data?.bmc[0], bmsData1, setBmsData1);
        dealData(data?.data?.bms[0], bmsData1, setBmsData1)
        dealData(data?.data?.meter, meterData, setMeterData);
        dealData(data?.data?.energy, energyData, setEnergyData);
        dealData(data?.data?.bmc[0], ic1Data, setlc1Data);
        dealData(data?.data?.bmc[1], ic2Data, setlc2Data);
        let arr=[];
        let obj1={};
        let obj2={};
        data.data.energy?.hoursCharge.map((it,index)=>{
            obj1={...obj1,0:t('充电电量'),[index+1]:it}
        });
        data.data.energy?.hoursDischarge.map((it,index)=>{
            obj2={...obj2,0:t('放电电量'),[index+1]:it}
        });

        arr.push(obj1);
        arr.push(obj2);
        setDataTable1([...arr])
    }
    const dealData = (data, baseData, handlBase) => {
        baseData.data.map(it => {
            data?.[it.key] ? it.value = data[it.key] : null;
            // if (baseData.title==='PCS信息') {
            // console.log(it.key,it.value, data[it.key],'aaa');
            // }
          
        });
        console.log(!data?.data?.bmc[1]&&baseData.title=='BMS簇0信息',11111);
        
        if (!data?.data?.bmc[1]&&baseData.title=='BMS簇0信息') {
            baseData.title='BMS信息'
        }
        handlBase({ ...baseData });
    };
  
    return (
        <div className={styles.details}>
            {data?.data?.pcsBranch[1]&&<DetalisCard data={pcsData} />}
            {!data?.data?.pcsBranch[1]&&<DetalisCard data={pcsData1} />}
            <DetalisCard data={bms1Data} />
            {data?.data?.bmc[1]&& <DetalisCard data={bms2Data} />}
            {data?.data?.bmc[1]?<DetalisCard data={bmsData} />:<DetalisCard data={bmsData1} />}
            <DetalisCard data={meterData} />
            <DetalisCard data={energyData} table={{tableClum1,tableClum2,dataTable1}}/>
            <DetalisCard data={ic1Data} />
            {data?.data?.bmc[1]&&<DetalisCard data={ic2Data} />}

        </div>
    )
}

export default Com