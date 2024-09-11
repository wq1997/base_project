import { useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.less";
import tree from "../../../../public/icons/tree.svg";
import co2 from "../../../../public/icons/CO₂.svg";
import coal from "../../../../public/icons/coal.svg";
import Card from "../Card";

const Index = () => {
    const [datas, setDatas] = useState([
        { name: "节约标准煤", pic: coal, data: "2.13", unit: "吨" },
        { name: "CO₂减排量", pic: co2, data: "2.53", unit: "吨" },
        { name: "等效植树量", pic: tree, data: "4.00", unit: "棵" },
    ]);

    return (
        <Card
            title="社会贡献"
            content={
                <div style={{ height: "100%", display: "flex",  }}>
                    {datas?.map(item => (
                        <div className={styles.item}>
                            <div className={styles.picWrapper}>
                                
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
