import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
const dataSource = [
    {
        description: '巡检任务',
        data: 98,
        color: '#E7E84F'
    },
    {
        description: '智能检测异常',
        data: 0,
        color: '#00EDBC'
    },
    {
        description: '客户下单',
        data: 1000,
        color: '#7A44DA'
    },
    {
        description: '其他',
        data: 10,
        color: '#1FA6F6'
    },
]

const OperationRecord = () => {
    const [data, setData] = useState(dataSource);
    const [options, setOptions] = useState({});
    const getOptions = () => {
        var outr = 45;
        var inr = 35;
        var size = 12;
        var numberdata = ['100', '100', '100', '100'];
        const titledata = dataSource?.map(item => item?.description);
        var total = 0;
        //计算总和
        for (var i = 0; i < numberdata.length; i++) {
            total += Number(numberdata[i]);
        }

        var data = [];
        let color = ['#E7E84F', '#00EDBC', '#7A44DA', '#1FA6F6'];

        for (var i = 0; i < numberdata.length; i++) {
            data.push(
                {
                    value: numberdata[i],
                    name: titledata[i],
                    itemStyle: {
                        normal: {
                            borderWidth: 5,
                            shadowBlur: 5,
                            borderColor: color[i],
                            shadowColor: color[i],
                            color: color[i],
                        },
                    },
                }
            );
        }
        setOptions({
            tooltip: {
                show: false,
            },
            legend: {
                show: true,
                textStyle: {
                    color: '#2F5887',
                    fontSize: size,
                },
                right: 0,
                top: 'center',
                itemWidth: 5,
                itemHeight: 5,
                itemGap: 5,
                type: 'scroll',
                orient: 'vertical',
            },
            toolbox: {
                show: false,
            },
            series: [
              {
                  name: '',
                  type: 'pie',
                  clockWise: false,
                  startAngle: '90',
                  center: ['45%', '50%'], //此处调整圆环的位置
                  radius: [outr, inr], //此处可以调整圆环的大小
                  hoverAnimation: false,
                  itemStyle: {
                      normal: {
                          label: {
                              show: false,
                          }
                      },
                  },
                  data: data,
                  animationType: 'scale',
                  animationEasing: 'elasticOut',
                  animationDelay: function (idx) {
                      return idx * 50;
                  },
              }
          ],
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <div 
            style={{
                height: '100%',
                padding: '10px 10px 0 10px',
                boxSizing: 'border-box',
                display: 'flex'
            }}
        >
            <div 
                style={{
                    width: '50%',
                    height: '100%'
                }}
            >
                <ReactECharts option={options} style={{height: '100%'}} />
            </div>
            <div 
                style={{
                    width: '50%',
                    height: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridTemplateRows: 'repeat(2, 1fr)',
                    gap: '5px',
                    textAlign: 'center',
                    alignItems: 'center'
                }}
            >
                {
                    data?.map(item => {
                        return (
                            <div>
                                <div style={{color: item?.color, fontSize: 22}}>{item?.data}</div>
                                <div style={{color: 'white', fontSize: 12}}>{item?.description}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OperationRecord;