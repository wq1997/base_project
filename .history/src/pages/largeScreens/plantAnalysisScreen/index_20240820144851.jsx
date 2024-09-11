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
                <Header onChangedType={value => setCurrentType(value)}/>
            </div>
            {currentType === "Business" && (
                <Business
                    typeList={typeList}
                    currentType={currentType}
                    onChangedType={value => setCurrentType(value)}
                />
            )}
            {currentType === "Network" && (
                <Network
                    typeList={typeList}
                    currentType={currentType}
                    onChangedType={value => setCurrentType(value)}
                />
            )}
        </div>
    );
};

export default PlantAnalysisScreen;
