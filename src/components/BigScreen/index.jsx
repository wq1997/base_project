import styles from "./index.less";
import Map from '../BigScreen/map'
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
import OperationRecord from "./component/operationRecord";

const deviceTypeList = [
    {
        key: 'LargeEnergy',
        label: '大储(源网侧)',
        title: '大储'
    },
    {
        key: 'IndustryCommerce',
        label: '工商业',
        title: '工商业'
    },
    {
        key: 'IntegratedMachine',
        label: '一体机',
        title: '一体机'
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
                        title="运维记录展示"
                    >
                        <OperationRecord />
                    </AreaTemplate>
                    <AreaTemplate 
                        title="运维工单汇总"
                    >
                        <MaintenanceList />
                    </AreaTemplate>
                    <AreaTemplate 
                        title="运维运动列表"
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
                    <Map/>
                </div>
            </div>
        </div>
    )
}

export default BigScreen;