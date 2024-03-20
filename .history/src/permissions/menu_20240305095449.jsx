import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "umi";
import useIcon from "@/hooks/useIcon";

const { SubMenu } = Menu;

const MenuList = [
    {
        key: "/vpp/homepage",
        label: "首页",
        icon: "icon-shujuhoutaixitong",
    },
    {
        key: "/vpp/demandResponse",
        label: "需求侧响应",
        icon: "icon-wuliaoxuqiu",
        children: [
            {
                key: "/vpp/demandResponse/invitation",
                label: "邀约管理",
            },
            {
                key: "/vpp/demandResponse/task/confirm",
                label: "任务管理",
            },
            {
                key: "/vpp/demandResponse/income/overview",
                label: "收益管理",
            },
        ],
    },
    {
        key: "/vpp/baseinfo",
        label: "基础资料",
        icon: "icon-jibenziliao",
        children: [
            {
                key: "/vpp/baseinfo/company",
                label: "公司配置",
            },
            {
                key: "/vpp/baseinfo/role",
                label: "角色管理",
            },
            {
                key: "/vpp/baseinfo/account",
                label: "账号管理",
            },
            {
                key: "/vpp/baseinfo/level",
                label: "公司评级管理",
            },
        ],
    },
    {
        key: "/vpp/setting",
        label: "系统设置",
        icon: "icon-icon_shezhi",
        children: [
            {
                key: "/vpp/setting/log",
                label: "系统日志",
            },
            {
                key: "/vpp/setting/notification",
                label: "系统通知",
            },
        ],
    },
    {
        key: "/vpp/transactionDeclaration",
        label: "交易申报",
        icon: "icon-wuliaoxuqiu",
        children: [
            {
                key: "/vpp/transaction-declaration/trading-dashboard",
                label: "交易看板",
            },
        ],
    },
];

const MyMenu = () => {
    const Icon = useIcon();
    const [selectedKeys, setSelectedKeys] = useState("");

    const getMenu = menuList => {
        return menuList.map(menu => {
            if (menu.children) {
                return (
                    <SubMenu
                        key={menu.key}
                        title={menu.label}
                        icon={
                            <Icon
                                type={menu.icon}
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
                                type={menu.icon}
                                style={{
                                    fontSize: 20,
                                }}
                            />
                        }
                    >
                        <Link to={menu.key}>{menu.label}</Link>
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
        if (pathname.startsWith("/vpp/demandResponse/task")) {
            setSelectedKeys("/vpp/demandResponse/task/confirm");
        } else if (pathname.startsWith("/vpp/demandResponse/income")) {
            setSelectedKeys("/vpp/demandResponse/income/overview");
        } else {
            setSelectedKeys(pathname);
        }
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
