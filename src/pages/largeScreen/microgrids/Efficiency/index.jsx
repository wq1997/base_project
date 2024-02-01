import { useState } from "react";
import styles from "./index.less";

const Efficiency = () => {
    const [data, setData] = useState([
        {
            data: 99,
            unit: '%',
            label: '储能日充放电效率',
            color: '#03B4B4'
        },
        {
            data: 98,
            unit: '%',
            label: '储能累计充放电效率',
            color: '#FF9100'
        },
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