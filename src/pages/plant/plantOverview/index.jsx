import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Tooltip, DatePicker } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import dayjs from "dayjs";
import styles from "./index.less";

const Index = () => {
    return (
        <div>
            <div className={styles.weather}>
                <span className={styles.title}>电站概览</span>
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default Index;
