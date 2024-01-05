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
        label: <FormattedMessage id='app.Overview' />,
        key: '/index/home',
        icon: <AppstoreOutlined />
    },
    {
        label: <FormattedMessage id='app.Device' />,
        key: '/index/device',
        icon: <ToolOutlined />,
        children: [
            // { label: 'PCS', key: '/index/device/energyPcs', type: "PCS" },
            // { label: 'BMS', key: '/index/device/energyBms', type: "BMS" },
            // { label: '户外柜', key: '/index/device/energyOut', type: "OC" },
            { label: <FormattedMessage id='device.EnergyStorage' />, key: '/index/device/energyStorage', type: "PV" },
            { label: <FormattedMessage id='device.Photovoltaic' />, key: '/index/device/photovoltaic', type: "PV" },
            { label: <FormattedMessage id='device.ChargingPiles' />, key: '/index/device/chargingStation', type: "C" },
        ]
    },
    {
        label: <FormattedMessage id='app.Statistics' />,
        key: '/index/statistics',
        icon: <LineChartOutlined />,
        children: [
            { label: <FormattedMessage id='app.ElectricityStatistics' />, key: '/index/statistics/electricityStatistics', component: "@/pages/statistics/electricityStatistics" },
            { label: <FormattedMessage id='app.EarningsStatistics' />, key: '/index/statistics/revenueStatistics', component: "@/pages/statistics/revenueStatistics" },
            { label: <FormattedMessage id='app.DataComparison' />, key: '/index/statistics/dataComparison', component: "@/pages/statistics/dataComparison" },
            { label: <FormattedMessage id='app.ReportExport' />, key: '/index/statistics/reportExport', component: "@/pages/statistics/reportExport" },
        ]
    },
    // {
    //     label: '收益',
    //     key: '/index/profit',
    //     icon: <AccountBookOutlined />,
    //     children: [
    //         { label: '收益明细', key: '/index/profit/revenueDetails', },
    //         { label: '收益统计', key: '/index/profit/revenueStatistics', },
    //     ]
    // },
    {
        label: <FormattedMessage id='app.Alarm' />,
        key: '/index/alarm',
        icon: <AlertOutlined />,
        children: [
            { label: <FormattedMessage id='app.RealTimeAlerts' />, key: '/index/alarm/realtimeAlarm', },
            { label: <FormattedMessage id='app.HistoricalAlerts' />, key: '/index/alarm/historyAlarm', },
            { label: <FormattedMessage id='app.AlarmRules' />, key: '/index/alarm/alarmRules', },
        ]
    },
    {
        label: <FormattedMessage id='app.DepotSettings' />,
        key: '/index/depotSettings',
        icon: <ControlOutlined />,
        children: [
            { label: <FormattedMessage id='app.PolicyConfiguration' />, key: '/index/depotSettings/policyConfiguration', component: "@/pages/depotSettings/policyConfiguration" },
            { label: <FormattedMessage id='app.PowerStationConfiguration' />, key: '/index/depotSettings/powerStationConfig', component: "@/pages/depotSettings/powerStationConfig" },
        ]
    },
    {
        label: <FormattedMessage id='app.SystemAdministration' />,
        key: '/index/systemManagement',
        icon: <SettingOutlined />,
        children: [
            // { label: '策略配置', key: '/index/systemManagement/policyConfiguration', },
            { label: <FormattedMessage id='app.UserManagement' />, key: '/index/systemManagement/user', },
            { label: <FormattedMessage id='app.RecordsOfOperations' />, key: '/index/systemManagement/operationRecords', },
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