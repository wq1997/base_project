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
              data: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
            },
            yAxis: {
              type: 'value',
              name: 'MWh'
            },
            series: [
              {
                name: '江苏海四达动力科技有限公司',
                type: 'bar',
                barWidth: 30,
                stack: 'total',
                emphasis: {
                  focus: 'series'
                },
                data: [2, 0, 0, 1, 2, 1, 1, 1]
              },
              {
                name: '江苏海四达新能源有限公司',
                type: 'bar',
                barWidth: 30,
                stack: 'total',
                emphasis: {
                  focus: 'series'
                },
                data: [0, 2, 2, 1, 2, 1, 1, 0]
              },
              {
                name: '连云港华乐不锈钢有限公司',
                type: 'bar',
                barWidth: 30,
                stack: 'total',
                emphasis: {
                  focus: 'series'
                },
                data: [0, 1, 1, 2, 1, 1, 0, 2]
              },
              {
                name: '苏州京浜光电科技有限公司',
                type: 'bar',
                barWidth: 30,
                stack: 'total',
                emphasis: {
                  focus: 'series'
                },
                data: [1, 0, 1, 2, 1, 1, 0, 2]
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