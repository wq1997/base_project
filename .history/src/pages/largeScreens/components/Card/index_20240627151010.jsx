import styles from "./index.less";
import React, { useState, useEffect, useRef } from "react";
import "./index.less";
import titleBg from "@/assets/images/小标题框.svg";

const Index = ({ title, content }) => {
    return (
        <div className={styles.index}>
            <div className={styles.title}>
            <span className={styles.text}>{title}</span>
            </div>
            <div className={styles.content}>{content}</div>
        </div>
    );
};

export default Index;
