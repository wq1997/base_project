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
                data: legendNames,
            },
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
                [
                    {
                        "name": "电网AB线电压（V）",
                        "unit": "V",
                        "data": [
                            70,
                            66,
                            70,
                            33,
                            47,
                            13,
                            12,
                            97,
                            16,
                            86,
                            50,
                            81,
                            34,
                            65,
                            80,
                            34,
                            23,
                            33,
                            6,
                            19,
                            49,
                            3,
                            86,
                            81,
                            42,
                            65,
                            34,
                            71,
                            7,
                            24,
                            83,
                            14,
                            10,
                            10,
                            23,
                            13,
                            36,
                            80,
                            55,
                            90,
                            47,
                            40,
                            13,
                            38,
                            77,
                            69,
                            87,
                            84,
                            23,
                            52,
                            58,
                            22,
                            96,
                            44,
                            74,
                            81,
                            76,
                            88,
                            69,
                            55,
                            93,
                            40,
                            68,
                            30,
                            81,
                            18,
                            73,
                            3,
                            15,
                            86,
                            85,
                            78,
                            55,
                            7,
                            98,
                            36,
                            17,
                            16,
                            8,
                            6,
                            100,
                            49,
                            90,
                            74,
                            61,
                            33,
                            84,
                            39,
                            11,
                            14,
                            67,
                            51,
                            82,
                            23,
                            99,
                            63,
                            26,
                            63,
                            23,
                            42,
                            48,
                            96,
                            83,
                            55,
                            32,
                            41,
                            52,
                            54,
                            59,
                            89,
                            67,
                            62,
                            10,
                            79,
                            48,
                            92,
                            71,
                            14,
                            84,
                            13,
                            90,
                            55,
                            97,
                            47,
                            70,
                            48,
                            86,
                            5,
                            46,
                            73,
                            67,
                            58,
                            44,
                            45,
                            72,
                            62,
                            6,
                            18,
                            67,
                            59,
                            74,
                            20,
                            13,
                            14,
                            58,
                            24,
                            6,
                            97,
                            44,
                            76,
                            49,
                            6,
                            28,
                            98,
                            21,
                            12,
                            43,
                            91,
                            34,
                            66,
                            50,
                            86,
                            67,
                            85,
                            33,
                            50,
                            77,
                            30,
                            45,
                            78,
                            60,
                            30,
                            9,
                            23,
                            75,
                            51,
                            81,
                            92,
                            89,
                            20,
                            66,
                            25,
                            76,
                            16,
                            99,
                            48,
                            24,
                            60,
                            77,
                            9,
                            10,
                            36,
                            24,
                            81,
                            17,
                            33,
                            58,
                            20,
                            8,
                            36,
                            70,
                            41,
                            7,
                            48,
                            48,
                            20,
                            76,
                            60,
                            78,
                            99,
                            8,
                            91,
                            85,
                            96,
                            59,
                            55,
                            46,
                            37,
                            24,
                            75,
                            26,
                            37,
                            60,
                            77,
                            9,
                            64,
                            87,
                            19,
                            39,
                            22,
                            76,
                            42,
                            51,
                            68,
                            83,
                            26,
                            4,
                            48,
                            97,
                            99,
                            17,
                            52,
                            63,
                            58,
                            48,
                            11,
                            88,
                            52,
                            69,
                            17,
                            45,
                            90,
                            39,
                            80,
                            80,
                            57,
                            24,
                            30,
                            97,
                            84,
                            75,
                            73,
                            45,
                            68,
                            62,
                            31,
                            69,
                            33,
                            80,
                            56,
                            52,
                            92,
                            10,
                            63,
                            55,
                            89,
                            51,
                            58,
                            14,
                            44,
                            85,
                            69,
                            8,
                            31,
                            92,
                            30,
                            61,
                            58
                        ]
                    },
                    {
                        "name": "电网CA线电压（V）",
                        "unit": "V",
                        "data": []
                    }
                ]
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
