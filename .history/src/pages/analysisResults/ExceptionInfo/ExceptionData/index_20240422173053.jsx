import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Table, Drawer, Descriptions } from "antd";
import { Title } from "@/components";
import { getExceptionData as getExceptionDataServer } from "@/services/api";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const ExceptionData = ({ infoId, onClose }) => {
    const [open, setOpen] = useState(false);
    const [list, setList] = useState([]);
    const echartRef = useRef(null);
    const [options, setOptions] = useState({});
    const [exceptionScene, setExceptionScene] = useState(null);
    const [columns, setColumns] = useState([]);

    const baseColumns = [
        {
            title: "序号",
            dataIndex: "projectName",
            fixed: "left",
            width: 80,
            render: (text, record, index) => {
                return index + 1;
            },
        },
        {
            title: "时间",
            dataIndex: "systemTime",
            width: 120,
            fixed: "left",
        },
    ];

    const itemStyle = {
        type: "line",
        symbolSize: 1,
        symbol: "circle",
        smooth: false,
        yAxisIndex: 0,
        showSymbol: false,
        name: "充电",
        lineStyle: {
            width: 2,
        },
    };

    const getOptions = ({ unit, labels, series }) => {
        setOptions({
            legend: {
                icon: "circle",
                itemWidth: 10,
                itemGap: 20,
            },
            xAxis: {
                type: "category",
                data: labels,
                axisLabel: {
                    showMaxLabel: true, //固定显示滚动条最后一条数据
                },
            },
            yAxis: {
                axisLabel: {
                    formatter: `{value} ${unit}`,
                },
                type: "value",
                minInterval: 1,
            },
            tooltip: {
                trigger: "axis",
                valueFormatter: function (value) {
                    return value + ` ${unit}`;
                },
            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 20,
                },
            ],
            grid: {
                top: 80,
                left: 80,
                right: 80,
            },
            series,
        });
    };

    const getInitData = async () => {
        const res = await getExceptionDataServer(infoId);
        if (res?.data?.code == 0) {
            const {
                exceptionScene,
                excSingleVoltages,
                excSingleTemperatures,
                excPoleTemperatures,
                excStackVoltageCurrents,
            } = res?.data?.data;
            setExceptionScene(exceptionScene);
            let addColumns = [
                {
                    title: "电流",
                    dataIndex: "batteryStackCurrent",
                    width: 120,
                    fixed: "left",
                },
            ];
            const sceneName = exceptionScene?.sceneName;
            if (
                // 电芯电压
                sceneName == "CHARGE_HIGH_DISCHARGE_LOW" ||
                sceneName == "CHARGE_LOW_DISCHARGE_LOW" ||
                sceneName == "SINGLE_CELL_VOLTAGE_OUTLIER" ||
                sceneName == "MODULE_VOLTAGE_STRATIFICATION_WITHIN_CLUSTER"
            ) {
                const labels = [];
                const charging = [];
                const disCharging = [];
                const chargingItem = excSingleVoltages?.find(item => item?.batteryStackCurrent > 0);
                const disChargingItem = excSingleVoltages?.find(
                    item => item?.batteryStackCurrent < 0
                );
                setList(excSingleVoltages);
                for (let i in Array.from({ length: 416 })) {
                    const vNumber = `v${+i + 1}`;
                    charging.push(chargingItem[vNumber]);
                    disCharging.push(disChargingItem[vNumber]);
                    labels.push(vNumber);
                    addColumns.push({
                        title: vNumber,
                        dataIndex: vNumber,
                        width: 80,
                    });
                }
                const matterPoints = exceptionScene?.physicalLocation?.split(",");
                getOptions("V", labels, [
                    {
                        data: charging,
                       ...itemStyle,
                        name: "充电",
                        markPoint: {
                            data: matterPoints?.map(item => ({
                                value: `${item}`,
                                xAxis: item,
                                yAxis: chargingItem[item],
                            })),
                        },
                        lineStyle: {
                            width: 2,
                        },
                    },
                    {
                        data: disCharging,
                        type: "line",
                        name: "放电",
                        symbolSize: 1,
                        symbol: "circle",
                        smooth: false,
                        yAxisIndex: 0,
                        showSymbol: false,
                        markPoint: {
                            data: matterPoints?.map(item => ({
                                value: `${item}`,
                                xAxis: item,
                                yAxis: disChargingItem[item],
                            })),
                        },
                        lineStyle: {
                            width: 2,
                        },
                    },
                ]);
            } else if (
                // 电芯温度
                sceneName == "SINGLE_CELL_TEMPERATURE_OUTLIER" ||
                sceneName == "MODULE_TEMPERATURE_STRATIFICATION_WITHIN_CLUSTER"
            ) {
                setList(excSingleTemperatures);
                for (let i in Array.from({ length: 224 })) {
                    addColumns.push({
                        title: `t${+i + 1}`,
                        dataIndex: `t${+i + 1}`,
                        width: 80,
                    });
                }
            } else if (
                // 极柱温度
                sceneName == "POLAR_TEMPERATURE_OUTLIER"
            ) {
                setList(excPoleTemperatures);
                for (let i in Array.from({ length: 32 })) {
                    addColumns.push({
                        title: `pt${+i + 1}`,
                        dataIndex: `pt${+i + 1}`,
                        width: 80,
                    });
                }
            } else if (
                // 小电流持续充电
                sceneName == "CONTINUOUS_LOW_CURRENT_CHARGING"
            ) {
                setList(excStackVoltageCurrents);
                addColumns = [
                    {
                        title: "电流(A)",
                        dataIndex: "batteryStackCurrent",
                    },
                    {
                        title: "电压(V)",
                        dataIndex: "batteryStackVoltage",
                    },
                ];
            } else if (
                // 堆内簇SOC之间差值过大
                sceneName == "DIFFERENCE_IN_SOC_BETWEEN_CLUSTERS_TOO_LARGE"
            ) {
                setList(excStackVoltageCurrents);
                addColumns = [
                    {
                        title: "簇号",
                        dataIndex: "clusterNo",
                    },
                    {
                        title: "簇soc",
                        dataIndex: "soc",
                    },
                ];
            }

            setColumns([...baseColumns, ...addColumns]);
        }
    };

    useEffect(() => {
        setOpen(Boolean(infoId));
        if (infoId) {
            getInitData();
        }
        setTimeout(function () {
            echartRef.current.props.style.width =
                document.getElementById("drawer").offsetWidth + "px";
        });
    }, [infoId]);

    return (
        <Drawer
            title={<Title>异常数据</Title>}
            width={"90%"}
            confirmLoading={true}
            open={open}
            footer={null}
            onClose={() => onClose()}
            id="drawer"
        >
            <Descriptions title="">
                <Descriptions.Item label="簇号">{exceptionScene?.clusterNumber}</Descriptions.Item>
                <Descriptions.Item label="场景名称">
                    {exceptionScene?.sceneNameZh}
                </Descriptions.Item>
                <Descriptions.Item label="异常原因(仅供参考)">
                    {exceptionScene?.exceptionReasonZh}
                </Descriptions.Item>
            </Descriptions>
            <Table
                rowKey="id"
                dataSource={list}
                columns={columns}
                scroll={{
                    x: exceptionScene?.sceneName != "CONTINUOUS_LOW_CURRENT_CHARGING" ? 1500 : 0,
                }}
                pagination={false}
            ></Table>
            <ReactECharts ref={echartRef} option={options} style={{ height: "500px" }} />
        </Drawer>
    );
};

export default ExceptionData;
