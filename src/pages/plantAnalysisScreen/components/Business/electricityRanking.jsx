import ReactECharts from "echarts-for-react";
import { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { MyTab, MyButtonGroup } from "@/components";

const ElectricityRanking = ({ data }) => {
    const ref = useRef();
    const [options, setOptions] = useState({});
    const [currentOrder, setCurrentOrder] = useState('1');
    const [currentType, setCurrentType] = useState('1');

    const getOptions = () => {
        const xData = ['XX电站','XX电站','XX电站','XX电站']
        setOptions({
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid:{
                top: 55,
                left: 40,
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
                {
                    name: '充电量',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: '#53DEFF'
                          }, {
                              offset: 1,
                              color: '#00B1FF'
                          }]),
                          barBorderRadius: 12,
                      },
                    },
                    data: data?.[0]
                },
                {
                    name: '放电量',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: '#00E7C8'
                          }, {
                              offset: 1,
                              color: '#0038C6'
                          }]),
                          barBorderRadius: 12,
                      },
                    },
                    data: data?.[1]
                }
            ]
        });
    }

    useEffect(() => {
        getOptions();
    }, []);

    useEffect(()=>{
        const myChart = ref?.current?.getEchartsInstance();
        var app = {
            currentIndex: -1,
        };
        if(window.electricityInterval) window.clearInterval(window.electricityInterval);
        window.electricityInterval = setInterval(function () {
            var dataLen = options.series[0].data.length;
            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 1,
                dataIndex: app.currentIndex
            });
            app.currentIndex = (app.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 1,
                dataIndex: app.currentIndex,
            });
            // 显示 tooltip
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 1,
                dataIndex: app.currentIndex
            });
        }, 2000);
    }, [options])

    return (
        <div style={{width: '100%', height: '100%', position: 'relative'}}>
            <div style={{display: 'flex', justifyContent: 'end', position: 'absolute', left: 0, top: 5, zIndex: 100}}>
                <MyButtonGroup 
                    value={currentType}
                    options={[
                        {value: '1', label: '电量'},
                        {value: '2', label: '效率'},
                    ]}
                    onChange={value => setCurrentType(value)}
                />
            </div>
            <div style={{display: 'flex', justifyContent: 'end', position: 'absolute', right: 0, top: 5, zIndex: 100}}>
                <MyTab 
                    value={currentOrder}
                    options={[
                        {value: '1', label: '正序'},
                        {value: '2', label: '倒序'},
                    ]}
                    onChange={value => setCurrentOrder(value)}
                />
            </div>
            <ReactECharts 
                ref={ref}
                option={options} 
                style={{height: 'calc(100% - 5px)'}} 
            />
        </div>
    )
}

export default ElectricityRanking;