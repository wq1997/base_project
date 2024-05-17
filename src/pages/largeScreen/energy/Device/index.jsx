import { useState, useEffect } from "react";
import styles from "./index.less";
import { getDtuStatisticsServe } from "@/services/bigScreen";

const Device = ({plantId}) => {
    const [data, setData] = useState([
        {
            data: 0,
            unit: '台',
            label: '设备告警',
            color: '#FF6A0B'
        },
        {
            data: 0,
            unit: '台',
            label: '设备在线',
            color: '#83FF73'
        },
        {
            data: 0,
            unit: '台',
            label: '总设备',
            color: 'white'
        },
        {
            data: 0,
            unit: '台',
            label: '设备离线',
            color: 'white'
        }
    ])

    const getDtuStatistics = async () => {
        const res = await getDtuStatisticsServe({plantId});
        if(res?.data?.data){
            const data = res?.data?.data;
            setData([
                {
                    data: data?.alarmDtuCount,
                    unit: '台',
                    label: '设备告警',
                    color: '#FF6A0B'
                },
                {
                    data: data?.onlineCount,
                    unit: '台',
                    label: '设备在线',
                    color: '#83FF73'
                },
                {
                    data: data?.dtuCount,
                    unit: '台',
                    label: '总设备',
                    color: 'white'
                },
                {
                    data: data?.offlineCount,
                    unit: '台',
                    label: '设备离线',
                    color: 'white'
                }
            ])
        }
    }

    useEffect(() => {
        getDtuStatistics();
    }, [])

    return (
        <div className={styles.content}>
            {
                data?.map(item => {
                    return (
                        <div className={styles.contentItem}>
                            <div className={styles.contentItemRightTop}>
                                <div className={styles.contentItemRightTopData} style={{color: item.color}}>{item.data||0}</div>
                                <div className={styles.contentItemRightTopUnit}>{item.unit}</div>
                            </div>
                            <div className={styles.contentItemRightBottom}>
                                {item.label}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Device;