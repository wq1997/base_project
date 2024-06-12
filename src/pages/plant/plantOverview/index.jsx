import styles from "./index.less";
import TotalData from "./TotalData";
import Header from "./Header";
import PlantStatus from "./PlantStatus";
import PlantAlarm from "./PlantAlarm";
import OtherInfo from "./OtherInfo";
import SocialContribution from "./SocialContribution";
import PowerGeneration from "./PowerGeneration";
import Ranking from "./Ranking";
import Flowchart from "./Flowchart";
import Map from "./Map";
import { getPlantNames as getPlantNamesServer } from "@/services/plant";
import { getPlanStatistics as getPlanStatisticsServer } from "@/services/overview";
import { useEffect, useState } from "react";

const Index = () => {
    const [currentPosition, setCurrentPosition] = useState();
    const [plants, setPlants] = useState([]);

    const getPlantNames = async () => {
        const res = await getPlantNamesServer();
        if (res?.data?.code == 200) {
            setPlants(
                res?.data?.data?.map(item => ({
                    label: item.name,
                    value: JSON.stringify([+item.longitude, +item.latitude]),
                }))
            );
            getPlanStatistics(51);
        }
    };

    const getPlanStatistics = async plantId => {
        const res = await getPlanStatisticsServer(plantId);
        if (res?.data?.code == 200) {
            console.log(res?.data?.data);
        }
    };

    useEffect(() => {
        getPlantNames();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header
                    plants={plants}
                    setCurrentPosition={setCurrentPosition}
                    currentPosition={currentPosition}
                />
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.map}>
                        <Map plants={plants} currentPosition={currentPosition} />
                    </div>
                    <div className={styles.totalData}>
                        <TotalData />
                    </div>
                    <div className={styles.PowerGeneration}>
                        <PowerGeneration />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.flowchart}>
                        <Flowchart />
                    </div>
                    <div className={styles.socialContribution}>
                        <SocialContribution />
                    </div>
                    <div className={styles.plantAlarm}>
                        <PlantAlarm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
