import ReactECharts from 'echarts-for-react';
import { useState, useEffect } from 'react';
import styles from "./index.less";

const Assessment = () => {
    const [options, setOptions] = useState({});

    const getOptions = () => {
        setOptions({
            series: {
              type: 'sankey',
              layout: 'none',
              emphasis: {
                focus: 'adjacency'
              },
              label: {
                fontSize: 15
              },
              data: [
                {
                  name: '采日江苏VPP聚合平台(MWh)',
                  depth: 0,
                  itemStyle: {
                    color: '#5AABFF',
                    borderColor: '#5AABFF'
                  }
                },
                {
                  name: '海四达动力(10)',
                  depth: 1,
                  itemStyle: {
                    color: '#5AABFF',
                    borderColor: '#5AABFF'
                  }
                },
                {
                  name: '海四达新能源(10)',
                  depth: 1,
                  itemStyle: {
                    color: '#5AABFF',
                    borderColor: '#5AABFF'
                  }
                },
                {
                  name: '华乐不锈钢(100)',
                  depth: 1,
                  itemStyle: {
                    color: '#5AABFF',
                    borderColor: '#5AABFF'
                  }
                },
                {
                  name: '京浜光电(5)',
                  depth: 1,
                  itemStyle: {
                    color: '#5AABFF',
                    borderColor: '#5AABFF'
                  }
                }
              ],
              links: [
                {
                  source: '采日江苏VPP聚合平台(MWh)',
                  target: '海四达动力(10)',
                  value: 10,
                },
                {
                  source: '采日江苏VPP聚合平台(MWh)',
                  target: '海四达新能源(10)',
                  value: 10
                },
                {
                  source: '采日江苏VPP聚合平台(MWh)',
                  target: '华乐不锈钢(100)',
                  value: 100
                },
                {
                  source: '采日江苏VPP聚合平台(MWh)',
                  target: '京浜光电(5)',
                  value: 5
                }
              ]
            }
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

export default Assessment;