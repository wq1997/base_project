// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getBurPackDetailInitData2, getBurPackDetailInfo2 } from '@/services/deviceTotal'
import { getQueryString } from "@/utils/utils";
import { theme, Tooltip } from "antd";
import { useSelector, useIntl } from "umi";
import styles from './index.less'
import useIcon from "@/hooks/useIcon";
import {
    QuestionCircleOutlined
} from '@ant-design/icons';

function Com(props) {
    const { token } = theme.useToken();
    const { locale } = useSelector(state => state.global);
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
            // idxItem: getQueryString('type')=="14"?selectId:undefined,
        });
        setData(data.data)
    }
    const temObj = {
        fuseLeft: '左侧熔断器温度',
        fuseRight: '右侧熔断器温度',
        positivePoles: '正极极柱温度',
        negativePoles: '负极极柱温度',
    }
    const changePack = (val) => {
        setSelectId(val)
    }

    let maxVol = '', minVol = '', maxTemp = '', minTemp = '';
    let allVol = [], allTemp = [];
    data?.forEach(one => {
        allVol = allVol.concat(one?.vols || []);
        allTemp = allTemp.concat(one?.tmps || []);
    })
    const volList = allVol?.filter(item => !isNaN(Number(item))) || [];
    maxVol = Math.max(...volList);
    minVol = Math.min(...volList);

    const tempList = allTemp?.filter(item => !isNaN(Number(item))) || [];
    maxTemp = Math.max(...tempList);
    minTemp = Math.min(...tempList);

    return (
        <div className={styles.pack} style={{ width: '100%', height: 'auto', minHeight: '100%', padding: '10px 30px', background: token.bgcColorB_l }}>
            {/* <Select
                className={styles.margRL}
                style={{ width: 180 }}
                options={options}
                defaultValue={'0,0'}
                onChange={(val) => changePack(val)
                }
            >
            </Select> */}
            <div className={styles.packContent}>
                {data?.map((one, index) => {
                    return (<div className={styles.onePack}>
                        <div className={styles.title1} style={{ color: token.color26 }}>
                            <Icon type='icon-xiangyou' style={{ cursor: 'pointer', marginRight: '6px' }}></Icon>
                            <span style={{ marginRight: 5 }}>PACK{one.packNo + 1}</span>
                            {index === 0 &&
                                <Tooltip 
                                    title={`${t('红色表示：所有PACK中单体当前最高电压/温度；绿色表示：所有PACK中单体当前最低电压/温度')}`}
                                    overlayInnerStyle={{
                                        width: locale==="zh-CN"?350:620
                                    }}
                                >
                                        <QuestionCircleOutlined />
                                </Tooltip>
                            }
                        </div>
                        <div className={styles.vol}>
                            <div className={styles.title2}>{t("单体电压/V")}</div>
                            <div className={styles.oneContent}>
                                {one.vols?.map((it, index) => {
                                    return (
                                        <div className={styles.oneData} style={{ color: it === maxVol ? '#FF3333' : (it === minVol ? 'rgb(20 216 47)' : token.color28), fontSize: 17 }}>
                                            {t("电芯")}{index}:<span style={{ marginLeft: '10px' }}>{it}</span>
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
                                        <div className={styles.oneData} style={{ color: it === maxTemp ? '#FF3333' : (it === minTemp ? 'rgb(20 216 47)' : token.color28), fontSize: 17 }}>
                                            {t('采样点')}{index}:<span style={{ marginLeft: '10px' }}>{it}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className={styles.tem}>
                            <div className={styles.title2}>{t("PACK温度/℃")}</div>
                            <div className={styles.tempContent}>
                                {Object.keys(temObj).map((it, index) => {
                                    return (
                                        <div className={styles.oneData} style={{ color: token.color28, fontSize: 17 }}>
                                            {t(temObj[it])}:<span style={{ marginLeft: '10px' }}>{one?.extraPackData[it]}</span>
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