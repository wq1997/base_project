import ReactECharts from "echarts-for-react";
import { useState, useEffect, } from "react";
import * as echarts from "echarts";
import moment from "moment";
import {
    getRevenue as getRevenueServe,
} from "@/services";

const IncomeRanking = ({currentPlantId}) => {
    const [options, setOptions] = useState({});

    const getOptions = async () => {
        if(!currentPlantId) return;
        let data = [];
        const data1 = moment().subtract(4, 'days').format("YYYY-MM-DD");
        const data2 = moment().subtract(3, 'days').format("YYYY-MM-DD");
        const data3 = moment().subtract(2, 'days').format("YYYY-MM-DD");
        const data4 = moment().subtract(1, 'days').format("YYYY-MM-DD");
        const data5 = moment().format("YYYY-MM-DD");
        const xData = [data1, data2, data3, data4, data5]
        const res = await getRevenueServe({
            startDate: data1,
            endDate: data5,
            plantId: currentPlantId,
            dateType: 'day'
        })
        if (res?.data?.data?.data) {
            data = res?.data?.data?.data?.map(item => item.number);
        }

        setOptions({
            tooltip: {
                trigger: 'item',
            },
            grid:{
                top: 20,
                left: 30,
                right: 0,
                bottom: 30
            },
            xAxis: {
                data: xData,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    interval:0,
                    textStyle: {
                        color: '#fff',
                        fontSize:10,
                    },
                    margin: 20, //刻度标签与轴线之间的距离。
                },
            },
            yAxis: {
                splitLine: {
                    show: true,
                    lineStyle:{
                      color: '#00516F',
                      type: 'dashed'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize:10,
                    },
                }
            },
            series: [
                    // 数据圆柱的下边圆形
                    {
                        "name": "",
                        "type": "pictorialBar",
                        "symbolSize": [30, 15],
                        "symbolOffset": [0, 10],
                        "z": 12,
                        itemStyle:{
                            opacity:1,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0,  color: '#02FAFF'}, 
                                { offset: 0.7,  color: '#00B7FF'}
                            ], false),
                        },
                        "data": new Array(xData?.length).fill(1),
                        tooltip: {
                            show: false
                        }
                    },
                    //数据圆柱
                    {
                        name: '',
                        type: 'bar',
                        barWidth: 30,
                        barGap: '-100%',
                        itemStyle: {
                            opacity:.7,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0,  color: '#02FAFF'}, 
                                { offset: 0.7,  color: '#00B7FF'}
                            ], false)
                        },
                        data
                    },
                    // 数据上半部分的圆形
                    {
                        "name": "",
                        "type": "pictorialBar",
                        "symbolSize": [30, -15],
                        "symbolOffset": [0, 0],
                        "z": 12,
                        itemStyle:{
                            opacity:1,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0,  color: '#02FFEF'}, 
                                { offset: 0.7,  color: '#009EFF'}
                            ], false),
                        },
                        "symbolPosition": "end",
                        "data": data,
                        "label": {
                          "normal": {
                              "show": true,
                              "position": 'top',
                              "offset": [0,-5],
                              "formatter": "{c}",
                              "color": 'white'
                          }
                      },
                    },
                ]
        });
    }

    useEffect(() => {
        getOptions();
    }, [currentPlantId]);

    return (
        <ReactECharts 
            option={options} 
            style={{width: '100%', height: '100%'}} 
        />
    )
}

export default IncomeRanking;