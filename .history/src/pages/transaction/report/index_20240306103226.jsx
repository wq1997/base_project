import { Tabs } from 'antd';
import ApplicationList from './applicationList'
import DoDeclaration from './doDeclaration'
import TradingDashboard from './tradingDashboard'

const items = [
    {
        key: '1',
        label: '交易看板',
        children: 'Content of Tab Pane 1',
    },
    {
        key: '2',
        label: '交易申报',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: '交易结果查询',
        children: 'Content of Tab Pane 3',
    },
];

const Report = () => {
    return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
}

export default Report;