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
    Tooltip,
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
import "./index.less";

const uploadUrl = process.env.API_URL_1 + "/attachment/upload2";

const Company = ({ uploadOpen, onClose }) => {
    const [form] = Form.useForm();
    const [testFiles, settestFiles] = useState([]);
    const [editData, setEditData] = useState();
    const [dimension, setDimension] = useState();
    const [dataTypeOptions, setDataTypeOptions] = useState([]);
    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);
    const [dimensionOptions, setDimensionOptions] = useState([]);

    const minustestFiles = index => {
        const _testFiles = [...testFiles];
        _testFiles[index] = null;
        settestFiles(_testFiles);
    };

    const getInitData = async () => {
        const res = await getUploadFilesInitDataServer();
        if (res?.data?.code == 0) {
            const { dataTypeEnumList, deviceTypeEnumList, dimensionEnumList } = res?.data?.data;
            setDataTypeOptions(dataTypeEnumList);
            setDeviceTypeOptions(deviceTypeEnumList);
            setDimensionOptions(dimensionEnumList);
        }
    };

    const toFormData = data => {
        if (data === null) return null;
        return Object.keys(data).reduce((formData, item) => {
            if (item === "files") {
                //特殊判断如果内容为files数组，就让里面值不用走JSON.stringify
                data[item] &&
                    data[item].forEach(curr => {
                        formData.append("files", curr.originFileObj);
                    });
            } else {
                formData.append(item, data[item]);
            }
            return formData;
        }, new FormData());
    };

    const onFinish = async values => {
        const res = await saveUploadFilesServer(
            toFormData({
                ...values,
                files: values?.testUnits?.map(item => item.file[0]),
                testUnits: values?.testUnits?.map(item => item.name),
            })
        );
        if (res?.data?.code == 0) {
            message.success("解析成功");
            onClose();
        } else {
            message.error("解析失败");
        }
    };

    useEffect(() => {
        getInitData();
        if (uploadOpen) {
            getInitData();
        } else {
            form.resetFields();
        }
    }, [uploadOpen]);

    return (
        <Modal
            title={<Title>上传文件</Title>}
            width={700}
            confirmLoading={true}
            open={uploadOpen}
            footer={null}
            onCancel={() => onClose()}
        >
             <Spin tip="Loading">
        <div className="content" />
      </Spin>
           
        </Modal>
    );
};

export default Company;
