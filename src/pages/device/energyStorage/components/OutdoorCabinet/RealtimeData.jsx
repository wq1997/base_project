// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { theme, Select } from "antd";
import styles from './index.less'
import { useSelector, useIntl } from "umi";
import { getBmsNowData, getBmcNowData } from '@/services/deviceTotal'
const { Option } = Select;
function Com({ id }) {
    const [data, setData] = useState('');
    const [dataBmc, setDataBmc] = useState([]);
    const [option, setOption] = useState([])
    const [currentClu, setCurrentClu] = useState(0);
    const activitesRef = useRef([]);
    const { token } = theme.useToken();
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    useEffect(() => {
        getData();
    }, [id])

    useEffect(() => {
        getBmcData();
    }, [id,currentClu])
    const getData = async () => {
        let { data } = await getBmsNowData({ id })
        setData(data?.data);
        getOption(data.data?.clusters);
    }
    const getOption = (data) => {
        let arr = [];
        data?.map(it => {
            arr.push({
                value: it,
                label: `${it + 1}#${t('电池簇')}`,
                key: it
            })
        })
        setOption([...arr]);
        activitesRef.current = arr;

    }
    const changeCluster = (value) => {
        setCurrentClu(value)
    }
    const getBmcData=async()=>{
        let { data } = await getBmcNowData({ id,cluster:currentClu });
        console.log(data);
        setDataBmc(data?.data)
    }
    return (
        <div className={styles.detailsWrap} >
            <div className={styles.heapRealTimeData}>
                <CardModel
                    title={t('运行数据')}
                    content={
                        <div className={styles.content} style={{ backgroundColor: token.lightTreeBgc }}>
                            {data?.data && Object.keys(data?.data)?.map((it, index) => {
                                return (
                                    <div className={styles.item}>
                                        <span className={styles.itemKeys}>{it}:</span>
                                        <span className={styles.itemValues}>{data?.data[it]}</span>
                                    </div>
                                )
                            })}
                        </div>
                    }
                />
            </div>
            <div className={styles.operationalStatus}>

                <CardModel
                    title={t('运行状态')}
                    content={
                        <>


                        </>
                    }
                />
            </div>

            <div className={styles.clusterSearch}>
                <Select
                    style={{ width: 240 }}
                    onChange={changeCluster}
                    key={activitesRef.current[0]?.value}
                    defaultValue={activitesRef.current[0]?.value}
                >
                    {activitesRef.current && activitesRef.current.map(item => {
                        return (<Option key={item.value} value={item.value}>{item.label}</Option>);
                    })
                    }
                </Select>

            </div>
            <div className={styles.clusterRealTimeData}>
                <CardModel
                    title={t('运行数据')}
                    content={
                        <div className={styles.content} style={{ backgroundColor: token.lightTreeBgc }}>
                            {dataBmc?.data && Object.keys(dataBmc?.data)?.map((it, index) => {
                                return (
                                    <div className={styles.item}>
                                        <span className={styles.itemKeys}>{it}:</span>
                                        <span className={styles.itemValues}>{dataBmc?.data[it]}</span>
                                    </div>
                                )
                            })}
                        </div>
                    }
                />

            </div>
            <div className={styles.clusterOperationalStatus}>
                <CardModel
                    title={t('运行状态')}
                    content={
                        <></>
                    }
                />

            </div>

        </div>
    )
}

export default Com