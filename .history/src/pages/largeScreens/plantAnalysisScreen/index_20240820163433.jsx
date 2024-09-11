import { useState } from "react";
import styles from "./index.less";
import Business from "./components/Business";
import Network from "./components/Network";
import Header from "./components/Header";

const PlantAnalysisScreen = () => {
    const [currentType, setCurrentType] = useState("Business");

    return (
        <div className={styles.screen}>
            <div className={styles.header}>
                <Header
                    onChangedType={value => setCurrentType(value)}
                    onChangedArea={value => setCurrentType(value)}
                />
            </div>
            {currentType === "Business" && <Business />}
            {currentType === "Network" && <Network />}
        </div>
    );
};

export default PlantAnalysisScreen;
