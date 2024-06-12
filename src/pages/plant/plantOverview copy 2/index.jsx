import styles from "./index.less";
import PlantKPI from "./plantKPI";
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
    const [activePlant, setActivePlant] = useState();
    const [activePosition, setActivePosition] = useState();
    const [plants, setPlants] = useState([]);
    const [statisticsData, setStatisticsData] = useState();

    const getPlantNames = async () => {
        const res = await getPlantNamesServer();
        if (res?.data?.code == 200) {
            const data = res?.data?.data;
            setPlants(
                data?.map(item => ({
                    label: item.name,
                    position: [+item.longitude, +item.latitude],
                    value: item.id,
                }))
            );
            getPlanStatistics(data?.[0]?.id);
        }
    };

    const getPlanStatistics = async plantId => {
        const res = await getPlanStatisticsServer(51);
        if (res?.data?.code == 200) {
            setStatisticsData(res?.data?.data);
        }
    };

    useEffect(() => {
        getPlantNames();
    }, []);

    useEffect(() => {
        if (!activePlant) return;
        getPlanStatistics(activePlant);
        setActivePosition(plants?.find(item => item.value == activePlant)?.position);
    }, [activePlant]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header plants={plants} setActivePlant={setActivePlant} activePlant={activePlant} />
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.map}>
                        <Map plants={plants} activePosition={activePosition} />
                    </div>
                    <div className={styles.plantKPI}>
                        <PlantKPI data={statisticsData?.plantKPI} />
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
                        <SocialContribution data={statisticsData?.socialContribution} />
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
