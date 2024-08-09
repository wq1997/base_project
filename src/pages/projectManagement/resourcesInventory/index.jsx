import { Space, Button, Table, theme, DatePicker, Row } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import React, { useState, useEffect, useRef } from "react";
import styles from "./index.less";

const ResourcesInventory = () => {
    const { token } = theme.useToken();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    return (
        <div className={styles.resourcesInventory}>
            
        </div>
    )
}

export default ResourcesInventory;