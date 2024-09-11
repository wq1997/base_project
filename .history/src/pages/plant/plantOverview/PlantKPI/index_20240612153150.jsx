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
    const [datas, setDatas] = useState([
        { name: "当日发电量", pic: dayGeneration, key: "dailyGeneration", data: "", unit: "度" },
        { name: "当月发电量", pic: dayGeneration, key: "monthGeneration", data: "", unit: "度" },
        { name: "当年发电量", pic: dayGeneration, key: "yearGeneration", data: "", unit: "度" },
        {
            name: "累计发电量",
            pic: cumulativeGeneration,
            key: "totalGeneration",
            data: "",
            unit: "度",
        },
        { name: "当前功率", pic: power, key: "currentPower", data: "", unit: "kW" },
        { name: "逆变器额定功率", pic: dayGeneration, key: "ratedPower", data: "", unit: "kW" },
    ]);

    useEffect(() => {
        console.log(data);
        const _datas =[...datas]
        _datas
    }, [data]);

    return (
        <div style={{ height: "100%", display: "flex", gap: "8px" }}>
            {datas?.map(item => (
                <div className={styles.item}>
                    <div className={styles.picWrapper}>
                        <img src={item.pic} className={styles.pic} />
                    </div>
                    <div className={styles.right}>
                        <div className={styles.data}>
                            {item.data}
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
