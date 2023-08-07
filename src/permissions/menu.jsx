import { Menu } from 'antd';
import { Link, useLocation } from 'umi';

const { SubMenu } = Menu;

const MenuList = [
    {
        key: '/cet/home',
        label: '首页'
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