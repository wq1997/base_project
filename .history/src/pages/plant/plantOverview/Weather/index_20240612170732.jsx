import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.less";
import tree from "../../../../../public/icons/tree.svg";
import co2 from "../../../../../public/icons/CO₂.svg";
import coal from "../../../../../public/icons/coal.svg";
import Card from "../Card";

const Index = ({ data }) => {
    const [list, setList] = useState({
        today: {
            tempMin: "",
            tempMax: "",
            date: "",
            weather: "",
        },
        daily: [
            { date: "", weather: "" },
            { date: "", weather: "" },
        ],
    });

    // useEffect(() => {
    //     const _list = list?.map(item => ({
    //         ...item,
    //         value: data?.[item.key],
    //     }));
    //     setList(_list);
    // }, [data]);

    return (
        <div className={styles.index}>
            <div className={styles.today}>
                <div className={styles.weather}>
                    <img src={tree} className={styles.pic} />
                    <span>多云</span>
                </div>
                <div>
                    <div className={styles.temp}>12~21℃</div>
                    <div className={styles.date}>周五 2024/04/19</div>
                </div>
            </div>
        </div>
    );
};

export default Index;
