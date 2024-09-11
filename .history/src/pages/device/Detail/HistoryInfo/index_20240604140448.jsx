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
        const legendNames = data?.map(item => item?.name);
        const times = Object.keys(data?.find(item => item?.value)?.value || {});
        const units = [...new Set(data?.map(item => item.rate))];
        const seriesData =
            data?.map(item => ({
                name: item.name,
                unit: item.rate,
                data: Object.values(item?.value || {}),
            })) || [];
        console.log("legendNames", legendNames);
        console.log("times", times);
        console.log("units", units);
        console.log("seriesData", seriesData);

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
                data: ["电网AB线电压（V）"],
            },
            xAxis: [
                {
                    type: "category",
                    data: [
                        "00:05",
                        "00:10",
                        "00:15",
                        "00:20",
                        "00:25",
                        "00:30",
                        "00:35",
                        "00:40",
                        "00:45",
                        "00:50",
                        "00:55",
                        "01:00",
                        "01:05",
                        "01:10",
                        "01:15",
                        "01:20",
                        "01:25",
                        "01:30",
                        "01:35",
                        "01:40",
                        "01:45",
                        "01:50",
                        "01:55",
                        "02:00",
                        "02:05",
                        "02:10",
                        "02:15",
                        "02:20",
                        "02:25",
                        "02:30",
                        "02:35",
                        "02:40",
                        "02:45",
                        "02:50",
                        "02:55",
                        "03:00",
                        "03:05",
                        "03:10",
                        "03:15",
                        "03:20",
                        "03:25",
                        "03:30",
                        "03:35",
                        "03:40",
                        "03:45",
                        "03:50",
                        "03:55",
                        "04:00",
                        "04:05",
                        "04:10",
                        "04:15",
                        "04:20",
                        "04:25",
                        "04:30",
                        "04:35",
                        "04:40",
                        "04:45",
                        "04:50",
                        "04:55",
                        "05:00",
                        "05:05",
                        "05:10",
                        "05:15",
                        "05:20",
                        "05:25",
                        "05:30",
                        "05:35",
                        "05:40",
                        "05:45",
                        "05:50",
                        "05:55",
                        "06:00",
                        "06:05",
                        "06:10",
                        "06:15",
                        "06:20",
                        "06:25",
                        "06:30",
                        "06:35",
                        "06:40",
                        "06:45",
                        "06:50",
                        "06:55",
                        "07:00",
                        "07:05",
                        "07:10",
                        "07:15",
                        "07:20",
                        "07:25",
                        "07:30",
                        "07:35",
                        "07:40",
                        "07:45",
                        "07:50",
                        "07:55",
                        "08:00",
                        "08:05",
                        "08:10",
                        "08:15",
                        "08:20",
                        "08:25",
                        "08:30",
                        "08:35",
                        "08:40",
                        "08:45",
                        "08:50",
                        "08:55",
                        "09:00",
                        "09:05",
                        "09:10",
                        "09:15",
                        "09:20",
                        "09:25",
                        "09:30",
                        "09:35",
                        "09:40",
                        "09:45",
                        "09:50",
                        "09:55",
                        "10:00",
                        "10:05",
                        "10:10",
                        "10:15",
                        "10:20",
                        "10:25",
                        "10:30",
                        "10:35",
                        "10:40",
                        "10:45",
                        "10:50",
                        "10:55",
                        "11:00",
                        "11:05",
                        "11:10",
                        "11:15",
                        "11:20",
                        "11:25",
                        "11:30",
                        "11:35",
                        "11:40",
                        "11:45",
                        "11:50",
                        "11:55",
                        "12:00",
                        "12:05",
                        "12:10",
                        "12:15",
                        "12:20",
                        "12:25",
                        "12:30",
                        "12:35",
                        "12:40",
                        "12:45",
                        "12:50",
                        "12:55",
                        "13:00",
                        "13:05",
                        "13:10",
                        "13:15",
                        "13:20",
                        "13:25",
                        "13:30",
                        "13:35",
                        "13:40",
                        "13:45",
                        "13:50",
                        "13:55",
                        "14:00",
                        "14:05",
                        "14:10",
                        "14:15",
                        "14:20",
                        "14:25",
                        "14:30",
                        "14:35",
                        "14:40",
                        "14:45",
                        "14:50",
                        "14:55",
                        "15:00",
                        "15:05",
                        "15:10",
                        "15:15",
                        "15:20",
                        "15:25",
                        "15:30",
                        "15:35",
                        "15:40",
                        "15:45",
                        "15:50",
                        "15:55",
                        "16:00",
                        "16:05",
                        "16:10",
                        "16:15",
                        "16:20",
                        "16:25",
                        "16:30",
                        "16:35",
                        "16:40",
                        "16:45",
                        "16:50",
                        "16:55",
                        "17:00",
                        "17:05",
                        "17:10",
                        "17:15",
                        "17:20",
                        "17:25",
                        "17:30",
                        "17:35",
                        "17:40",
                        "17:45",
                        "17:50",
                        "17:55",
                        "18:00",
                        "18:05",
                        "18:10",
                        "18:15",
                        "18:20",
                        "18:25",
                        "18:30",
                        "18:35",
                        "18:40",
                        "18:45",
                        "18:50",
                        "18:55",
                        "19:00",
                        "19:05",
                        "19:10",
                        "19:15",
                        "19:20",
                        "19:25",
                        "19:30",
                        "19:35",
                        "19:40",
                        "19:45",
                        "19:50",
                        "19:55",
                        "20:00",
                        "20:05",
                        "20:10",
                        "20:15",
                        "20:20",
                        "20:25",
                        "20:30",
                        "20:35",
                        "20:40",
                        "20:45",
                        "20:50",
                        "20:55",
                        "21:00",
                        "21:05",
                        "21:10",
                        "21:15",
                        "21:20",
                        "21:25",
                        "21:30",
                        "21:35",
                        "21:40",
                        "21:45",
                        "21:50",
                        "21:55",
                        "22:00",
                        "22:05",
                        "22:10",
                        "22:15",
                        "22:20",
                        "22:25",
                        "22:30",
                        "22:35",
                        "22:40",
                        "22:45",
                        "22:50",
                        "22:55",
                        "23:00",
                        "23:05",
                        "23:10",
                        "23:15",
                        "23:20",
                        "23:25",
                        "23:30",
                        "23:35",
                        "23:40",
                        "23:45",
                        "23:50",
                        "23:55",
                        "00:00",
                    ],
                    axisPointer: {
                        type: "shadow",
                    },
                },
            ],
            yAxis: [
                {
                    type: "value",
                    name: "xxx:xxx",
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
                // ...seriesData?.map(item => ({
                //     ...item,
                // })),

                {
                    name: "电网AB线电压（V）",
                    unit: "V",
                    data: [
                        70, 66, 70, 33, 47, 13, 12, 97, 16, 86, 50, 81, 34, 65, 80, 34, 23, 33, 6,
                        19, 49, 3, 86, 81, 42, 65, 34, 71, 7, 24, 83, 14, 10, 10, 23, 13, 36, 80,
                        55, 90, 47, 40, 13, 38, 77, 69, 87, 84, 23, 52, 58, 22, 96, 44, 74, 81, 76,
                        88, 69, 55, 93, 40, 68, 30, 81, 18, 73, 3, 15, 86, 85, 78, 55, 7, 98, 36,
                        17, 16, 8, 6, 100, 49, 90, 74, 61, 33, 84, 39, 11, 14, 67, 51, 82, 23, 99,
                        63, 26, 63, 23, 42, 48, 96, 83, 55, 32, 41, 52, 54, 59, 89, 67, 62, 10, 79,
                        48, 92, 71, 14, 84, 13, 90, 55, 97, 47, 70, 48, 86, 5, 46, 73, 67, 58, 44,
                        45, 72, 62, 6, 18, 67, 59, 74, 20, 13, 14, 58, 24, 6, 97, 44, 76, 49, 6, 28,
                        98, 21, 12, 43, 91, 34, 66, 50, 86, 67, 85, 33, 50, 77, 30, 45, 78, 60, 30,
                        9, 23, 75, 51, 81, 92, 89, 20, 66, 25, 76, 16, 99, 48, 24, 60, 77, 9, 10,
                        36, 24, 81, 17, 33, 58, 20, 8, 36, 70, 41, 7, 48, 48, 20, 76, 60, 78, 99, 8,
                        91, 85, 96, 59, 55, 46, 37, 24, 75, 26, 37, 60, 77, 9, 64, 87, 19, 39, 22,
                        76, 42, 51, 68, 83, 26, 4, 48, 97, 99, 17, 52, 63, 58, 48, 11, 88, 52, 69,
                        17, 45, 90, 39, 80, 80, 57, 24, 30, 97, 84, 75, 73, 45, 68, 62, 31, 69, 33,
                        80, 56, 52, 92, 10, 63, 55, 89, 51, 58, 14, 44, 85, 69, 8, 31, 92, 30, 61,
                        58,
                    ],
                },
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
