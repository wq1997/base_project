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
        {
            title: "电流",
            dataIndex: "batteryStackCurrent",
            width: 120,
            fixed: "left",
        },
    ];

    const itemStyle = {
        type: "line",
        symbolSize: 5,
        symbol: "circle",
        smooth: false,
        yAxisIndex: 0,
        showSymbol: false,
        name: "充电",
        lineStyle: {
            width: 3,
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
            let addColumns = [];
            const sceneName = exceptionScene?.sceneName;
            let tempList = [];
            if (
                // 小电流持续充电
                ["CONTINUOUS_LOW_CURRENT_CHARGING"].includes(sceneName)
            ) {
                tempList = excStackVoltageCurrents;
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
            }
            if (
                // 堆内簇SOC之间差值过大
                ["DIFFERENCE_IN_SOC_BETWEEN_CLUSTERS_TOO_LARGE"].includes(sceneName)
            ) {
                tempList = excStackVoltageCurrents;
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
            } else {
                let series = [];
                let labels = [];
                let keys = [];
                let unit;
                // 电芯电压
                if (
                    [
                        "CHARGE_HIGH_DISCHARGE_LOW",
                        "CHARGE_LOW_DISCHARGE_LOW",
                        "SINGLE_CELL_VOLTAGE_OUTLIER",
                        "MODULE_VOLTAGE_STRATIFICATION_WITHIN_CLUSTER",
                    ].includes(sceneName)
                ) {
                    tempList = excSingleVoltages;
                    unit = 'v'
                } else if (
                    // 电芯温度
                    [
                        "SINGLE_CELL_TEMPERATURE_OUTLIER",
                        "MODULE_TEMPERATURE_STRATIFICATION_WITHIN_CLUSTER",
                    ].includes(sceneName)
                ) {
                    tempList = excSingleTemperatures;
                } else if (
                    // 极柱温度
                    ["POLAR_TEMPERATURE_OUTLIER"].includes(sceneName)
                ) {
                    tempList = excPoleTemperatures;
                }
                keys = Object.keys(tempList?.[0])?.filter(keys => /^v\d+$/.test(keys));
                keys?.forEach(key => {
                    labels.push(key);
                    addColumns.push({
                        title: key,
                        dataIndex: key,
                        width: 80,
                    });
                });
                tempList?.forEach(item => {
                    series.push({
                        ...itemStyle,
                        data: keys?.map(key => item[key]),
                        name: item?.batteryStatus == "CHARGE" ? "充电" : "放电",
                        markPoint: {
                            data: exceptionScene?.physicalLocation?.split(",")?.map(key => ({
                                value: `${key}`,
                                xAxis: key,
                                yAxis: item[key],
                            })),
                        },
                    });
                });
                getOptions({
                    unit: "V",
                    labels,
                    series,
                });
            }

            setList(tempList);
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
