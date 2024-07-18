import { Menu, Tooltip } from 'antd';
import { Link, useLocation, useSelector, FormattedMessage, useIntl } from 'umi';
import { ToolOutlined, AlertOutlined, LineChartOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const MenuList = [
    {
        label: 'app.Plant',
        key: '/index/plant',
        icon: <LineChartOutlined />,
        permissions: '3',
    },
    {
        label: '电站概览',
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
        label: '数据统计',
        key: '/index/statistics',
        icon: <BarChartOutlined />,
        children: [
            { label: '监测曲线', key: '/index/statistics/monitoringCurves' },
            { label: '电芯详情', key: '/index/statistics/highAnysis', },
            { label: '电量统计', key: '/index/statistics/electricity', },
            { label: '收益统计', key: '/index/statistics/revenue', },
        ]
    },
    {
        label: 'app.Alarm',
        key: '/index/alarm',
        icon: <AlertOutlined />,
        children: [
            { label: 'app.RealTimeAlerts', key: '/index/alarm/realtimeAlarm', },
            { label: 'app.HistoricalAlerts', key: '/index/alarm/historyAlarm', },
        ]
    },

    {
        label: 'app.SystemAdministration',
        key: '/index/systemManagement',
        icon: <SettingOutlined />,
        children: [
            { label: 'app.UserManagement', key: '/index/systemManagement/user', },
            { label: 'app.RecordsOfOperations', key: '/index/systemManagement/operationRecords', },
        ]
    },
]

const MyMenu = () => {
    const intl = useIntl();
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
    const getMenu = menuList => {
        const { user } = useSelector(function (state) {
            return state.user
        });
    
        return menuList.map(menu => {
            if (menu.children) {
                return (
                    <SubMenu
                        key={menu.key}
                        title={
                            <div 
                                title={intl.formatMessage({id: menu.label})}
                                style={{
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                {intl.formatMessage({id: menu.label})}
                            </div>
                        }
                        icon={menu.icon}
                        style={{ fontSize: '18px' }}
                    >
                        {getMenu(menu.children)}
                    </SubMenu>
                );
            } else {
                if (menu.permissions && menu.permissions == user?.roleId || !menu.permissions) {
                    return (
                        <Menu.Item 
                            key={menu.key} 
                            icon={menu.icon}
                            style={{ fontSize: menu.icon ? '18px' : '16px' }}
                            title={menu.label}
                        >
                            <div 
                                title={intl.formatMessage({id: menu.label})}
                                style={{
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                <Link to={menu.key}>{intl.formatMessage({id: menu.label})}</Link>
                            </div>
                        </Menu.Item>
                    );
                }
                return null;
            }
        });
    };

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