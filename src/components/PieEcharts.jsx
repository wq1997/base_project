
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import ReactECharts from "echarts-for-react";
import { theme } from "antd";


function Com(props) {
    const [xxx, setXxx] = useState('')
    var  colorList=['#528AEB', '#F3CE55', '#03B4B4',];
    useEffect(() => {
    }, [])
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
        setOptions({
            title: {
                text: props.allData?.total,
                subtext: props.allData?.subtext,
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
                itemGap: 10,
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
                    data:props.allData?.data
                  }
            ]
          });
    };

    useEffect(() => {
        getOptions();
    }, [token,props]);
    return (
        <ReactECharts   option={options} style={{height: '100%',}} />
    )
}

export default Com