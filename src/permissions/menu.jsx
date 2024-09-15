import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useSelector } from "umi";
import useIcon from "@/hooks/useIcon";
import { FundFilled, FolderOpenFilled, AppstoreFilled, SettingFilled, DatabaseFilled } from "@ant-design/icons";

const { SubMenu } = Menu;

const MenuList = [
    // {
    //     key: "/overview-screen",
    //     label: "采日运维大屏",
    //     icon: <FundFilled />
    // },
    {
        key: "/screen-plant-analysis",
        label: "电站运维大屏",
        icon: <FundFilled />,
        darkIcon: "icon-wuliaoxuqiu-copy",
        target: "_blank",
    },
    {
        key: "/workbench",
        label: "运维工作台",
        icon: <AppstoreFilled />,
        darkIcon: "icon-wuliaoxuqiu-copy",
        permissions: 'menu:workbench',
        children: [
            {
                key: "/workbench/management-roles",
                label: "管理角色",
                permissions: 'menu:workbench4manager'
            },
            {
                key: "/workbench/execution-roles",
                label: "执行角色",
                permissions: 'menu:workbench4executor'
            },
        ],
    },
    {
        key: "/project-management",
        label: "项目管理",
        icon: <FolderOpenFilled />,
        darkIcon: "icon-wuliaoxuqiu-copy",
        permissions: 'menu:project_manage',
        children: [
            {
                key: "/project-management/electronic-archives",
                label: "电子档案",
                permissions: 'menu:archives_manage'
            },
            {
                key: "/project-management/task-list",
                label: "工单列表",
                permissions: 'menu:work_order_manage'
            },
            {
                key: '/project-management/spare-parts-management',
                label: '备件管理',
                permissions: 'menu:spare_manage'
            },
            {
                key: '/project-management/abnormal',
                label: '异常复盘',
                permissions: 'menu:exception_manage'
            },
            {
                key: '/project-management/alarmStatistics',
                label: '告警管理'
            },
            {
                key: '/project-management/resourcesInventory',
                label: '人力资源复盘',
                permissions: 'menu:human_resources_manage'
            }
        ],
    },
    {
        key: '/knowledgeBase',
        label: '知识库',
        icon: <DatabaseFilled />,
        permissions: 'menu:knowledge_base_manage'
    },
    {
        key: "/system-configuration",
        label: "系统配置",
        icon: <SettingFilled />,
        darkIcon: "icon-wuliaoxuqiu-copy",
        permissions: 'menu:sys_manage',
        children: [
            {
                key: "/system-configuration/account-management",
                label: "账号管理",
                permissions: 'menu:user_manage'
            },
            {
                key: "/system-configuration/role-management",
                label: "角色管理",
                permissions: 'menu:role'
            },
            {
                key: "/system-configuration/checkitem-configuration",
                label: "巡检项配置",
                permissions: 'menu:inspection_item_manage'
            },
            {
                key: '/system-configuration/alarm-configuration',
                label: '项目告警配置'
            }
        ],
    },
];

const MyMenu = () => {
    const Icon = useIcon();
    const [selectedKeys, setSelectedKeys] = useState("");
    const { user } = useSelector(state => state.user);

    const getMenu = menuList => {
        return menuList?.map(menu => {
            if (!(user?.selfPermCodes?.includes(menu?.permissions) || !menu?.permissions)) return null;
            if (menu.children) {
                return (
                    <SubMenu
                        key={menu.key}
                        title={menu.label}
                        icon={menu.icon}
                    >
                        {getMenu(menu.children)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item
                        key={menu.key}
                        icon={menu.icon}
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

    useEffect(()=>{
        if(user){
            getMenu();
        }
    }, [user])
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
