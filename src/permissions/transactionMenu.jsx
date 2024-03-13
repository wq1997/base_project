import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useSelector } from "umi";
import useIcon from "@/hooks/useIcon";

const { SubMenu } = Menu;

const MenuList = [
    {
        key: "/transaction/homepage",
        label: "首页",
        icon: "icon-shujuhoutaixitong",
        darkIcon: 'icon-shujuhoutaixitong-copy',
    },
    {
        key: "/transaction/manage/history",
        label: "电价预测管理",
        icon: "icon-diannengzhiliangjiance",
        darkIcon: "icon-diannengzhiliangjiance-copy"
    },
    {
        key: "/transaction/report",
        label: "交易申报",
        icon: "icon-xiangmushenbaoguanli",
        darkIcon: "icon-xiangmushenbaoguanli-copy-copy"
    },
    {
        key: "/transaction/execute",
        label: "交易执行",
        icon: "icon-zhihangrizhi",
        darkIcon: "icon-zhihangrizhi-copy"
    },
    {
        key: "/transaction/board",
        label: "经营看板",
        icon: "icon-shujukanban",
        darkIcon: "icon-shujukanban-copy"
    },
];

const TransactionMenu = () => {
    const Icon = useIcon();
    const [selectedKeys, setSelectedKeys] = useState('');
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
                                type={theme === 'dark'?menu.darkIcon: menu.icon}
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
                                type={theme === 'dark'?menu.darkIcon: menu.icon}
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
        if(pathname.startsWith('/transaction/manage')){
            setSelectedKeys('/transaction/manage/history');
        } else{
            setSelectedKeys(pathname);
        }
    }

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

export default TransactionMenu;
