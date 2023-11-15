
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from "./map.less";
import { useDispatch, useSelector } from "umi";
import ReactECharts from "echarts-for-react";
import worldGeo from '../../../public/mapJson/maoJson'
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
    echarts.registerMap('world', worldGeo);
        setOptions({
            backgroundColor: "transparent",
            tooltip: {
                trigger: 'item',
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.5,
                formatter: function (params) {
                    if (typeof params.value[2] == 'undefined') {
                        return params.name + ' : ' + params.value;
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
                center: [115.7,39.4],
                itemStyle: {
                    normal: {
                        areaColor: 'rgb(12,54,83)',
                        borderColor:  'rgb(25,188,236)',
                    },
                    emphasis: {
                        areaColor: '#4499d0',
                    }
                },
                bottom: 0,
                aspectScale: 0.6,
                zoom: 10
    
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
        <div className={styles.container}>
            <ReactECharts option={options}></ReactECharts>
        </div>

    )
}

export default MapCom 