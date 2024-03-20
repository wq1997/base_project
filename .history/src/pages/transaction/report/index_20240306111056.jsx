import { Tabs } from "antd";
import ApplicationList from "./applicationList";
import DoDeclaration from "./doDeclaration";
import TradingDashboard from "./tradingDashboard";


const Report = () => {
    const items = [
        {
            key: "1",
            label: "交易看板",
            children: <TradingDashboard />,
        },
        {
            key: "2",
            label: "交易申报",
            children: <DoDeclaration />,
        },
        {
            key: "3",
            label: "交易申请",
            children: <ApplicationList />,
        },
    ];
    
    return <Tabs defaultActiveKey="1" items={items} on/>;
};

export default Report;
