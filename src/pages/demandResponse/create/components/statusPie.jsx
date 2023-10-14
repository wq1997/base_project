
import ReactECharts from 'echarts-for-react';
import { useState, useEffect } from 'react';
import { addColorAlpha } from "@/utils/utils";
import { theme } from "antd";

const StatusPie = () => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const getOptions = () => {
        setOptions({
            color: [addColorAlpha('#5C7BD9', 0.8),'#91CC75', '#FAC858', token.colorPrimary],
            tooltip: {
              trigger: 'item'
            },
            legend: {
              top: '5%',
              left: 'center'
            },
            series: [
              {
                name: '申报量',
                type: 'pie',
                radius: ['40%', '70%'],
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
                  { value: 50, name: '未发布' },
                  { value: 50, name: '已发布' },
                  { value: 80, name: '已中标' },
                  { value: 70, name: '未中标' }
                ]
              }
            ]
          })
    }

    useEffect(()=>{
        getOptions();
    }, [])
    
    return (
        <ReactECharts option={options} style={{height: 400}}/>
    )
}

export default StatusPie;