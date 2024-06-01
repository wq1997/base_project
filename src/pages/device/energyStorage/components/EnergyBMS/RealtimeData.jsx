// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { theme, Select } from "antd";
import styles from './index.less'
import { useSelector, useIntl } from "umi";
import { getBmsNowData, getBmcNowData,obtainBMSClustersList } from '@/services/deviceTotal'
const { Option } = Select;
function Com({ id }) {
    const [data, setData] = useState('');
    const [dataBmc, setDataBmc] = useState([]);
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
        getOption();
    }, [id])

    useEffect(() => {
        getBmcData();
    }, [id, currentClu])
    const getData = async () => {
        let { data } = await getBmsNowData({ id })
        setData(data?.data);
    }
    const getOption = async() => {
        let { data } = await obtainBMSClustersList({ id })
        let arr=[];
        data?.data?.map((it,i)=>{
           arr.push({
                ...it,
                label: it.name,
                value:it.id
            })
        })
        activitesRef.current = arr;

    }
    const changeCluster = (value) => {
        setCurrentClu(value)
    }
    const getBmcData = async () => {
        let { data } = await getBmcNowData({ id, cluster: currentClu });
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
            <div className={styles.clusterSearch}>
                <Select
                    style={{ width: 240 }}
                    onChange={changeCluster}
                    key={activitesRef.current[0]?.value}
                    defaultValue={0}
                >
                    {activitesRef.current && activitesRef.current.map((item,index) => {
                        return (<Option key={item.value} value={index}>{item.name}</Option>);
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

        </div>
    )
}

export default Com