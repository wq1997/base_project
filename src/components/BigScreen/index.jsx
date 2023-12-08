import styles from "./index.less";
import MapChina from '../BigScreen/map'
import MapWorld from '../BigScreen/wordMap'

import ScrollTable from "./component/ScorllTable";
import Header from './component/Header';
import AreaTemplate from "./component/AreaTemplate";
import { useState } from "react";
import Carbon from "./component/carbon";
import IncomeRanking from "./component/incomeRanking";
import IncomeCurve from "./component/incomeCurve";
import MaintenanceList from "./component/maintenanceList";
import CenterTopData from "./component/centerTopData";
import Efficiency from "./component/efficiency";
import OperationAll from "./component/operationAll";
import AlarmData from "./component/alarmData";
import RunningView from "./component/runningView";

const deviceTypeList = [
    {
        key: 'LargeEnergy',
        label: '系统储能',
        title: '系统储能'
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

    return (
        <div className={styles.content}>
            <Header 
                currentDeviceType={deviceType}
                currentAreaType={areaType}
                deviceTypeList={deviceTypeList}
                areaTypeList={areaTypeList}
                onChangedDeviceType={(newDeviceType)=>{
                    if(deviceType===newDeviceType) return;
                    setDeviceType(newDeviceType);
                }}
                onChangedAreaType={(newAreaType)=>{
                    if(areaType===newAreaType) return;
                    setAreaType(newAreaType);
                }}
            />
            <div className={styles.contentBottom}>
                <div className={styles.contentBottomLeft}>
                    <AreaTemplate 
                        title="储能设备运行概念"
                    >
                        <RunningView />
                    </AreaTemplate>
                    <AreaTemplate 
                        title="设备充放电效率排行"
                    >
                        <Efficiency />
                    </AreaTemplate>
                    <AreaTemplate 
                        title="减碳曲线展示"
                    >
                        <Carbon />
                    </AreaTemplate>
                    <AreaTemplate 
                        title="项目收益排行"
                    >
                        <IncomeRanking />
                    </AreaTemplate>
                </div>
                <div className={styles.contentBottomCenterTop}>
                    <CenterTopData />
                </div>
                <div className={styles.contentBottomCenterBottom}>
                    <AreaTemplate 
                        title="储能系统收益统计曲线图"
                    >
                        <IncomeCurve currentAreaType={areaType}/>
                    </AreaTemplate>
                </div>
                <div className={styles.contentBottomRight}>
                    <AreaTemplate 
                        title="智慧运维汇总"
                    >
                        <OperationAll />
                    </AreaTemplate>
                    <AreaTemplate 
                        title="智慧告警设备"
                    >
                        <AlarmData />
                    </AreaTemplate>
                    <AreaTemplate 
                        title="告警列表"
                    >
                        <div style={{padding: '0 30px', height: '100%'}}>
                            <ScrollTable 
                                columns={[
                                    {
                                        title: '故障时间',
                                        key: 'time'
                                    },
                                    {
                                        title: '故障描述',
                                        key: 'description'
                                    },
                                    {
                                        title: '故障等级',
                                        key: 'level'
                                    }
                                ]}
                                dataSource={[
                                    {
                                        time: '2023-11-11',
                                        description: '失败警告',
                                        level: 1
                                    },
                                    {
                                        time: '2023-11-11',
                                        description: '失败警告',
                                        level: 1
                                    },
                                    {
                                        time: '2023-11-11',
                                        description: '失败警告',
                                        level: 1
                                    },
                                    {
                                        time: '2023-11-11',
                                        description: '失败警告',
                                        level: 1
                                    },
                                    {
                                        time: '2023-11-11',
                                        description: '失败警告',
                                        level: 1
                                    },
                                    {
                                        time: '2023-11-11',
                                        description: '失败警告',
                                        level: 1
                                    },
                                    {
                                        time: '2023-11-11',
                                        description: '失败警告',
                                        level: 1
                                    },
                                    {
                                        time: '2023-11-11',
                                        description: '失败警告',
                                        level: 1
                                    }
                                ]}
                            />
                        </div>
                    </AreaTemplate>
                    <AreaTemplate 
                        title="运维工单汇总"
                    >
                        <MaintenanceList />
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
                                        key: '1'
                                    },
                                    {
                                        title: '工单编号',
                                        key: '2'
                                    },
                                    {
                                        title: '工单类型',
                                        key: '3'
                                    },
                                    {
                                        title: '发布时间',
                                        key: '4'
                                    },
                                    {
                                        title: '处理状态',
                                        key: '5'
                                    },
                                    {
                                        title: '处理市场',
                                        key: '6'
                                    }
                                ]}
                                dataSource={[
                                    {
                                        1: '1',
                                        2: 'XJ1254',
                                        3: '计划任务',
                                        4: '2023.11.30',
                                        5: '待处理',
                                        6: '12H'
                                    },
                                    {
                                        1: '2',
                                        2: 'XJ1254',
                                        3: '计划任务',
                                        4: '2023.11.30',
                                        5: '待处理',
                                        6: '12H'
                                    },
                                    {
                                        1: '3',
                                        2: 'XJ1254',
                                        3: '计划任务',
                                        4: '2023.11.30',
                                        5: '待处理',
                                        6: '12H'
                                    },
                                    {
                                        1: '4',
                                        2: 'XJ1254',
                                        3: '计划任务',
                                        4: '2023.11.30',
                                        5: '待处理',
                                        6: '12H'
                                    },
                                    {
                                        1: '5',
                                        2: 'XJ1254',
                                        3: '计划任务',
                                        4: '2023.11.30',
                                        5: '待处理',
                                        6: '12H'
                                    },
                                    {
                                        1: '6',
                                        2: 'XJ1254',
                                        3: '计划任务',
                                        4: '2023.11.30',
                                        5: '待处理',
                                        6: '12H'
                                    },
                                    {
                                        1: '7',
                                        2: 'XJ1254',
                                        3: '计划任务',
                                        4: '2023.11.30',
                                        5: '待处理',
                                        6: '12H'
                                    },
                                    {
                                        1: '8',
                                        2: 'XJ1254',
                                        3: '计划任务',
                                        4: '2023.11.30',
                                        5: '待处理',
                                        6: '12H'
                                    },
                                ]}
                            />
                        </div>
                    </AreaTemplate>
                </div>
                <div className={styles.contentBottomMap}>
                    {areaType=='domestic'&&<MapChina  key={areaType}/>}
                    {areaType=='overseas'&& <MapWorld key={areaType}/>}
                </div>
            </div>
        </div>
    )
}

export default BigScreen;