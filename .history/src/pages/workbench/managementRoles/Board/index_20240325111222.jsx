import { Select, Space } from "antd";
import { SearchInput } from "@/components";
import ReactECharts from "echarts-for-react";
import "./index.less";

const Board = () => {
    const options = {
        title: {
            text: "Referer of a Website",
            subtext: "Fake Data",
            left: "center",
        },
        tooltip: {
            trigger: "item",
        },
        legend: {
            orient: "vertical",
            left: "left",
        },
        series: [
            {
                 type: "pie",
                radius: "50%",
                data: [
                    { value: 701, name: "维保项目" },
                    { value: 37, name: "实施项目" },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
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
