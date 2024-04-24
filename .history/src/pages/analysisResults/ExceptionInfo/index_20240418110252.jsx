import React, { useState, useEffect } from "react";
import { Button, Form, Table, Drawer } from "antd";
import { Title } from "@/components";
import { getAnalysisResultsInfo as getAnalysisResultsInfoServer } from "@/services/api";
import ExceptionData from "./ExceptionData";

const ExceptionInfo = ({ resultId, onClose }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [list, setList] = useState([]);
    const [infoId, setInfoId] = useState(undefined);

    const columns = [
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
            title: "簇号",
            dataIndex: "clusterNumber",
            width: 80,
        },
        {
            title: "场景名称",
            dataIndex: "sceneNameZh",
            width: 150,
        },
        {
            title: "场景说明",
            dataIndex: "sceneDescription",
        },
        {
            title: "异常原因(仅供参考)",
            dataIndex: "exceptionReasonZh",
        },
        {
            title: "物理位置",
            dataIndex: "physicalLocation",
        },
        {
            title: "操作",
            dataIndex: "operate",
            fixed: "right",
            width: 120,
            render: (_, { sceneId }) => {
                return (
                    <Button type="link" onClick={() => setInfoId(sceneId)}>
                        查看详情
                    </Button>
                );
            },
        },
    ];

    const getInitData = async () => {
        const res = await getAnalysisResultsInfoServer(resultId);
        if (res?.data?.code == 0) {
            setList(res?.data?.data);
        }
    };

    useEffect(() => {
        setOpen(Boolean(resultId));
        if (resultId) {
            getInitData();
        }
    }, [resultId]);

    return (
        <>
            <ExceptionData
                infoId={infoId}
                onClose={() => {
                    setInfoId(undefined);
                }}
            />
            <Drawer
                title={<Title>异常详情</Title>}
                width={"100%"}
                confirmLoading={true}
                open={open}
                footer={null}
                onClose={() => onClose()}
            >
                <Table
                    rowKey="id"
                    dataSource={list}
                    columns={columns}
                    scroll={{
                        x: 2000,
                    }}
                ></Table>
            </Drawer>
        </>
    );
};

export default ExceptionInfo;