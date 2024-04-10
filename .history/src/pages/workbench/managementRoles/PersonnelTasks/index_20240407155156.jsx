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
                color: token.color1
            }
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
                    "1月",
                    "2月",
                    "3月",
                    "4月",
                    "5月",
                    "6月",
                    "7月",
                    "8月",
                    "9月",
                    "10月",
                    "11月",
                    "12月",
                ],
            },
        ],
        yAxis: [
            {
                type: "value",
                splitLine: {
                    lineStyle: {
                        color: [token.color9]
                    }
                }
            },
        ],
        series: [
            {
                name: "进行中",
                type: "bar",
                barWidth: 40,
                stack: "Ad",
                data: [5, 3, 21, 4, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                name: "已完成",
                type: "bar",
                barWidth: 40,
                stack: "Ad",
                data: [135, 208, 21, 4, 0, 0, 0, 0, 0, 0, 0, 0],
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
