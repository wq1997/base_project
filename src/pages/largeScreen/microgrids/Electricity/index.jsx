import { useState, useEffect } from "react";
import { getGccPowerStatisticsServe } from "@/services/bigScreen"
import styles from "./index.less";

const Electricity = ({plantId}) => {
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
        const res = await getGccPowerStatisticsServe({plantId});
        if(res?.data?.data){
            const data = res?.data?.data;
            setData([
                {
                    label: '储能日充',
                    data: data?.energyDailyCharge,
                    unit: 'kWh',
                    color: '#03B4B4'
                },
                {
                    label: '储能日放',
                    data: data?.energyDailyDisCharge,
                    unit: 'kWh',
                    color: '#FE8F22'
                },
                {
                    label: '储能总充',
                    data: data?.energyTotalCharge,
                    unit: 'kWh',
                    color: '#21D563'
                },
                {
                    label: '储能总放',
                    data: data?.energyTotalDisCharge,
                    unit: 'kWh',
                    color: '#F88181'
                },
                {
                    label: '光伏日发',
                    data: data?.pvDailyGenerate,
                    unit: 'kWh',
                    color: '#398EF8'
                },
                {
                    label: '光伏累计发电',
                    data: data?.pvTotalGenerate,
                    unit: 'GWh',
                    color: '#A143FA'
                },
                {
                    label: '今日并网量',
                    data: data?.dailyGridOn,
                    unit: 'kWh',
                    color: '#F6DE20'
                },
                {
                    label: '累计并电量',
                    data: data?.totalGridOn,
                    unit: 'GWh',
                    color: '#03B4B4'
                },
            ])
        }
    }

    useEffect(()=>{
        getGccPowerStatistics();
    }, [plantId])

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
                                    {/* <div className={styles.bottomUnit}>{item.unit}</div> */}
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