import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import styles from './index.less'
import { theme } from "antd";

import {
    ToolOutlined,
    CalendarOutlined,
    DatabaseOutlined,
    MonitorOutlined,
    ThunderboltOutlined,
    DisconnectOutlined,
    SettingOutlined,
} from '@ant-design/icons';
function Com(props) {
    const [xxx, setXxx] = useState('')
    const { token } = theme.useToken();

    useEffect(() => {
        console.log('函数组件来咯')
    }, [])
    const topData = [
        {
            icon: <ToolOutlined />,
            name: "安装位置",
            color: '#FAC200',
            value: 'XX省',
            unit: ''
        },
        {
            icon: <CalendarOutlined />,
            name: "投运日期",
            color: '#03B4B4',
            value: '2023-12-01',
            unit: ''
        },
        {
            icon: <DatabaseOutlined />,
            name: "装机容量",
            color: '#2974ED',
            value: '9999',
            unit: 'kWh'
        },
    ];
    const bottomData = [
        {
            icon: <MonitorOutlined />,
            name: "今日发电量",
            color: '#ED750E',
            value: '998',
            unit: 'kWh'
        },
        {
            icon: <ThunderboltOutlined />,
            name: "今日并网量",
            color: '#6F2BF1',
            value: '1000',
            unit: 'kWh'
        },
        {
            icon: <DisconnectOutlined />,
            name: "累计发电量",
            color: '#FAC200',
            value: '9999',
            unit: 'kWh'
        },
        {
            icon: <SettingOutlined />,
            name: "累计并网量",
            color: '#03B4B4',
            value: '99981',
            unit: 'kWh'
        },

    ]
    return (
        <div className={styles.content}>
            <CardModel
                title={
                    "运行指标"
                }
                opacity={0.7}
                content={
                    <div className={styles.contentWrap}>
                        <div className={styles.topContent}>
                            {topData.map(it => {
                                return (
                                    <div className={styles.topItem} style={{ color: it.color,backgroundColor:token.cardBgc, boxShadow:token.cardShadow}}>
                                        <div className={styles.topItemTitle}>
                                            {it.icon}
                                            <span style={{ color: token.smallTitleColor, fontWeight: 500, fontSize: '16px', marginLeft: '3px' }}>{it.name}</span>
                                        </div>
                                        <div className={styles.topVaue} style={{color:token.titleColor}}>
                                            {it.value}
                                            <span style={{color: token.smallTitleColor, fontSize: '16px', fontWeight: 400, marginLeft: '10px' }}>{it.unit}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.bottomContent}>
                            {bottomData.map(it => {
                                return (
                                    <div className={styles.bottomItem} style={{ color: it.color,backgroundColor:token.cardBgc , boxShadow:token.cardShadow}}>
                                        <div className={styles.bottomItemTitle}>
                                            {it.icon}
                                            <span style={{color: token.smallTitleColor, fontWeight: 500, fontSize: '16px', marginLeft: '3px' }}>{it.name}</span>
                                        </div>
                                        <div className={styles.bottomVaue} style={{color:token.titleColor}}>
                                            {it.value}
                                            <span style={{ color: token.smallTitleColor,fontSize: '16px', fontWeight: 400, marginLeft: '10px' }}>{it.unit}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                }
            />
        </div>
    )
}

export default Com