import { theme, Table, Tooltip } from "antd";
import styles from "./index.less";
import Card from "../../components/Card";
import total from "@/assets/images/工单总数.svg";
import complete from "@/assets/images/已完成工单.svg";
import other from "@/assets/images/在途其他工单.svg";
import matter from "@/assets/images/在途异常工单.svg";
import { useState, useEffect } from "react";

const Index = ({ initData }) => {
    const [works, setWorks] = useState([
        {
            name: "工单总数",
            pic: total,
            key: "",
            value: "111111",
        },
        {
            name: "在途异常工单",
            pic: matter,
            key: "",
            value: "222",
        },
        {
            name: "在途其他工单",
            pic: other,
            key: "",
            value: "333",
        },
        {
            name: "已完成工单",
            pic: complete,
            key: "",
            value: "444",
        },
    ]);

    useEffect(() => {
        if (!initData) return;
        const _works =[...works]
        _works.forEach(item=>({
            ...item,
            value:initData?.workOrderSummery?.[item.key]
        }))
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
