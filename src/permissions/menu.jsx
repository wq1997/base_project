import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useSelector } from "umi";
import useIcon from "@/hooks/useIcon";
import { color } from "echarts";

const { SubMenu } = Menu;

const MenuList = [
    {
        key: "/plant-monitoring",
        label: "电站监控",
        icon: "icon-dianzhangaikuang",
        iconSize: "20px",
        children: [
            {
                key: "/plant-monitoring/plant-overview",
                label: "电站概览",
            },
            {
                key: "/plant-monitoring/plant-management",
                label: "电站管理",
            },
        ],
    },
    {
        key: "/device-management",
        label: "设备管理",
        icon: "icon-wodeshebei",
        iconSize: "22px",
    },
    {
        key: "/alarm-management",
        label: "告警管理",
        icon: "icon-gaojing",
        iconSize: "23px",
        children: [
            {
                key: "/alarm-management/active-record",
                label: "告警记录",
            },
            {
                key: "/alarm-management/alarm-push",
                label: "告警推送",
            },
        ],
    },
    {
        key: "/report-management",
        label: "报表管理",
        icon: "icon-baobiao",
        iconSize: "20px",
    },
    {
        key: "/system-settings",
        label: "系统设置",
        icon: "icon-shezhi",
        iconSize: "23px",
        children: [
            {
                key: "/system-settings/personal-setting",
                label: "个人设置",
            },
            {
                key: "/system-settings/operation-log",
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
                            <div style={{ width: "23px" }}>
                                <Icon
                                    type={theme === "dark" ? menu.darkIcon || menu.icon : menu.icon}
                                    style={{
                                        color: pathname?.includes(menu.key)
                                            ? "#1677ff"
                                            : "rgba(0, 0, 0, 0.88)",
                                        fontSize: menu.iconSize,
                                    }}
                                />
                            </div>
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
                            menu.icon && (
                                <div style={{ width: "23px" }}>
                                    <Icon
                                        type={
                                            theme === "dark"
                                                ? menu.darkIcon || menu.icon
                                                : menu.icon
                                        }
                                        style={{
                                            color: pathname?.includes(menu.key)
                                                ? "#1677ff"
                                                : "rgba(0, 0, 0, 0.88)",
                                            fontSize: menu.iconSize,
                                        }}
                                    />
                                </div>
                            )
                        }
                    >
                        <Link
                            to={menu.key}
                            target={menu?.target}
                            style={{ marginLeft: menu.icon ? "0px" : "12px" }}
                        >
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
        if (pathList.length <= 2) {
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
