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
        label: <FormattedMessage id='总览' />,
        key: '/index/home',
        icon: <AppstoreOutlined />
    },
    {
        label: <FormattedMessage id='设备' />,
        key: '/index/device',
        icon: <ToolOutlined />,
        children: [
            { label: <FormattedMessage id='储能' />, key: '/index/device/energyStorage', type: "PV" },
            // { label: <FormattedMessage id='device.Photovoltaic' />, key: '/index/device/photovoltaic', type: "PV" },
            // { label: <FormattedMessage id='device.ChargingPiles' />, key: '/index/device/chargingStation', type: "C" },
        ]
    },
    {
        label: <FormattedMessage id='统计' />,
        key: '/index/statistics',
        icon: <LineChartOutlined />,
        children: [
            { label: <FormattedMessage id='电量统计' />, key: '/index/statistics/electricityStatistics', component: "@/pages/statistics/electricityStatistics" },
            // { label: <FormattedMessage id='app.EarningsStatistics' />, key: '/index/statistics/revenueStatistics', component: "@/pages/statistics/revenueStatistics" },
            { label: <FormattedMessage id='数据对比' />, key: '/index/statistics/dataComparison', component: "@/pages/statistics/dataComparison" },
            { label: <FormattedMessage id='报表导出' />, key: '/index/statistics/reportExport', component: "@/pages/statistics/reportExport" },
        ]
    },
    {
        label: <FormattedMessage id='告警' />,
        key: '/index/alarm',
        icon: <AlertOutlined />,
        children: [
            { label: <FormattedMessage id='实时告警' />, key: '/index/alarm/realtimeAlarm', },
            { label: <FormattedMessage id='历史告警' />, key: '/index/alarm/historyAlarm', },
            { label: <FormattedMessage id='告警规则' />, key: '/index/alarm/alarmRules', },
        ]
    },
    {
        label: <FormattedMessage id='场站设置' />,
        key: '/index/depotSettings',
        icon: <ControlOutlined />,
        children: [
            { label: <FormattedMessage id='策略配置' />, key: '/index/depotSettings/policyConfiguration', component: "@/pages/depotSettings/policyConfiguration",auth:[2,3]},
            { label: <FormattedMessage id='电站配置' />, key: '/index/depotSettings/powerStationConfig', component: "@/pages/depotSettings/powerStationConfig"},
            { label: <FormattedMessage id='运维管理' />, key: '/index/depotSettings/operationManage', component: "@/pages/depotSettings/operationManage",auth:[2,3] },
        ]
    },
    {
        label: <FormattedMessage id='系统管理' />,
        key: '/index/systemManagement',
        icon: <SettingOutlined />,
        children: [
            // { label: '策略配置', key: '/index/systemManagement/policyConfiguration', },
            { label: <FormattedMessage id='用户管理' />, key: '/index/systemManagement/user', },
            { label: <FormattedMessage id='操作记录' />, key: '/index/systemManagement/operationRecords', },
        ]
    },
]

const getMenu = menuList => {
    const { plantDetails } = useSelector(function (state) {
        return state.device
    });
    const [currentDivice, setCurrentDivice] = useState(plantDetails.model);
    useEffect(() => {
        setCurrentDivice(plantDetails.model)
    }, [plantDetails])
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
            if (menu.auth) {
                if (menu.auth?.find(it => it === user?.roleId)) {
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