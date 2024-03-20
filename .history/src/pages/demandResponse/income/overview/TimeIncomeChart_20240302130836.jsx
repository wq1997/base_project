import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";

const TimeIncomeChart = () => {
  const [options, setOptions] = useState({});

  const getOptions = () => {
    const xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const data = [46250, 2000, 4000, 5000, 4000, 4500, 7000, 9000, 5000, 7000, 5000, 6000]
    setOptions({
      color: ['#D97559'],
      tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
        },
    },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      grid: {
        bottom: 20
      },
      series: [
        {
          data,
          type: 'bar',
          barWidth: 40
        }
      ]
    })
  }

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <ReactECharts option={options} style={{ height: '100%' }} />
  )
}

export default TimeIncomeChart;