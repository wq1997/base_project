import { useState } from "react";
import styles from "./index.less";
import Item from "antd/es/list/Item";
import power from "../../../../public/icons/power.svg";
import dayGeneration from "../../../../public/icons/dayGeneration.svg";
import dayIncome from "../../../../public/icons/dayIncome.svg";
import cumulativeGeneration from "../../../../public/icons/cumulativeGeneration.svg";
import capacity from "../../../../public/icons/capacity.svg";

const Index = () => {
    const [datas, setDatas] = useState([
        { name: "当前功率", pic: power, data: "455.34", unit: "kW" },
        { name: "当日发电量", pic: dayGeneration, data: "625.20", unit: "度" },
        { name: "当日收益", pic: dayIncome, data: "0.00", unit: "元" },
        { name: "累计发电量", pic: cumulativeGeneration, data: "5255.88", unit: "度" },
        { name: "逆变器额定功率", pic: power, data: "700.00", unit: "kW" },
        { name: "储能额定容量", pic: capacity, data: "0.00", unit: "度" },
    ]);

    return (
        <div className={styles.index}>
            {datas?.map(item => (
                <div className={styles.item}>
                    <div className={styles.picW}>
                    <img src={item.pic} className={styles.pic}/>
                    </div>
                    <div className={styles.right}>
                        <div>{item.data}</div>
                        <div>{item.name}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Index;
