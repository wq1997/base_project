import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import styles from "./index.less";
import power from "../../../../../public/icons/power.svg";
import dayGeneration from "../../../../../public/icons/dayGeneration.svg";
import monthGeneration from "../../../../../public/icons/monthGeneration.svg";
import cumulativeGeneration from "../../../../../public/icons/cumulativeGeneration.svg";
import yearGeneration from "../../../../../public/icons/yearGeneration.svg";
import Card from "../Card";

const Index = ({ data }) => {
    const [list, setList] = useState([
        { name: "当日发电量", pic: dayGeneration, key: "dailyGeneration", value: "", unit: "kWh" },
        {
            name: "当月发电量",
            pic: monthGeneration,
            key: "monthGeneration",
            value: "",
            unit: "kWh",
        },
        { name: "当年发电量", pic: yearGeneration, key: "yearGeneration", value: "", unit: "kWh" },
        {
            name: "累计发电量",
            pic: cumulativeGeneration,
            key: "totalGeneration",
            value: "",
            unit: "kWh",
        },
        { name: "当前功率", pic: power, key: "currentPower", value: "", unit: "kW" },
        { name: "额定功率", pic: dayGeneration, key: "ratedPower", value: "", unit: "kW" },
    ]);

    useEffect(() => {
        const _list = list?.map(item => ({
            ...item,
            value: data?.[item.key],
        }));
        setList(_list);
    }, [data]);

    return (
        <div style={{ height: "100%", display: "flex", gap: "8px" }}>
            {list?.map(item => (
                <div className={styles.item}>
                    <div className={styles.picName}>
                        <img src={item.pic} className={styles.pic} />
                        <span className={styles.name}>{item.name}</span>
                    </div>
                    <div className={styles.data}>
                        <div style={{}}>
                        <Tooltip title={item.value}>
                            <div className={styles.value}>{item.value}</div>
                        </Tooltip>
                        <span className={styles.unit}>{item.unit}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Index;
