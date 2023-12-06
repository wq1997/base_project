import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";

const Carbon = () => {
    const [options, setOptions] = useState({});
    const getOptions = () => {
        const xData = ['12/06',"12/07","12/08","12/09","12/10", '12/11', '12/12'];
        const data = [200,100,200,200,100,300,500];
        const backData = [500,500,500,500,500, 500, 500];
        setOptions({
          tooltip: {
              trigger: 'item',
          },
          grid:{
              top: 35,
              left: 50,
              right: 0,
              bottom: 35
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
              name: '单位:吨',
              nameTextStyle: {
                color: "white",
                padding: [10,0,0,0]
              },
              splitLine: {
                  show: true,
                  lineStyle:{
                    color: '#18486F',
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
                  // 数据圆柱的下边圆形
                  {
                      "name": "",
                      "type": "pictorialBar",
                      "symbolSize": [35, 15],
                      "symbolOffset": [0, 10],
                      "z": 12,
                      itemStyle:{
                          opacity:1,
                          color: '#009EC3'
                      },
                      "data": new Array(xData?.length).fill(1)
                  },
                  //数据圆柱
                  {
                      name: '',
                      type: 'bar',
                      barWidth: 35,
                      barGap: '-100%',
                      itemStyle: {
                          opacity:.7,
                          color: '#009EC3'
                      },
                      data
                  },
                  // 数据上半部分的圆形
                  {
                      "name": "",
                      "type": "pictorialBar",
                      "symbolSize": [35, 15],
                      "symbolOffset": [0, -10],
                      "z": 12,
                      itemStyle:{
                          opacity:1,
                          color: '#00E9E1',
                      },
                      "symbolPosition": "end",
                      "data": data,
                      "label": {
                        "normal": {
                            "show": true,
                            "position": 'top',
                            "formatter": "{c}",
                            "color": 'white'
                        }
                    },
                  },
                  // 数据圆柱体背景的圆柱体
                  {
                      name: '',
                      type: 'bar',
                      barWidth: 35,
                      barGap: '-100%',
                      z:0,
                      itemStyle: {
                          color: '#004562',
                          opacity:.7,
                      },
                      data: backData
                  },
                  // 数据圆柱体背景的圆柱体上面的圆形
                  {
                    "name": "",
                    "type": "pictorialBar",
                    "symbolSize": [35, 15],
                    "symbolOffset": [0, -10],
                    "z": 12,
                    "symbolPosition": "end",
                    itemStyle:{
                        color:'#009CDD',
                        opacity:1,
                    },
                    "data": backData
                  },
              ]
      });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return (
      <ReactECharts option={options} style={{height: '100%'}} />
    );
};

export default Carbon;