import EChartsReact from "echarts-for-react";
import { useEffect, useState } from "react";
import { Empty } from "antd";
import { history } from "umi";

const Chart = ({title, dataSource, searchParams}) => {
    const [option, setOption] = useState({});
    const [projectList, setProjectList] = useState([]);

    const getOption = () => {
        const xAxisData = Object.keys(dataSource).sort();
        let newProjectList = [];
        xAxisData?.forEach(item => {
            newProjectList = Array.from(new Set(newProjectList));
            newProjectList.push(...Object.keys(dataSource?.[item]||{})||[])
        })
        setProjectList(newProjectList);

        const series = newProjectList?.map(project => {
            return {
                name: project,
                type: 'bar',
                barWidth: 20,
                data: xAxisData?.map(xAxis => dataSource?.[xAxis]?.[project]||0)
            }
        })
        const showDataZoom = true; 
        setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '50',
                right: '50',
                bottom: '50',
                top:'50',
                containLabel: true
            },
            dataZoom: showDataZoom && [{
                "start": 0,
                "end": 20,
                "show": showDataZoom,
                "height": 10
            }],
            legend: {
                data: series?.map(item => item?.name),
                right: 10,
                top:12,
                itemWidth: 12,
                itemHeight: 10,
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                axisLabel: {
                  textStyle: {
                    fontFamily: 'Microsoft YaHei'
                  }
                },
                axisTick: {
                    show: false,
                },
              },
              yAxis: {
                type: 'value',
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: 'rgba(255,255,255,0.8)'
                  }
                },
                axisLabel: {}
              },
              series
        })
    }

    useEffect(() => {
        getOption();
    }, [JSON.stringify(dataSource)]);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <p style={{textAlign: 'center', fontWeight: 800, fontSize: 25}}>{title}</p>
            {
                projectList?.length?
                    <EChartsReact 
                        option={option}
                        style={{width: '100%', height: '100%'}}
                        notMerge
                        onEvents={{
                            click: (e)=>{
                                let url = "/analysis-results";
                                if(!searchParams.projectName){
                                    url = url+`?projectName=${e.seriesName}`
                                }else{
                                    url = url+`?projectName=${searchParams.projectName}&deviceBoxNo=${e.seriesName}`
                                }
                                history.push(url);
                            }
                        }}
                    />
                    :
                    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                        <Empty description="暂无符合搜索条件的数据" image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                    </div>
            }
            
        </div>
    )
}

export default Chart;