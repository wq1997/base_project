import styles from "./index.less";
import React, { useState, useEffect, useRef } from "react";
import "./index.less";
import arrow from "@/assets/images/箭头.svg";

const Index = ({ title, content }) => {
    return (
        <div className={styles.index}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.content}>{content}</div>
        </div>
    );
};

export default Index;
