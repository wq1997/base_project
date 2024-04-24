import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'umi';

const { SubMenu } = Menu;

const MenuList = [
    {
        key: '/overviewscreen',
        label: '采日运维大屏'
    },
    {
        key: "/vpp/demandResponse",
        label: "运维工作台",
        icon: "icon-wuliaoxuqiu",
        darkIcon: "icon-wuliaoxuqiu-copy",
        children: [
            {
                key: "/vpp/demandResponse/invitation/invitationList",
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
]

const getMenu = (menuList) => {
    return menuList.map(menu=>{
        if(menu.children){
            return (
                <SubMenu key={menu.key} title={menu.label} >
                    {getMenu(menu.children)}
                </SubMenu>
            )
        }else{
            return <Menu.Item key={menu.key}>
                <Link to={menu.key}>{menu.label}</Link>
            </Menu.Item>
        }
    });
}

const MyMenu = () => {
    const location = useLocation();
    const { pathname } = location;
    const [openKeys, setOpenKeys] = useState([]);
    const getOpenKeys = () => {
        const pathList = pathname.split("/");
        let newOpenKeys = [...openKeys];
        if(pathList.length<4){
            newOpenKeys = newOpenKeys.concat([pathname]);
        }else{
            newOpenKeys = newOpenKeys.concat([pathList.splice(0, 3).join("/")]);
        }
        setOpenKeys(newOpenKeys);
    }

    const onOpenChange = (openKeys) => {
        setOpenKeys(openKeys)
    }   

    useEffect(()=>{
        getOpenKeys() 
    }, [pathname])
    return (
        <Menu 
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            selectedKeys={[pathname]}
        >
            {getMenu(MenuList)}
        </Menu>
    )
}

export default MyMenu;