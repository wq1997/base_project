import styles from "./index.less";
import AlarmList from "./AlarmList";
import WorkOrder from "./WorkOrder";
import AlarmAnysis from "./AlarmAnysis";
import DeviceStatus from "./DeviceStatus";
import { getAlarmScreenData as getAlarmScreenDataServer } from "@/services/largeScreen";
import { useState, useEffect } from "react";

const Index = () => {
    const [initData, setInitData] = useState();

    const getInitData = async () => {
        const res = await getAlarmScreenDataServer();
        if (res?.data?.status == "SUCCESS") {
            setInitData(res?.data?.data);
        }
    };

    useEffect(() => {
        getInitData();
    }, []);

    return (
        <div className={styles.index}>
            <div className={styles.header}>
                {/* <span className={styles.companyName}>储能电站告警分析大屏</span> */}
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <AlarmAnysis />
                    <WorkOrder data={initData?.workOrderSummery} />
                    <DeviceStatus />
                </div>
                <div className={styles.right}>
                    <AlarmList initData={initData} />
                </div>
            </div>
        </div>
    );
};

export default Index;
