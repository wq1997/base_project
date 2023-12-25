import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import {
    getDayCarbonServe
} from "@/services/bigScreen";
import moment from "moment";

const Carbon = ({
    deviceType,
    areaType
}) => {
    const [options, setOptions] = useState({});

    const [myData, setMyData] = useState();
    const { data, run } = useRequest(getDayCarbonServe, {
        pollingInterval: 1000*60*60*12, //12小时轮询一次
        manual: true,
    });

    const getAWeekDate = () => {
        const date1 = moment().format("YYYY-MM-DD");
        const date2 = moment().subtract(1, 'day').format("YYYY-MM-DD");
        const date3 = moment().subtract(2, 'day').format("YYYY-MM-DD");
        const date4 = moment().subtract(3, 'day').format("YYYY-MM-DD");
        const date5 = moment().subtract(4, 'day').format("YYYY-MM-DD");
        const date6 = moment().subtract(5, 'day').format("YYYY-MM-DD");
        const date7 = moment().subtract(6, 'day').format("YYYY-MM-DD");
        return [date7,date6,date5,date4,date3,date2,date1];
    }

    const getOptions = () => {
        let xData = getAWeekDate();
        let data = new Array(7).fill(0);
        let backData = new Array(7).fill(2);
        if(myData&&myData?.length>0){
            xData = myData?.map(item => item.date);
            data = myData?.map(item => item.totalEnergy||0);
            backData = new Array(7).fill(Math.max(...data)+2);
        }
        
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

    useEffect(()=>{
        run({
            db: areaType==="domestic",
            isMin: deviceType==="IntegratedMachine"
        });
    }, [deviceType, areaType]);

    useEffect(()=>{
        if(data?.data?.data){
            const result = data?.data?.data;
            const resultData = result?.splice(0,7)?.reverse();
            setMyData(resultData);
        }
    }, [data])

    useEffect(() => {
        getOptions();
    }, [myData]);

    return (
      <ReactECharts option={options} style={{height: '100%'}} />
    );
};

export default Carbon;