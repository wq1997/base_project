// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { theme, Select } from "antd";
import styles from './index.less'
import { useSelector, useIntl } from "umi";
import {runOutData} from '@/utils/constants'
import { liveSummary } from '@/services/deviceTotal'
function Com({ id }) {
    const [data, setData] = useState('');
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

    const getData = async () => {
        let { data } = await liveSummary({ id });
        dealData(runOutData,data?.data)
    }
    const dealData = (modelData, data) => {
        let arr=[];
        modelData.forEach(item => {
            item.value.forEach(
                it =>
                (it.value = data[item.selectKey].hasOwnProperty(it.key)
                    ? data[item.selectKey][it.key]
                    : "")
            );
            // console.log(item,2112112);
            arr?.push(item);
        });
      setData(arr);
    }



    return (
        <div className={styles.detailsWrap} >
            {
                data&&data?.map(item=>{
                    return(
                        <div className={styles.heapRealTimeData}>
                        <CardModel
                            title={t(item.title)}
                            content={
                                <div className={styles.content} style={{ backgroundColor: token.lightTreeBgc }}>
                                    {item?.value && item?.value?.map((it, index) => {
                                        return (
                                            <div className={styles.item}>
                                                <span className={styles.itemKeys}>{it?.name}:</span>
                                                <span className={styles.itemValues}>{it?.value}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        />
                    </div>
                    )
                })
            }
        

        </div>
    )
}

export default Com