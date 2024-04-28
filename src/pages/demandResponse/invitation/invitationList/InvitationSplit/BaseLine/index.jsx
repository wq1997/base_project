import React, { useState, useEffect } from "react";
import { Tabs, Modal, theme, Space, InputNumber } from "antd";
import { getCompanyBaseLine as getCompanyBaseLineServer } from "@/services/company";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import "./index.less";

const BaseLine = ({ baseLineArgs, onClose }) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const { token } = theme.useToken();

    const isInTimes = (time, times) => {
        const cur = dayjs(time, "HH:mm");
        const start = dayjs(times?.[0], "HH:mm");
        const end = dayjs(times?.[1], "HH:mm");
        return (cur.isAfter(start) || cur.isSame(start)) && cur.isBefore(end);
    };

    const Summary = () => {
        const summaryData = [
            { name: "关口负载功率", data: data?.gatewayBaseLinePowers },
            { name: `${data?.responseTypeZh}能力`, data: data?.responsePowers },
            { name: "储能计划出力功率", data: data?.energyStoragePlanPower },
        ];
        const options = {
            legend: {
                data: summaryData?.map(item => item?.name),
                textStyle: {
                    color: token.color11
                }
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
                axisLabel: {
                    interval: 0,
                    rotate: -45,
                    formatter: function (value) {
                        return value;
                    },
                },
                data: data?.times?.map(time => {
                    return {
                        value: time,
                        textStyle: {
                            fontSize: isInTimes(time, baseLineArgs?.responsePeriod) ? 10 : 8,
                            color: isInTimes(time, baseLineArgs?.responsePeriod) ? "red" : token.color11,
                        },
                    };
                }),
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value} kW",
                },
                axisPointer: {
                    snap: true,
                },
            },
            series: summaryData?.map((item, index) => ({
                name: item?.name,
                type: "line",
                smooth: false,
                data: item?.data,
                symbol: "none",
                lineStyle: {
                    width: 3,
                },
            })),
        };

        return (
            <div>
                <div>
                    最大负载：{data?.maxLoad}KW 响应能力：
                    {data?.responsePower}KW
                </div>
                <ReactECharts option={options} style={{ width: "100%", height: "600px" }} />
            </div>
        );
    };

    const Listory = () => {
        const historyData = [
            ...data?.baseLinePowersSource?.map(item => ({
                name: `${item?._1} 关口负载功率`,
                data: item?._2,
            })),
            ...data?.energyStoragePowerSource?.map(item => ({
                name: `${item?._1} 储能计划出力功率`,
                data: item?._2,
            })),
        ];
        const options = {
            legend: {
                data: historyData?.map(item => item?.name),
                textStyle: {
                    color: token.color11
                }
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
            },
            grid: {
                top: "20%",
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                axisLabel: {
                    interval: 0,
                    rotate: -45,
                    formatter: function (value) {
                        return value;
                    },
                },
                data: data?.times?.map(time => {
                    return {
                        value: time,
                        textStyle: {
                            fontSize: isInTimes(time, baseLineArgs?.responsePeriod) ? 10 : 8,
                            color: isInTimes(time, baseLineArgs?.responsePeriod) ? "red" : "black",
                        },
                    };
                }),
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value} kW",
                },
                axisPointer: {
                    snap: true,
                },
            },
            series: historyData?.map((item, index) => ({
                name: item?.name,
                type: "line",
                smooth: false,
                data: item?.data,
                symbol: "none",
                lineStyle: {
                    width: 3
                },
            })),
        };
        return <ReactECharts option={options} style={{ width: "100%", height: "600px" }} />;
    };

    const getCompanyBaseLine = async () => {
        let res = await getCompanyBaseLineServer(baseLineArgs);
        if (res?.data?.status == "SUCCESS") {
            console.log(res?.data?.data);
            setData(res?.data?.data);
        }
    };

    useEffect(() => {
        if (baseLineArgs) {
            setOpen(true);
            getCompanyBaseLine();
        } else {
            setOpen(false);
        }
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
            width={"80%"}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <div
                style={{
                    textAlign: "center",
                }}
            >
                响应时段：{baseLineArgs?.responsePeriod?.join(" - ")}
            </div>
            <Tabs defaultActiveKey="1" items={items} />
        </Modal>
    );
};

export default BaseLine;
