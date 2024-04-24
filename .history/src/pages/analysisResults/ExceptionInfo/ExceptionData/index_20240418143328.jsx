import React, { useState, useEffect } from "react";
import { Button, Form, Table, Drawer, Descriptions } from "antd";
import { Title } from "@/components";
import { getExceptionData as getExceptionDataServer } from "@/services/api";

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
        },
    ];

    const getInitData = async () => {
        const res = await getExceptionDataServer(infoId);
        if (res?.data?.code == 0) {
            const { exceptionScene, excSingleVoltages } = res?.data?.data;
            setExceptionScene(exceptionScene);
            const addColumns = [];
            const number = 0
            const sceneName = exceptionScene?.sceneName;
            if (
                sceneName == "CHARGE_HIGH_DISCHARGE_LOW" ||
                sceneName == "CHARGE_LOW_DISCHARGE_LOW" ||
                sceneName == "SINGLE_CELL_VOLTAGE_OUTLIER" ||
                sceneName == 'MODULE_VOLTAGE_STRATIFICATION_WITHIN_CLUSTER'
            ) {
                setList(excSingleVoltages);
                number = 416

            }
            for (let i in Array.from({ length: number })) {
                addColumns.push({
                    title: `v${+i + 1}`,
                    dataIndex: `v${+i + 1}`,
                    width: 80,
                });
            }
            setColumns([
                ...baseColumns,
                ...addColumns,
                {
                    title: "操作",
                    dataIndex: "operate",
                    fixed: "right",
                    width: 120,
                    render: (_, { id }) => {
                        return (
                            <Button type="link" onClick={() => { }}>
                                查看详情
                            </Button>
                        );
                    },
                },
            ]);
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
                    x: 2000,
                }}
            ></Table>
        </Drawer>
    );
};

export default ExceptionData;
