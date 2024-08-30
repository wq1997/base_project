import { Tabs } from "antd";
import styles from "./index.less";
import { useState } from "react";
import { history } from "umi";
import { getQueryString } from "@/utils/utils";
import Statistics from "./Statistics";
import Detailed from "./Detailed";

const Abnormal = () => {
    const defaultActiveKey = getQueryString("activeKey");
    const [activeKey, setActiveKey] = useState(defaultActiveKey||"statistics");
    const tabItems = [
        {
            key: 'statistics',
            label: '告警统计'
        },
        {
            key: 'detailed',
            label: '告警明细'
        }
    ]
    return (
        <div className={styles.abnormal}>
            <Tabs 
                activeKey={activeKey}
                items={tabItems}
                onChange={value => {
                    setActiveKey(value);
                    history.push(`/project-management/alarmStatistics?activeKey=${value}`)
                }}
            />
            {activeKey==="statistics"&&<Statistics />}
            {activeKey==="detailed"&&<Detailed />}
        </div>
    )
}

export default Abnormal;