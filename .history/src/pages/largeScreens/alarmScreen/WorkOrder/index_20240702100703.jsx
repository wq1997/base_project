import { theme, Table, Tooltip } from "antd";
import styles from "./index.less";
import Card from "../../components/Card";
import total from "@/assets/images/工单总数.svg";
import complete from "@/assets/images/已完成工单.svg";
import other from "@/assets/images/在途其他工单.svg";
import matter from "@/assets/images/在途异常工单.svg";
import { useState, useEffect } from "react";

const Index = ({ initData }) => {

    const [works,setworks]=useState([])

    useEffect(() => {
        if (!initData) return;
    }, [initData]);

    return (
        <Card
            title="工单情况"
            content={
                <div className={styles.worksWrapper}>
                    {works?.map(item => (
                        <div className={styles.work}>
                            <div className={styles.picWrapper}>
                                <img src={item.pic} className={styles.pic} />
                            </div>
                            <div className={styles.data}>
                                <Tooltip title={item.value} className={styles.tooltip}>
                                    <div className={styles.value}>{item.value}</div>
                                </Tooltip>
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
