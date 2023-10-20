import { Menu } from 'antd';
import { Link, useLocation } from 'umi';
import menu from '../router/menuRoute'
const { SubMenu } = Menu;

const MenuList = [
   ...menu
]

const getMenu = (menuList) => {
    return menuList.map(menu=>{
        if(menu.routes){
            return (
                <SubMenu key={menu.path} title={menu.name} >
                    {getMenu(menu.routes)}
                </SubMenu>
            )
        }else{
            return( <Menu.Item key={menu.path}>
                <Link to={menu.path}>{menu.name}</Link>
            </Menu.Item>)
           
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
    console.log(getDefaultOpenKeys(),123,pathname);

    return (
        <Menu 
            mode="inline"
            defaultOpenKeys={getDefaultOpenKeys()}
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
        >
            {getMenu(MenuList)}
        </Menu>
    )
}

export default MyMenu;