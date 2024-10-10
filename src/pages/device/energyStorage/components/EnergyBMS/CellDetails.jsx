import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select,Cascader } from "antd";
import styles from './index.less'
import { useSelector, useIntl } from "umi";
import Cell1 from '@/assets/svg/cell1.svg'
import Cell2 from '@/assets/svg/cell2.svg'
import CellDark1 from '@/assets/svg/cellDark1.svg'
import CellDark2 from '@/assets/svg/cellDark2.svg'
import cellTem from '@/assets/svg/cellTem.svg'
import { fetchCellNowData, getBmsDevList,getOfChildDevices } from '@/services/deviceTotal'
import { getQueryString } from "@/utils/utils";

const { Option } = Select;
function Com({ id }) {
    const { token } = theme.useToken();
    const [data, setData] = useState();
    const [cluster, setCluster] = useState();
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState([]);
    const onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
        setValue(value);

    };
    const loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        const { data = {} } = await getOfChildDevices({ associateId: targetOption.id });
        // load options lazily
        setTimeout(() => {
            let arr = [];
            data?.data?.map(it => {
                arr?.push({
                    label: it.name,
                    value: it.id,
                })
            })
            targetOption.children = [
                ...arr
            ];
            setOptions([...options]);
        }, 200);
    };
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const global = useSelector(state => state.global);


    useEffect(() => {
        getOption();
    }, [token]);
    useEffect(() => {
        getClustersData();
    }, [id, value])
    const getClustersData = async () => {
        let { data } = await fetchCellNowData({ id: value[1]});
        setData(data?.data)
    }

    const getOption = async () => {
        let { data = {} } = await getBmsDevList({
            plantId: localStorage.getItem('plantId')
        })
        let arr = [];
        data?.data?.map((it, i) => {
            arr.push({
                ...it,
                label: it.name,
                value: it.associateId,
                isLeaf: false,
                disableCheckbox: true
            })
        });
        const { data: res = {} } = await getOfChildDevices({ associateId: arr[0].id });
        let newArr = []
        res?.data?.map(it => {
            newArr?.push({
                label: it.name,
                value: it.id,
            })
        });
        arr[0].children = [...newArr];
        setValue([arr[0].value, res?.data?.[0]?.id]);
        setOptions([...arr]);
    }
    return (
        <div className={styles.cellDetails}>
            <div className={styles.searchHead} style={{color:token.titleColor}}>
                <span >{t('数据项')}:</span>
                {/* <Select
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
                </Select> */}
                <Cascader
                    value={value}
                    options={options}
                    loadData={loadData}
                    onChange={onChange}
                    changeOnSelect={false}
                    showCheckedStrategy={Cascader.SHOW_CHILD}
                    maxTagCount={1}
                    style={{ width: '12.5rem' }}
                    allowClear={false}
                />
            </div>
            <div className={styles.cellContent}>
                {data?.map(one => {
                    return (
                        <div className={styles.packSingle}>
                            <div className={styles.packTitle} style={{ color: token.colorLittle }}>Pack{one.packNo + 1}</div>
                            <div className={styles.packContent} style={{ backgroundColor: token.cellBgc }}>
                                <div className={styles.packCell}>
                                    {one?.packData.map((it, index) => {
                                        return <div className={styles.cellSingel} style={{ backgroundImage: (global.theme === "default" ? `url(${(index + 1) % 2 === 0 ? Cell2 : Cell1})` : `url(${(index + 1) % 2 === 0 ? CellDark2 : CellDark1})`), backgroundSize: '100% 100%' }}>
                                            {Object.keys(it).length == 2 ? <img src={cellTem} alt="" /> : null}
                                            {it.tmp && <div className={styles.cellTmp} style={{ color: "#03B4B4" }}>{it.tmp}℃</div>}
                                            <div className={styles.cellVol} style={{ color: "#999999" }}>{it.vol}v</div>
                                        </div>
                                    })}
                                </div>
                                <div className={styles.packFoot}>
                                    <div className={styles.single}>
                                        <div className={styles.circle} style={{ backgroundColor: token.colorPrimary, color: token.colorLittle }}></div>
                                        <div className={styles.footTitle} style={{ color: token.colorLittle }}>{t('Pack极柱温度')}</div>
                                        <div className={styles.singelAttribute} style={{ color: token.colorLittle }}>
                                            {t('负极')}:{one.extraPackData.positivePoles}
                                        </div>
                                        <div className={styles.singelAttribute} style={{ color: token.colorLittle }}>
                                            {t('正极')}:{one.extraPackData.negativePoles}
                                        </div>
                                    </div>
                                    <div className={styles.single}>
                                        <div className={styles.circle} style={{ backgroundColor: token.colorPrimary }}></div>
                                        <div className={styles.footTitle} style={{ color: token.colorLittle }}>{t('Pack熔断器温度')}</div>
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