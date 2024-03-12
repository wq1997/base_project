import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import {
    getAllDtuEfficiencyServe
} from "@/services/bigScreen";
import { useRequest } from "ahooks";

const Efficiency = ({
    deviceType,
    areaType
}) => {
    const [options, setOptions] = useState({});

    const [myData, setMyData] = useState();
    const { data, run } = useRequest(getAllDtuEfficiencyServe, {
        pollingInterval: 1000*60*60*2, //12小时轮询一次
        manual: true,
    });
    
    const getOptions = () => {
        const data = myData?.map(item => item?.efficiency*100);
        const xData = myData?.map(item => item?.name?.length>5?item?.name?.slice(0,5)+'...':item?.name);
        setOptions({
            grid: {
                left: '10',
                right: '30',
                bottom: '-10',
                top: '10',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function(params) {
                    return "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                    params[0].seriesName + ' : ' + Number(params[0].value).toLocaleString() + ' %<br/>'
                }
            },
            backgroundColor: 'rgb(20,28,52)',
            xAxis: {
                show: false,
                type: 'value'
            },
            yAxis: [
              {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    textStyle: {
                        color: '#ffffff',
                        fontSize: '12'
                    },
                    formatter: function(value) {
                        return `NO.${value}`
                    },
                },
                data: [1,2,3,4,5]
            },
            {
                type: 'category',
                inverse: true,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    },
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                data: xData
            }],
            series: [{
                    name: '充放电效率',
                    type: 'bar',
                    zlevel: 1,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 10,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#006888'
                            }, {
                                offset: 1,
                                color: '#00f58a'
                            }]),
                        },
                    },
                    barWidth: 10,
                    data
                },
                {
                    name: '',
                    type: 'bar',
                    barWidth: 10,
                    barGap: '-100%',
                    data: new Array(data?.length).fill(100),
                    itemStyle: {
                        normal: {
                            color: 'rgba(24,31,68,1)',
                            barBorderRadius: 10,
                        }
                    },
                },
            ]
        });
    };

    useEffect(()=>{
        run({
            db: areaType==="domestic",
            isMin: deviceType==="IntegratedMachine"
        });
    }, [deviceType, areaType]);

    useEffect(()=>{
        if(data?.data?.data){
            const result = data?.data?.data;
            const resultData = result?.splice(0,5);
            setMyData(resultData||[])
        }
    }, [data])

    useEffect(() => {
        getOptions();
    }, [myData]);

    return (
        <ReactECharts option={options} style={{height: '100%'}} />
    );
}

export default Efficiency;