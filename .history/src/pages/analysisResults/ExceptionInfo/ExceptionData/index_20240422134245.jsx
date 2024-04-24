import React, { useState, useEffect } from "react";
import { Button, Form, Table, Drawer, Descriptions } from "antd";
import { Title } from "@/components";
import { getExceptionData as getExceptionDataServer } from "@/services/api";
import ReactECharts from "echarts-for-react";

const ExceptionData = ({ infoId, onClose }) => {
    const [open, setOpen] = useState(false);
    const [list, setList] = useState([]);
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
            width: 150,
            fixed: "left",
        },
    ];

    const getOptions = (labels, charging, charging) => {
        return {
            xAxis: {
                type: "category",
                data: labels,
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    name: "充电",
                    data: charging,
                    type: "line",
                },
                { name: "放电", data: disCharging, type: "line" },
            ],
        };
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
                setList(excSingleVoltages);
                for (let i in Array.from({ length: 416 })) {
                    const vNumber = `v${+i + 1}`;
                    charging.push(
                        excSingleVoltages?.find(item => item?.batteryStackCurrent > 0)[vNumber]
                    );
                    disCharging.push(
                        excSingleVoltages?.find(item => item?.batteryStackCurrent < 0)[vNumber]
                    );
                    labels.push(vNumber);
                    addColumns.push({
                        title: vNumber,
                        dataIndex: vNumber,
                        width: 80,
                    });
                }
                console.log(labels);
                console.log(charging);
                console.log(disCharging);
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
    }, [infoId]);

    return (
        <Drawer
            title={<Title>异常数据</Title>}
            width={"90%"}
            confirmLoading={true}
            open={open}
            footer={null}
            onClose={() => onClose()}
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
            ></Table>
            <ReactECharts option={options} style={{ width: "100%", height: "500px" }} />
        </Drawer>
    );
};

export default ExceptionData;
