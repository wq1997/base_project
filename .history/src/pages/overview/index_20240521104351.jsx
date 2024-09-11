import { Tabs } from "antd";
import styles from "./index.less";

const Index = () => {
    return (
        <div className={styles.container}>
            <div className={styles.plantKPI}></div>
            <div className={styles.plantStatus}></div>
            <div className={styles.plantAlarm}></div>
            <div className={styles.map}></div>
            <div className={styles.powerGeneration}></div>
            <div className={styles.ranking}></div>
            <div class={styles.socialContribution}></div>
            <div class={styles.plantInfo}></div>
        </div>
    );
};

export default Index;
