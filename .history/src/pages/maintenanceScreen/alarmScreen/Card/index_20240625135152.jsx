import styles from "./index.less";
import React, { useState, useEffect, useRef } from "react";
import "./index.less";
import arrow from "../images/箭头.svg";

const Index = ({}) => {
    return (
        <div className={styles.index}>
            <div className={styles.title}>
                <img src={arrow} className={styles.arrow} />
                告警列表
            </div>
            <div className={styles.list}></div>
        </div>
    );
};

export default Index;
