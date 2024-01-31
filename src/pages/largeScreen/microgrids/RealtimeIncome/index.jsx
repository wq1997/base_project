import { useState } from "react";
import useIcon from "@/hooks/useIcon";
import styles from "./index.less";

const RealtimeIncome = () => {
    const Icon = useIcon();
    const [data, setData] = useState([
        {
            data: 10000,
            unit: '元',
            label: '光伏收益',
            icon: 'icon-guangfushouyi',
            color: '#45BDF9'
        },
        {
            data: 100,
            unit: '元',
            label: '储能收益',
            icon: 'icon-chunengshouyi',
            color: '#AC2EF5'
        }
    ])
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