import { useState,useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.less";
import tree from "../../../../../public/icons/tree.svg";
import co2 from "../../../../../public/icons/CO₂.svg";
import coal from "../../../../../public/icons/coal.svg";
import Card from "../Card";

const Index = ({data}) => {
    const [list, setList] = useState([
        { name: "节约标准煤", pic: coal, value: "", key: "", unit: "吨" },
        { name: "CO₂减排量", pic: co2, value: "", key: "co2", unit: "吨" },
        { name: "等效植树量", pic: tree, value: "", key: "", unit: "棵" },
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
                        <div className={styles.item}>
                            <div className={styles.picWrapper}>
                                <img src={item.pic} className={styles.pic} />
                            </div>
                            <div className={styles.right}>
                                <div className={styles.data}>
                                    {item.value}
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
