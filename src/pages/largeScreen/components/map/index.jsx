
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector,history } from "umi";
import ReactECharts from "echarts-for-react";
import china from '../../../../../public/mapJson/chinaB'
import * as echarts from "echarts";

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
                id:it.plantId
            }
        });
        return markerList;
    };
    
    const bind = useCallback((ref) => {
        if (!ref) return;
        ref.on('click', params => {
            if (params.componentType === "series" && params.componentSubType === "effectScatter") {
                const index = params.dataIndex;
                dispatch({ 
                    type: 'device/updateState',
                    payload:{
                        currentPlantId:params.data.id
                    } })
                localStorage.setItem('plantId',params.data.id)
                // dispatch({ 
                // type: 'device/getAllPlantDetails',
                // payload:{
                //     plantId:params.data.id
                // } }).then(()=>{
                    history.push('/index/home')
                // });
            }
        });
      }, []);
      
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
                center: [103, 39.4],
                selectedMode: 'single',
                layoutCenter: ['48%', '34%'],
                layoutSize: "70%",
                itemStyle: {
                    normal: {
                        areaColor:'none',
                        borderColor: '#00ffff',
                        borderWidth: 1.8,
                        // shadowColor: '#00ffff',
                    },
                },
                top: 5,
                aspectScale: 0.75,
                zoom: 1.7
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
                        color: "#FFF01F",
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
                        color: "#FFF01F",
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

export default MapCom;