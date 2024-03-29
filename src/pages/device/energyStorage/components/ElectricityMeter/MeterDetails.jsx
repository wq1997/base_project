// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { theme, Select } from "antd";
import styles from './index.less'
import { useSelector, useIntl } from "umi";
import { getMetersNowData } from '@/services/deviceTotal'

const { Option } = Select;
function Com({ id }) {
    const [data, setData] = useState('');
    const [currentClu, setCurrentClu] = useState(0);
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
        let { data } = await getMetersNowData({ id })
        setData({...data?.data.tMeter,...data?.data.gMeter});
    }
   
   
    return (
        <div className={styles.detailsWrap} >
            <div className={styles.heapRealTimeData}>
                <CardModel
                    title={t('电表数据')}
                    content={
                        <div className={styles.content} >
                            {data && Object.keys(data)?.map((it, index) => {
                                return (
                                    <div className={styles.item} style={{ backgroundColor: token.lightTreeBgc,color:token.colorLittle}}>
                                        <span className={styles.itemKeys}>{t(it)}</span>
                                        <span className={styles.itemValues}>{data[it]}</span>
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