
import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from "umi";
import ReactECharts from "echarts-for-react";
import china from '../../../public/mapJson/china'
import * as echarts from "echarts";

function MapCom(props) {
    const [options, setOptions] = useState({});
    const dispatch = useDispatch();
    const { allPlant } = useSelector(function (state) {
        return state.device
    });
    const convertData = function() {
        const markerList = allPlant?.map(it => {
            return {
                name:it.name,
                value: [it.longitude,it.latitude,100],
            }
        });
        return markerList;
    };


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
                        return params.name ;
                    } else {
                        return params.name + ' : ' + params.value[0]+','+params.value[1];
                    }
                },
            },
            geo: {
                id: "bb",
                show: true,
                map: "world",
                roam: true,
                center: [103,39.4],
                itemStyle: {
                    normal: {
                        areaColor: '#418FE4',
                        borderColor:  '#2560CF',
                    },
                    emphasis: {
                        areaColor: '#4499d0',
                    }
                },
                bottom: 0,
                aspectScale: 0.6,
                zoom: 1.9
    
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
                symbolSize: function(val) {
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
                        color: '#ffed00'
                    }
                }
            }]
        });
    }
  
    useEffect(() => {
        dispatch({ type: 'device/getAllPlants' });
    }, [])
    useEffect(()=>{
        getOptions();

    },[allPlant])


    
    return (
        <ReactECharts option={options} style={{height:'100%'}} />
    )
}

export default MapCom 