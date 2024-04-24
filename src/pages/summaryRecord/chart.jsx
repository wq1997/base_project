import EChartsReact from "echarts-for-react";
import { useEffect, useState } from "react";
import * as echarts from "echarts";

const Chart = ({title, dataSource}) => {
    const [option, setOption] = useState({});

    const getOption = () => {
        setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '2%',
                right: '4%',
                bottom: '10',
                top:'50',
                containLabel: true
            },
            legend: {
                data: ['1', '2', '3'],
                right: 10,
                top:12,
                itemWidth: 12,
                itemHeight: 10,
            },
            xAxis: {
                type: 'category',
                data: ['2012','2013','2014','2015','2016','2017','2018','2019'],
                axisLabel: {
                  textStyle: {
                    fontFamily: 'Microsoft YaHei'
                  }
                },
              },
              yAxis: {
                type: 'value',
                axisLine: {
                  show: false,
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: 'rgba(255,255,255,0.8)'
                  }
                },
                axisLabel: {}
              },
              series: [{
                name: '1',
                type: 'bar',
                barWidth: '15%',
                data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
              },
              {
                name: '2',
                type: 'bar',
                barWidth: '15%',
                data: [400, 500, 500, 500, 500, 400,400, 500, 500]
              },
              {
                name: '3',
                type: 'bar',
                barWidth: '15%',
                data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
              }]
        })
    }

    useEffect(() => {
        getOption()
    }, [dataSource]);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <p style={{textAlign: 'center', fontWeight: 800, fontSize: 25}}>{title}</p>
            <EChartsReact 
                option={option}
                style={{width: '100%', height: '100%'}}
            />
        </div>
    )
}

export default Chart;