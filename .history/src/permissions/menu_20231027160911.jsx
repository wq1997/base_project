import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "umi";
import useIcon from "@/hooks/useIcon";

const { SubMenu } = Menu;

const MenuList = [
    {
        key: "/vpp/resourceManage",
        label: "资源管理",
        icon: "icon-shujuhoutaixitong",
        children: [
            {
                key: "/vpp/resourceManage/polymerization",
                label: "资源聚合管理",
            },
        ],
    },
    {
        key: "/vpp/demandResponse",
        label: "需求侧响应",
        icon: "icon-wuliaoxuqiu",
        children: [
            {
                key: "/vpp/demandResponse/create",
                label: "申报信息",
            },
            {
                key: "/vpp/demandResponse/toExamine",
                label: "中标下发",
            },
            {
                key: "/vpp/demandResponse/result",
                label: "响应评价",
            },
        ],
    },
    {
        key: "/vpp/spotTrading",
        label: "现货交易",
        icon: "icon-jiaoyiguanli",
        children: [
            {
                key: "",
                label: "现货交易市场",
            },
        ],
    },
    {
        key: "/vpp/setting",
        label: "系统管理",
        icon: "icon-icon_shezhi",
        children: [
            {
                key: "/vpp/setting/user",
                label: "用户管理",
            },
        ],
    },
];

const MyMenu = () => {
    const Icon = useIcon();

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
                    <Menu.Item key={menu.key}>
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
