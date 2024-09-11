import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.less";
import tree from "../../../../../public/icons/tree.svg";
import co2 from "../../../../../public/icons/CO₂.svg";
import coal from "../../../../../public/icons/coal.svg";
import Card from "../Card";

const Index = ({ data }) => {
    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <div className={styles.index}>
            <div className={styles.today}>
                <div className={styles.weather}>
                    <img src={tree} className={styles.pic} />
                    <span className={styles.date}>多云</span>
                </div>
                <div className={styles.tempDate}>
                    <div className={styles.temp}>12~21℃</div>
                    <div className={styles.date}>周五 2024/04/19</div>
                </div>
            </div>
            <div className={styles.border}></div>
            <div className={styles.today}>
                {data?.slice(1)?.map((item, index) => (
                    <>
                        <div className={styles.weather}>
                            <img src={tree} className={styles.pic} />
                            <span className={styles.date}>{item.fxDate}</span>
                        </div>
                        {index == 0 && <div className={styles.border}></div>}
                    </>
                ))}
            </div>
        </div>
    );
};

export default Index;
