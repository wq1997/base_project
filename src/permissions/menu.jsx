import { Menu,theme } from 'antd';
import { Link, useLocation, useSelector } from 'umi';
// import menu from '../router/menuRoute'
import { AppstoreOutlined, ToolOutlined, AlertOutlined, LineChartOutlined, ControlOutlined, SettingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSetState } from 'ahooks';
// const { token } = theme.useToken();

const { SubMenu } = Menu;

const MenuList = [
    {
        label: '总览',
        key: '/index/home',
        icon: <AppstoreOutlined />
    },
    {
        label: '设备',
        key: '/index/device',
        icon: <ToolOutlined />,
        children: [
            // { label: 'PCS', key: '/index/device/energyPcs', type: "PCS" },
            // { label: 'BMS', key: '/index/device/energyBms', type: "BMS" },
            // { label: '户外柜', key: '/index/device/energyOut', type: "OC" },
            { label: '储能', key: '/index/device/energyStorage', type: "PV" },
            { label: '光伏', key: '/index/device/photovoltaic', type: "PV" },
            { label: '充电桩', key: '/index/device/chargingStation', type: "C" },
        ]
    },
    {
        label: '统计',
        key: '/index/statistics',
        icon: <LineChartOutlined />,
        children: [
            { label: '电量统计', key: '/index/statistics/electricityStatistics', component: "@/pages/statistics/electricityStatistics" },
            { label: '收益统计', key: '/index/statistics/revenueStatistics', component: "@/pages/statistics/revenueStatistics" },
            { label: '数据对比', key: '/index/statistics/dataComparison', component: "@/pages/statistics/dataComparison" },
            { label: '报表导出', key: '/index/statistics/reportExport', component: "@/pages/statistics/reportExport" },
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
        label: '告警',
        key: '/index/alarm',
        icon: <AlertOutlined />,
        children: [
            { label: '实时告警', key: '/index/alarm/realtimeAlarm', },
            { label: '历史告警', key: '/index/alarm/historyAlarm', },
            { label: '告警规则', key: '/index/alarm/alarmRules', },
        ]
    },
    {
        label: '场站设置',
        key: '/index/depotSettings',
        icon: <ControlOutlined />,
        children: [
            { label: '策略配置', key: '/index/depotSettings/policyConfiguration', component: "@/pages/depotSettings/policyConfiguration" },
            { label: '电站配置', key: '/index/depotSettings/powerStationConfig', component: "@/pages/depotSettings/powerStationConfig" },
        ]
    },
    {
        label: '系统管理',
        key: '/index/systemManagement',
        icon: <SettingOutlined />,
        children: [
            // { label: '策略配置', key: '/index/systemManagement/policyConfiguration', },
            { label: '用户管理', key: '/index/systemManagement/user', },
            { label: '操作记录', key: '/index/systemManagement/operationRecords', },
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
                    style={{ fontSize: '18px', }}
                >
                    {getMenu(menu.children)}
                </SubMenu>
            );
        } else {
            if (menu.type) {
                if (currentDivice?.find(it => it === menu.type)) {
                    return (
                        <Menu.Item key={menu.key}>
                            <Link to={menu.key}>{menu.label}</Link>
                        </Menu.Item>
                    );
                }
                return
            }
            return (
                <Menu.Item key={menu.key} icon={menu.icon} 
                style={{ fontSize: '18px' }}

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