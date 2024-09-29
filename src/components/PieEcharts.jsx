
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
        props?.allData?.data?.map(it=>{
            it.label={
                color:'fff',
                normal:{
                    padding: [100, 0],
                    rich: {
                        nameStyle: {
                            fontSize: 12,
                            align: 'right'
                        },
                        rate: {
                            fontSize: 12,
                            align: 'right'
                        }
                    }
                }
            }
        });
        setOptions({
            title: {
                text: props.allData?.total,
                // subtext: props.allData?.subtext,
                x: 'center',
                y: 'center',
                textStyle: {
                    fontSize:'18px',
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
                top: props.top||"40%",
                left: '70%',
                width:40,
                padding: [0, 10],
                itemGap: 10,
                textStyle: {
                    color:token.titleColor,
                    // rich: {
                    //     title: {
                    //         fontSize: 14,
                    //         lineHeight: 15,
                    //         color: token.titleColor
                    //     },
                    //     value: {
                    //         fontSize: 14,
                    //         lineHeight: 20,
                    //         color: token.titleColor
                    //     }
                    // }
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
                                // length: 5,
                                // length2: 12,
                                lineStyle: {
                                    color:token.titleColor
                                },
                                align: 'left'
                            },
                            // color:'#fff',
                            emphasis: {
                                show: false
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