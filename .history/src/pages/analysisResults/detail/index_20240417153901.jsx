import React, { useState, useEffect } from "react";
import {
    message,
    Button,
    Form,
    Table,
    Modal,
    Select,
    DatePicker,
    Space,
    InputNumber,
    Spin,
    Upload,
    Drawer,
} from "antd";
import {
    PlusCircleOutlined,
    PlusOutlined,
    MinusCircleOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Title } from "@/components";
import { MyUpload } from "@/components";
import { getAnalysisResultsDetail as getAnalysisResultsDetailServer } from "@/services/api";
import { toFormData } from "@/utils/utils";
import "./index.less";

const uploadUrl = process.env.API_URL_1 + "/attachment/upload2";

const Company = ({ detailId, onClose }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [list, setList] = useState([]);

    
    const columns = [
        {
            title: "项目名称",
            dataIndex: "projectName",
        },
        {
            title: "子项目名称",
            dataIndex: "childrenProjectName",
        },
        {
            title: "数据类型",
            dataIndex: "dataTypeZh",
        },
        {
            title: "设备类型",
            dataIndex: "deviceTypeZh",
        },
        {
            title: "设备位置",
            dataIndex: "devicePosition",
        },
        {
            title: "设备编号",
            dataIndex: "deviceBoxNo",
        },
        {
            title: "取值维度",
            dataIndex: "dimensionZh",
        },
        {
            title: "上传时间",
            dataIndex: "uploadTime",
        },
        {
            title: "异常总数",
            dataIndex: "exceptionCount",
        },
        {
            title: "测试报告",
            dataIndex: "uploadTime",
            render: (_, { id, canExport }) => {
                return (
                    canExport && (
                        <Button
                            type="link"
                            onClick={() => {
                                let url = `${process.env.API_URL_1}/scene/export-test-report/${id}`;
                                window.open(url);
                            }}
                        >
                            导出
                        </Button>
                    )
                );
            },
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, { id,   }) => {
                return (
                    <Button type="link" onClick={() => setDetailId(id)}>
                            查看异常详情
                        </Button>
                );
            },
        },
    ];

    const getInitData = async () => {
        const res = await getAnalysisResultsDetailServer(detailId);
        if (res?.data?.code == 0) {
            setList(res?.data?.data);
        }
    };

    useEffect(() => {
        setOpen(Boolean(detailId));
        if (detailId) {
            getInitData();
        }
    }, [detailId]);

    return (
        <Drawer
            title={<Title>异常详情</Title>}
            width={700}
            confirmLoading={true}
            open={open}
            footer={null}
            onClose={() => onClose()}
        >
            <Table rowKey="id" dataSource={list} columns={columns}></Table>
        </Drawer>
    );
};

export default Company;
