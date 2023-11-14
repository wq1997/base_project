import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";

const GpuChart = () => {
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const txt=17;
        setOptions({
            title: {
              text: txt+'%',
              x: 'center',
             y: 'center',
              textStyle: {
                fontWeight: 'normal',
                color: '#fff',
                fontSize: '16'
              }
            },
            color:'rgba(255,255,255,.3)',
         
            series: [{
              name: 'Line 1',
              type: 'pie',
              clockWise: true,
              radius: ['65%', '80%'],
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              },
              hoverAnimation: false,
              data: [{
                value: txt,
                name: '已使用',
                itemStyle: {
                  normal: {
                    color:'#ea4d4d',
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }, {
                name: '未使用',
                value: 100-txt
              }]
            }]
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{height: "100%"}} />;
};

export default GpuChart;