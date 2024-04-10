import { Select, Space } from "antd";
import { SearchInput } from "@/components";
import ReactECharts from "echarts-for-react";
import "./index.less";

const PersonnelTasks = () => {

    const options = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {},
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: ["1月", "1月"],
            },
        ],
        yAxis: [
            {
                type: "value",
            },
        ],
        series: [
            {
                name: "进行中",
                type: "bar",
                stack: "Ad",
                data: [32, 33, 30, 33, 39, 33, 32],
            },
            {
                name: "已完成",
                type: "bar",
                stack: "Ad",
                data: [12, 13, 10, 13, 30, 23, 21],
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
                        value={"2"}
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
                        value={"2"}
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
