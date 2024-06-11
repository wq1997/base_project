import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { theme as antdTheme } from "antd";
import { useSelector } from "umi";
import * as echarts from "echarts";

const colorList = [['#79FBFF', '#3595FF'], ['#FFC35F', '#FF3725'], ['#FF82A1', '#C416F8']];

const UserTypeStatistic = ({ dataSource }) => {
    const { token } = antdTheme.useToken();
    const [options, setOptions] = useState({});
    const { theme } = useSelector(state => state.global);

    const getOptions = () => {
        const nameList = dataSource?Object.keys(dataSource):[];

        setOptions({
            color: ['#384FE8', '#03B4B4', '#F3CE55'],
            tooltip: {
              trigger: 'item'
            },
            legend: {
              bottom: '5%',
              left: 'right',
              orient: 'vertical',
              textStyle: {
                color: token.color11
             }
            },
            series: [
              {
                type: 'pie',
                radius: ['75%', '90%'],
                avoidLabelOverlap: false,
                padAngle: nameList?.length>1?5:0,
                itemStyle: {
                  borderRadius: 10,
                  borderWidth: 0
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
                data: nameList.map((name, index) => {
                  return {
                    value: dataSource[name],
                    name,
                    itemStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(
                              1, 0, 0, 0, [
                                  {
                                      offset: 0,
                                      color: colorList?.[index]?.[0]||token.colorPrimary
                                  },
                                  {
                                      offset: 1,
                                      color: colorList?.[index]?.[1]||token.colorPrimary
                                  }
                              ]
                          )
                      }
                    } 
                  }
                })
              }
            ]
          })    
    }

    useEffect(() => {
        getOptions();
    }, [theme, dataSource])

    return (
        <ReactECharts  
            option={options} 
            style={{ width: '100%', height: '100%' }} 
        />
    )
}

export default UserTypeStatistic;