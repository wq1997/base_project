import { useState } from "react";
import Header from "./components/Header";
import styles from "./index.less";
import Business from "./components/Business";
import Network from "./components/Network";

const typeList = [
    {
        value: 'Business',
        title: '工商侧'
    },
    {
        value: 'Network',
        title: '源网侧'
    }
]

const PlantAnalysisScreen = () => {
    const [currentType, setCurrentType] = useState("Business");
    return (
        <div className={styles.screen}>
            <Header
                typeList={typeList}
                currentType={currentType}
                onChangedType={(value)=>setCurrentType(value)}
            />
            <div className={styles.screenContent}>
                {currentType==="Business"&&<Business />}
                {currentType==="Network"&&<Network />}
            </div>
        </div>
    )
}

export default PlantAnalysisScreen;