import ReactECharts from 'echarts-for-react';
import { useState, useEffect } from 'react';
import styles from "./index.less";

const Strategy = () => {
    const [options, setOptions] = useState({});

    const getOptions = () => {
        setOptions({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              right: 10,
              top: 10
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: 10,
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['08:00', '09:00', '10:00']
            },
            yAxis: {
              type: 'value',
              name: 'MWh'
            },
            series: [
              {
                name: '嘉定园区',
                type: 'bar',
                barWidth: 30,
                stack: 'total',
                emphasis: {
                  focus: 'series'
                },
                data: [10, 5, 5]
              },
              {
                name: '长宁园区',
                type: 'bar',
                barWidth: 30,
                stack: 'total',
                emphasis: {
                  focus: 'series'
                },
                data: [5, 10, 10]
              },
              {
                name: '徐汇园区',
                type: 'bar',
                barWidth: 30,
                stack: 'total',
                emphasis: {
                  focus: 'series'
                },
                data: [10, 5, 10]
              },
              {
                name: '黄埔园区',
                type: 'bar',
                barWidth: 30,
                stack: 'total',
                emphasis: {
                  focus: 'series'
                },
                data: [5, 10, 5]
              },
              {
                name: '虹口园区',
                type: 'bar',
                barWidth: 30,
                stack: 'total',
                emphasis: {
                  focus: 'series'
                },
                data: [10, 5, 10]
              }
            ]
          })
    }

    useEffect(()=>{
        getOptions();
    }, [])

    return (
        <div className={styles.echarts}>
             <ReactECharts option={options} />
        </div>
    )
}

export default Strategy;