
import React, { useState, useEffect, useCallback } from 'react';
import ReactECharts from "echarts-for-react";
import { theme } from "antd";
import china from '../../../../public/mapJson/jiangsuJson'
import * as echarts from "echarts";

function MapCom(props) {
    const { token } = theme.useToken();
    const chartInstance= React.createRef();
    const [options, setOptions] = useState({});
   
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

            }
        });
      }, [props]);
      
    const onChartReady = useCallback((ref) => {
        chartInstance.current = ref;
        bind(ref);
      }, [bind]);

    const getOptions = () => {
        echarts.registerMap('map', china);
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
                selectedMode: 'single',
                layoutCenter: ['45%', '50%'],
                layoutSize: "60%",
                itemStyle: {
                    normal: {
                        areaColor:'transparent',
                        borderColor: token.colorPrimary,
                        borderWidth: 1.8
                    },
                },
                top: 5,
                aspectScale: 0.9,
                zoom: 1.5,
                label: {
                    show: true
                }
            },
            series: [
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
    }, [])

    return (
        <ReactECharts  
            option={options} 
            ref={chartInstance}
            onChartReady={onChartReady}
            style={{ width: '100%', height: '100%' }} 
        />
    )
}

export default MapCom;