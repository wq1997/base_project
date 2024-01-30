// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, DatePicker, Button } from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { CardModel } from "@/components";
import dayjs from 'dayjs';
import { useSelector, useIntl } from "umi";
const { Option } = Select;
function Com(props) {
    const [xxx, setXxx] = useState('');
    const { token } = theme.useToken();
    const [option, setOption] = useState([]);
    const [optionEchart, setOptionEchart] = useState({})
    const activitesRef = useRef([]);
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    function onChange(date, dateString) {
        console.log(date, dateString);
    }
    const getOptions = () => {
        setOptionEchart({
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
    return (
        <div className={styles.monitoringCurves}>
            <div className={styles.searchHead}>
                <span >数据类型:</span>
                <Select
                    className={styles.margRL}
                    style={{ width: 240 }}
                    // onChange={changeCluster}
                    key={activitesRef.current[0]?.value}
                    defaultValue={activitesRef.current[0]?.value}
                >
                    {activitesRef.current && activitesRef.current.map(item => {
                        return (<Option key={item.value} value={item.value}>{item.label}</Option>);
                    })
                    }
                </Select>
                数据项:
                <Select
                    className={styles.margRL}
                    style={{ width: 240 }}
                    // onChange={changeCluster}
                    key={activitesRef.current[0]?.value}
                    defaultValue={activitesRef.current[0]?.value}
                >
                    {activitesRef.current && activitesRef.current.map(item => {
                        return (<Option key={item.value} value={item.value}>{item.label}</Option>);
                    })
                    }
                </Select>
                <DatePicker onChange={onChange} />
                <Button type="primary" className={styles.firstButton}>
                    {t('查询')}
                </Button>
                <Button type="primary" style={{ backgroundColor: token.defaultBg }} >
                    {t('导出')}excel
                </Button>
            </div>
            <div className={styles.echartPart}>
                <CardModel
                    title={t('监测曲线')}
                    content={
                        <div className={styles.echartPartCardwrap}>
                            <ReactECharts option={optionEchart} style={{ height: '100%' }} />
                        </div>
                    }
                />
            </div>
        </div>
    )
}

export default Com