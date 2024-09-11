import { useEffect, useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.less";
import power from "../../../../../public/icons/power.svg";
import dayGeneration from "../../../../../public/icons/dayGeneration.svg";
import dayIncome from "../../../../../public/icons/dayIncome.svg";
import cumulativeGeneration from "../../../../../public/icons/cumulativeGeneration.svg";
import capacity from "../../../../../public/icons/capacity.svg";
import Card from "../Card";

const Index = ({ data }) => {
    const [list, setList] = useState([
        { name: "当日发电量", pic: dayGeneration, key: "dailyGeneration", value: "1123112312231222312", unit: "度" },
        { name: "当月发电量", pic: dayGeneration, key: "monthGeneration", value: "11231112312231222312", unit: "度" },
        { name: "当年发电量", pic: dayGeneration, key: "yearGeneration", value: "11231112312231222312", unit: "度" },
        {
            name: "累计发电量",
            pic: cumulativeGeneration,
            key: "totalGeneration",
            value: "1123122312",
            unit: "度",
        },
        { name: "当前功率", pic: power, key: "currentPower", value: "", unit: "kW" },
        { name: "逆变器额定功率", pic: dayGeneration, key: "ratedPower", value: "", unit: "kW" },
    ]);

    // useEffect(() => {
    //     const _list = list?.map(item => ({
    //         ...item,
    //         value: data?.[item.key],
    //     }));
    //     setList(_list);
    // }, [data]);

    return (
        <div style={{ height: "100%", display: "flex", gap: "8px" }}>
            {list?.map(item => (
                <div className={styles.item}>
                    <div className={styles.picWrapper}>
                        <img src={item.pic} className={styles.pic} />
                    </div>
                    <div className={styles.right}>
                        <div className={styles.data}>
                            <div className={styles.value}>{item.value}</div>
                            <span className={styles.unit}>{item.unit}</span>
                        </div>
                        <div className={styles.name}>{item.name}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Index;
