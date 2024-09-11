import { theme, Table, DatePicker } from "antd";
import styles from "./index.less";
import AlarmList from "./AlarmList";

const Index = () => {
    return (
        <div className={styles.index}>
            <div className={styles.header}>
                <span className={styles.companyName}>储能电站运维大屏</span>
            </div>
            <div className=">
                <div className="left"></div>
                <div className="right">
                    <AlarmList />
                </div>
            </div>
        </div>
    );
};

export default Index;
