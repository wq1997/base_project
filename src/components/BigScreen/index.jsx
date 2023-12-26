import { useState, useEffect } from "react";
import styles from "./index.less";
import MapChina from '../BigScreen/map'
import MapWorld from '../BigScreen/wordMap'

import ScrollTable from "./component/ScorllTable";
import Header from './component/Header';
import AreaTemplate from "./component/AreaTemplate";
import Carbon from "./component/carbon";
import IncomeRanking from "./component/incomeRanking";
import IncomeCurve from "./component/incomeCurve";
import MaintenanceList from "./component/maintenanceList";
import CenterTopData from "./component/centerTopData";
import Efficiency from "./component/efficiency";
import OperationAll from "./component/operationAll";
import AlarmData from "./component/alarmData";
import RunningView from "./component/runningView";

import {
    getOMOverviewServe,
    getAlmListServe,
    getAllPlantList
} from "@/services/bigScreen";
import { useRequest } from "ahooks";
import moment from "moment";

const deviceTypeList = [
    {
        key: 'LargeEnergy',
        label: '储能系统',
        title: '储能系统'
    },
    {
        key: 'IntegratedMachine',
        label: '光储一体机',
        title: '光储一体机'
    }
]
const areaTypeList = [
    {
        key: 'domestic',
        label: '国内'
    },
    {
        key: 'overseas',
        label: '海外'
    }
]
function BigScreen() {
    const [deviceType, setDeviceType] = useState('LargeEnergy');
    const [areaType, setAreaType] = useState('domestic');
    const [plantsPosition, setPlantsPosition] = useState();

    const [myMaintenanceListData, setMyMaintenanceListData] = useState([]);
    const { data: maintenanceListData, run } = useRequest(getOMOverviewServe, {
        pollingInterval: 1000*60*60*12, //12小时轮询一次
        manual: true,
    });

    const [myAlmListData, setMyAlmListData] = useState([]);
    const { data: almListData, run: runAlm } = useRequest(getAlmListServe, {
        pollingInterval: 1000*60*60*12, //12小时轮询一次
        manual: true,
    });

    const getPlantPosition = async () => {
        const { data } = await getAllPlantList({
            db: areaType === 'domestic' ? true : false,
            isMin: deviceType === 'IntegratedMachine' ? true : false
        })
        setPlantsPosition(data.data)
    };

    useEffect(()=>{
        run({
            db: areaType==="domestic",
            isMin: deviceType==="IntegratedMachine"
        });
        runAlm({
            db: areaType==="domestic",
            isMin: deviceType==="IntegratedMachine"
        });
        getPlantPosition();
    }, [deviceType, areaType]);

    useEffect(()=>{
        if(maintenanceListData?.data?.data){
            const result = maintenanceListData?.data?.data?.list;
            setMyMaintenanceListData(result);
        }
    }, [maintenanceListData])

    useEffect(()=>{
        if(almListData?.data?.data){
            const result = almListData?.data?.data;
            setMyAlmListData(result);
        }
    }, [almListData])

    return (
        <div className={styles.content}>
            <Header 
                currentDeviceType={deviceType}
                currentAreaType={areaType}
                deviceTypeList={deviceTypeList}
                areaTypeList={areaTypeList}
                onChangedDeviceType={(newDeviceType)=>{
                    if(deviceType===newDeviceType||(areaType==="overseas"&&newDeviceType==="LargeEnergy")) return;
                    setDeviceType(newDeviceType);
                }}
                onChangedAreaType={(newAreaType)=>{
                    if(areaType===newAreaType||(deviceType==="LargeEnergy"&&newAreaType==="overseas")) return;
                    setAreaType(newAreaType);
                }}
            />
            <div className={styles.contentBottom}>
                <div className={styles.contentBottomLeft}>
                    <AreaTemplate 
                        title="储能设备运行概览"
                    >
                        <RunningView deviceType={deviceType} areaType={areaType}  />
                    </AreaTemplate>
                    <AreaTemplate 
                        title="设备充放电效率排行"
                    >
                        <Efficiency deviceType={deviceType} areaType={areaType}/>
                    </AreaTemplate>
                    <AreaTemplate 
                        title="减碳曲线展示"
                    >
                        <Carbon deviceType={deviceType} areaType={areaType}/>
                    </AreaTemplate>
                    <AreaTemplate 
                        title="项目收益排行"
                    >
                        <IncomeRanking deviceType={deviceType} areaType={areaType}/>
                    </AreaTemplate>
                </div>
                <div className={styles.contentBottomCenterTop}>
                    <CenterTopData deviceType={deviceType} areaType={areaType}/>
                </div>
                <div className={styles.contentBottomCenterBottom}>
                    <AreaTemplate 
                        title="储能系统收益统计曲线图"
                    >
                        <IncomeCurve deviceType={deviceType} areaType={areaType}/>
                    </AreaTemplate>
                </div>
                <div className={styles.contentBottomRight}>
                    <AreaTemplate 
                        title="智慧运维汇总"
                    >
                        <OperationAll deviceType={deviceType} areaType={areaType}/>
                    </AreaTemplate>
                    <AreaTemplate 
                        title="智慧告警设备"
                    >
                        <AlarmData deviceType={deviceType} areaType={areaType}/>
                    </AreaTemplate>
                    <AreaTemplate 
                        title="告警列表"
                    >
                        <div style={{padding: '0 30px', height: '100%'}}>
                            <ScrollTable 
                                columns={[
                                    {
                                        title: '故障时间',
                                        key: 'begin'
                                    },
                                    {
                                        title: '故障描述',
                                        key: 'descs'
                                    },
                                    {
                                        title: '故障等级',
                                        key: 'level'
                                    }
                                ]}
                                dataSource={myAlmListData?.map(item => {
                                    return {
                                        ...item,
                                        prior: {
                                            1: '一级',
                                            2: '二级',
                                            3: '三级',
                                            4: '四级'
                                        }[item?.prior]
                                    }
                                })}
                            />
                        </div>
                    </AreaTemplate>
                    <AreaTemplate 
                        title="运维工单汇总"
                    >
                        <MaintenanceList deviceType={deviceType} areaType={areaType}/>
                    </AreaTemplate>
                    <AreaTemplate 
                        title="运维工单列表"
                    >
                        <div style={{padding: '0 30px', height: '100%'}}>
                            <ScrollTable 
                                headerLineColor="#6974C1"
                                columns={[
                                    {
                                        title: '序号',
                                        key: 'id'
                                    },
                                    {
                                        title: '工单编号',
                                        key: 'no'
                                    },
                                    {
                                        title: '工单类型',
                                        key: 'type'
                                    },
                                    {
                                        title: '发布时间',
                                        key: 'publishTime'
                                    },
                                    {
                                        title: '处理状态',
                                        key: 'status'
                                    },
                                    {
                                        title: '处理时长',
                                        key: 'period'
                                    }
                                ]}
                                dataSource={myMaintenanceListData?.map(item => {
                                    return {
                                        ...item,
                                        publishTime: moment(item?.publishTime).format("YYYY-MM-DD")
                                    }
                                })}
                            />
                        </div>
                    </AreaTemplate>
                </div>
                <div className={styles.contentBottomMap}>
                    {areaType == 'domestic' && <MapChina key={areaType} allPlant={plantsPosition} />}
                    {areaType == 'overseas' && <MapWorld key={areaType} allPlant={plantsPosition} />}
                </div>
            </div>
        </div>
    )
}

export default BigScreen;