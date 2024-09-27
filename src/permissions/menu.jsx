import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useSelector } from "umi";
import useIcon from "@/hooks/useIcon";

const { SubMenu } = Menu;

const MenuList = [
    {
        key: "/upload-files",
        label: "上传文件",
    },
    {
        key: "/analysis-results",
        label: "解析结果",
    },
    {
        key: "/summary-record",
        label: "汇总记录",
    },
    {
        key: "/configure-template",
        label: "模版自定义配置",
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
                            menu.icon
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
                            menu.icon
                            // <Icon
                            //     type={theme === 'dark' ? (menu.darkIcon || menu.icon) : menu.icon}
                            //     style={{
                            //         fontSize: 20,
                            //     }}
                            // />
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
