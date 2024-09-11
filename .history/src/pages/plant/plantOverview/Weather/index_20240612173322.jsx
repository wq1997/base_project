import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import classnames from "classnames";
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
            <div className={classnames(styles.item, styles.today)}>
                <div className={styles.weather}>
                    <img src={tree} className={styles.pic} />
                    <span className={styles.date}>{data[0]?.textDay}</span>
                </div>
                <div className={styles.tempDate}>
                    <div className={styles.temp}>{data[0]?.tempMin } ℃</div>
                    <div className={styles.date}>周五 {data[0]?.fxDate}</div>
                </div>
            </div>
            <div className={styles.border}></div>
            {data?.slice(1)?.map((item, index) => (
                <>
                    <div className={styles.item}>
                        <div className={styles.weather}>
                            <img src={tree} className={styles.pic} />
                            <span className={styles.date}>{item.fxDate}</span>
                        </div>
                    </div>
                    {index == 0 && <div className={styles.border}></div>}
                </>
            ))}
        </div>
    );
};

export default Index;
