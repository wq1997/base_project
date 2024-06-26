import { theme, Table, DatePicker } from "antd";
import styles from "./index.less";
import AlarmList from "./AlarmList";
import WorkOrder from "./WorkOrder";

const Index = () => {
    return (
        <div className={styles.index}>
            <div className={styles.header}>
                {/* <span className={styles.companyName}>储能电站告警分析大屏</span> */}
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <WorkOrder />
                    <WorkOrder />
                    <WorkOrder />
                </div>
                <div className={styles.right}>
                    <AlarmList />
                </div>
            </div>
        </div>
    );
};

export default Index;
