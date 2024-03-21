// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { CardModel } from "@/components";
import useIcon from "@/hooks/useIcon";
import { useSelector, useIntl } from "umi";
import { theme, } from "antd";
import Img from '../react/Meta2d'
function OverView(props) {
    const [xxx, setXxx] = useState('');
    const { token } = theme.useToken();
    const Icon = useIcon();

    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    useEffect(() => {
        console.log('函数组件来咯')
    }, [])
    const electricityStatistics = [
        {
            value: '10010',
            label: '储能累计充电量',
            unit: 'kWh',
            color: '#F3DF2E'
        },
        {
            value: '10010',
            label: '储能累计放电量',
            unit: 'kWh',
            color: '#D53D3D'
        },
        {
            value: '10010',
            label: '光伏累计发电量',
            unit: 'kWh',
            color: '#3072E1'
        },
        {
            value: '10010',
            label: '充电桩累计充电量',
            unit: 'kWh',
            color: '#03B4B4'
        },
    ];
    const profit = [
        {
            value: '10010',
            label: '今日收益',
            unit: '元',
            color: '#E9641C',
            icon: 'icon-qushi'
        },
        {
            value: '10010',
            label: '累计收益',
            unit: '元',
            color: '#03B4B4',
            icon: 'icon-qian'
        },
    ]

    return (
        <div className={styles.container} style={{color:token.titleColor}}>
            <div className={styles.imgPart}>
                <Img />
            </div>
            <div className={styles.card}>
                <div className={styles.dataLeft} style={{ backgroundColor: token.titleCardBgc }}>
                    {electricityStatistics.map(it => {
                        return <>
                            <div className={styles.wrap} >
                                <div className={styles.value} >
                                    <span style={{ color: it.color }}>{it.value}</span>
                                    <span className={styles.unit}>{it.unit}</span>
                                </div>
                                <div className={styles.label}>
                                    {t(it.label)}
                                </div>
                            </div>
                        </>
                    })}
                </div>
                <div className={styles.dataRight} style={{ backgroundColor: token.titleCardBgc }}>
                    {
                        profit.map(it => {
                            return <>
                                <div className={styles.wrap} >
                                    <div className={styles.title}>
                                        <Icon
                                            type={it.icon}
                                            style={{
                                                fontSize: 20,
                                                color: it.color
                                            }}
                                        />
                                        {t(it.label)}
                                    </div>
                                    <div className={styles.value} >
                                            <span style={{color:it.color}}>{it.value}</span>
                                            <span className={styles.unit}>{it.unit}</span>

                                    </div>
                                </div>

                            </>
                        })

                    }

                </div>
                <div className={styles.echarLeft}>
                    <CardModel
                        title={t('电量统计')}
                        content={
                            <div className={styles.echartPartCardwrap}>
                            </div>
                        }
                    />
                </div>
                <div className={styles.echarRight}>
                    <CardModel
                        title={t('功率')}
                        content={
                            <div className={styles.echartPartCardwrap}>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default OverView