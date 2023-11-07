import { Menu } from 'antd';
import { Link, useLocation } from 'umi';
import menu from '../router/menuRoute'
import { AppstoreOutlined, ToolOutlined, AlertOutlined, LineChartOutlined, AccountBookOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const MenuList = [
    ...menu
]
const icon = [
    <AppstoreOutlined />, <ToolOutlined />, <LineChartOutlined />, <AccountBookOutlined />,<AlertOutlined />,  <SettingOutlined />
]

const getMenu = (menuList) => {
    return menuList.map((menu, index) => {
        if (menu.routes) {
            return (
                <SubMenu key={menu.path} title={
                    <span>
                        {icon[index]}
                        <span>{menu.name}</span>
                    </span>
                } >
                    {getMenu(menu.routes)}
                </SubMenu>
            )
        } else {
            if (menu.name === '总览') {
                return (
                    <Menu.Item key={menu.path}>
                        <Link to={menu.path}>
                            <span> {icon[index]}</span>
                            <span style={{marginLeft:10}}>{menu.name}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <Menu.Item key={menu.path}>
                        <Link to={menu.path}>{menu.name}</Link>
                    </Menu.Item>)
            }


        }
    });
}

const MyMenu = () => {
    const location = useLocation();
    const { pathname } = location;
    const getDefaultOpenKeys = () => {
        const pathList = pathname.split("/");
        if (pathList.length < 4) {
            return [pathname];
        } else {
            return [pathList.splice(0, 3).join("/")]
        }
    }
    console.log(getDefaultOpenKeys(), 123, pathname);

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