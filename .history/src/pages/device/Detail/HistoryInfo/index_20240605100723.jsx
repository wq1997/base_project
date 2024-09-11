import React, { useState, useEffect, useRef } from "react";
import { Tabs, Select, DatePicker, Space, Button, message } from "antd";
import { SearchInput } from "@/components";
import { getSignalChart as getSignalChartServer } from "@/services/statistics";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import dayjs from "dayjs";

const Index = ({ signalPointTypes }) => {
    const dateRef = useRef();
    const [date, setDate] = useState();
    const signalPointRef = useRef();
    const [signalPoint, setSignalPoint] = useState();
    const [signalPointOptions, setSignalPointOptions] = useState(signalPointTypes);
    const [options, setOptions] = useState({});

    const getOptions = data => {
        const legendNames = data?.map(item => item?.name) || [];
        const times = Object.keys(data?.find(item => item?.value)?.value || {})?.sort((a, b) => {
            return dayjs(`2024-06-05 ${a}`).unix() - dayjs(`2024-06-05 ${b}`).unix();
        });
        const units = [...new Set(data?.map(item => item.rate))];
        const seriesData =
            data?.map(item => ({
                name: item.name,
                unit: item.rate,
                data: times?.map(time => item.value?.[time]),
            })) || [];

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
            legend: {
                data: legendNames,
            },
            dataZoom: [
                {
                    type: "inside",
                    start: 0,
                    end: 10,
                },
    
            ],
            xAxis: [
                {
                    type: "category",
                    data: times,
                    axisPointer: {
                        type: "shadow",
                    },
                },
            ],
            yAxis: [
                {
                    type: "value",
                    name: units?.[0],
                },
                {
                    type: "value",
                    name: units?.[1],
                },
            ],
            series: [
                ...seriesData?.map(item => ({
                    ...item,
                    type: "line",
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
            getOptions([]);
        }
    };

    const handleReset = () => {
        signalPointRef.current = undefined;
        setSignalPoint();
        dateRef.current = undefined;
        setDate();
        getOptions([]);
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
        setSignalPointOptions(
            signalPointTypes?.map(item => ({
                ...item,
                disabled: false,
                name: JSON.stringify([item.name, item.type]),
            }))
        );
    }, [signalPointTypes]);

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
            <ReactECharts
                option={options}
                notMerge={true}
                style={{ marginTop: "10px", width: "95%", height: "600px" }}
            />
        </>
    );
};

export default Index;
