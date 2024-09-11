import { theme, Space, DatePicker } from "antd";
import { SearchInput } from "@/components";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import "./index.less";
import { useState } from "react";
import { useEffect } from "react";
import { workbenchListOperatorCompleteWorkOrderCount as workbenchListOperatorCompleteWorkOrderCountServe } from "@/services";
import dayjs from "dayjs";

const PersonnelTasks = ({ data }) => {
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    const [dataSource, setDataSource] = useState([]);
    const [region, setRegion] = useState();
    const [dateType, setDateType] = useState("YEAR");
    const [date, setDate] = useState(dayjs().format("YYYY"));

    const getOptions = () => {
        setOptions({
            color: ["#D79114", "#01B0EE"],
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
                top: 50,
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            xAxis: [
                {
                    type: "category",
                    data: dataSource?.map(item => item?.operatorName),
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
                    data: dataSource?.map(item => item?.implementWorkOrderCount),
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "#0DB2FF",
                                },
                                {
                                    offset: 1,
                                    color: "#00D5CF",
                                },
                            ]),
                        },
                    },
                },
                {
                    name: "运维工单",
                    type: "bar",
                    barWidth: 40,
                    stack: "Ad",
                    data: dataSource?.map(item => item?.operationWorkOrderCount),
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "#47CCFF",
                                },
                                {
                                    offset: 1,
                                    color: "#00FFF8",
                                },
                            ]),
                        },
                    },
                },
            ],
        });
    };

    const getDataSource = async () => {
        let params = {};
        if (dateType === "YEAR") {
            params = {
                regions: region,
                year: dayjs(date).format("YYYY"),
            };
        }
        if (dateType === "MONTH") {
            params = {
                regions: region,
                year: dayjs(date).format("YYYY"),
                month: dayjs(date).format("MM"),
            };
        }
        const res = await workbenchListOperatorCompleteWorkOrderCountServe(params);
        if (res?.data?.status === "SUCCESS") {
            setDataSource(res?.data?.data);
        }
    };

    useEffect(() => {
        getOptions();
    }, [JSON.stringify(dataSource)]);

    useEffect(() => {
        getDataSource();
    }, [region, dateType, date]);

    return (
        <div className="personnel-tasks" style={{ background: token.color12 }}>
            <div className="title">
                <span>人员任务统计</span>
                <Space>
                    <SearchInput
                        label="区域"
                        type="select"
                        value={region}
                        options={data?.regions}
                        onChange={setRegion}
                        mode="multiple"
                        style={{ width: 300 }}
                    />
                    <SearchInput
                        label="时间维度"
                        type="select"
                        value={dateType}
                        onChange={value => {
                            if (value === "YEAR") {
                                setDate(dayjs(date).format("YYYY"));
                            } else if (value === "MONTH") {
                                setDate(`${dayjs(date).format("YYYY")}-${dayjs().format("MM")}`);
                            }
                            setDateType(value);
                        }}
                        options={[
                            {
                                name: "年",
                                code: "YEAR",
                            },
                            {
                                name: "月",
                                code: "MONTH",
                            },
                        ]}
                    />
                    <DatePicker
                        value={dayjs(date)}
                        picker={dateType.toLocaleLowerCase()}
                        onChange={setDate}
                    />
                </Space>
            </div>
            <ReactECharts
                notMerge={true}
                option={options}
                style={{ width: "100%", flex:1 }}
            />
        </div>
    );
};

export default PersonnelTasks;
