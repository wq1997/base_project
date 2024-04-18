
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import { theme } from "antd";
import {
    ToolOutlined,
    CalendarOutlined,
    DatabaseOutlined,
    MonitorOutlined,
    ThunderboltOutlined,
    DisconnectOutlined,
    SettingOutlined,

} from '@ant-design/icons';
import { getChargeStationEarning, } from '@/services/deviceTotal'

function Com(props) {
    var  colorList=['#528AEB', '#F3CE55', '#03B4B4',];
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const intl = useIntl();
    const t = (id) => {
      const msg = intl.formatMessage(
        {
          id,
        },
      );
      return msg
    }
    
    const getOptions = () => {
        setOptions({
            title: {
                text: '8',
                subtext: t('充电桩总数'),
                x: 'center',
                y: 'center',
                textStyle: {
                    fontSize:'30px',
                    fontWeight:500,
                    color: token.titleColor
                },
                subtextStyle: {
                    color:token.titleColor,
                    fontSize: '12px',
                },
            },
            legend: {
                show: true,
                icon:"circle",
                top: "70%",
                left: '75%',
                width:50,
                padding: [0, 5],
                itemGap: 25,
                textStyle: {
                    color:token.smallTitleColor,
                    rich: {
                        title: {
                            fontSize: 16,
                            lineHeight: 15,
                            color: token.smallTitleColor
                        },
                        value: {
                            fontSize: 18,
                            lineHeight: 20,
                            color: token.smallTitleColor
                        }
                    }
                },
            },
            series: [
                {
                    
                        radius: ['40%', '70%'],
                        center: ['50%', '50%'],
                        type: 'pie',
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length: 5,
                                length2: 12,
                                lineStyle: {
                                    color: token.smallTitleColor
                                },
                                align: 'right'
                            },
                            color: token.smallTitleColor,
                            emphasis: {
                                show: true
                            }
                        },
                        label:{
                            normal:{
                                formatter: function(params){
                                    var str = '';
                                    switch(params.name){
                                        case t('空闲充电桩'):str = `{a|}\n{nameStyle|${t('空闲')} }`+'{rate|'+params.value+`${t('台')}}`;break;
                                        case t('占用充电桩'):str = `{b|}\n{nameStyle|${t('占用')} }`+'{rate|'+params.value+`${t('台')}}`;break;
                                        case t('故障充电桩'):str = `{c|}\n{nameStyle|${t('故障')} }`+'{rate|'+params.value+`${t('台')}}`;break;
                                    }
                                    return str
                                },
                                padding: [0, -10],
                                rich: {
                                    nameStyle: {
                                        fontSize: 12,
                                        color: token.smallTitleColor,
                                        align: 'left'
                                    },
                                    rate: {
                                        fontSize: 12,
                                        color: token.smallTitleColor,
                                        align: 'left'
                                    }
                                }
                            }
                        },
                    data: [
                      { value: 3, name: t('空闲充电桩') },
                      { value: 4, name: t('占用充电桩') },
                      { value: 1, name: t('故障充电桩') },
                    ]
                  }
            ]
          });
    };
    const [cardData,setcardData] = useState([
        {
            icon: <MonitorOutlined />,
            name: "日充电收益",
            key:'dayEarning',
            color: '#03B4B4',
            value: '',
            unit: '元'
        },
        {
            icon: <ThunderboltOutlined />,
            name: "日总充电量",
            key:'dayCharge',
            value: '',
            unit: 'kWh'
        },
        {
            icon: <CalendarOutlined />,
            name: "日总用电量",
            key:'dayElectricity',
            color: '#0095FF',
            value: '',
            unit: 'kWh'
        },
        {
            icon: <SettingOutlined />,
            name: "月充电收益",
            key:'monthEarning',

            color: '#FFC600',
            value: '',
            unit: '元'
        },
        {
            icon: <DisconnectOutlined />,
            name: "月总充电量",
            key:'monthCharge',

            color: '#6F2BF1',
            value: '',
            unit: 'kWh'
        },
        
        
        {
            icon: <DatabaseOutlined />,
            name: "月总用电量",
            key:'monthElectricity',

            color: '#03B4B4',
            value: '',
            unit: 'kWh'
        },

    ]);
    useEffect(() => {
        getOptions();
        getData();
    }, [token]);
    const getData=async()=>{
        let {data}=await getChargeStationEarning({
            plantId:localStorage.getItem('plantId'),
        });
        cardData.map(it=>{
            it.value=data.data[it.key];
        });
        setcardData([...cardData])
    }
    return (
        <div className={styles.content}>
            <CardModel
             title={
                t("充电桩状态统计")
            }
                content={
                    <div className={styles.wrap}>
                        <div className={styles.echartsPie}>
                            <ReactECharts   option={options} style={{height: '100%',}} />
                        </div>
                        <div className={styles.cardData}>
                            {cardData.map(it => {
                                return (
                                    <div className={styles.cardItem} style={{ color: it.color,backgroundColor:token.cardBgc, boxShadow:token.cardShadow }}>
                                        <div className={styles.cardItemTitle}>
                                            {it.icon}
                                            <span style={{color: token.smallTitleColor, fontWeight: 500, fontSize: '16px', marginLeft: '3px' }}>{t(it.name)}</span>
                                        </div>
                                        <div className={styles.cardItemVaue} style={{color:token.titleColor}}>
                                            {it.value}
                                            <span style={{color: token.smallTitleColor, fontSize: '16px', fontWeight: 400, marginLeft: '10px' }}>{it.unit}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            />
        </div>
    )
}

export default Com