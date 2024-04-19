import { Menu, theme } from 'antd';
import { Link, useLocation, useSelector, FormattedMessage } from 'umi';
// import menu from '../router/menuRoute'
import { AppstoreOutlined, ToolOutlined, AlertOutlined, LineChartOutlined, ControlOutlined, SettingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSetState } from 'ahooks';
// const { token } = theme.useToken();

const { SubMenu } = Menu;

const MenuList = [
    {
        label: <FormattedMessage id='app.Plant' />,
        key: '/index/plant',
        icon: <LineChartOutlined />,
        permissions:'A',
    },
    {
        label: <FormattedMessage id='app.Device' />,
        key: '/index/device',
        icon: <ToolOutlined />,
    },
    // {
    //     label: <FormattedMessage id='app.PolicyConfiguration' />,
    //     key: '/index/policyConfiguration',
    //     icon: <ControlOutlined />,
    //     // permissions:'A/B',
    // },
    {
        label: <FormattedMessage id='app.Alarm' />,
        key: '/index/alarm',
        icon: <AlertOutlined />,
        children: [
            { label: <FormattedMessage id='app.RealTimeAlerts' />, key: '/index/alarm/realtimeAlarm', },
            { label: <FormattedMessage id='app.HistoricalAlerts' />, key: '/index/alarm/historyAlarm', },
        ]
    },

    {
        label: <FormattedMessage id='app.SystemAdministration' />,
        key: '/index/systemManagement',
        icon: <SettingOutlined />,
        children: [
            { label: <FormattedMessage id='app.UserManagement' />, key: '/index/systemManagement/user', },
            { label: <FormattedMessage id='app.RecordsOfOperations' />, key: '/index/systemManagement/operationRecords', },
        ]
    },
]

const getMenu = menuList => {
    const { plantDetails } = useSelector(function (state) {
        return state.device
    });
    const { user } = useSelector(function (state) {
        return state.user
    });
    const [currentDivice, setCurrentDivice] = useState(plantDetails.model);
    useEffect(() => {
        setCurrentDivice(plantDetails.model)
    }, [plantDetails])

    return menuList.map(menu => {
        if (menu.children) {
            return (
                <SubMenu
                    key={menu.key}
                    title={menu.label}
                    icon={menu.icon}
                    style={{ fontSize: '18px' }}

                >
                    {getMenu(menu.children)}
                </SubMenu>
            );
        } else {
            if (menu.type) {
                if (currentDivice?.find(it => it === menu.type)) {
                    return (
                        <Menu.Item key={menu.key}
                            style={{ fontSize: '16px' }}
                        >
                            <Link to={menu.key}>{menu.label}</Link>
                        </Menu.Item>
                    );
                }
                return
            }
            if (menu.permissions=='A') {
                if (user.roleId == 3) {
                    return (
                        <Menu.Item key={menu.key} icon={menu.icon}
                            style={{ fontSize: menu.icon ? '18px' : '16px' }}
                        >
                            <Link to={menu.key}>{menu.label}</Link>
                        </Menu.Item>
                    );
                }
                return
            }
            if (menu.permissions=='A/B') {
                if (user.roleId != 1) {
                    return (
                        <Menu.Item key={menu.key} icon={menu.icon}
                            style={{ fontSize: menu.icon ? '18px' : '16px' }}
                        >
                            <Link to={menu.key}>{menu.label}</Link>
                        </Menu.Item>
                    );
                }
                return
            }
            return (
                <Menu.Item key={menu.key} icon={menu.icon}
                    style={{ fontSize: menu.icon ? '18px' : '16px' }}
                >
                    <Link to={menu.key}>{menu.label}</Link>
                </Menu.Item>
            );
        }
    });
};

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