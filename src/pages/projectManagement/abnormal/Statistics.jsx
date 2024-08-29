import { Space, Select, theme, DatePicker } from "antd";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
    getWorkOrderTimeExceptionTypeStatistics as getWorkOrderTimeExceptionTypeStatisticsServe,
} from "@/services";

const Statistics = () => {
    const [options, setOptions] = useState({});
    const { token } = theme.useToken();
    const [type, setType] = useState("YEAR");
    const [date, setDate] = useState(dayjs().format("YYYY"))

    const getOptions = async () => {
        let params = {}, xAxisData = [], legendData = [], seriesData = [];
        if (type === "YEAR") {
            params = {
                year: date
            }
        }
        if (type === "MONTH") {
            params = {
                year: dayjs(date).format("YYYY"),
                month: dayjs(date).format("MM")
            }
        }
        const res = await getWorkOrderTimeExceptionTypeStatisticsServe(params);
        if (res?.data?.status === "SUCCESS") {
            const items = res?.data?.data?.items;
            xAxisData = items?.map(item => item?.monthOrDay);
            items?.forEach(item => {
                if (item?.exceptionTypeTypeCount?.length > 0) {
                    item?.exceptionTypeTypeCount?.forEach(subItem => {
                        legendData.push(subItem?._1);
                    })
                }
            })
            legendData = Array.from(new Set(legendData));

            legendData?.forEach(name => {
                seriesData.push({
                    name,
                    type: 'bar',
                    stack: '总量',
                    barWidth: 40,
                    data: items?.map(item => {
                        const count = item?.exceptionTypeTypeCount?.find(subItem => subItem?._1 === name);
                        return count?._2 || 0;
                    }),
                })
            })
        }

        setOptions({
            tooltip: {},
            color: ['#47CCFF', '#EF6E39', '#00D5CF'],
            legend: {
                data: legendData,
                textStyle: {
                    fontSize: 14,
                    color: '#FFF',
                },
            },
            grid: {
                left: 50,
                right: 50
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: '#FFFFFF'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                },
                data: xAxisData
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#FFFFFF'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0,0,0,0.15)'
                    },
                    width: 2
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.15)'
                    }
                },
            },
            series: seriesData
        })
    }

    useEffect(() => {
        getOptions();
    }, [type, date]);

    return (
        <Space
            direction="vertical"
            style={{
                width: '100%'
            }}
        >
            <Space>
                <span style={{ color: token.fontColor }}>时间维度：</span>
                <Select
                    value={type}
                    options={[
                        { value: 'YEAR', label: '年' },
                        { value: "MONTH", label: '月' }
                    ]}
                    style={{ width: 200 }}
                    placeholder="请选择时间维度"
                    onChange={(value) => {
                        if (value === "YEAR") {
                            setDate(dayjs(date).format("YYYY"))
                        } else if (value === "MONTH") {
                            setDate(`${dayjs(date).format("YYYY")}-${dayjs().format("MM")}`);
                        }
                        setType(value);
                    }}
                />
                <DatePicker
                    value={dayjs(date)}
                    picker={type.toLocaleLowerCase()}
                    onChange={(value) => {
                        if (type === "YEAR") {
                            setDate(dayjs(value).format("YYYY"))
                        } else if (type === "MONTH") {
                            setDate(dayjs(value).format("YYYY-MM"));
                        }
                    }}
                />
            </Space>
            <ReactECharts 
                option={options} 
                style={{ width: "100%", height: 'calc(100vh - 250px)' }} 
                notMerge={true}
            />
        </Space>
    )
}

export default Statistics;