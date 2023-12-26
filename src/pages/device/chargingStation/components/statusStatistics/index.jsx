
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
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

function Com(props) {
    const [xxx, setXxx] = useState('')
    var  colorList=['#528AEB', '#F3CE55', '#03B4B4',];
    useEffect(() => {
        console.log('函数组件来咯')
    }, [])
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
      const data = [200,400,500,800,700,500,400]
        setOptions({
            title: {
                text: '80',
                subtext: '充电桩总数',
                x: 'center',
                y: 'center',
                textStyle: {
                    fontSize:'30px',
                    fontWeight:500,
                    color: '#333'
                },
                subtextStyle: {
                    color: '#666',
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
                    rich: {
                        title: {
                            fontSize: 16,
                            lineHeight: 15,
                            color: "rgb(0, 178, 246)"
                        },
                        value: {
                            fontSize: 18,
                            lineHeight: 20,
                            color: "#fff"
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
                                    color: '#d3d3d3'
                                },
                                align: 'right'
                            },
                            color: "#000",
                            emphasis: {
                                show: true
                            }
                        },
                        label:{
                            normal:{
                                formatter: function(params){
                                    var str = '';
                                    switch(params.name){
                                        case '空闲充电桩':str = '{a|}\n{nameStyle|空闲 }'+'{rate|'+params.value+'台}';break;
                                        case '占用充电桩':str = '{b|}\n{nameStyle|占用 }'+'{rate|'+params.value+'台}';break;
                                        case '故障充电桩':str = '{c|}\n{nameStyle|故障 }'+'{rate|'+params.value+'台}';break;
                                    }
                                    return str
                                },
                                padding: [0, -10],
                                rich: {
                                    nameStyle: {
                                        fontSize: 12,
                                        color: "#555",
                                        align: 'left'
                                    },
                                    rate: {
                                        fontSize: 12,
                                        color: "#555",
                                        align: 'left'
                                    }
                                }
                            }
                        },
                    data: [
                      { value: 50, name: '空闲充电桩' },
                      { value: 25, name: '占用充电桩' },
                      { value: 25, name: '故障充电桩' },
                    ]
                  }
            ]
          });
    };
    const cardData = [
        {
            icon: <MonitorOutlined />,
            name: "日充电收益",
            color: '#03B4B4',
            value: '998',
            unit: 'kWh'
        },
        {
            icon: <ThunderboltOutlined />,
            name: "日总充电量",
            color: '#FF7300',
            value: '1000',
            unit: 'kWh'
        },
        {
            icon: <DisconnectOutlined />,
            name: "月总充电量",
            color: '#6F2BF1',
            value: '9999',
            unit: 'kWh'
        },
        {
            icon: <SettingOutlined />,
            name: "月充电收益",
            color: '#FFC600',
            value: '99981',
            unit: 'kWh'
        },
        {
            icon: <CalendarOutlined />,
            name: "日总用电量",
            color: '#0095FF',
            value: '10',
            unit: 'kWh'
        },
        {
            icon: <DatabaseOutlined />,
            name: "月总用电量",
            color: '#03B4B4',
            value: '9999',
            unit: 'kWh'
        },

    ]
    useEffect(() => {
        getOptions();
    }, []);
    return (
        <div className={styles.content}>
            <CardModel
             title={
                "实时功率"
            }
                content={
                    <div className={styles.wrap}>
                        <div className={styles.echartsPie}>
                            <ReactECharts   option={options} style={{height: '100%',}} />
                        </div>
                        <div className={styles.cardData}>
                            {cardData.map(it => {
                                return (
                                    <div className={styles.cardItem} style={{ color: it.color }}>
                                        <div className={styles.cardItemTitle}>
                                            {it.icon}
                                            <span style={{ color: '#666666', fontWeight: 500, fontSize: '16px', marginLeft: '3px' }}>{it.name}</span>
                                        </div>
                                        <div className={styles.cardItemVaue} style={{ color: '#333333' }}>
                                            {it.value}
                                            <span style={{ fontSize: '16px', fontWeight: 400, marginLeft: '10px' }}>{it.unit}</span>
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