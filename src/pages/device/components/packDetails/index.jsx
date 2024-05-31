// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getBurPackDetailInitData2, getBurPackDetailInfo2 } from '@/services/deviceTotal'
import { getQueryString } from "@/utils/utils";
import { theme, Select } from "antd";
import { useSelector, useIntl } from "umi";
import styles from './index.less'
import useIcon from "@/hooks/useIcon";

function Com(props) {
    const { token } = theme.useToken();
    const [options, setOptions] = useState([])
    const [selectId, setSelectId] = useState('0,0')
    const [data, setData] = useState([])
    const id = getQueryString('id') || 0;
    const intl = useIntl();
    const Icon = useIcon();

    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }

    useEffect(() => {
        initData();
    }, [])

    useEffect(() => {
        getPackData();
    }, [selectId])
    const initData = async () => {
        let { data } = await getBurPackDetailInitData2({
            dtuId: id,
        });
        setOptions(data?.data)
    }
    const getPackData = async () => {
        let { data } = await getBurPackDetailInfo2({
            dtuId: id,
            idxItem: selectId
        });
        setData(data.data)
    }
    const temObj = {
        fuseLeft: '左侧熔断器温度',
        fuseRight: '右侧熔断器温度',
        negativePoles: '负极极柱温度',
        positivePoles: '正极极柱温度',

    }
    const changePack = (val) => {
        setSelectId(val)
    }
    return (
        <div className={styles.pack} style={{width: '100%', height: 'auto', minHeight: '100%', padding: '40px 30px',  background: token.bgcColorB_l}}>
            <Select
                className={styles.margRL}
                style={{ width: 180 }}
                options={options}
                defaultValue={'0,0'}
                onChange={(val) => changePack(val)
                }
            >
            </Select>
            <div className={styles.packContent}>
                {data?.map((one, index) => {
                    return (<div className={styles.onePack}>
                        <div className={styles.title1}>
                            <Icon type='icon-xiangyou' style={{ cursor: 'pointer',marginRight:'6px' }}></Icon>
                            PACK{one.packNo + 1}</div>
                        <div className={styles.vol}>
                            <div className={styles.title2}>{t("单体电压/mV")}</div>
                            <div className={styles.oneContent}>
                                {one.vols?.map((it, index) => {
                                    return (
                                        <div className={styles.oneData}>
                                            {t("电芯")}{index}:<span style={{marginLeft:'10px'}}>{it}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.tem}>
                            <div className={styles.title2}>{t("单体温度/℃")}</div>
                            <div className={styles.oneContent}>
                                {one.tmps?.map((it, index) => {
                                    return (
                                        <div className={styles.oneData}>
                                            {index < 10 ? `0${index}` : index}{' '}:{' '}{it}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.tempContent}>
                                {Object.keys(one?.extraPackData).map((it, index) => {
                                    return (
                                        <div className={styles.oneData}>
                                            {t(temObj[it])}{' '}:{' '}{one?.extraPackData[it]}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>)
                })}
            </div>

        </div>
    )
}

export default Com