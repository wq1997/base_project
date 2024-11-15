import { Tabs } from "antd";
import styles from "./index.less";
import { useState } from "react";
import { history, useSelector } from "umi";
import { getQueryString } from "@/utils/utils";
import Report from "./Report";
import Overview from "./Overview";
import { hasPerm } from "@/utils/utils";
const Abnormal = () => {
    const { user } = useSelector(state => state.user);
    const defaultActiveKey = getQueryString("activeKey");
    const [activeKey, setActiveKey] = useState(defaultActiveKey || "Report");
    const tabItems = [
        hasPerm(user, "menu:project_run_day_report") && {
            key: "Report",
            label: "项目运行日报",
        },
        hasPerm(user, "menu:project_run_total") && {
            key: "Overview",
            label: "项目运行总览",
        },
    ]?.filter(item => item != false);

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
