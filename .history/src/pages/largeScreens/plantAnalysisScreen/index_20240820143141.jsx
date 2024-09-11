import { useState } from "react";
import styles from "./index.less";
import Business from "./components/Business";
import Network from "./components/Network";
import Header from "./components/Header";

const typeList = [
    {
        value: "Business",
        title: "工商侧",
    },
    {
        value: "Network",
        title: "源网侧",
    },
];

const PlantAnalysisScreen = () => {
    const [currentType, setCurrentType] = useState("Business");
    return (
        <div className={styles.screen}>
            {/* <div className={styles.header}>
                <Header />
            </div> */}
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
