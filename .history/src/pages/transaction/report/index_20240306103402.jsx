import { Tabs } from "antd";
import ApplicationList from "./applicationList";
import DoDeclaration from "./doDeclaration";
import TradingDashboard from "./tradingDashboard";

const items = [
    {
        key: "1",
        label: "交易看板",
        children: <ApplicationList />,
    },
    {
        key: "2",
        label: "交易申报",
        children: <DoDeclaration />,
    },
    {
        key: "3",
        label: "交易申请",
        children: <TradingDashboard />,
    },
];

const Report = () => {
    return <Tabs defaultActiveKey="1" items={items} />;
};

export default Report;
