import { Tabs } from 'antd';
import ApplicationList from './applicationList'
import DoDeclaration from './doDeclaration'
import TradingDashboard from './tradingDashboard'


const Report = () => {
    return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
}

export default Report;