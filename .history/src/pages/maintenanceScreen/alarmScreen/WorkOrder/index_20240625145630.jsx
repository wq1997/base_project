import { theme, Table, Tooltip } from "antd";
import styles from "./index.less";
import Card from "../../Card";
import total from "../../images/二氧化碳排放量.svg";

const Index = () => {
    const works = [
        {
            name: "工单总数",
            pic: total,
            key: "",
            value: "111",
        },
        {
            name: "在途异常工单",
            pic: total,
            key: "",
            value: "222",
        },
        {
            name: "在途其他工单",
            pic: total,
            key: "",
            value: "333",
        },
        {
            name: "已完成工单",
            pic: total,
            key: "",
            value: "444",
        },
    ];

    return (
        <Card
            title="工单情况"
            content={
                <div className={styles.worksWrapper}>
                    {works?.map(item => (
                        <div className={styles.work}>
                            <img src={item.pic} className={styles.pic} />
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
