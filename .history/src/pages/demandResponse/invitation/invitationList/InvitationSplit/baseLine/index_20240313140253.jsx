import React, { useState, useEffect } from "react";
import { Tabs, Modal, Select, Space, InputNumber } from "antd";
import { getCompanyBaseLine as getCompanyBaseLineServer } from "@/services/electricityLoad";
import ReactECharts from "echarts-for-react";
import "./index.less";

const BaseLine = ({ baseLineArgs, onClose }) => {
    const [open, setOpen] = useState(false);
    const [energyStorageData, setEnergyStorageData] = useState();
    const [historyData, setHistoryData] = useState();
    const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];

    const Summary = () => {
        const options = {
            legend: {
                data: ["预计基线负荷（kW）", "签约响应量（kW）", "任务量（kW）", "实际响应（kW）"],
            },
            grid: {
                top: "10%",
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: [
                    "13:00",
                    "13:15",
                    "13:30",
                    "13:45",
                    "14:00",
                    "14:15",
                    "14:30",
                    "14:45",
                    "15:00",
                    "15:15",
                    "15:30",
                    "15:45",
                    "16:00",
                ],
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value} kW",
                },
                axisPointer: {
                    snap: true,
                },
                max: 45000,
            },
            series: [
                {
                    name: "预计基线负荷（kW）",
                    type: "line",
                    smooth: true,
                    data: [
                        8532, 19231, 32643, 32763, 39232, 41204, 40401.6, 38804, 35804, 32811,
                        35892, 37281, 23172,
                    ],
                    symbol: "none",
                    lineStyle: {
                        width: 3,
                        shadowColor: "rgba(158,135,255, 0.3)",
                        shadowBlur: 10,
                        shadowOffsetY: 20,
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[0],
                            borderColor: colorList[0],
                        },
                    },
                },
            ],
        };

        return (
            <div>
                <div>
                    最大负载：{energyStorageData?.maxLoad}KW 响应能力：
                    {energyStorageData?.responsePower}KW
                </div>
                <ReactECharts option={options} style={{ width: "100%", height: "500px" }} />
            </div>
        );
    };

    const Listory = () => {
        const date = historyData.map(item => item?._1)
        const options = {
            legend: {
                data: date
            },
            grid: {
                top: "10%",
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: [
                    "13:00",
                    "13:15",
                    "13:30",
                    "13:45",
                    "14:00",
                    "14:15",
                    "14:30",
                    "14:45",
                    "15:00",
                    "15:15",
                    "15:30",
                    "15:45",
                    "16:00",
                ],
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value} kW",
                },
                axisPointer: {
                    snap: true,
                },
                max: 45000,
            },
            series: [
                {
                    name: date[0],
                    type: "line",
                    smooth: true,
                    data: [
                        8532, 19231, 32643, 32763, 39232, 41204, 40401.6, 38804, 35804, 32811,
                        35892, 37281, 23172,
                    ],
                    symbol: "none",
                    lineStyle: {
                        width: 3,
                        shadowColor: "rgba(158,135,255, 0.3)",
                        shadowBlur: 10,
                        shadowOffsetY: 20,
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[0],
                            borderColor: colorList[0],
                        },
                    },
                },
            ],
        };

        return <ReactECharts option={options} style={{ width: "100%", height: "500px" }} />;
    };

    const getCompanyBaseLine = async () => {
        let res = await getCompanyBaseLineServer(baseLineArgs);
        if (res?.data?.status == "SUCCESS") {
            const { energyStorageData, baseLinePowersSource } = res?.data?.data;
            setEnergyStorageData(energyStorageData);
            setHistoryData(baseLinePowersSource);
        }
    };

    useEffect(() => {
        if (baseLineArgs) {
            setOpen(true);
            getCompanyBaseLine();
        } else setOpen(false);
    }, [baseLineArgs]);

    const items = [
        {
            key: "1",
            label: "汇总基线",
            children: <Summary />,
        },
        {
            key: "2",
            label: "历史负载",
            children: <Listory />,
        },
    ];

    return (
        <Modal
            title="基线"
            width={900}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Tabs defaultActiveKey="1" items={items} />
        </Modal>
    );
};

export default BaseLine;
