import styles from "./index.less";
import AlarmList from "./AlarmList";
import WorkOrder from "./WorkOrder";
import AlarmAnysis from "./AlarmAnysis";
import DeviceStatus from "./DeviceStatus";

const Index = () => {
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
