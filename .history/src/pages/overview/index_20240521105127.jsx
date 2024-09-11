import { Tabs } from "antd";
import styles from "./index.less";
import PlantKPI from './components/PlantKPI'

const Index = () => {
    return (
        <div className={styles.container}>
            <div className={styles.plantKPI}>
                <PlantKPI
            </div>
            <div className={styles.plantStatus}></div>
            <div className={styles.plantAlarm}></div>
            <div className={styles.map}></div>
            <div className={styles.powerGeneration}></div>
            <div className={styles.ranking}></div>
            <div className={styles.socialContribution}></div>
            <div className={styles.plantInfo}></div>
        </div>
    );
};

export default Index;
