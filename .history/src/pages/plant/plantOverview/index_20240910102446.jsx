import styles from "./index.less";
import PlantKPI from "./plantKPI";
import Header from "./Header";
import PlantStatus from "./PlantStatus";
import PlantAlarm from "./PlantAlarm";
import OtherInfo from "./OtherInfo";
import SocialContribution from "./SocialContribution";
import PowerGeneration from "./PowerGeneration";
import Ranking from "./Ranking";
import Weather from "./Weather";
import Flowchart from "./Flowchart";
import Map from "./Map";
import { theme } from "antd";
import { getPlantNames as getPlantNamesServer } from "@/services/plant";
import { getPlanStatistics as getPlanStatisticsServer } from "@/services/overview";
import { useEffect, useState } from "react";
import plant from "../../../../public/icons/plant.svg";

const Index = () => {
    const { token } = theme.useToken();
    const [activePlant, setActivePlant] = useState();
    const [activePlantName, setActivePlantName] = useState();
    const [plants, setPlants] = useState([]);
    const [mapPlants, setMapPlants] = useState([]);
    const [statisticsData, setStatisticsData] = useState();

    const getPlantNames = async () => {
        const res = await getPlantNamesServer();
        if (res?.data?.code == 200) {
            const data = res?.data?.data;
            setPlants(
                data?.map(item => ({
                    ...item,
                    label: item.name,
                    position: [+item.longitude, +item.latitude],
                    value: item.id,
                }))
            );
            const defaultId = data?.[0]?.id;
            getPlanStatistics(defaultId);
            setActivePlant(defaultId);
        }
    };

    const getPlanStatistics = async plantId => {
        if (!plantId) return setStatisticsData(null);
        const res = await getPlanStatisticsServer(plantId);
        if (res?.data?.code == 200) {
            setStatisticsData(res?.data?.data);
        }
    };

    useEffect(() => {
        getPlantNames();
    }, []);

    useEffect(() => {
        getPlanStatistics(activePlant);
        const plant = plants?.find(item => item.id == activePlant);
        setMapPlants(plant?[plant])
        setActivePlantName(plant?.name);
    }, [activePlant]);

    return (
        <div className={styles.container} style={{ background: token.overviewBgColor }}>
            <div className={styles.left}>
                <div className={styles.map}>
                    <Map
                        plants={plants}
                        activePlant={activePlant}
                        setActivePlant={setActivePlant}
                    />
                </div>
                <div className={styles.plantKPI}>
                    <PlantKPI data={statisticsData?.plantKPI} />
                </div>
                <div className={styles.PowerGeneration}>
                    <PowerGeneration activePlant={activePlant} />
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.weather}>
                    <Weather data={statisticsData?.weatherDaily} />
                </div>
                <div className={styles.flowchart}>
                    <Flowchart
                        activePlantName={activePlantName}
                        data={{
                            deviceCount: statisticsData?.deviceCount,
                            totalCapacity: statisticsData?.totalCapacity,
                        }}
                    />
                </div>
                <div className={styles.socialContribution}>
                    <SocialContribution data={statisticsData?.socialContribution} />
                </div>
                <div className={styles.plantAlarm}>
                    <PlantAlarm data={statisticsData?.alarm} />
                </div>
            </div>
        </div>
    );
};

export default Index;
