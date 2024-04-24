import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "umi";

const { SubMenu } = Menu;

const MenuList = [
    {
        key: "/overviewscreen",
        label: "采日运维大屏",
    },
    {
        key: "/workbench",
        label: "运维工作台",
        icon: "icon-wuliaoxuqiu",
        darkIcon: "icon-wuliaoxuqiu-copy",
        children: [
            {
                key: "/management-roles",
                label: "管理角色",
            },
            {
                key: "/execution-roles",
                label: "执行角色",
            },
        ],
    },
    {
        key: "/project-management",
        label: "项目管理",
        icon: "icon-wuliaoxuqiu",
        darkIcon: "icon-wuliaoxuqiu-copy",
        children: [
            {
                key: "/Electronic archives",
                label: "电子档案",
                children: [
                    {
                        key: "/management-roles",
                        label: "运维管理",
                    },
                ],
            },
            {
                key: "/execution-roles",
                label: "任务列表",
            },
            {
                key: "/execution-roles",
                label: "工单详情",
            },
        ],
    },
];

const getMenu = menuList => {
    return menuList.map(menu => {
        if (menu.children) {
            return (
                <SubMenu key={menu.key} title={menu.label}>
                    {getMenu(menu.children)}
                </SubMenu>
            );
        } else {
            return (
                <Menu.Item key={menu.key}>
                    <Link to={menu.key}>{menu.label}</Link>
                </Menu.Item>
            );
        }
    });
};

const MyMenu = () => {
    const location = useLocation();
    const { pathname } = location;
    const [openKeys, setOpenKeys] = useState([]);
    const getOpenKeys = () => {
        const pathList = pathname.split("/");
        let newOpenKeys = [...openKeys];
        if (pathList.length < 4) {
            newOpenKeys = newOpenKeys.concat([pathname]);
        } else {
            newOpenKeys = newOpenKeys.concat([pathList.splice(0, 3).join("/")]);
        }
        setOpenKeys(newOpenKeys);
    };

    const onOpenChange = openKeys => {
        setOpenKeys(openKeys);
    };

    useEffect(() => {
        getOpenKeys();
    }, [pathname]);
    return (
        <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            selectedKeys={[pathname]}
        >
            {getMenu(MenuList)}
        </Menu>
    );
};

export default MyMenu;
