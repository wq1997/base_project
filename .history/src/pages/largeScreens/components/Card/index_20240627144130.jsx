import styles from "./index.less";
import React, { useState, useEffect, useRef } from "react";
import "./index.less";
import titleBg from '@/assets/images/小标题框.svg'

const Index = ({ title, content }) => {
    return (
        <div className={styles.index}>
            <div className={styles.title}>
                <img src={titleBg} className={styles.titleBg} />
                <span className={styles.title}>
                {title}
                </span>
            </div>
            <div className={styles.content}>{content}</div>
        </div>
    );
};

export default Index;
