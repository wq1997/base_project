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
        today:{
            tempMin:'',
            temp
        }
    });

    // useEffect(() => {
    //     const _list = list?.map(item => ({
    //         ...item,
    //         value: data?.[item.key],
    //     }));
    //     setList(_list);
    // }, [data]);

    return (
        <div style={{ height: "100%", display: "flex",  }}>
            {list?.map(item => (
                <div className={styles.item}>
                    <div className={styles.picWrapper}>
                        <img src={item.pic} className={styles.pic} />
                    </div>
                    <div className={styles.right}>
                        <div className={styles.data}>
                            <span className={styles.value}>{item.value}</span>
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
