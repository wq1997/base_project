import { Tabs } from "antd";
import styles from "./index.less";

const Index = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.plantKPI}></div>
                <div className={styles.plantStatus}></div>
                <div className={styles.plantW}></div>
            </div>
            <div className={styles.right}>
                <div className={styles.top}>
                    <div className={styles.rLeft}></div>
                    <div className={styles.rRight}></div>
                </div>
                <div className={styles.bottom}></div>
            </div>
        </div>
    );
};

export default Index;
