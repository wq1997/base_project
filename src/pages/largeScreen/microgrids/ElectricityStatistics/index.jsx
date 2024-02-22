import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import { getGccWeeklyPowerStatisticsServe } from "@/services/bigScreen"

const ElectricityStatistics = () => {
    const [options, setOptions] = useState({});
    const getOptions = async () => {
        const res = await getGccWeeklyPowerStatisticsServe();
        let area = [];
        let data1 = [];
        let data2 = [];
        let data3 = [];
        let data4 = [];

        if(res?.data?.data){
            const data = res?.data?.data;
            area = data?.map(item => item?.date);
            data1 = data?.map(item => item?.energyCharge);
            data2 = data?.map(item => item?.energyDisCharge);
            data3 = data?.map(item => item?.pvGenerate);
            data4 = data?.map(item => item?.pileCharge);
        }
        const data = {
                area,
                legend: ['储能充电量', '储能放电量', '光伏发电量', '充电桩充电量'],
                data: [
                    data1,
                    data2,
                    data3,
                    data4
                ]
        }
        const colors = ['#03B4B4', '#7F87FF', '#F09B14', '#1DA3FF']
        const option = {
            color: colors,
            legend: {
                top: 10,
                left: 200,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    fontSize: 14,
                    color: 'white',
                    padding: [3, 0, 0, 0]
                },
                data: data.legend
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '13%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: 'white'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(150, 164, 244, 0.3)'
                    },
                    width: 5
                },
                axisTick: {
                    show: false,
                },
                data: data.area
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'white'
                },
                axisLine: {
                    lineStyle: {
                        color: '#96A4F4'
                    },
                    width: 5
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(150, 164, 244, 0.3)'
                    }
                },
            },
            series: [
        
            ]
        };
        for (var i = 0; i < data.legend.length; i++) {
            option.series.push({
                name: data.legend[i],
                type: 'bar',
                stack: '总量',
                barWidth: '45%',
                label: {
                    show: false,
                    position: 'insideRight'
                },
                data: data.data[i]
            })
        }
        setOptions(option);
    };

    useEffect(() => {
        getOptions();
    }, []);
    
    return <ReactECharts option={options} style={{height: '100%'}} />;
}

export default ElectricityStatistics;