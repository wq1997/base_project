import { Tabs } from "antd";
import styles from "./index.less";
import { useState } from "react";
import { history } from "umi";
import { getQueryString } from "@/utils/utils";
import Report from "./Report";
import Overview from "./Overview";

const Abnormal = () => {
    const defaultActiveKey = getQueryString("activeKey");
    const [activeKey, setActiveKey] = useState(defaultActiveKey || "Report");
    const tabItems = [
        {
            key: "Report",
            label: "项目运行日报",
        },
        {
            key: "Overview",
            label: "项目运行总览",
        },
    ];
    return (
        <div className={styles.abnormal}>
            <Tabs
                activeKey={activeKey}
                items={tabItems}
                onChange={value => {
                    setActiveKey(value);
                    history.push(`/maintenance-tools/project-operation-report?activeKey=${value}`);
                }}
            />
            {activeKey === "Report" && <Report />}
            {activeKey === "Overview" && <Overview />}
        </div>
    );
};

export default Abnormal;
