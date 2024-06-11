
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector,history } from "umi";
import ReactECharts from "echarts-for-react";
import china from '../../../public/mapJson/chinaB'
import * as echarts from "echarts";
import axiosInstance from "@/services/request";
import { getPlantSysDb } from "@/services/bigScreen";
import { message } from 'antd';

function MapCom(props) {
    const chartInstance= React.createRef();
    const [options, setOptions] = useState({});
    const dispatch = useDispatch();
   
    const convertData = function () {
        const markerList = props.allPlant?.map(it => {
            return {
                name: it.name,
                value: [it.longitude, it.latitude, 100],
                id:it.plantId,
                deviceTypeId: it.deviceTypeId
            }
        });
        return markerList;
    };
    const bind = useCallback((ref) => {
        if (!ref) return;
        ref.on('click', async params => {
            const deviceTypeId = params?.data?.deviceTypeId;
            if (params.componentType === "series" && params.componentSubType === "effectScatter") {
                const res = await getPlantSysDb({
                    db: props?.areaType==="domestic",
                    isMin: props?.deviceType==="IntegratedMachine",
                    plantId: params?.data?.id
                })
                let url="";
                if(res?.data?.data?.url){
                    const result = res?.data?.data;
                    const tokenResult = await axiosInstance.post(result?.url, result);
                    if (props.deviceType==='LargeEnergy') {
                        if(deviceTypeId===2){
                            url=`https://ess.sermatec-cloud.com/system/status`
                        }else if(deviceTypeId===6){
                            url=`https://www.sermatec-cloud.com/containerIndex/equipment/overview`
                        }else{
                            url=`https://www.sermatec-cloud.com/system/overview`;
                        }
                    }else{
                        url=`https://ess.sermatec-cloud.com/authorization`;
                    }

                    if(url){
                        window.open(`${url}?token=${tokenResult?.data?.data?.token}`, "_blank");
                    }else{
                        message.error("跳转失败！");
                    }
                }else{
                    message.error("跳转失败！");
                }
            }
        });
      }, [props]);
      
    const onChartReady = useCallback((ref) => {
        chartInstance.current = ref;
        bind(ref);
      }, [bind]);

    const getOptions = () => {
            echarts.registerMap('map', china);
            // echarts.registerMap('mapOutLine', chinaOutLine);
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
                center: [103, 39.4],
                selectedMode: 'single',
                layoutCenter: ['50%', '35%'],
                layoutSize: "70%",
                itemStyle: {
                    normal: {
                        areaColor:'rgba(0,17,41,1)',
                        borderColor: '#00ffff',
                        borderWidth: 1.8,
                        shadowColor: '#00ffff',
                        // shadowOffsetX: 0,
                        // shadowOffsetY: 0,
                        // shadowBlur: 20
                    },
                },
                top: 5,
                aspectScale: 0.75,
                zoom: 1.2
            },
            series: [
                // {
                //     map: 'map',
                //     silent: false,
                //     type: 'map',
                //     showLegendSymbol: true, // 存在legend时显示
                //     center: [103, 39.4],
                //     layoutCenter: ['50%', '35%'],
                //     layoutSize: "70%",
                //     zoom:1.2,
                //     aspectScale: 0.75,
                //     roam: true,
                //     label: {
                //         normal: {
                //             show: false,
                //             textStyle: {
                //                 color: '#fff'
                //             }
                //         },
                //         emphasis: {
                //             textStyle: {
                //                 color: '#fff'
                //             }
                //         }
                //     },
                //     top: 5,
                //     itemStyle: {
                //         normal: {
                //             areaColor: 'rgba(0,255,255,.02)',
                //             borderColor: '#00ffff',
                //             borderWidth: 5,
                //             shadowColor: '#00ffff',
                //             shadowOffsetX: 0,
                //             shadowOffsetY: 0,
                //             shadowBlur: 20,
                //         },
                //         emphasis: {
                //             areaColor: 'transparent', //悬浮背景
                //             textStyle: {
                //                 color: '#fff'
                //             }
                //         }
                //     },
                //     zlevel: -1
                // },
                {
                    type: "effectScatter",
                    coordinateSystem: "geo",
                    data:convertData(),//传入的地图点数据
                    symbolSize: 15,//涟漪大小
                    showEffectOn: "render",
                    //涟漪效应
                    rippleEffect: {
                        brushType: "stroke",
                        color: "#00CD97",
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
                        color: "#00CD97",
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
        getOptions();
    }, [props.allPlant])



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