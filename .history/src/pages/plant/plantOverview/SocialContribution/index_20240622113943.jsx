import { useState, useEffect } from "react";
import { Tooltip } from "antd";
import styles from "./index.less";
import tree from "../../../../../public/icons/tree.svg";
import co2 from "../../../../../public/icons/CO₂.svg";
import coal from "../../../../../public/icons/coal.svg";
import Card from "../Card";

const Index = ({ data }) => {
    const [list, setList] = useState([
        { name: "节约标准煤", pic: coal, value: "", key: "ele", unit: "吨" },
        { name: "CO₂减排量", pic: co2, value: "", key: "co2", unit: "吨" },
        { name: "等效植树量", pic: tree, value: "", key: "tree", unit: "棵" },
    ]);

    useEffect(() => {
        const _list = list?.map(item => ({
            ...item,
            value: data?.[item.key],
        }));
        setList(_list);
    }, [data]);

    return (
        <Card
            title="社会贡献"
            content={
                <div style={{ height: "100%", display: "flex", padding: " 0 10px" }}>
                    {list?.map(item => (
                        <div className={styles.data}>
                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                            <Tooltip title={item.value}>
                                <div className={styles.value}>{item.value}</div>
                            </Tooltip>
                            <span className={styles.unit}>{item.unit}</span>
                        </div>
                    </div>
                    <div className={styles.picName}>
                        <img src={item.pic} className={styles.pic} />
                        <span className={styles.name}>{item.name}</span>
                    </div>
                    ))}
                </div>
            }
        />
    );
};

export default Index;
