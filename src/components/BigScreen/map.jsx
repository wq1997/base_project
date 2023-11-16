
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector,history } from "umi";
import ReactECharts from "echarts-for-react";
import china from '../../../public/mapJson/chinaB'
import * as echarts from "echarts";
import 'default-passive-events'

function MapCom(props) {
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
            }
        });
        return markerList;
    };
    const chartInstance= React.createRef();
    let onEvents = {
        click:params => {
           console.log(params); // params 包含点击的节点属性，比如name，data等数据，可根据获取到的数据进行后续操作
           if (params.componentType === "series" && params.componentSubType === "scatter") {
            const index = params.dataIndex;
            // 取消所有散点高亮
            ref.current.getEchartsInstance().dispatchAction({
                type: "downplay",
                seriesIndex: 0 //第几条series
            });
            // 显示指定data 的tooltip
            ref.current.getEchartsInstance().dispatchAction({
                type: "showTip",
                seriesIndex: 0, //第几条series
                dataIndex: index //第几个tooltip
            });
            // 高亮指定的散点
            ref.current.getEchartsInstance().dispatchAction({
                type: "highlight",
                seriesIndex: 0, //第几条series
                dataIndex: index //第几个tooltip
            });
        }

        }
    }
    const bind = useCallback((ref) => {
        if (!ref) return;
        ref.on('click', params => {
            if (params.componentType === "series" && params.componentSubType === "scatter") {
                const index = params.dataIndex;
                // 取消所有散点高亮
                ref.dispatchAction({
                    type: "downplay",
                    seriesIndex: 2 //第几条series
                });
                history.push('/index/home')
                // // 显示指定data 的tooltip
                // ref.current.getEchartsInstance().dispatchAction({
                //     type: "showTip",
                //     seriesIndex: 0, //第几条series
                //     dataIndex: index //第几个tooltip
                // });
                // // 高亮指定的散点
                // ref.current.getEchartsInstance().dispatchAction({
                //     type: "highlight",
                //     seriesIndex: 0, //第几条series
                //     dataIndex: index //第几个tooltip
                // });
            }
          console.log(params,"0000000");
        });
      }, []);
    const onChartReady = useCallback((ref) => {
        chartInstance.current = ref;
        bind(ref);
      }, [bind]);

    const getOptions = () => {
       echarts.registerMap('world', china);
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
                map: "world",
                roam: true,
                center: [103, 39.4],
                selectedMode: 'single',
                layoutCenter: ['50%', '50%'],
                layoutSize: "85%",
                itemStyle: {
                    normal: {
                        areaColor: '#00177B',
                        borderColor: '#0073DA',
                        borderWidth: 1,
                        shadowColor: 'rgba(3,221,255,0.5)',
                        // shadowBlur: 30
                    },
                    emphasis: {
                        areaColor: '#4499d0',
                    }
                },
                bottom: 0,
                aspectScale: 0.75,
                zoom: 1.3
            },
            series: [{
                type: 'map',
                map: 'world',
                geoIndex: 0,
                roam: true,
                // data: data
            }, {
                name: '电站',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(),
                symbol: 'pin', //气泡
                symbolSize: function (val) {
                    return val[2] / 5;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#00177B',
                        borderColor: '#0073DA',
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: false
                        },
                        areaColor: '#00177B'
                    }
                }
            }]
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