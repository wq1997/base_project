import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { theme } from "antd";

const Emission = () => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
      const yData = [200,400,500,400,300,100,400]
        setOptions({
              tooltip: {
                trigger: 'item'
              },
              legend: {
                bottom: 0,
                textStyle: {
                    color: 'white'
                }
              },
              series: [
                {
                  type: 'pie',
                  radius: ['30%', '60%'],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                  },
                  label: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: 40,
                      fontWeight: 'bold'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: [
                    { value: 1048, name: '累计煤炭(吨)' },
                    { value: 735, name: 'CO2减排量(吨)' },
                    { value: 580, name: 'Tree(公顷)' },
                  ]
                }
              ]
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return <ReactECharts option={options} style={{height: '100%'}} />;
};

export default Emission