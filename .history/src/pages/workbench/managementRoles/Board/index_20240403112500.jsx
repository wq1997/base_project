import { Select, Space, theme } from "antd";
import { SearchInput } from "@/components";
import ReactECharts from "echarts-for-react";
import "./index.less";

const Board = () => {
    const { token } = theme.useToken();
    const options = {
        color: [token.color3, token.color2],
        tooltip: {
            trigger: "item",
        },
        legend: {
            orient: "vertical",
            left: 8,
            top: 30,
            textStyle: {
                color: token.color1,
            },
        },
        series: [
            {
                type: "pie",
                radius: "50%",
                selectedMode: "single",
                data: [
                    { value: 37, name: "维保项目" },
                    { value: 701, name: "实施项目", selected: true },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
                label: {
                    normal: {
                        textStyle: {
                            color: "#fff",
                        },
                        formatter: "{b}{c|{c}}\n{hr|}\n{d|{d}%}",
                        
                    },
                },labelLayout: function (params) {
                    const isLeft = params.labelRect.x < myChart.getWidth() / 2;
                    const points = params.labelLinePoints;
                    // Update the end point.
                    points[2][0] = isLeft
                      ? params.labelRect.x
                      : params.labelRect.x + params.labelRect.width;
                    return {
                      labelLinePoints: points
                    };
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
                    value={"2"}
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
