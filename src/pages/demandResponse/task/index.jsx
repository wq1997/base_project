import { Outlet, history, useLocation } from "umi";
import { Tabs } from "antd";
import { CardPage } from "@/components";

const items = [
    {
        key: "/vpp/demandResponse/task/confirm",
        label: "任务确认",
    },
    {
        key: "/vpp/demandResponse/task/search",
        label: "任务查询",
    },
    {
        key: "/vpp/demandResponse/task/list",
        label: "任务列表",
    },
];

const Task = () => {
    const location = useLocation();
    const { pathname } = location;

    const onChange = value => {
        history.push(value);
    };

    return (
        <CardPage>
            <Tabs key={pathname} defaultActiveKey={pathname} items={items} onChange={onChange} />
            <Outlet />
        </CardPage>
    );
};

export default Task;
