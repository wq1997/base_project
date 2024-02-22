import { useState, useEffect } from "react";
import { getGccPowerStatisticsServe } from "@/services/bigScreen"
import styles from "./index.less";

const Electricity = () => {
    const [data, setData] = useState([
        {
            label: '储能日充',
            data: 0,
            unit: 'kWh',
            color: '#03B4B4'
        },
        {
            label: '储能日放',
            data: 0,
            unit: 'kWh',
            color: '#FE8F22'
        },
        {
            label: '储能累充',
            data: 0,
            unit: 'kWh',
            color: '#21D563'
        },
        {
            label: '储能累放',
            data: 0,
            unit: 'kWh',
            color: '#F88181'
        },
        {
            label: '光伏日发',
            data: 0,
            unit: 'kWh',
            color: '#398EF8'
        },
        {
            label: '光伏累计发电',
            data: 0,
            unit: 'GWh',
            color: '#A143FA'
        },
        {
            label: '今日并网量',
            data: 0,
            unit: 'kWh',
            color: '#F6DE20'
        },
        {
            label: '累计并电量',
            data: 0,
            unit: 'GWh',
            color: '#03B4B4'
        },
    ])

    const getGccPowerStatistics = async () => {
        const res = await getGccPowerStatisticsServe();
        console.log(res);
    }

    useEffect(()=>{
        getGccPowerStatistics();
    }, [])

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