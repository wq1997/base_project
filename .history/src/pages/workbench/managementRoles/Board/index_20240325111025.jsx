import { Select, Space } from "antd";
import { SearchInput } from "@/components";
import ReactECharts from "echarts-for-react";
import "./index.less";

const Board = () => {

    const options = {
        title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '维保xiangmu' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return (
        <div className="board">
            <div className="title">
                <span>在途项目看板</span>
                <SearchInput
                    label="数据维度"
                    type="select"
                    options={[
                        {
                            name: "项目阶段图",
                            code: "1",
                        },
                        {
                            name: "项目类型图",
                            code: "2",
                        },
                    ]}
                />
            </div>
            <ReactECharts option={options} style={{ width: "100%", height: "500px" }} />
        </div>
    );
};

export default Board;
