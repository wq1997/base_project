import { useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.less";
 
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
