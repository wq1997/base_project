// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { theme, } from "antd";
import styles from './index.less'
import { getBmsOrPcsNowDataById, getPcsNowPowerById} from '@/services/deviceTotal'
import { useSelector, useIntl } from "umi";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
function Com({ id }) {
    const [data, setData] = useState('');
    const [dataArr, setDataArr] = useState([])
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
        setOptions({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['28日', '29日', '30日', '1日', '2日', '3日', '4日', '5日', '6日'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    },

                }
            ],
            series: [
                {
                    name: '实时功率',
                    type: 'line',
                    stack: '总量',
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: token.colorPrimary,
                            lineStyle: {
                                color: token.colorPrimary,
                                width: 1
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: token.sub_innerBgc
                                }, {
                                    offset: 1,
                                    color: token.colorPrimaryR
                                }]),
                            }
                        }
                    },
                    markPoint: {
                        itemStyle: {
                            normal: {
                                color: 'red'
                            }
                        }
                    },
                    data: [12, 32, 11, 14, 90, 30, 10, 82, 91, 34, 90, 33]
                },
            ]
        });
    };

    useEffect(() => {
        getOptions();
    }, [token]);
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
        getPowerData();
    }, [id])
    const getData = async () => {
        let { data } = await getBmsOrPcsNowDataById({ id })
        setData(data?.data);
    }

    const getPowerData = async () => {
        let { data } = await getPcsNowPowerById({ id })
        setDataArr(data?.data);
    }
    return (
        <div className={styles.detailsWrap}>
            <div className={styles.detailsTopData} style={{ backgroundColor: token.lightTreeBgc }}>
                {data?.pcs && Object.keys(data?.pcs)?.map((it, index) => {
                    return (
                        <div className={styles.item}>
                            <span className={styles.itemKeys}>{it}:</span>
                            <span className={styles.itemValues}>{data?.pcs[it]}</span>
                        </div>
                    )
                })}
            </div>
            <div className={styles.detailsBottomEcharts}>
                <CardModel
                    title={t('实时功率') + '(kW)'}
                    content={<ReactECharts option={options} style={{ height: '100%' }} />}
                />
            </div>
        </div>
    )
}

export default Com