import { Menu, theme, Tooltip } from 'antd';
import { Link, useLocation, useSelector, FormattedMessage,useIntl } from 'umi';
// import menu from '../router/menuRoute'
import { AppstoreOutlined, ToolOutlined, AlertOutlined, LineChartOutlined, ControlOutlined, SettingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSetState } from 'ahooks';
// const { token } = theme.useToken();

const { SubMenu } = Menu;

const MenuList = [
    {
        label: '首页' ,
        key: '/index/home',
        icon: <AppstoreOutlined />
    },
    {
        label: '运行监测' ,
        key: '/index/device',
        icon: <ToolOutlined/> ,
        children: [
            // { label: '储能' , key: '/index/device/energyStorage', type: "PV" },
            { label: '总览' , key: '/index/device/energyStorage/components/Overview', type: "PV" },
            { label: 'PCS' , key: '/index/device/energyStorage/components/EnergyPCS', type: "PV" },
            { label: 'BMS' , key: '/index/device/energyStorage/components/EnergyBMS', type: "PV" },
            { label: '辅助设备' , key: '/index/device/energyStorage/components/ElectricityMeter', type: "PV" },
            // { label: 'device.Photovoltaic' , key: '/index/device/photovoltaic', type: "PV" },
            // { label: 'device.ChargingPiles' , key: '/index/device/chargingStation', type: "C" },
        ]
    },
    {
        label: '统计报表' ,
        key: '/index/statistics',
        icon: <LineChartOutlined />,
        children: [
            { label: '电量统计' , key: '/index/statistics/electricityStatistics', component: "@/pages/statistics/electricityStatistics" },
            // { label: 'app.EarningsStatistics' , key: '/index/statistics/revenueStatistics', component: "@/pages/statistics/revenueStatistics" },
            { label: '数据对比' , key: '/index/statistics/dataComparison', component: "@/pages/statistics/dataComparison" },
            { label: '报表导出' , key: '/index/statistics/reportExport', component: "@/pages/statistics/reportExport" },
        ]
    },
    {
        label: '告警查询' ,
        key: '/index/alarm',
        icon: <AlertOutlined/> ,
        children: [
            { label: '实时告警' , key: '/index/alarm/realtimeAlarm', },
            { label: '历史告警' , key: '/index/alarm/historyAlarm', },
            { label: '告警规则' , key: '/index/alarm/alarmRules', },
        ]
    },
    {
        label: '场站设置' ,
        key: '/index/depotSettings',
        icon: <ControlOutlined />,
        children: [
            { label: '控制命令' , key: '/index/depotSettings/operationManage', component: "@/pages/depotSettings/operationManage", auth: [2, 3] },
            { label: '策略配置' , key: '/index/depotSettings/policyConfiguration', component: "@/pages/depotSettings/policyConfiguration", auth: [2, 3] },
            { label: '电站管理' , key: '/index/depotSettings/powerStationConfig', component: "@/pages/depotSettings/powerStationConfig" },
        ]
    },
    {
        label: '系统管理' ,
        key: '/index/systemManagement',
        icon: <SettingOutlined />,
        children: [
            // { label: '策略配置', key: '/index/systemManagement/policyConfiguration', },
            { label: '用户管理' , key: '/index/systemManagement/user', },
            { label: '操作记录' , key: '/index/systemManagement/operationRecords', },
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