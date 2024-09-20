// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { CardModel } from "@/components";
import useIcon from "@/hooks/useIcon";
import { useSelector, useIntl } from "umi";
import { theme, Radio, Descriptions, Tooltip, Switch } from "antd";
import ReactECharts from "echarts-for-react";
import { getGridPointPower, getPlantEnergyFee } from '@/services/home'
import { getEnergyFeeByTime } from '@/services/report'
import { getGridPointList } from '@/services/policy'
import md5 from 'js-md5';
import dayjs from 'dayjs';
import Img from '../react/Meta2d'
function OverView(props) {
    const { token } = theme.useToken();
    const Icon = useIcon();
    const [options, setOptions] = useState({});
    const [grids, setGrids] = useState([]);
    const [currntGrid, setCurrntGrid] = useState();
    const [optionsPower, setOptionsPower] = useState({});
    const [time, setTime] = useState(dayjs(new Date()));
    const [isHovered, setIsHovered] = useState(false);
    const [data, setData] = useState([]);
    const [dateX, setDateX] = useState([]);
    const [dataY, setDataY] = useState({
        pvOutEnergy: [],
        energyInEnergy: [],
        energyOutEnergy: [],
        pvInEnergy: [],
        chargeInEnergy: []
    });
    const intl = useIntl();
    let currentPlant = JSON.parse(localStorage.getItem('current'));
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    useEffect(() => {
        getOptions();
        getPlantLabelData();
        getGrid();
    }, [token,])
    useEffect(() => {
        getOptions();
        getPowerOption();
    }, [token, currntGrid])
    const [electricityStatistics, setElectricityStatistics] = useState([
        {
            value: '',
            label: '储能累计充电量',
            key: 'energyInEnergy',
            unit: '',
            color: '#F3DF2E'
        },
        {
            value: '',
            label: '储能累计放电量',
            key: 'energyOutEnergy',
            unit: '',
            color: '#D53D3D'
        },
        {
            value: '',
            label: '光伏累计发电量',
            key: 'pvOutEnergy',
            unit: '',
            color: '#3072E1'
        },
        {
            value: '',
            label: '充电桩累计充电量',
            key: 'chargeInEnergy',
            unit: '',
            color: '#03B4B4'
        },
    ]);
    let detailsPartData = [
        {
            key: 'name',
            label: t('电站名称'),
            span: 2
        },
        {
            key: 'installDateVo',
            label: t('建站日期'),
        },
        {
            key: 'typeName',
            label: t('电站类型'),

        },
        {
            key: 'designPower',
            label: `${t('储能装机功率')}(kW)`,
        },
        {
            key: 'capacity',
            label: `${t('储能装机容量')}(kWh)`,
        },
        {
            key: 'pvCapacity',
            label: `${t('光伏装机容量')}(kWh)`,
        },
        {
            key: 'chargePileCapacity',
            label: `${t('充电桩装机容量')}(kWh)`,
        },
        {
            key: 'position',
            label: t('电站位置'),
            span: 2
        },
    ]
    const getOptions = async () => {
        let { data: energyData } = await getEnergyFeeByTime({
            plantId: localStorage.getItem('plantId'),
            time: time.format('YYYY-MM-DD'),
            type: 0,
        });
        let pvOutEnergy = [];
        let energyInEnergy = [];
        let energyOutEnergy = [];
        let pvInEnergy = [];
        let chargeInEnergy = [];
        let arrX = [];
        energyData?.data?.map((it) => {
            pvOutEnergy.push(it?.pvOutEnergy);
            energyInEnergy.push(it?.energyInEnergy);
            energyOutEnergy.push(it?.energyOutEnergy);
            pvInEnergy.push(it?.pvInEnergy);
            chargeInEnergy.push(it?.chargeInEnergy);
            arrX.push(dayjs(it?.date).format('YYYY-MM-DD'))
        })
        setData(data?.data);
        setDateX(arrX);
        setDataY({ pvOutEnergy, energyInEnergy, energyOutEnergy, pvInEnergy, chargeInEnergy })
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
            legend: {
                data: [
                    t('储能日充'),
                    t('储能日放'),
                    t('光伏日发电量'),
                    t('充电桩电量'),
                ],
                textStyle: {//图例文字的样式
                    color: token.titleColor,
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: arrX,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    },

                }
            ],
            series: [
                {
                    name: t('储能日充'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[0]

                        }
                    },
                    barWidth: '8%',
                    data: energyInEnergy
                },
                {
                    name: t('储能日放'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[2]

                        }
                    },
                    barWidth: '8%',
                    data: energyOutEnergy
                },
                {
                    name: t('光伏日发电量'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[3]

                        }
                    },
                    barWidth: '8%',
                    data: pvInEnergy

                },
                {
                    name: t('充电桩电量'),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: token.barColor[4]

                        }
                    },
                    barWidth: '8%',
                    data: chargeInEnergy
                },

            ]
        });

    };

    const getGrid = async () => {
        let { data: grid } = await getGridPointList({
            plantId: localStorage.getItem('plantId')
        })
        setGrids(grid?.data);
        setCurrntGrid(grid?.data?.[0]?.id)
    }
    const getPowerOption = async () => {
        let { data: powerData } = await getGridPointPower({
            gridPointId: currntGrid
        });
        let { pvPower=[], loadPower=[], gridPower=[], energyPower=[] } = powerData?.data;
        let pvData = dealData(pvPower);
        let loadData = dealData(loadPower);
        let gridData = dealData(gridPower);
        let energyData = dealData(energyPower);
        let dataX = [];
        energyPower.map(it => {
            dataX.push(dayjs(it.time).format('HH:mm'))
        })
        setOptionsPower({
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
            legend: {
                data: [
                    t('储能'),
                    t('电网'),
                    t('光伏'),
                    t('负载'),
                ],
                textStyle: {//图例文字的样式
                    color: token.titleColor,
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: dataX,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    },
                }
            ],
            series: [
                {
                    name: t('储能'),
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: token.barColor[0]
                        }
                    },
                    data: energyData
                },
                {
                    name: t('电网'),
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: token.barColor[2]
                        }
                    },
                    data: gridData

                },
                {
                    name: t('光伏'),
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: token.barColor[3]

                        }
                    },
                    data: pvData

                },
                {
                    name: t('负载'),
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: token.barColor[4]
                        }
                    },
                    data: loadData
                },
            ]
        });
    }
    const getPlantLabelData = async () => {
        let { data } = await getPlantEnergyFee({
            plantId: localStorage.getItem('plantId')
        });
        let arr = [];
        let arr1 = [];
        electricityStatistics?.map(it => {
            arr.push({
                ...it,
                value: data.data[it.key].split(' ')[0],
                unit: data.data[it.key].split(' ')[1],
            })
        })
        profit?.map(it => {
            arr1.push({
                ...it,
                value: data.data[it.key],
            })
        })
        setProfit([...arr1]);
        setElectricityStatistics([...arr])
    }
    const onChange = (e) => {
        setCurrntGrid(e.target.value);
    };
    const dealData = (data) => {
        let arr = [];
        data?.map(it => {
            arr.push([
                dayjs(it.time).format('HH:mm'),
                it.value,
            ])
        })
        return arr
    }
    const [profit, setProfit] = useState([
        {
            value: '',
            label: '今日收益',
            key: 'dailyEarn',
            unit: currentPlant.priceUnit,
            color: '#E9641C',
            icon: 'icon-qushi'
        },
        {
            value: '',
            label: '累计收益',
            key: 'totalEarning',
            unit: currentPlant.priceUnit,
            color: '#03B4B4',
            icon: 'icon-qian'
        },
    ])
    const [flag, setFlag] = useState(true);
    let signature = md5('appid=3179798697663791113&apikey=3179798697663791114&secretkey=7eec46100fbe5f6cac7ee3cc526b080d&method=POST&code=101')
    return (
        <>
            {
                flag ?
                    <div className={styles.container} style={{ color: token.titleColor }}>
                        <div className={styles.imgPart} style={{ backgroundColor: token.titleCardBgc }}>
                            {flag && <Img />}
                            <Switch className={styles.change} value={flag} onClick={() => { setFlag(!flag) }} checkedChildren="2.5D图" unCheckedChildren="一次图" defaultChecked />
                            <div className={styles.detailsButton}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >{t('电站信息')}</div>
                            {isHovered && <div className={styles.detailsPart}>
                                <Descriptions column={2} items={
                                    detailsPartData.map(it => {
                                        return {
                                            ...it,
                                            children: currentPlant[it.key]
                                        }
                                    })
                                } />

                            </div>}
                        </div>
                        <div className={styles.card}>
                            <div className={styles.dataLeft} style={{ backgroundColor: token.titleCardBgc }}>
                                {electricityStatistics.map(it => {
                                    return <>
                                        <div className={styles.wrap} >
                                            <div className={styles.value} >
                                                <span style={{ color: it.color }}>{it.value}</span>
                                                <span className={styles.unit}>{it.unit}</span>
                                            </div>
                                            <Tooltip title={t(it.label)} >
                                                <div className={styles.label}>
                                                    {t(it.label)}
                                                </div>
                                            </Tooltip>

                                        </div>
                                    </>
                                })}
                            </div>
                            <div className={styles.dataRight} style={{ backgroundColor: token.titleCardBgc }}>
                                {
                                    profit.map(it => {
                                        return <>
                                            <div className={styles.wrap} >
                                                <div className={styles.title}>
                                                    <Icon
                                                        type={it.icon}
                                                        style={{
                                                            fontSize: 20,
                                                            color: it.color
                                                        }}
                                                    />
                                                    {t(it.label)}
                                                </div>
                                                <div className={styles.value} >
                                                    <span style={{ color: it.color }}>{it.value}</span>
                                                    <span className={styles.unit}>{it.unit}</span>

                                                </div>
                                            </div>

                                        </>
                                    })

                                }

                            </div>
                            <div className={styles.echarLeft}>
                                <CardModel
                                    title={t('电量统计') + '(kWh)'}
                                    content={
                                        <div className={styles.echartPartCardwrap}>
                                            <ReactECharts option={options} style={{ height: '100%' }} />
                                        </div>
                                    }
                                />
                            </div>
                            <div className={styles.echarRight}>
                                <CardModel
                                    title={t('功率') + '(kW)'}
                                    filterPart={
                                        <Radio.Group onChange={onChange} value={currntGrid}>
                                            {
                                                grids.length && grids?.map(it => {
                                                    return (
                                                        <>
                                                            <Radio value={it?.id}>{it?.gridPointName}</Radio>
                                                        </>
                                                    )
                                                })
                                            }
                                        </Radio.Group>
                                    }
                                    content={
                                        <div className={styles.echartPartCardwrap}>
                                            <ReactECharts option={optionsPower} style={{ height: '100%' }} />
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    :
                    <div className={styles.iframe}>
                        <Switch className={styles.change} value={flag} onClick={() => { setFlag(!flag) }} checkedChildren="一次图" unCheckedChildren="2.5D图" defaultChecked />
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://admin.sovitjs.com/publish_2d/3252824411396374537?appid=3179798697663791113&apikey=3179798697663791114&method=POST&code=101&signature=${signature}`}
                        />
                    </div>
            }
        </>
    )
}

export default OverView