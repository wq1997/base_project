import React, { useState, useEffect, useRef } from "react";
import { Tabs, Select, DatePicker, Space, Button, message } from "antd";
import { SearchInput } from "@/components";
import { getSignalPoint as getSignalPointServer } from "@/services/device";
import { getSignalChart as getSignalChartServer } from "@/services/statistics";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import dayjs from "dayjs";

const Index = ({}) => {
    const dateRef = useRef();
    const [date, setDate] = useState();
    const signalPointRef = useRef();
    const [signalPoint, setSignalPoint] = useState();
    const [signalPointOptions, setSignalPointOptions] = useState([]);
    const [options, setOptions] = useState({});

    const getOptions = data => {
        const legendNames = data?.map(item => item.name);
        console.log(legendNames);
        setOptions({
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    crossStyle: {
                        color: "#999",
                    },
                },
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ["line", "bar"] },
                    restore: { show: true },
                    saveAsImage: { show: true },
                },
            },
            legend: {
                data: legendNames,
            },
            xAxis: [
                {
                    type: "category",
                    data:data?.find(item=>item.),
                    axisPointer: {
                        type: "shadow",
                    },
                },
            ],
            yAxis: [
                {
                    type: "value",
                    name: "Precipitation",
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: "{value} ml",
                    },
                },
                {
                    type: "value",
                    name: "Temperature",
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: "{value} °C",
                    },
                },
            ],
            series: [
                data?.map(item => ({
                    name: item.name,
                    type: "line",
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + " °C";
                        },
                    },
                    data: Object.values(item?.value),
                })),
            ],
        });
    };

    const handleSearch = async () => {
        if (!date) return message.info("请选择日期");
        if (!signalPoint?.length) return message.info("请选择信号点");
        const res = await getSignalChartServer({
            id: 1,
            date,
            types: signalPoint?.map(item => JSON.parse(item)[0]),
        });
        if (res?.data?.code == 200) {
            getOptions(res?.data?.data);
        } else {
            getOptions();
        }
    };

    const handleReset = () => {
        signalPointRef.current = undefined;
        setSignalPoint();
    };

    const getSignalPoint = async () => {
        const res = await getSignalPointServer(50);
        if (res?.data?.code == 200) {
            setSignalPointOptions(
                res?.data?.data?.map(item => ({
                    ...item,
                    disabled: false,
                    name: JSON.stringify([item.name, item.type]),
                }))
            );
        }
    };

    useEffect(() => {
        const types = [...new Set(signalPoint?.map(item => JSON.parse(item)[1]))];
        setSignalPointOptions(
            signalPointOptions?.map(item => ({
                ...item,
                disabled: types?.length == 2 && !types.includes(item.type) ? true : false,
            }))
        );
    }, [signalPoint]);

    useEffect(() => {
        getSignalPoint();
        getOptions();
    }, []);

    return (
        <>
            <Space>
                <div>
                    <span>日期：</span>
                    <DatePicker
                        format="YYYY-MM-DD"
                        onChange={(date, dateStr) => {
                            dateRef.current = dateStr;
                            setDate(dateStr);
                        }}
                        value={date ? dayjs(date) : null}
                    />
                </div>
                <SearchInput
                    mode="multiple"
                    inputWidth={400}
                    label="信号点"
                    value={signalPoint}
                    type="select"
                    options={signalPointOptions}
                    onChange={value => {
                        signalPointRef.current = value;
                        setSignalPoint(value);
                    }}
                />
                <Button type="primary" onClick={handleSearch}>
                    查询
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <ReactECharts option={options} style={{ width: "95%", height: "600px" }} />
        </>
    );
};

export default Index;
