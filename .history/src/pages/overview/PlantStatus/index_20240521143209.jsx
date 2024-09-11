import { useState } from "react";
import { Button, message, Popconfirm } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import Card from "../Card";

const Index = () => {
 
    const [options, setOptions] = useState({});

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
    })


    return (
        <Card
            title="电站状态"
            content={<ReactECharts  
                option={options} 
                style={{ width: '100%', height: '100%' }} 
            />}
        />
    );
};

export default Index;
