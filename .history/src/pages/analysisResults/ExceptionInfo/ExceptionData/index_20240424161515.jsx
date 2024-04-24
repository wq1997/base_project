import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Table, Drawer, Descriptions } from "antd";
import { Title } from "@/components";
import { getExceptionData as getExceptionDataServer } from "@/services/api";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const ExceptionData = ({ infoId, onClose }) => {
    const [open, setOpen] = useState(false);
    const [showChart, setShowChart] = useState(false);
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

    const getVisualMap = ({ groups, groupLength, maxNum }) => {
        let data = [];
        const getRange = num => [num * groupLength, num * groupLength + groupLength];
        groups.forEach((item, index) => {
            const [curL, curR] = getRange(item);
            if (index == 0 && curL != 0) {
                data.push({
                    color: "#91c7ae",
                    gt: 0,
                    lte: curL,
                });
            }
            data.push({
                color: "red",
                gt: curL,
                lte: curR,
            });
            if (index != groups?.length - 1) {
                const nextL = getRange(groups[index + 1])[0];
                if (curR + 1 != nextL) {
                    data.push({
                        color: "#91c7ae",
                        gt: curR,
                        lte: nextL,
                    });
                }
            } else {
                if (curR != maxNum) {
                    data.push({
                        color: "#91c7ae",
                        gt: curR,
                        lte: maxNum,
                    });
                }
            }
        });
        return data;
    };

    const getOptions = ({ unit, labels, pieces, series }) => {
        setOptions({
            legend: {
                icon: "circle",
                itemWidth: 10,
                itemGap: 20,
                show:false
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
            visualMap: [
                {
                    show: false,
                    dimension: 0,
                    seriesIndex: 0, //第一部分数据
                    pieces,
                },
            ],
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
            const sceneName = exceptionScene?.sceneName;
            const physicalLocation = exceptionScene?.physicalLocation?.split(",");
            let addColumns = [];
            let tempList = [];
            let isShowChart = false;
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
            } else if (
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
                isShowChart = true;
                let series = [];
                let labels = [];
                let keys = [];
                let unit;
                let keyUnit;
                let regExp;
                addColumns.push({
                    title: "电流(A)",
                    dataIndex: "batteryStackCurrent",
                    width: 120,
                    fixed: "left",
                });
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
                    unit = "v";
                    keyUnit = "v";
                } else if (
                    // 电芯温度
                    [
                        "SINGLE_CELL_TEMPERATURE_OUTLIER",
                        "MODULE_TEMPERATURE_STRATIFICATION_WITHIN_CLUSTER",
                    ].includes(sceneName)
                ) {
                    tempList = excSingleTemperatures;
                    unit = "℃";
                    keyUnit = "t";
                } else if (
                    // 极柱温度
                    ["POLAR_TEMPERATURE_OUTLIER"].includes(sceneName)
                ) {
                    tempList = excPoleTemperatures;
                    unit = "℃";
                    keyUnit = "t";
                }
                regExp = new RegExp(`^${keyUnit}\\d+$`);
                keys = Object.keys(tempList?.[0])?.filter(keys => regExp.test(keys));
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
                            data: physicalLocation?.map(key => ({
                                value: `${key}`,
                                xAxis: key,
                                yAxis: item[key],
                            })),
                        },
                    });
                });
                const showPieces = [
                    "MODULE_VOLTAGE_STRATIFICATION_WITHIN_CLUSTER",
                    "MODULE_TEMPERATURE_STRATIFICATION_WITHIN_CLUSTER",
                ].includes(sceneName);
                console.log(physicalLocation);
                getOptions({
                    unit,
                    labels,
                    series,
                    ...(showPieces && {
                        pieces: getVisualMap({
                            groups: physicalLocation,
                            groupLength:
                                sceneName == "MODULE_VOLTAGE_STRATIFICATION_WITHIN_CLUSTER"
                                    ? 13
                                    : 7,
                            maxNum: keys?.length,
                        }),
                    }),
                });
            }
            setShowChart(isShowChart);
            setList(tempList);
            setColumns([...baseColumns, ...addColumns]);
        }
    };

    useEffect(() => {
        setOpen(Boolean(infoId));
        if (infoId) {
            setOptions({});
            getInitData();
        }
        setTimeout(function () {
            echartRef.current.props.style.width =
                document.getElementById("drawer").offsetWidth + "px";
        });
    }, [infoId]);

    return (
        <Drawer
            title={<Title>异常数据 </Title>}
            width={"90%"}
            confirmLoading={true}
            open={open}
            footer={null}
            onClose={() => onClose()}
            id="drawer"
            destroyOnClose={true}
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

            {showChart && (
                <ReactECharts ref={echartRef} option={options} style={{ height: "500px" }} />
            )}
        </Drawer>
    );
};

export default ExceptionData;
