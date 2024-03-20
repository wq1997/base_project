import { Tabs } from "antd";
import ApplicationList from "./applicationList";
import DoDeclaration from "./doDeclaration";
import TradingDashboard from "./tradingDashboard";
import { useState } from "react";

const Report = () => {
    const [key, setKey] = useState(1);
    const items = [
        {
            key: 1,
            label: "交易看板",
            hideAdd: false,
            children: <TradingDashboard setKey={() => setKey(2)} />,
        },
        {
            key: 2,
            label: "交易申报",
            hideAdd: true,
            children: <DoDeclaration />,
        },
        {
            key: 3,
            hideAdd: false,
            label: "交易申请",
            children: <ApplicationList />,
        },
    ];

    return <Tabs defaultActiveKey={key} type="editable-card" key={key} items={items} onChange={key => setKey(key)} />;
};

export default Report;
