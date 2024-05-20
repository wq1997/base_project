import { useState, useEffect } from "react";
import useIcon from "@/hooks/useIcon";
import styles from "./index.less";
import { getGccPowerStatisticsServe } from "@/services/bigScreen"

const RealtimeIncome = ({plantId}) => {
    const Icon = useIcon();
    const [data, setData] = useState([
        {
            data: 0,
            unit: '元',
            label: '光伏收益',
            icon: 'icon-guangfushouyi',
            color: '#45BDF9'
        },
        {
            data: 0,
            unit: '元',
            label: '储能收益',
            icon: 'icon-chunengshouyi',
            color: '#AC2EF5'
        }
    ])

    const getGccPowerStatistics = async () => {
        const res = await getGccPowerStatisticsServe({plantId});
        if(res?.data?.data){
            const data = res?.data?.data;
            setData([
                {
                    data: data?.pvProfit,
                    unit: '元',
                    label: '光伏收益',
                    icon: 'icon-guangfushouyi',
                    color: '#45BDF9'
                },
                {
                    data: data?.energyProfit,
                    unit: '元',
                    label: '储能收益',
                    icon: 'icon-chunengshouyi',
                    color: '#AC2EF5'
                }
            ])
        }
    }

    useEffect(()=>{
        getGccPowerStatistics();
    }, [plantId])

    return (
        <div className={styles.content}>
            {
                data?.map(item => {
                    return (
                        <div className={styles.contentItem}>
                            <div className={styles.contentItemLeft}>
                                <Icon 
                                    type={item.icon}
                                    style={{
                                        color: item.color,
                                        fontSize: 50,
                                        marginRight: 20
                                    }}
                                />
                            </div>
                            <div className={styles.contentItemRight}>
                                    <div className={styles.contentItemRightBottom}>
                                        {item.label}
                                    </div>
                                    <div className={styles.contentItemRightTop}>
                                        <div className={styles.contentItemRightTopData} style={{color: item.color}}>{item.data||0}</div>
                                        <div className={styles.contentItemRightTopUnit}>{item.unit}</div>
                                    </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RealtimeIncome;