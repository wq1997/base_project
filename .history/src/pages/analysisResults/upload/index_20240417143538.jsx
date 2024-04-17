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
    const [testFiles, setTestFiles] = useState([]);
    const [editData, setEditData] = useState();
    const [spinning, setSpinning] = useState(false);
    const [projectName, setProjectName] = useState([]);
    const [projectNameOptions, setProjectNameOptions] = useState([]);
    const [dimension, setDimension] = useState();
    const [dataTypeOptions, setDataTypeOptions] = useState([]);
    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);
    const [dimensionOptions, setDimensionOptions] = useState([]);

    const minustestFiles = index => {
        const _testFiles = [...testFiles];
        _testFiles[index] = null;
        setTestFiles(_testFiles);
    };

    const getInitData = async () => {
        const res = await getUploadFilesInitDataServer(detailId);
        if (res?.data?.code == 0) {
            const { dataTypeEnumList, deviceTypeEnumList, dimensionEnumList, projectNameList, scene } =
                res?.data?.data;
            setDataTypeOptions(dataTypeEnumList);
            setDeviceTypeOptions(deviceTypeEnumList);
            setDimensionOptions(dimensionEnumList);
            setProjectNameOptions(projectNameList?.map(item => ({ label: item, value: item })));
            form.setFieldsValue(scene);
            setEditData(scene);
        }
    };



    const onFinish = async values => {
        setSpinning(true);
        const res = await saveUploadFilesServer(
            toFormData({
                ...values,
                files: values?.testUnits?.map(item => item.file[0]),
                testUnits: values?.testUnits?.map(item => item.name),
            })
        );
        setSpinning(false);
        if (res?.data?.code == 0) {
            message.success("解析成功");
        } else {
            message.error("解析失败");
        }
        onCloseModal();
    };

    useEffect(() => {
        getInitData();
        if (uploadOpen) {
            getInitData();
        } else {
            form.resetFields();
        }
    }, [uploadOpen]);

    const onCloseModal = () => {
        setSpinning(false);
        setTestFiles([]);
        form.setFieldValue("testUnits", undefined);
        onClose();
    };

    return (
        <Modal
            title={<Title>上传文件</Title>}
            width={700}
            confirmLoading={true}
            open={uploadOpen}
            footer={null}
            onCancel={onCloseModal}
        >
            
        </Modal>
    );
};

export default Company;
