import React, { useState, useEffect, } from 'react';
import styles from "./index.less";
import Map from '../BigScreen/mapOr'
import moment from "moment";
import { Select, Space } from "antd";

function BigScreen() {
    const [currentTime, setCurrentTime] = useState(moment().format("YYYY/MM/DD HH:mm:ss"));

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
                        <div className={styles.contentBottomLeftTopTitle}>电量统计</div>
                        <div className={styles.contentBottomLeftTopDivider}/>
                        <div className={styles.contentBottomLeftTopContent}>
                            <div className={styles.contentBottomLeftTopItem}>
                                <div className={styles.contentBottomLeftTopItemTitle}>今日充电量</div>
                                <div className={styles.contentBottomLeftTopItemContent}>
                                    <div className={styles.contentBottomLeftTopItemData}>75</div>
                                    <div className={styles.contentBottomLeftTopItemUnit}>kwh</div>
                                </div>
                            </div>
                            <div className={styles.contentBottomLeftTopItem}>
                                <div className={styles.contentBottomLeftTopItemTitle}>今日放电量</div>
                                <div className={styles.contentBottomLeftTopItemContent}>
                                    <div className={styles.contentBottomLeftTopItemData}>65</div>
                                    <div className={styles.contentBottomLeftTopItemUnit}>kwh</div>
                                </div>
                            </div>
                            <div className={styles.contentBottomLeftTopItem}>
                                <div className={styles.contentBottomLeftTopItemTitle}>负载实时功率</div>
                                <div className={styles.contentBottomLeftTopItemContent}>
                                    <div className={styles.contentBottomLeftTopItemData}>65</div>
                                    <div className={styles.contentBottomLeftTopItemUnit}>kw</div>
                                </div>
                            </div>
                            <div className={styles.contentBottomLeftTopItem}>
                                <div className={styles.contentBottomLeftTopItemTitle}>储能实时功率</div>
                                <div className={styles.contentBottomLeftTopItemContent}>
                                    <div className={styles.contentBottomLeftTopItemData}>1000</div>
                                    <div className={styles.contentBottomLeftTopItemUnit}>kw</div>
                                </div>
                            </div>
                            <div className={styles.contentBottomLeftTopItem}>
                                <div className={styles.contentBottomLeftTopItemTitle}>总充电量</div>
                                <div className={styles.contentBottomLeftTopItemContent}>
                                    <div className={styles.contentBottomLeftTopItemData}>1000</div>
                                    <div className={styles.contentBottomLeftTopItemUnit}>kwh</div>
                                </div>
                            </div>
                            <div className={styles.contentBottomLeftTopItem}>
                                <div className={styles.contentBottomLeftTopItemTitle}>总放电量</div>
                                <div className={styles.contentBottomLeftTopItemContent}>
                                    <div className={styles.contentBottomLeftTopItemData}>800</div>
                                    <div className={styles.contentBottomLeftTopItemUnit}>kwh</div>
                                </div>
                            </div>
                            <div className={styles.contentBottomLeftTopItem}>
                                <div className={styles.contentBottomLeftTopItemTitle}>SOC</div>
                                <div className={styles.contentBottomLeftTopItemContent}>
                                    <div className={styles.contentBottomLeftTopItemData}>80</div>
                                    <div className={styles.contentBottomLeftTopItemUnit}>%</div>
                                </div>
                            </div>
                            <div className={styles.contentBottomLeftTopItem}>
                                <div className={styles.contentBottomLeftTopItemTitle}>HOC</div>
                                <div className={styles.contentBottomLeftTopItemContent}>
                                    <div className={styles.contentBottomLeftTopItemData}>90</div>
                                    <div className={styles.contentBottomLeftTopItemUnit}>%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentBottomLeftCenter}>
                        <div className={styles.contentBottomLeftCenterTitle}>近七日充放电电量统计</div>
                        <div className={styles.contentBottomLeftCenterDivider}/>
                        <div className={styles.contentBottomLeftCenterContent}>
                            
                        </div>
                    </div>
                    <div className={styles.contentBottomLeftBottom}>
                        <div className={styles.contentBottomLeftBottomTitle}>近七日充放电效率统计</div>
                        <div className={styles.contentBottomLeftBottomDivider}/>
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
                <div></div>
            </div>
        </div>
    )
}

export default BigScreen;