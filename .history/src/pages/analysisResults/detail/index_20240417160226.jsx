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
            title: "序号",
            dataIndex: "projectName",
            fixed: "left",
            width:80,
            render: (text, record, index) => {
                return index + 1;
            },
        },
        {
            title: "簇号",
            dataIndex: "clusterNumber",
        },
        {
            title: "场景名称",
            dataIndex: "dataTypeZh",
        },
        {
            title: "场景说明",
            dataIndex: "sceneDescription",
        },
        {
            title: "异常原因(仅供参考)",
            dataIndex: "exceptionReason",
        },
        {
            title: "物理位置",
            dataIndex: "physicalLocation",
        },
        {
            title: "操作",
            dataIndex: "operate",
            fixed: "right",
            width:120,
            render: (_, { id }) => {
                return (
                    <Button type="link" onClick={() => setDetailId(id)}>
                        查看详情
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
            width={"90%"}
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
    );
};

export default Company;
