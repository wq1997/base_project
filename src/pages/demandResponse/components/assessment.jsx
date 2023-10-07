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
              data: [
                {
                  name: '总',
                  depth: 0,
                  itemStyle: {
                    color: '#5AABFF',
                    borderColor: '#5AABFF'
                  }
                },
                {
                  name: '嘉定园区',
                  depth: 1,
                  itemStyle: {
                    color: '#5AABFF',
                    borderColor: '#5AABFF'
                  }
                },
                {
                  name: '长宁园区',
                  depth: 1,
                  itemStyle: {
                    color: '#5AABFF',
                    borderColor: '#5AABFF'
                  }
                },
                {
                  name: '徐汇园区',
                  depth: 1,
                  itemStyle: {
                    color: '#5AABFF',
                    borderColor: '#5AABFF'
                  }
                },
                {
                  name: '黄埔园区',
                  depth: 1,
                  itemStyle: {
                    color: '#5AABFF',
                    borderColor: '#5AABFF'
                  }
                },
                {
                  name: '虹口园区',
                  depth: 1,
                  itemStyle: {
                    color: '#5AABFF',
                    borderColor: '#5AABFF'
                  }
                },
                {
                  name: '储能A1',
                  depth: 2,
                  itemStyle: {
                    color: '#1E8DFF',
                    borderColor: '#1E8DFF'
                  }
                },
                {
                  name: '光伏A1',
                  depth: 2,
                  itemStyle: {
                    color: '#1E8DFF',
                    borderColor: '#1E8DFF'
                  }
                },
                {
                  name: '充电桩A1',
                  depth: 2,
                  itemStyle: {
                    color: '#1E8DFF',
                    borderColor: '#1E8DFF'
                  }
                },
                {
                  name: '储能A2',
                  depth: 2,
                  itemStyle: {
                    color: '#1E8DFF',
                    borderColor: '#1E8DFF'
                  }
                },
                {
                  name: '光伏A2',
                  depth: 2,
                  itemStyle: {
                    color: '#1E8DFF',
                    borderColor: '#1E8DFF'
                  }
                },
                {
                  name: '充电桩A2',
                  depth: 2,
                  itemStyle: {
                    color: '#1E8DFF',
                    borderColor: '#1E8DFF'
                  }
                }
              ],
              links: [
                {
                  source: '总',
                  target: '嘉定园区',
                  value: 20,
                },
                {
                  source: '总',
                  target: '长宁园区',
                  value: 20
                },
                {
                  source: '总',
                  target: '徐汇园区',
                  value: 20
                },
                {
                  source: '总',
                  target: '黄埔园区',
                  value: 20
                },
                {
                  source: '总',
                  target: '虹口园区',
                  value: 20
                },
                {
                  source: '嘉定园区',
                  target: '储能A1',
                  value: 30
                },
                {
                  source: '嘉定园区',
                  target: '光伏A1',
                  value: 30
                },
                 {
                  source: '嘉定园区',
                  target: '充电桩A1',
                  value: 30
                },
                 {
                  source: '徐汇园区',
                  target: '储能A1',
                  value: 30
                },
                {
                  source: '徐汇园区',
                  target: '光伏A1',
                  value: 30
                },
                 {
                  source: '徐汇园区',
                  target: '充电桩A1',
                  value: 30
                },
                {
                    source: '虹口园区',
                    target: '储能A2',
                    value: 30
                  },
                  {
                    source: '虹口园区',
                    target: '光伏A2',
                    value: 30
                  },
                   {
                    source: '虹口园区',
                    target: '充电桩A2',
                    value: 30
                  },
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