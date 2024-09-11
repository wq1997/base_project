import styles from "./index.less";
import TotalData from "./TotalData";
import PlantStatus from "./PlantStatus";
import PlantAlarm from "./PlantAlarm";
import OtherInfo from "./OtherInfo";
import SocialContribution from "./SocialContribution";
import PowerGeneration from "./PowerGeneration";
import Ranking from "./Ranking";
import Flowchart from './Flowchart'
import Map from "./Map";

const Index = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}></div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.map}>
                        <Map />
                    </div>
                    <div className={styles.totalData}>
                        <TotalData />
                    </div>
                    <div className={styles.PowerGeneration}>
                        <PowerGeneration />
                    </div>
                </div>
                <div className={styles.right}>

                </div>
            </div>
        </div>
    );
};

export default Index;
