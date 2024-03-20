import { Tabs } from 'antd';
import ApplicationList from './applicationList'
import DoDeclaration from './doDeclaration'
import TradingDashboard from './tradingDashboard'

const items = [
    {
        key: '1',
        label: 'Tab 1',
        children: 'Content of Tab Pane 1',
    },
    {
        key: '2',
        label: 'Tab 2',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: 'Tab 3',
        children: 'Content of Tab Pane 3',
    },
];

const Report = () => {
    return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
}

export default Report;