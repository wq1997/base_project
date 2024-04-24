import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSelector } from 'umi';
import useIcon from "@/hooks/useIcon";
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';

const { SubMenu } = Menu;

const MenuList = [
    {
        key: "/overview-screen",
        label: "采日运维大屏",
        <StarFilled />
    },
    {
        key: "/workbench",
        label: "运维工作台",
        icon: "icon-wuliaoxuqiu",
        darkIcon: "icon-wuliaoxuqiu-copy",
        children: [
            {
                key: "/workbench/management-roles",
                label: "管理角色",
            },
            {
                key: "/workbench/execution-roles",
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
                key: "/project-management/electronic-archives",
                label: "电子档案",
                // children: [
                //     {
                //         key: "/project-management/electronic-archives/mocha-itom",
                //         label: "运维管理",
                //     },
                // ],
            },
            {
                key: "/project-management/task-list",
                label: "任务列表",
            },
            // {
            //     key: "/project-management/workorder-details",
            //     label: "工单详情",
            // },
        ],
    },
    {
        key: "/system-configuration",
        label: "系统配置",
        icon: "icon-wuliaoxuqiu",
        darkIcon: "icon-wuliaoxuqiu-copy",
        children: [
            {
                key: "/system-configuration/checkitem-configuration",
                label: "巡检项配置",
            },
            {
                key: "/system-configuration/account-management",
                label: "账号管理",
            },
            {
                key: "/system-configuration/role-management",
                label: "角色管理",
            },
        ],
    },
];

const MyMenu = () => {
    const Icon = useIcon();
    const [selectedKeys, setSelectedKeys] = useState("");
    const { theme } = useSelector(state => state.global);

    const getMenu = menuList => {
        return menuList.map(menu => {
            if (menu.children) {
                return (
                    <SubMenu
                        key={menu.key}
                        title={menu.label}
                        icon={menu.icon
                            // <Icon
                            //     type={theme === 'dark' ? (menu.darkIcon||menu.icon) : menu.icon}
                            //     style={{
                            //         color: "black",
                            //         fontSize: 20,
                            //     }}
                            // />
                        }
                    >
                        {getMenu(menu.children)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item
                        key={menu.key}
                        icon={
                            <Icon
                                type={theme === 'dark' ? (menu.darkIcon || menu.icon) : menu.icon}
                                style={{
                                    fontSize: 20,
                                }}
                            />
                        }
                    >
                        <Link to={menu.key} target={menu?.target}>{menu.label}</Link>
                    </Menu.Item>
                );
            }
        });
    };
    const location = useLocation();
    const { pathname } = location;
    const [openKeys, setOpenKeys] = useState([]);
    const getOpenKeys = () => {
        const pathList = pathname.split("/");
        let newOpenKeys = [...openKeys];
        console.log('pathList', pathList)
        if (pathList.length < 3) {
            newOpenKeys = newOpenKeys.concat([pathname]);
        } else {
            newOpenKeys = newOpenKeys.concat([pathList.splice(0, 2).join("/")]);
        }
        setOpenKeys(newOpenKeys);
    };

    const onOpenChange = openKeys => {
        setOpenKeys(openKeys);
    };

    const getSelectKeys = () => {
        setSelectedKeys(pathname);
    };
    console.log("openkeys", openKeys)
    useEffect(() => {
        getSelectKeys();
        getOpenKeys();
    }, [pathname]);
    return (
        <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            selectedKeys={[selectedKeys]}
        >
            {getMenu(MenuList)}
        </Menu>
    );
};

export default MyMenu;
