import { theme, Space } from "antd";
import { SearchInput } from "@/components";
import ReactECharts from "echarts-for-react";
import "./index.less";

const PersonnelTasks = () => {
    const { token } = theme.useToken();
    const options = {
        color: [token.color2, token.color8],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {
            textStyle: {
                color: token.color1,
            },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: [
                    "张**",
                    "王**",
                    "艾**",
                    "李**",
                    "林**",
                    "麦**",
                    "任**",
                    "王**",
                    "王**",
                    "田**",
                    "刘**",
                    "吴**",
                    "王**",
                    "杨**",
                    "刘**",
                    "董**",
                    "王**",
                    "宋**",
                    "何**",
                    "孙**",
                ],
            },
        ],
        yAxis: [
            {
                type: "value",
                splitLine: {
                    lineStyle: {
                        color: [token.color9],
                    },
                },
            },
        ],
        series: [
            {
                name: "实施工单",
                type: "bar",
                barWidth: 40,
                stack: "Ad",
                data: [8, 5, 7, 5, 5, 6, 2, 6, 5, 7, 2, 6, 8, 3, 5, 5, 1, 2, 3, 2],
            },
            {
                name: "运维工单",
                type: "bar",
                barWidth: 40,
                stack: "Ad",
                data: [
                    67, 65, 60, 60, 59, 56, 58, 54, 50, 46, 48, 43, 40, 42, 40, 40, 38, 36, 33, 32,
                ],
            },
        ],
    };

    return (
        <div className="personnel-tasks">
            <div className="title">
                <span>人员任务统计</span>
                <Space>
                    <SearchInput
                        label="数据维度"
                        type="select"
                        value={"1"}
                        options={[
                            {
                                name: "全部",
                                code: "1",
                            },
                            
                        ]}
                    />{" "}
                    <SearchInput
                        label="时间维度"
                        type="select"
                        value={"1"}
                        options={[
                            {
                                name: "年",
                                code: "1",
                            },
                        ]}
                    />
                </Space>
            </div>
            <div className="content">
                <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default PersonnelTasks;
