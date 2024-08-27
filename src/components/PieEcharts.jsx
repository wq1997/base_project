
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import ReactECharts from "echarts-for-react";
import { theme } from "antd";


function Com(props) {
    var  colorList=['#528AEB', '#F3CE55', '#03B4B4','#9686FF'];
    useEffect(() => {
    }, [])
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
        setOptions({
            title: {
                text: props.allData?.total,
                // subtext: props.allData?.subtext,
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
                // icon:"circle",
                top: props.top||"30%",
                left: '0%',
                width:40,
                padding: [0, 10],
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
                                show: false,
                                length: 5,
                                // length2: 12,
                                lineStyle: {
                                    color: token.smallTitleColor
                                },
                                align: 'left'
                            },
                            color: token.smallTitleColor,
                            // emphasis: {
                            //     show: true
                            // }
                        },
                        label:{
                            normal:{
                                padding: [10, -20],
                                rich: {
                                    nameStyle: {
                                        fontSize: 12,
                                        color: token.smallTitleColor,
                                        align: 'right'
                                    },
                                    rate: {
                                        fontSize: 12,
                                        color: token.smallTitleColor,
                                        align: 'right'
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