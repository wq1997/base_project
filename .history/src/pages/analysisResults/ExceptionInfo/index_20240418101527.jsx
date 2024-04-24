import React, { useState, useEffect } from "react";
import { Button, Form, Table, Drawer } from "antd";
import { Title } from "@/components";
import { getAnalysisResultsDetail as getAnalysisResultsDetailServer } from "@/services/api";
import ExceptionDetail from "./ExceptionDetail";

const ExceptionDetail = ({ resultId, onClose }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [list, setList] = useState([]);
    const [list, setList] = useState([]);

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
            render: (_, { id }) => {
                return (
                    <Button type="link" onClick={() => setexceptionDetailId(id)}>
                        查看详情
                    </Button>
                );
            },
        },
    ];

    const getInitData = async () => {
        const res = await getAnalysisResultsDetailServer(resultId);
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
            <ExceptionDetail
                resultId={resultId}
                onClose={() => {
                    setResultId(undefined);
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

export default ExceptionDetail;
