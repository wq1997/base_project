import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { theme as antdTheme } from "antd";
import { useSelector } from "umi";

const UserTypeStatistic = ({ dataSource }) => {
    const { token } = antdTheme.useToken();
    const [options, setOptions] = useState({});
    const { theme } = useSelector(state => state.global);

    const getOptions = () => {
        const nameList = dataSource?Object.keys(dataSource):[];
        const data = nameList.map(name => {
          return {
            value: dataSource[name],
            name
          }
        })
        setOptions({
            color: ['#384FE8', '#03B4B4', '#F3CE55'],
            tooltip: {
              trigger: 'item'
            },
            legend: {
              top: '5%',
              left: 'right',
              orient: 'vertical',
              textStyle: {
                color: token.color11
             }
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: ['50%', '90%'],
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
                data
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