import { Tabs } from "antd";
import { Outlet, history, useLocation, useSelector } from "umi";
import ChangePassword from "./ChangePassword";
import UserInfo from "./UserInfo";

const Index = () => {
    const items = [
        {
            key: "ChangePassword",
            label: "修改密码",
            children: <ChangePassword />,
        },
        {
            key: "UserInfo",
            label: "修改个人信息",
            children: <UserInfo />,
        },
    ];

    return (
        <div>
            <Tabs items={items} />
            <Outlet />
        </div>
    );
};

export default Index;
