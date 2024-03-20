import React, { useState, useEffect } from "react";
import { Tabs, Modal, Select, Space, InputNumber } from "antd";
import { getCompanyBaseLine as getCompanyBaseLineServer } from "@/services/electricityLoad";
import ReactECharts from "echarts-for-react";
import "./index.less";

const BaseLine = ({ baseLineArgs, onClose }) => {
    const [open, setOpen] = useState(false);
    const [energyStorageData, setEnergyStorageData] = useState();
    const [summaryData, setEnergyStorageData] = useState();
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
        const date = historyData?.map(item => item?._1);
         const options = {
            legend: {
                data: date,
            },
 
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: [
                    "00:00",
                    "00:15",
                    "00:30",
                    "00:45",
                    "01:00",
                    "01:15",
                    "01:30",
                    "01:45",
                    "02:00",
                    "02:15",
                    "02:30",
                    "02:45",
                    "03:00",
                    "03:15",
                    "03:30",
                    "03:45",
                    "04:00",
                    "04:15",
                    "04:30",
                    "04:45",
                    "05:00",
                    "05:15",
                    "05:30",
                    "05:45",
                    "06:00",
                    "06:15",
                    "06:30",
                    "06:45",
                    "07:00",
                    "07:15",
                    "07:30",
                    "07:45",
                    "08:00",
                    "08:15",
                    "08:30",
                    "08:45",
                    "09:00",
                    "09:15",
                    "09:30",
                    "09:45",
                    "10:00",
                    "10:15",
                    "10:30",
                    "10:45",
                    "11:00",
                    "11:15",
                    "11:30",
                    "11:45",
                    "12:00",
                    "12:15",
                    "12:30",
                    "12:45",
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
                    "16:15",
                    "16:30",
                    "16:45",
                    "17:00",
                    "17:15",
                    "17:30",
                    "17:45",
                    "18:00",
                    "18:15",
                    "18:30",
                    "18:45",
                    "19:00",
                    "19:15",
                    "19:30",
                    "19:45",
                    "20:00",
                    "20:15",
                    "20:30",
                    "20:45",
                    "21:00",
                    "21:15",
                    "21:30",
                    "21:45",
                    "22:00",
                    "22:15",
                    "22:30",
                    "22:45",
                    "23:00",
                    "23:15",
                    "23:30",
                    "23:45",
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
            series: historyData?.map((item, index) => ({
                name: item?._1,
                type: "line",
                smooth: true,
                data: item?._2,
                symbol: "none",
                lineStyle: {
                    width: 3,
                    shadowColor: "rgba(158,135,255, 0.3)",
                    shadowBlur: 10,
                    shadowOffsetY: 20,
                },
                itemStyle: {
                    normal: {
                        color: colorList[index],
                        borderColor: colorList[index],
                    },
                },
            })),
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
            title="查看基线"
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
