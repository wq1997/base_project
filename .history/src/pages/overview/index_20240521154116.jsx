import styles from "./index.less";
import PlantKPI from "./PlantKPI";
import PlantStatus from "./PlantStatus";
import PlantAlarm from "./PlantAlarm";
import otherInfo from './OtherInfo'

const Index = () => {
    return (
        <div className={styles.container}>
            <div className={styles.plantKPI}>
                <PlantKPI />
            </div>
            <div className={styles.plantStatus}>
                <PlantStatus />
            </div>
            <div className={styles.plantAlarm}>
                <PlantAlarm />
            </div>
            <div className={styles.map}></div>
            <div className={styles.powerGeneration}></div>
            <div className={styles.ranking}></div>
            <div className={styles.socialContribution}></div>
            <div className={styles.otherInfo}></div>
        </div>
    );
};

export default Index;
