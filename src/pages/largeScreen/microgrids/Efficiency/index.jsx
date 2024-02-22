import { useState, useEffect } from "react";
import { getGccPowerStatisticsServe } from "@/services/bigScreen";
import styles from "./index.less";

const Efficiency = () => {
    const [data, setData] = useState([
        {
            data: 0,
            unit: '%',
            label: '储能日充放电效率',
            color: '#03B4B4'
        },
        {
            data: 0,
            unit: '%',
            label: '储能累计充放电效率',
            color: '#FF9100'
        },
    ])

    const getGccPowerStatistics = async () => {
        const res = await getGccPowerStatisticsServe();
        if(res?.data?.data){
            const data = res?.data?.data;
            setData([
                {
                    data: data?.energyDailyEffect,
                    unit: '%',
                    label: '储能日充放电效率',
                    color: '#03B4B4'
                },
                {
                    data: data?.energyTotalEffect,
                    unit: '%',
                    label: '储能累计充放电效率',
                    color: '#FF9100'
                },
            ])
        }
    }

    useEffect(()=>{
        getGccPowerStatistics();
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

export default Efficiency;