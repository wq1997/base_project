import { useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.less";
import Item from "antd/es/list/Item";
import power from "../../../../public/icons/power.svg";
import dayGeneration from "../../../../public/icons/dayGeneration.svg";
import dayIncome from "../../../../public/icons/dayIncome.svg";
import cumulativeGeneration from "../../../../public/icons/cumulativeGeneration.svg";
import capacity from "../../../../public/icons/capacity.svg";
import Card from "../Card";

const Index = () => {
    const [datas, setDatas] = useState([
        { name: "节约标准煤", pic: power, data: "455.34", unit: "吨" },
        { name: "CO₂减排量", pic: dayGeneration, data: "625.20", unit: "度" },
        { name: "等效植树量", pic: dayIncome, data: "0.00", unit: "元" },
    ]);

    return (
        <Card
            title="社会贡献"
            content={
                <div style={{ height: "100%", display: "flex", flexWrap: "wrap" }}>
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
            }
        />
    );
};

export default Index;
