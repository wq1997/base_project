import { Outlet, history, useLocation } from "umi";
import { Tabs } from 'antd';

const items = [
    {
      key: '/vpp/demandResponse/task/confirm',
      label: '任务确认',
    },
    {
      key: '/vpp/demandResponse/task/list',
      label: '任务列表',
    },
];

const Task = () => {
    const location = useLocation();
    const { pathname } = location;

    const onChange = (value) => {
        history.push(value);
    }

    return (
        <div style={{height:'100%'}}>
            <Tabs defaultActiveKey={pathname} items={items} onChange={onChange} />
            <Outlet />
        </div>
    )
}

export default Task;