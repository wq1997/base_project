import React, { useState, useEffect } from "react";
import {
    message,
    Button,
    Form,
    Input,
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
import {
    getUploadFilesInitData as getUploadFilesInitDataServer,
    saveUploadFiles as saveUploadFilesServer,
} from "@/services/api";
import { toFormData } from "@/utils/utils";
import "./index.less";

const uploadUrl = process.env.API_URL_1 + "/attachment/upload2";

const Company = ({ detailId, uploadOpen, onClose }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [testFiles, setTestFiles] = useState([]);

    const getInitData = async () => {
        const res = await getUploadFilesInitDataServer(detailId);
        if (res?.data?.code == 0) {
            console.log(res?.data?.data);
        }
    };

    useEffect(() => {
        setOpen(Boolean(detailId));
        if (detailId) {
            getInitData();
        }
    }, [detailId]);

    const onCloseModal = () => {
        onClose();
    };

    return (
        <Drawer
            title={<Title>异常详情</Title>}
            width={700}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={onCloseModal}
        ></Drawer>
    );
};

export default Company;
