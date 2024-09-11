import { useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.less";
import Item from "antd/es/list/Item";
import power from "../../../../public/icons/power.svg";
import dayGeneration from "../../../../public/icons/dayGeneration.svg";
import dayIncome from "../../../../public/icons/dayIncome.svg";
import cumulativeGeneration from "../../../../public/icons/cumulativeGeneration.svg";
import capacity from "../../../../public/icons/capacity.svg";

const Index = () => {
 
    return (
        <div className={styles.index}>
            <div className={styles.header}>
                <span className={styles.name}>
                    <div className={styles.cicle}></div>
                    电站KPI
                </span>
            </div>
            <div className={styles.content}></div>
        </div>
    );
};

export default Index;
