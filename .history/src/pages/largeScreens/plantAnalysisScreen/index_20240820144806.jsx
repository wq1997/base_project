import { useState } from "react";
import styles from "./index.less";
import Business from "./components/Business";
import Network from "./components/Network";
import Header from "./components/Header";
 
const PlantAnalysisScreen = () => {
    
    return (
        <div className={styles.screen}>
            <div className={styles.header}>
                <Header />
            </div>
            {currentType === "Business" && (
                <Business
                    
                    
                    onChangedType={value => setCurrentType(value)}
                />
            )}
            {currentType === "Network" && (
                <Network
                    typeList={typeList}
                     
                    onChangedType={value => setCurrentType(value)}
                />
            )}
        </div>
    );
};

export default PlantAnalysisScreen;
