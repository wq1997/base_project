import styles from "./index.less";
import AlarmList from "./AlarmList";
import WorkOrder from "./WorkOrder";
import AlarmAnysis from "./AlarmAnysis";
import DeviceStatus from "./DeviceStatus";
import {
    getAlarmList as getAlarmListServer,
    getAlarmInitData as getAlarmInitDataServer,
} from "@/services/alarmScreen";
import { useEffect } from "react";

const Index = () => {

    const [initData, setInitData] = useState();

    const getAlarmInitData = async () => {
        const res = await getAlarmInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { signalNames, plans } = res?.data?.data;
            setAlarmLevelOptions(
                signalNames?.map(item => ({
                    label: item,
                    value: item,
                }))
            );
            setPlantNameOptions(
                plans.map(item => ({
                    label: item?._2,
                    value: item?._1,
                }))
            );
        }
    };

    useEffect(()=>{
        getAlarmInitData()
    },[])

    return (
        <div className={styles.index}>
            <div className={styles.header}>
                {/* <span className={styles.companyName}>储能电站告警分析大屏</span> */}
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <AlarmAnysis />
                    <WorkOrder />
                    <DeviceStatus />
                </div>
                <div className={styles.right}>
                    <AlarmList />
                </div>
            </div>
        </div>
    );
};

export default Index;
