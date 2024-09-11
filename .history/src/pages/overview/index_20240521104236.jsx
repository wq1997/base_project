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
            <div class={styles.r}></div>
            <div class={styles.f}></div>
            <div class={styles.h}></div>
        </div>
    );
};

export default Index;
