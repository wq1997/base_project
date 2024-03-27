import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, } from "antd";
import styles from './index.less'
import { useSelector, useIntl } from "umi";
import Cell1 from '@/assets/svg/cell1.svg'
import Cell2 from '@/assets/svg/cell2.svg'
import cellTem from '@/assets/svg/cellTem.svg'
import { fetchCellNowData,obtainBMSClustersList } from '@/services/deviceTotal'
import { getQueryString } from "@/utils/utils";

const { Option } = Select;
function Com({ id }) {
    const { token } = theme.useToken();
    const activitesRef = useRef([]);
    const [data, setData] = useState();
    const [cluster, setCluster] = useState();
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
        getOption();
    }, [token]);
    useEffect(() => {
        getClustersData();
    }, [id,cluster])
    const getClustersData = async () => {
        let { data } = await fetchCellNowData({ id:cluster });
        setData(data?.data)
    }

    const getOption = async() => {
        let { data } = await obtainBMSClustersList({ id })
        let arr=[];
        data?.data?.map((it,i)=>{
            i===0?null:arr.push({
                ...it,
                label: it.name,
                value:it.id
            })
        })
        activitesRef.current = arr;
        setCluster(arr[0].value)
    }
    const changeCluster = (val) => {
        setCluster(val)  
      }

    return (
        <div className={styles.cellDetails}>
            <div className={styles.searchHead}>
                <span >{t('数据项')}:</span>
                <Select
                    className={styles.margRL}
                    style={{ width: 240 }}
                    onChange={changeCluster}
                    key={activitesRef.current[0]?.value}
                    defaultValue={activitesRef.current[0]?.value}
                >
                    {activitesRef.current && activitesRef.current.map(item => {
                        return (<Option key={item.value} value={item.value}>{t(item.label)}</Option>);
                    })
                    }
                </Select>

            </div>
            <div className={styles.cellContent}>
                {data?.map(one => {
                    return (
                        <div className={styles.packSingle}>
                            <div className={styles.packTitle}>Pack{one.packNo + 1}</div>
                            <div className={styles.packContent} style={{ backgroundColor: token.cellBgc }}>
                                <div className={styles.packCell}>
                                    {one?.packData.map((it, index) => {
                                        return <div className={styles.cellSingel} style={{ backgroundImage: `url(${(index + 1) % 2 === 0 ? Cell2 : Cell1})` }}>
                                            {Object.keys(it).length == 2 ? <img src={cellTem} alt="" /> : null}
                                            <div className={styles.cellVol} style={{ color:"#999999"}}>{it.vol}v</div>
                                        </div>
                                    })}
                                </div>
                                <div className={styles.packFoot}>
                                    <div className={styles.single}>
                                        <div className={styles.circle} style={{ backgroundColor: token.colorPrimary }}></div>
                                        <div className={styles.footTitle} >{t('Pack极柱温度')}</div>
                                        <div className={styles.singelAttribute} style={{ color: token.colorLittle }}>
                                            {t('负极')}:{one.extraPackData.positivePoles}
                                        </div>
                                        <div className={styles.singelAttribute} style={{ color: token.colorLittle }}>
                                            {t('正极')}:{one.extraPackData.negativePoles}
                                        </div>
                                    </div>
                                    <div className={styles.single}>
                                        <div className={styles.circle} style={{ backgroundColor: token.colorPrimary }}></div>
                                        <div className={styles.footTitle} >{t('Pack熔断器温度')}</div>
                                        <div className={styles.singelAttribute} style={{ color: token.colorLittle }}>
                                            {t('左侧熔断器')}:{one.extraPackData.fuseLeft}
                                        </div>
                                        <div className={styles.singelAttribute} style={{ color: token.colorLittle }}>
                                            {t('右侧熔断器')}:{one.extraPackData.fuseRight}
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Com