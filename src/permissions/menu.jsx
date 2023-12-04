import { Menu } from 'antd';
import { Link, useLocation, useSelector } from 'umi';
// import menu from '../router/menuRoute'
import { AppstoreOutlined, ToolOutlined, AlertOutlined, LineChartOutlined, AccountBookOutlined, SettingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSetState } from 'ahooks';

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
            { label: 'PCS舱', key: '/index/device/energyPcs', type: "PCS" },
            { label: 'BMS舱', key: '/index/device/energyBms', type: "BMS" },
            { label: '户外柜', key: '/index/device/energyOut', type: "OC" },
            { label: '光伏', key: '/index/device/photovoltaic', type: "PV" },
            { label: '充电桩', key: '/index/device/chargingStation', type: "C" },
        ]
    },
    {
        label: '报表',
        key: '/index/statement',
        icon: <LineChartOutlined />,
        children: [
            { label: '  统计数据', key: '/index/statement/statisticalData', },
            { label: '数据对比', key: '/index/statement/dataComparison', },
            { label: '报表导出', key: '/index/statement/reportExport', },
        ]
    },
    {
        label: '收益',
        key: '/index/profit',
        icon: <AccountBookOutlined />,
        children: [
            { label: '收益明细', key: '/index/profit/revenueDetails', },
            { label: '收益统计', key: '/index/profit/revenueStatistics', },
        ]
    },
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
        label: '系统管理',
        key: '/index/systemManagement',
        icon: <SettingOutlined />,
        children: [
            { label: '策略配置', key: '/index/systemManagement/policyConfiguration', },
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
                <Menu.Item key={menu.key} icon={menu.icon}>
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