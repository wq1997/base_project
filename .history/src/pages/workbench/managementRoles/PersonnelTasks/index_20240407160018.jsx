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
                data: [20, 22, 21, 4, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                name: "运维工单",
                type: "bar",
                barWidth: 40,
                stack: "Ad",
                data: [40, 55, 155, 31, 0, 0, 0, 0, 0, 0, 0, 0],
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
                            {
                                name: "园区项目",
                                code: "2",
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
                            {
                                name: "月",
                                code: "2",
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
