import { Outlet, history, useLocation, useSelector } from "umi";
import { Tabs } from "antd";
import { CardPage } from "@/components";
import { hasPerm } from "@/utils/utils";

const Task = () => {
    const location = useLocation();
    const { user } = useSelector(state => state.user);
    const { pathname } = location;

    const items = [
        hasPerm(user, "op:task_list") && {
            key: "/vpp/demandResponse/task/list",
            label: "任务列表",
        },
        // {
        //     key: "/vpp/demandResponse/task/search",
        //     label: "任务查询",
        // },
        hasPerm(user, "op:task_confirm") && {
            key: "/vpp/demandResponse/task/confirm",
            label: "任务详情",
        },
    ];

    const onChange = value => {
        history.push(value);
    };

    return (
        <CardPage>
            <Tabs activeKey={pathname} defaultActiveKey={pathname} items={items} onChange={onChange} />
            <Outlet />
        </CardPage>
    );
};

export default Task;
