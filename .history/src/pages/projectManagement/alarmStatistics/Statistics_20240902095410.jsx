import { Space, Select, theme, DatePicker } from "antd";
import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
    alarmStatisticsPageInitData as alarmStatisticsPageInitDataServer,
    alarmStatisticsCharts as alarmStatisticsChartsServer,
} from "@/services";
import { SearchInput } from "@/components";

const Statistics = () => {
    const [options, setOptions] = useState({});
    const { token } = theme.useToken();
    const [type, setType] = useState("YEAR");
    const [date, setDate] = useState(dayjs().format("YYYY"));
    const [initOption, setInitOption] = useState({});
    const [projectId, setProjectId] = useState();

    const getOptions = async () => {
        if (JSON.stringify(initOption) === "{}") return;
        let params = {},
            xAxisData = [],
            legendData = [],
            seriesData = [];
        if (type === "YEAR") {
            params = {
                projectId: projectId || initOption?.projects?.[0]?.id,
                year: date,
            };
        }
        if (type === "MONTH") {
            params = {
                projectId: projectId || initOption?.projects?.[0]?.id,
                year: dayjs(date).format("YYYY"),
                month: dayjs(date).format("MM"),
            };
        }
        const res = await alarmStatisticsChartsServer(params);
        if (res?.data?.status === "SUCCESS") {
            const items = res?.data?.data?.items;
            xAxisData = items?.map(item => item?.monthOrDay);
            items?.forEach(item => {
                if (item?.typeCount?.length > 0) {
                    item?.typeCount?.forEach(subItem => {
                        legendData.push(subItem?._1 || "");
                    });
                }
            });
            legendData = Array.from(new Set(legendData));

            legendData?.forEach(name => {
                seriesData.push({
                    name,
                    type: "bar",
                    stack: "总量",
                    barWidth: 40,
                    data: items?.map(item => {
                        const count = item?.typeCount?.find(subItem => subItem?._1 === name);
                        return count?._2 || 0;
                    }),
                });
            });
        }

        setOptions({
            tooltip: {},
            color: ["#47CCFF", "#EF6E39", "#00D5CF"],
            legend: {
                data: legendData,
                textStyle: {
                    fontSize: 14,
                    color: "#FFF",
                },
            },
            grid: {
                left: 50,
                right: 50,
            },
            xAxis: {
                type: "category",
                axisLabel: {
                    color: "#FFFFFF",
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                data: xAxisData,
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    color: "#FFFFFF",
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(0,0,0,0.15)",
                    },
                    width: 2,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,0.15)",
                    },
                },
            },
            series: seriesData,
        });
    };

    const getInitData = async () => {
        const res = await alarmStatisticsPageInitDataServer();
        if (res?.data?.status === "SUCCESS") {
            setInitOption(res?.data?.data);
        }
    };

    useEffect(() => {
        getOptions();
    }, [initOption, projectId, type, date]);

    useEffect(() => {
        getInitData();
    }, []);

    return (
        <Space
            direction="vertical"
            style={{
                width: "100%",
            }}
        >
            <Space>
                <SearchInput
                    label="项目"
                    value={projectId || initOption?.projects?.[0]?.id}
                    type="select"
                    onChange={value => {
                        setProjectId(value);
                    }}
                    options={initOption?.projects?.map(item => ({
                        name: item.name,
                        code: item.id,
                    }))}
                />
                <span style={{ color: token.fontColor }}>时间维度：</span>
                <Select
                    value={type}
                    options={[
                        { value: "YEAR", label: "年" },
                        { value: "MONTH", label: "月" },
                    ]}
                    style={{ width: 200 }}
                    placeholder="请选择时间维度"
                    onChange={value => {
                        if (value === "YEAR") {
                            setDate(dayjs(date).format("YYYY"));
                        } else if (value === "MONTH") {
                            setDate(`${dayjs(date).format("YYYY")}-${dayjs().format("MM")}`);
                        }
                        setType(value);
                    }}
                />
                <DatePicker
                    value={dayjs(date)}
                    picker={type.toLocaleLowerCase()}
                    onChange={value => {
                        if (type === "YEAR") {
                            setDate(dayjs(value).format("YYYY"));
                        } else if (type === "MONTH") {
                            setDate(dayjs(value).format("YYYY-MM"));
                        }
                    }}
                />
            </Space>
            <ReactECharts
                option={options}
                style={{ width: "100%", height: "calc(100vh - 250px)" }}
                notMerge={true}
            />
        </Space>
    );
};

export default Statistics;
