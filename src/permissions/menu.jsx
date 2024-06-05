import { Menu } from 'antd';
import { Link, useLocation, useSelector, FormattedMessage } from 'umi';
import { ToolOutlined, AlertOutlined, LineChartOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const MenuList = [
    {
        label: <FormattedMessage id='app.Plant' />,
        key: '/index/plant',
        icon: <LineChartOutlined />,
        permissions:'3',
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
        label: <FormattedMessage id='数据统计' />,
        key: '/index/statistics',
        icon: <BarChartOutlined />,
        children: [
            { label: <FormattedMessage id='电量统计' />, key: '/index/statistics/electricity', },
            { label: <FormattedMessage id='收益统计' />, key: '/index/statistics/revenue', },
        ]
    },
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
    const { user } = useSelector(function (state) {
        return state.user
    });

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
            if(menu.permissions&&menu.permissions==user.roleId || !menu.permissions){
                return (
                    <Menu.Item key={menu.key} icon={menu.icon}
                        style={{ fontSize: menu.icon ? '18px' : '16px' }}
                    >
                        <Link to={menu.key}>{menu.label}</Link>
                    </Menu.Item>
                );
            }
            return null;
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