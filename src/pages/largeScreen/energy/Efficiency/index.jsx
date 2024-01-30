import { useState } from "react";
import styles from "./index.less";

const Efficiency = () => {
    const [data, setData] = useState([
        {
            data: 10,
            unit: '台',
            label: '设备告警',
            color: '#FF6A0B'
        },
        {
            data: 980,
            unit: '台',
            label: '设备在线',
            color: '#83FF73'
        },
        {
            data: 1000,
            unit: '台',
            label: '总设备',
            color: 'white'
        },
        {
            data: 980,
            unit: '台',
            label: '设备离线',
            color: 'white'
        }
    ])

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

export default Efficiency;