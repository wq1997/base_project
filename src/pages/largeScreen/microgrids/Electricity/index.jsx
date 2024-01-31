import { useState } from "react";
import styles from "./index.less";

const Electricity = () => {
    const [data, setData] = useState([
        {
            label: '储能日充',
            data: 7000,
            unit: 'kWh',
            color: '#03B4B4'
        },
        {
            label: '储能日放',
            data: 6900,
            unit: 'kWh',
            color: '#FE8F22'
        },
        {
            label: '储能累充',
            data: 255620,
            unit: 'kWh',
            color: '#21D563'
        },
        {
            label: '储能累放',
            data: 255620,
            unit: 'kWh',
            color: '#F88181'
        },
        {
            label: '光伏日发',
            data: 145.81,
            unit: 'kWh',
            color: '#398EF8'
        },
        {
            label: '光伏累计发电',
            data: 1.03,
            unit: 'GWh',
            color: '#A143FA'
        },
        {
            label: '今日并网量',
            data: 268,
            unit: 'kWh',
            color: '#F6DE20'
        },
        {
            label: '累计并电量',
            data: 2.72,
            unit: 'GWh',
            color: '#03B4B4'
        },
    ])
    return (
        <div className={styles.content}>
            {
                data?.map((item, index) => {
                    return (
                        <div className={styles[String.fromCharCode(index+65).toLocaleLowerCase()]}>
                            <div>
                                <div className={styles.label}>
                                    {item.label}
                                </div>
                                <div className={styles.bottom}>
                                    <div className={styles.bottomData} style={{color: item.color}}>{item.data}</div>
                                    <div className={styles.bottomUnit}>{item.unit}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Electricity;