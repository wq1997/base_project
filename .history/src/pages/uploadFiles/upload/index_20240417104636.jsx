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
            const {
                dataTypeEnumList,
                deviceTypeEnumList,
                dimensionEnumList,
                projectNameList,
                scene,
            } = res?.data?.data;
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
            <Spin spinning={spinning} tip="解析中...">
                <Form
                    name="basic"
                    labelCol={{
                        span: 7,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="项目名称"
                        name="projectName"
                        rules={[
                            {
                                required: true,
                                message: "请输入项目名称",
                            },
                        ]}
                    >
                        <Select
                            placeholder="请输入项目名称"
                            showSearch={true}
                            options={projectNameOptions}
                        />
                    </Form.Item>

                    <Form.Item
                        label="子项目名称"
                        name="childrenProjectName"
                        rules={[
                            {
                                required: true,
                                message: "请输入子项目名称",
                            },
                        ]}
                    >
                        <Input placeholder="不可以重复，最多输入30个字符" maxLength={30} />
                    </Form.Item>

                    <Form.Item
                        label="数据类型"
                        name="dataType"
                        rules={[
                            {
                                required: true,
                                message: "请选择数据类型",
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择数据类型"
                            fieldNames={{
                                label: "desc",
                            }}
                            options={dataTypeOptions}
                        />
                    </Form.Item>

                    <Form.Item
                        label="设备类型"
                        name="deviceType"
                        rules={[
                            {
                                required: true,
                                message: "请选择设备类型",
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择设备类型"
                            fieldNames={{
                                label: "desc",
                            }}
                            options={deviceTypeOptions}
                        />
                    </Form.Item>

                    <Form.Item
                        label="设备位置"
                        name="devicePosition"
                        rules={[
                            {
                                required: true,
                                message: "请输入设备位置",
                            },
                        ]}
                    >
                        <Input placeholder="最多输入30个字符" maxLength={30} />
                    </Form.Item>

                    <Form.Item
                        label="设备编号"
                        name="deviceBoxNo"
                        rules={[
                            {
                                required: true,
                                message: "请输入设备编号",
                            },
                        ]}
                    >
                        <Input placeholder="最多输入30个字符" maxLength={30} />
                    </Form.Item>

                    <Form.Item
                        label="取值维度"
                        name="dimension"
                        rules={[
                            {
                                required: true,
                                message: "请选择取值维度",
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择取值维度"
                            fieldNames={{
                                label: "desc",
                            }}
                            options={dimensionOptions}
                            onChange={value => {
                                setDimension(value);
                                form.setFieldValue("testUnits", undefined);
                                setTestFiles([]);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={"测试单元"}
                        name="testUnits"
                        rules={[
                            {
                                required: true,
                                message: "请输入测试单元",
                            },
                        ]}
                        style={{ marginBottom: 24 }}
                    >
                        <Form.List name="testUnits">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }, index) => (
                                        <Space
                                            key={key}
                                            style={{
                                                display: "flex",
                                                marginBottom: 8,
                                            }}
                                            align="baseline"
                                        >
                                            <Form.Item
                                                {...restField}
                                                name={[name, "name"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入测试单元名称",
                                                    },
                                                ]}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Input
                                                    placeholder="最多输入30个字符"
                                                    maxLength={30}
                                                    style={{ width: "200px" }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "file"]}
                                                getValueFromEvent={e => {
                                                    if (Array.isArray(e)) {
                                                        return e;
                                                    }
                                                    return e && e.fileList;
                                                }}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请上传文件",
                                                    },
                                                ]}
                                                style={{
                                                    marginBottom: 0,
                                                    position: "relative",
                                                    top: "5px",
                                                }}
                                            >
                                                <Upload
                                                    maxCount={1}
                                                    showUploadList={false}
                                                    onChange={({ file }) => {
                                                        if (file?.status == "done") {
                                                            const _testFiles = [...testFiles];
                                                            _testFiles[index] = file;
                                                            setTestFiles(_testFiles);
                                                        }
                                                    }}
                                                    onRemove={() => {
                                                        minustestFiles(index);
                                                    }}
                                                >
                                                    <Button
                                                        type={testFiles[index] ? "text" : "default"}
                                                    >
                                                        <span
                                                            style={{
                                                                width: "140px",
                                                                overflow: "hidden",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            }}
                                                        >
                                                            {testFiles[index]
                                                                ? testFiles[index]?.name
                                                                : "点击上传"}
                                                        </span>
                                                    </Button>
                                                </Upload>
                                            </Form.Item>
                                            <MinusCircleOutlined
                                                onClick={() => {
                                                    remove(name);
                                                    const _testFiles = [...testFiles];
                                                    _testFiles.splice(index, 1);
                                                    setTestFiles(_testFiles);
                                                }}
                                            />
                                        </Space>
                                    ))}
                                    <Form.Item noStyle>
                                        {dimension == "HEAP" && fields?.length == 1 ? (
                                            null
                                        ) : (
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    add();
                                                }}
                                                block
                                                icon={<PlusOutlined />}
                                            >
                                                点击添加
                                            </Button>
                                        )}
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Form.Item>

                    <Form.Item label="备注" name="remark">
                        <Input.TextArea placeholder="请输入备注" />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 16,
                            span: 5,
                        }}
                    >
                        <Space>
                            <Button onClick={onCloseModal}>取消</Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
};

export default Company;
