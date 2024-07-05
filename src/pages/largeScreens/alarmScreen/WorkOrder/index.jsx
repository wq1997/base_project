import { theme, Table, Tooltip } from "antd";
import styles from "./index.less";
import Card from "../../components/Card";
import total from "@/assets/images/工单总数.svg";
import complete from "@/assets/images/已完成工单.svg";
import other from "@/assets/images/在途其他工单.svg";
import matter from "@/assets/images/在途异常工单.svg";
import { useState, useEffect } from "react";

const Index = ({ data }) => {
    const [works, setWorks] = useState([
        {
            name: "工单总数",
            pic: total,
            key: "totalCount",
            value: "",
        },
        {
            name: "在途异常工单",
            pic: matter,
            key: "inTransitAbnormalCount",
            value: "",
        },
        {
            name: "在途其他工单",
            pic: other,
            key: "inTransitOtherCount",
            value: "",
        },
        {
            name: "已完成工单",
            pic: complete,
            key: "completedCount3",
            value: "",
        },
    ]);

    useEffect(() => {
        if (!data) return;
        const _works = [...works]?.map(item => ({
            ...item,
            value: data?.[item.key],
        }));
        setWorks(_works);
    }, [data]);

    return (
        <Card
            title="运维工单"
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
