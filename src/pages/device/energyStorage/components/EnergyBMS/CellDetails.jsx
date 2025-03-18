import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, Cascader, Popover } from "antd";
import styles from './index.less'
import { useSelector, useIntl } from "umi";
import Cell1 from '@/assets/svg/cell1.svg'
import Cell2 from '@/assets/svg/cell2.svg'
import normalLight from '@/assets/svg/normal-light.svg'
import normalCell from '@/assets/svg/normalCell.svg'
import normalLightRev from '@/assets/svg/normal-light-rev.svg'
import normalCellRev from '@/assets/svg/normalCellRev.svg'
import { ExclamationCircleOutlined } from "@ant-design/icons";
import cellTem from '@/assets/svg/cellTem.svg'
import { fetchCellNowData, getBmsDevList, getOfChildDevices } from '@/services/deviceTotal'
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
    const calculateValues = (data) => {
        let allVol = [], allTemp = [];
        data?.forEach((one) => {
            one?.packData?.forEach((one) => {
                allVol = allVol.concat(one?.vol || []);
                allTemp = allTemp.concat(one?.tmp || []);
            });
        });
       
        const volList = allVol?.filter((item) => !isNaN(Number(item))) || [];
        const maxVol = Math.max(...volList).toFixed(3);
        const minVol = Math.min(...volList).toFixed(3);
        const volDiff = (maxVol - minVol).toFixed(3);
    
        const tempList = allTemp?.filter((item) => !isNaN(Number(item))) || [];
        const maxTemp = Math.max(...tempList).toFixed(3);
        const minTemp = Math.min(...tempList).toFixed(3);
        const tempDiff = (maxTemp - minTemp).toFixed(3);
    
        return { maxVol, minVol, volDiff, maxTemp, minTemp, tempDiff };
    }
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
    const total = [
        {
            label: t("当前最高电压"),
            key: "maxVol",
            unit: "V",
            color: 'rgba(252, 207, 0, 1)'
        },
        {
            label: t("当前最低电压"),
            key: "minVol",
            unit: "V",
            color: 'rgba(3, 255, 23, 1)'
        },
        {
            label: t("最大压差"),
            key: "volDiff",
            unit: "V",
        },
        {
            label: t("当前最高温度"),
            key: "maxTemp",
            unit: "℃",
        },
        {
            label: t("当前最低温度"),
            key: "minTemp",
            unit: "℃",
        },
        {
            label: t("最大温差"),
            key: "tempDiff",
            unit: "℃",
        },
    ];

    useEffect(() => {
        getOption();
    }, [token]);
    useEffect(() => {
        getClustersData();
    }, [id, value])
    const getClustersData = async () => {
        let { data } = await fetchCellNowData({ id: value[1],enableCellTemp:true });
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
    const getImg = (tem) => {
        if (global.theme === 'default') {
            if (tem == 1) {
                return normalLightRev
            } else {
                return normalLight
            }
        } else {
            if (tem == 1) {
                return normalCellRev
            } else {
                return normalCell
            }
        }
    }
    const getCellBg = tmp => {
        if (tmp < 15) return token.packDetailsLowCellBlockBg;
        if ((tmp >= 15 && tmp <= 35) || tmp == '-') return token.packDetailsMiddleCellBlockBg;
        if (tmp > 35) return token.packDetailsTopCellBlockBg;
    }
    return (
        <div className={styles.cellDetails}>
            <div className={styles.searchHead} style={{ color: token.titleColor }}>
                <span   >{t('数据项')}:</span>
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
                    className={styles.margRL}
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
                <Popover
                    icon={null}
                    placement="left"
                    color={token.packDetailsTipsBg}
                    content={() => (
                        <div style={{ width: 500, backgroundColor: token.packDetailsTipsBg }}  >
                            <div>
                                {intl.formatMessage({ id: "1.黄色字体表示：当前页面所有PACK中单体最高电压；绿色字体表示：当前页面所有PACK中单体最低电压" })}
                            </div>
                            <div>
                                {intl.formatMessage({ id: "2.电芯安全运行的温度区间业主如果无特殊要求,采日方案为15-35°C" })}
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-around'
                            }}>
                                <div className={styles.area}>
                                    <div
                                        style={{
                                            backgroundColor: token.packDetailsLowCellBlockBg
                                        }}
                                    ></div>
                                    {"<15℃"}
                                </div>
                                <div className={styles.area}>
                                    {"15℃≤"}
                                    <div
                                        style={{
                                            backgroundColor: token.packDetailsMiddleCellBlockBg
                                        }}
                                    ></div>
                                    {"≤35℃"}
                                </div>
                                <div className={styles.area}>
                                    <div
                                        style={{
                                            backgroundColor: token.packDetailsTopCellBlockBg
                                        }}
                                    ></div>
                                    {">35℃"}
                                </div>
                            </div>
                        </div>
                    )}
                >
                    <ExclamationCircleOutlined />
                </Popover>
            </div>
            <div className={styles.total}>
                {total?.map((item) => (
                    <div className={styles.item} style={{
                        backgroundColor: token.packDetailsBlockBg,
                        color: token.colorLittle
                    }}>
                        <span
                            style={{
                                color: item?.color
                            }}
                        >{calculateValues(data)?.[item?.key]} {item?.unit}</span>
                        <span className={styles.label} >{t(item?.label)}</span>
                    </div>
                ))}
            </div>
            <div className={styles.cellContent}>
                {data?.map(one => {
                    return (
                        <div className={styles.packSingle}>
                            <div className={styles.packTitle} style={{ color: token.colorLittle }}>Pack{one.packNo + 1}</div>
                            <div className={styles.packContent} style={{ backgroundColor: token.packDetailsBlockBg }}>
                                <div className={styles.packCell}>
                                    {one?.packData.map((it, index) => {
                                        return <div className={styles.cellSingel}
                                         style={{ 
                                            // backgroundImage: (`url(${(index + 1) % 2 === 0 ? getImg(1) : getImg(2)})`), backgroundSize: '100% 100%'
                                            backgroundColor: getCellBg(it.tmp) 
                                            }}>
                                            {/* {Object.keys(it).length == 2 ? <img src={cellTem} alt="" /> : null} */}
                                            {it.tmp && <div className={styles.cellTmp} style={{ color: token.colorLittle }}>{it.tmp}℃</div>}
                                            <span className={styles.cellVol}
                                                    style={{
                                                        color:
                                                            it?.vol == calculateValues(data)?.maxVol
                                                                ? "rgba(255, 160, 0, 1)"
                                                                : it?.vol == calculateValues(data)?.minVol
                                                                    ? "rgba(0, 218, 44, 1)"
                                                                    : token.colorLittle,

                                                    }}
                                                >{it.vol} V</span>
                                        </div>
                                    })}
                                </div>
                                <div className={styles.packFoot}>
                                    <div className={styles.single}>
                                        <div className={styles.circle} style={{ backgroundColor: token.colorPrimary, color: token.colorLittle }}></div>
                                        <div className={styles.footTitle} style={{ color: token.colorLittle }}>PACK {t('极柱温度')}</div>
                                        <div className={styles.singelAttribute} style={{ color: token.colorLittle }}>
                                            {t('负极')}：{one.extraPackData.positivePoles}℃
                                        </div>
                                        <div className={styles.singelAttribute} style={{ color: token.colorLittle }}>
                                            {t('正极')}：{one.extraPackData.negativePoles}℃
                                        </div>
                                    </div>
                                    <div className={styles.single}>
                                        <div className={styles.circle} style={{ backgroundColor: token.colorPrimary }}></div>
                                        <div className={styles.footTitle} style={{ color: token.colorLittle }}>PACK {t('熔断器温度')}</div>
                                        <div className={styles.singelAttribute} style={{ color: token.colorLittle }}>
                                            {t('左侧熔断器')}：{one.extraPackData.fuseLeft}℃
                                        </div>
                                        <div className={styles.singelAttribute} style={{ color: token.colorLittle }}>
                                            {t('右侧熔断器')}：{one.extraPackData.fuseRight}℃
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