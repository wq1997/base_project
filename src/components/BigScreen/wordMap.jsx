
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector,history } from "umi";
import ReactECharts from "echarts-for-react";
import world from '../../../public/mapJson/maoJson'
import * as echarts from "echarts";
// import 'default-passive-events'

function MapCom(props) {
    const chartInstance= React.createRef();
    const [options, setOptions] = useState({});
    const dispatch = useDispatch();
    const { allPlant } = useSelector(function (state) {
        return state.device
    });
    const convertData = function () {
        const markerList = allPlant?.map(it => {
            return {
                name: it.name,
                value: [it.longitude, it.latitude, 100],
                id:it.id
            }
        });
        return markerList;
    };
    
    const bind = useCallback((ref) => {
        if (!ref) return;
        ref.on('click', params => {
            if (params.componentType === "series" && params.componentSubType === "effectScatter") {
                const index = params.dataIndex;
                dispatch({ type: 'device/getAllPlantDetails',payload:{
                    plantId:params.data.id
                } });
                history.push('/index/home')
            }
        });
      }, []);
      
    const onChartReady = useCallback((ref) => {
        chartInstance.current = ref;
        bind(ref);
      }, [bind]);

    const getOptions = () => {
            echarts.registerMap('map', world);
        setOptions({
            grid: {
              top: 0,
            },
            backgroundColor: "transparent",
            tooltip: {
                trigger: 'item',
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.5,
                formatter: function (params) {
                    if (typeof params.value[2] == 'undefined') {
                        return params.name;
                    } else {
                        return params.name + ' : ' + params.value[0] + ',' + params.value[1];
                    }
                },
            },
            geo: {
                id: "bb",
                show: true,
                map: "map",
                roam: true,
                center: [0,35],
                selectedMode: 'single',
                layoutCenter: ['50%', '35%'],
                layoutSize: "70%",
                itemStyle: {
                    normal: {
                        areaColor:'rgba(0,17,41,1)',
                        borderColor: '#3294B0',
                        borderWidth: 1.5,
                        shadowColor: '#2DCFDA',
                        // shadowOffsetX: 0,
                        // shadowOffsetY: 2,
                        // shadowBlur: 5
                    },
                  
                },
                top: 5,
                aspectScale: 0.75,
                zoom: 1.2
            },
            series: [
                {
                    map: 'map',
                    silent: false,
                    type: 'map',
                    showLegendSymbol: true, // 存在legend时显示
                    center: [0,35],
                    layoutCenter: ['50%', '35%'],
                    layoutSize: "70%",
                    zoom:1.2,
                aspectScale: 0.75,

                    roam: true,
                    label: {
                        normal: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    top: 5,
                    itemStyle: {
                        normal: {
                            areaColor: 'rgba(0,255,255,.02)',
                            borderColor: '#00ffff',
                            borderWidth: 3,
                            shadowColor: '#00ffff',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 20,
                        },
                        emphasis: {
                            areaColor: 'transparent', //悬浮背景
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    zlevel: -1

                },
                {
                    type: "effectScatter",
                    coordinateSystem: "geo",
                    data:convertData(),//传入的地图点数据
                    symbolSize: 15,//涟漪大小
                    showEffectOn: "render",
                    //涟漪效应
                    rippleEffect: {
                        brushType: "stroke",
                        color: "#f13434",
                        period: 10,//周期
                        scale: 10//规模
                    },
                    hoverAnimation: true,//悬停动画
                    legendHoverLink: true,
                    // //地图点样式
                    // label: {
                    //     formatter: "{b}",
                    //     position: "top",
                    //     show: true,
                    //     fontSize: "15",
                    // },
                    itemStyle: {
                        color: "#f13434",
                        shadowBlur: 4,
                        shadowColor: "#333"
                    },
                    zlevel: 2
                },
                {
                    name: '电站',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(),
                    // symbol: 'pin', //气泡
                    // symbolSize: function (val) {
                    //     return val[2] / 5;
                    // },
                    // label: {
                    //     normal: {
                    //         formatter: '{b}',
                    //         position: 'right',
                    //         show: true
                    //     },
                    //     emphasis: {
                    //         show: true
                    //     }
                    // },
                    itemStyle: {
                        normal: {
                            areaColor: 'rgba(0,255,255,.02)',
                            borderColor: '#0073DA',
                            borderWidth: 1.5,
                      
                        },
                        emphasis: {
                            label: {
                                show: false
                            },
                            areaColor: '#00177B'
                        }
                    }
                }
            ]
        });
    }

    useEffect(() => {
        dispatch({ type: 'device/getAllPlants' });
    }, [])
    useEffect(() => {
        getOptions();

    }, [allPlant])



    return (
        <ReactECharts  
            option={options} 
            ref={chartInstance}
            onChartReady={onChartReady}
            style={{ height: '100%' }} 
        />
    )
}

export default MapCom 