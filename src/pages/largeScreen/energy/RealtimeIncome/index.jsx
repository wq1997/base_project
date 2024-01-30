import { useState } from "react";
import useIcon from "@/hooks/useIcon";
import styles from "./index.less";

const RealtimeIncome = () => {
    const Icon = useIcon();
    const [data, setData] = useState([
        {
            data: 10000,
            unit: '万',
            label: '总收益',
            icon: 'icon-zongshouyi',
            color: '#F99C1A'
        },
        {
            data: 100,
            unit: '万',
            label: '日收益',
            icon: 'icon-rishouyi1',
            color: '#16D0FE'
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
                                    <div className={styles.contentItemRightTop}>
                                        <div className={styles.contentItemRightTopData} style={{color: item.color}}>{item.data||0}</div>
                                        <div className={styles.contentItemRightTopUnit}>{item.unit}</div>
                                    </div>
                                    <div className={styles.contentItemRightBottom}>
                                        {item.label}
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