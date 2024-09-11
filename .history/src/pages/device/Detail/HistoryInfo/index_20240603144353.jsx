import React, { useState, useEffect, useRef } from "react";
import { Tabs, Drawer, DatePicker, Space, Button, message } from "antd";
import { SearchInput } from "@/components";
import { getSignalPoint as getSignalPointServer } from "@/services/device";
import { getSignalChart as getSignalChartServer } from "@/services/statistics";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Index = ({}) => {
    const signalPointRef = useRef();
    const [signalPoint, setSignalPoint] = useState();
    const [signalPointOptions, setSignalPointOptions] = useState([]);
    const [options, setOptions] = useState({});

    const getOptions = () => {
        setOptions({
            legend: {
                data: ["发电量"],
                left: "right",
            },
            xAxis: {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yAxis: {
                type: "value",
            },
            grid: {
                left: "5%",
                right: "0%",
                top: "15%",
                bottom: "20%",
                containLabel: true,
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: "bar",
                    name: "发电量",
                    barWidth: 20,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "#79E6FC" },
                            { offset: 1, color: "#4499F5" },
                        ]),
                    },
                },
            ],
        });
    };

    const checkSignalPoint =()=>{

    }

    const handleSearch = () => {
        if(checkSignalPoint()){

        }else{
            message
        }
    };

    const handleReset = () => {
        signalPointRef.current = undefined;
        setSignalPoint();
    };

    const getSignalPoint = async () => {
        const res = await getSignalPointServer(50);
        if (res?.data?.code == 200) {
            setSignalPointOptions(res?.data?.data);
        }
    };

    const getSignalChart = async () => {
        const res = await getSignalChartServer();
        if (res?.data?.code == 200) {
        }
    };

    useEffect(() => {
        getSignalPoint();
        getOptions();
    }, []);

    return (
        <>
            <Space>
                <DatePicker format="YYYY-MM-DD" />
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
