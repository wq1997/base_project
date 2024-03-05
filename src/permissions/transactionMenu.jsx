import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "umi";
import useIcon from "@/hooks/useIcon";

const { SubMenu } = Menu;

const MenuList = [
    {
        key: "/transaction/homepage",
        label: "首页",
        icon: "icon-shujuhoutaixitong",
    },
];

const TransactionMenu = () => {
    const Icon = useIcon();
    const [selectedKeys, setSelectedKeys] = useState('');

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
        if(pathname.startsWith('/vpp/demandResponse/task')){
            setSelectedKeys('/vpp/demandResponse/task/confirm');
        } else if(pathname.startsWith('/vpp/demandResponse/income')){
            setSelectedKeys('/vpp/demandResponse/income/overview');
        }else{
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
