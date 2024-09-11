import { Tabs } from "antd";
import styles from "./index.less";

const Index = () => {
    return (
        <div class={styles.container}>
            <div class={styles.plantKPI}></div>
            <div class={styles.plantStatus}></div>
            <div class={styles.plantAlarm}></div>
            <div class={styles.map}></div>
            <div class={styles.plantInfo}></div>
            <div class={styles.powerGeneration}></div>
            <div class={styles.ranking}></div>
            <div class={styles.socialContribution}></div>
        </div>
    );
};

export default Index;
