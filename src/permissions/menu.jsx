import { Menu } from 'antd';
import { Link, useLocation } from 'umi';

const { SubMenu } = Menu;

const MenuList = [
    {
        key: '/cet/home',
        label: '首页'
    },
    {
        key: '/cet/businessData',
        label: '业务数据',
        children: [
            {
                key: '/cet/businessData/electricityPrice',
                label: '电价列表',
            },
            {
                key: '/cet/businessData/policyInformation',
                label: '政策信息',
            },
            {
                key: '/cet/businessData/investment',
                label: '投资测算',
            }
        ]
    },
    {
        key: '/cet/baseInfo',
        label: '基础数据',
        children: [
            {
                key: '/cet/baseInfo/firstArea',
                label: '一级区域',
            },
            {
                key: '/cet/baseInfo/secondArea',
                label: '二级区域',
            },
            {
                key: '/cet/baseInfo/electricityType',
                label: '用电类型',
            },
            {
                key: '/cet/baseInfo/billingSystem',
                label: '计费制度',
            },
            {
                key: '/cet/baseInfo/voltageLevel',
                label: '电压等级',
            }
        ]
    },
    {
        key: '/cet/userManage',
        label: '用户管理',
        children: [
            {
                key: '/cet/userManage/userList',
                label: '用户列表',
            }
        ]
    },
    {
        key: '/cet/commentManage',
        label: '留言管理',
        children: [
            {
                key: '/cet/commentManage/notify',
                label: '消息通知',
            },
            {
                key: '/cet/commentManage/feedback',
                label: '意见反馈',
            }
        ]
    }
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
    const getDefaultOpenKeys = () => {
        const pathList = pathname.split("/");
        if(pathList.length<4){
            return [pathname];
        }else{
            return [pathList.splice(0, 3).join("/")]
        }
    }
    return (
        <Menu 
            mode="inline"
            defaultOpenKeys={getDefaultOpenKeys()}
            defaultSelectedKeys={[pathname]}
        >
            {getMenu(MenuList)}
        </Menu>
    )
}

export default MyMenu;