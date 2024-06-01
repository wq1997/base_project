// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { theme, } from "antd";
import dayjs from 'dayjs';
import styles from './index.less'
import { getPcsNowDataById,  } from '@/services/deviceTotal'
import { useSelector, useIntl } from "umi";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
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
        let { data } = await getPcsNowDataById({ id })
        setData(data?.data);
    }
    let branch = [
        {
            key: 'name',
            label: '',
        },
        {
            key: 'power',
            label: t('直流功率'),
        },
        {
            key: 'cur',
            label: t('直流电流'),
        },
        {
            key: 'vol',
            label: t('直流输入电压'),
        },
    ]
    return (
        <div className={styles.detailsWrap}>
            <div className={styles.detailsTopData} style={{ backgroundColor: token.lightTreeBgc }}>
                <CardModel
                    title={t('PCS1')}
                    content=
                    {<><div className={styles.contentwrap} style={{ backgroundColor: token.lightTreeBgc }}>
                        {data?.pcs && Object.keys(data?.pcs)?.map((it, index) => {
                            return (
                                <div className={styles.item}>
                                    <span className={styles.itemKeys}>{it}:</span>
                                    <span className={styles.itemValues}>{data?.pcs[it]}</span>
                                </div>
                            )
                        })}
                    </div>
                        <div className={styles.detailsBottomEcharts} style={{ backgroundColor: token.lightTreeBgc }}>
                            {data?.pscBatch && data?.pscBatch?.map((it, index) => {
                                return (
                                    <div className={styles.item}>
                                        {branch?.map((item,i) => {
                                            return (
                                                <div>
                                                    {item.label&&<span className={styles.label}>{item?.label}:</span>}
                                                    <span className={styles.itemValues}>{it?.[item?.key]}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </>}
                />
            </div>


        </div>
    )
}

export default Com