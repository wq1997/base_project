import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useSelector } from "umi";
import useIcon from "@/hooks/useIcon";

const { SubMenu } = Menu;

const MenuList = [
    {
        key: "/overview-screen",
        label: "总览大屏",
    },
    {
        key: "/plant-monitoring",
        label: "电站监控",
        children: [
            {
                key: "/plant-overview",
                label: "电站概览",
            },
            {
                key: "/plant-management",
                label: "电站管理",
            },
        ],
    },
    {
        key: "/device-management",
        label: "设备管理",
    },
    {
        key: "/alarm-management",
        label: "告警管理",
        children: [
            {
                key: "/active-record",
                label: "告警记录",
            },
            {
                key: "/alarm-push",
                label: "告警推送",
            },
        ],
    },
    {
        key: "/report-management",
        label: "报表管理",
    },
    {
        key: "/system-settings",
        label: "系统设置",
        children: [
            {
                key: "/personal-settings",
                label: "个人设置",
            },
            {
                key: "/operation-log",
                label: "操作日志",
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
                        icon={
                            <Icon
                                type={theme === "dark" ? menu.darkIcon || menu.icon : menu.icon}
                                style={{
                                    color: "black",
                                    fontSize: 20,
                                }}
                            />
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
                                type={theme === "dark" ? menu.darkIcon || menu.icon : menu.icon}
                                style={{
                                    fontSize: 20,
                                }}
                            />
                        }
                    >
                        <Link to={menu.key} target={menu?.target}>
                            {menu.label}
                        </Link>
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

    const getSelectKeys = () => {
        setSelectedKeys(pathname);
    };

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
