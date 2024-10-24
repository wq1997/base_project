import { Tabs } from "antd";
import styles from "./index.less";
import { useState } from "react";
import { history } from "umi";
import { getQueryString } from "@/utils/utils";
import Container from "./Container";
import OutdoorCabinet from "./OutdoorCabinet";

const Index = () => {
    const defaultActiveKey = getQueryString("activeKey");
    const [activeKey, setActiveKey] = useState(defaultActiveKey || "Container");
    const tabItems = [
        {
            key: "Container",
            label: "大储告警配置",
        },
        {
            key: "OutdoorCabinet",
            label: "户外柜告警配置",
        },
    ];
    return (
        <div className={styles.abnormal}>
            <Tabs
                activeKey={activeKey}
                items={tabItems}
                onChange={value => {
                    setActiveKey(value);
                    console.log("value", value);
                    history.push(`/project-management/alarm-configuration?activeKey=${value}`);
                }}
            />
            {activeKey === "OutdoorCabinet" && <OutdoorCabinet />}
            {activeKey === "Container" && <Container />}
        </div>
    );
};

export default Index;
