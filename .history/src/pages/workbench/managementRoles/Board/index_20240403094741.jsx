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
                color: token.color1
            }
        },
        series: [
            {
                type: "pie",
                radius: "50%",
                data: [
                    { value: 37, name: "维保项目" },
                    { value: 701, name: "实施项目" },
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
                               color: '#595959',	// 提示文字颜色
                               fontSize: 18		// 提示文字大小
                         } 
                   }
               },
        ————————————————
        
                                    版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
                                
        原文链接：https://blog.csdn.net/qq_38210427/article/details/130360548
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
                    value={'2'}
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
