import React, { useState, useEffect, } from 'react';
import styles from "./index.less";
import Map from '../BigScreen/mapOr'
import moment from "moment";
import { Select, Space } from "antd";
import ElectricityQuantity from "./component/electricityQuantity";
import Efficiency from './component/efficiency';
import Prediction from './component/prediction';
import Emission from './component/emission';

function BigScreen() {
    const [currentTime, setCurrentTime] = useState(moment().format("YYYY/MM/DD HH:mm:ss"));
    const leftData = [
        {
            title: '今日充电量',
            data: '75',
            unit: 'kwh'
        },
        {
            title: '今日放电量',
            data: '65',
            unit: 'kwh'
        },
        {
            title: '负载实时功率',
            data: '65',
            unit: 'kw'
        },
        {
            title: '储能实时功率',
            data: '1000',
            unit: 'kw'
        },
        {
            title: '总充电量',
            data: '1000',
            unit: 'kwh'
        },
        {
            title: '总放电量',
            data: '800',
            unit: 'kwh'
        },
        {
            title: 'SOC',
            data: '80',
            unit: '%'
        },
        {
            title: 'HOC',
            data: '90',
            unit: '%'
        }
    ]

    const rightData = [
        {
            title: '总收益',
            data: '10000',
            unit: '万元'
        },
        {
            title: '日收益',
            data: '100',
            unit: '万元'
        },
        {
            title: '总设备',
            data: '1000',
            unit: '台'
        },
        {
            title: '设备在线数量',
            data: '900',
            unit: '台'
        },
        {
            title: '总充电量',
            data: '1000',
            unit: 'kwh'
        },
        {
            title: '总放电量',
            data: '800',
            unit: 'kwh'
        },
        {
            title: '设备离线数量',
            data: '80',
            unit: '台'
        },
        {
            title: '设备告警数量',
            data: '0',
            unit: '台'
        }
    ]
    const refreshCurrentTime = () => {
        setInterval(()=>{
            setCurrentTime(moment().format("YYYY/MM/DD HH:mm:ss"));
        }, 1000)
    }

    useEffect(()=>{
        refreshCurrentTime();
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.contentTop}>
                <div className={styles.title}>采日能源储能管理系统</div>
                <div className={styles.time}>{currentTime}</div>
            </div>
            <div className={styles.contentBottom}>
                <div className={styles.contentBottomLeft}>
                    <div className={styles.contentBottomLeftTop}>
                        <div className={styles.bigTitle}>电量统计</div>
                        <div className={styles.contentBottomLeftTopDivider}/>
                        <div className={styles.contentBottomLeftTopContent}>
                            {
                                leftData?.map(item => {
                                    return (
                                        <div className={styles.contentBottomLeftTopItem}>
                                            <div className={styles.subTitle}>{item?.title}</div>
                                            <div className={styles.contentBottomLeftTopItemContent}>
                                                <div className={styles.contentBottomLeftTopItemData}>{item?.data}</div>
                                                <div className={styles.contentBottomLeftTopItemUnit}>{item?.unit}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.contentBottomLeftCenter}>
                        <div className={styles.bigTitle}>近七日充放电电量</div>
                        <div className={styles.contentBottomLeftCenterDivider}/>
                        <div className={styles.contentBottomLeftCenterContent}>
                            <ElectricityQuantity />
                        </div>
                    </div>
                    <div className={styles.contentBottomLeftBottom}>
                        <div className={styles.bigTitle}>近七日充放电效率</div>
                        <div className={styles.contentBottomLeftBottomDivider}/>
                        <div className={styles.contentBottomLeftBottomContent}>
                            <Efficiency />
                        </div>
                    </div>
                </div>
                <div className={styles.contentBottomCenter}>
                    <div className={styles.contentBottomCenterSelect}>
                        <Select 
                            placeholder="请选择电站类型" 
                            options={[
                                {
                                    value: 'ALL',
                                    label: '全部'
                                }
                            ]}
                        />
                        <Select 
                            placeholder="请选择电站" 
                            options={[
                                {
                                    value: 'ALL',
                                    label: '全部'
                                }
                            ]}
                        />
                    </div>
                    <div className={styles.contentBottomCenterMap}>
                        <Map/>
                    </div>
                </div>
                <div className={styles.contentBottomRight}>
                    <div className={styles.contentBottomRightTop}>
                        <div className={styles.bigTitle}>电站设备统计</div>
                        <div className={styles.contentBottomRightTopDivider}/>
                        <div className={styles.contentBottomRightTopContent}>
                            {
                                rightData?.map(item => {
                                    return (
                                        <div className={styles.contentBottomRightTopItem}>
                                            <div className={styles.subTitle}>{item?.title}</div>
                                            <div className={styles.contentBottomRightTopItemContent}>
                                                <div className={styles.contentBottomRightTopItemData}>{item?.data}</div>
                                                <div className={styles.contentBottomRightTopItemUnit}>{item?.unit}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.contentBottomRightCenter}>
                        <div className={styles.bigTitle}>储能充放电功率预测曲线</div>
                        <div className={styles.contentBottomRightCenterDivider}/>
                        <div className={styles.contentBottomRightCenterContent}>
                            <Prediction />
                        </div>
                    </div>
                    <div className={styles.contentBottomRightBottom}>
                        <div className={styles.bigTitle}>节能减排统计</div>
                        <div className={styles.contentBottomRightBottomDivider}/>
                        <div className={styles.contentBottomRightBottomContent}>
                            <Emission/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BigScreen;