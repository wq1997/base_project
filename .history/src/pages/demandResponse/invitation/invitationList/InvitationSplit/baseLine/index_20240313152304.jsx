import React, { useState, useEffect } from "react";
import { Tabs, Modal, Select, Space, InputNumber } from "antd";
import { getCompanyBaseLine as getCompanyBaseLineServer } from "@/services/electricityLoad";
import ReactECharts from "echarts-for-react";
import "./index.less";

const BaseLine = ({ baseLineArgs, onClose }) => {
    const [open, setOpen] = useState(false);
    const [energyStorageData, setEnergyStorageData] = useState();
    const [summaryData, setSummaryData] = useState();
    const [historyData, setHistoryData] = useState();
    const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];

    const Summary = () => {
        const names = summaryData?.map(item => item.name)
        const options = {
            legend: {
                data: names
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
                data: times,
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
            series:
                summaryData?.map((item, index) => ({
                    name: item.name,
                    type: "line",
                    smooth: true,
                    data: item.data,
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
                }))
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
                data:times,
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
            const { energyStorageData, gatewayBaseLinePowers, baseLinePowersSource } = res?.data?.data;
            setEnergyStorageData(energyStorageData);
            setHistoryData(baseLinePowersSource);
            setSummaryData([{ name: '关口负载功率（KW）', data: gatewayBaseLinePowers }])
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
