import React, { useState, useEffect, } from 'react';
import styles from "./index.less";
import Map from '../BigScreen/map'
import moment from "moment";
import { Select, Space } from "antd";
import ElectricityQuantity from "./component/electricityQuantity";
import Efficiency from './component/efficiency';
import Prediction from './component/prediction';
import Emission from './component/emission';
import Load from './component/load';
import SOC from './component/soc';
import HOC from './component/hoc';
import NextBar from './component/nextBar';
import AMapLoader from '@amap/amap-jsapi-loader'
import { MAP_KEY } from '@/utils/utils'

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
        // {
        //     title: 'SOC',
        //     data: '80',
        //     unit: '%'
        // },
        // {
        //     title: 'HOC',
        //     data: '90',
        //     unit: '%'
        // }
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

    const getCurrentCity = ()=>{
        AMapLoader.load({
            key: MAP_KEY, // 高德地图Web端开发者Key
            version: '2.0',
            plugins: [] // 需要使用 的的插件列表(必填项)
        }).then((AMap) => {
           
        }).catch(e => {
            console.log(e);
        })
     }

    useEffect(()=>{
        refreshCurrentTime();
        getCurrentCity();
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
                        {/* <div className={styles.contentBottomLeftTopDivider}/> */}
                        <div className={styles.contentBottomLeftTopContent}>
                            <div className={styles.contentBottomLeftTopContentLeft}>
                                {
                                    leftData?.map(item => {
                                        return (
                                            <div className={styles.contentBottomLeftTopContentLeftItem}>
                                                <div className={styles.subTitle}>{item?.title}</div>
                                                <div className={styles.contentBottomLeftTopContentLeftItemContent}>
                                                    <div className={styles.contentBottomLeftTopContentLeftItemContentData}>{item?.data}</div>
                                                    <div className={styles.contentBottomLeftTopContentLeftItemContentUnit}>{item?.unit}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={styles.contentBottomLeftTopContentRight}>
                                <div className={styles.contentBottomLeftTopContentRightItem}>
                                    <SOC />
                                </div>
                                <div className={styles.contentBottomLeftTopContentRightItem}>
                                    <HOC />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentBottomLeftCenter}>
                        <div className={styles.bigTitle}>近七日充放电电量</div>
                        {/* <div className={styles.contentBottomLeftCenterDivider}/> */}
                        <div className={styles.contentBottomLeftCenterContent}>
                            <ElectricityQuantity />
                        </div>
                    </div>
                    <div className={styles.contentBottomLeftBottom}>
                        <div className={styles.bigTitle}>近七日充放电效率</div>
                        {/* <div className={styles.contentBottomLeftBottomDivider}/> */}
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
                    <div className={styles.contentBottomCenterBottom}>
                        <div className={styles.contentBottomCenterBottomLeft}>
                            <div className={styles.bigTitle}>数量统计</div>
                            <div className={styles.contentBottomCenterBottomContent}>
                                <NextBar />
                            </div>
                        </div>
                        <div className={styles.contentBottomCenterBottomRight}>
                            <div className={styles.bigTitle}>节能减排</div>
                            {/* <div className={styles.contentBottomCenterBottomDivider}/> */}
                            <div className={styles.contentBottomCenterBottomContent}>
                                <Emission/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.contentBottomRight}>
                    <div className={styles.contentBottomRightTop}>
                        <div className={styles.bigTitle}>电站设备统计</div>
                        {/* <div className={styles.contentBottomRightTopDivider}/> */}
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
                        {/* <div className={styles.contentBottomRightCenterDivider}/> */}
                        <div className={styles.contentBottomRightCenterContent}>
                            <Prediction />
                        </div>
                    </div>
                    <div className={styles.contentBottomRightBottom}>
                        <div className={styles.bigTitle}>负荷预测曲线</div>
                        {/* <div className={styles.contentBottomRightBottomDivider}/> */}
                        <div className={styles.contentBottomRightBottomContent}>
                            <Load/>
                        </div>
                    </div>
                </div>
                <div className={styles.contentBottomMap}>
                    <Map/>
                </div>
            </div>
        </div>
    )
}

export default BigScreen;