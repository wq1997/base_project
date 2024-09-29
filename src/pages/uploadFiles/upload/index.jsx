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
import { Title, InputSelect } from "@/components";
import {
    getUploadFilesInitData as getUploadFilesInitDataServer,
    saveUploadFiles as saveUploadFilesServer,
} from "@/services/api";
import { toFormData } from "@/utils/utils";
import { ALL_SPACE_REG } from "@/utils/constants";
import "./index.less";

const Company = ({ detailId, uploadOpen, onClose }) => {
    const [form] = Form.useForm();
    const [testFiles, setTestFiles] = useState([]);
    const [editData, setEditData] = useState();
    const [spinning, setSpinning] = useState(false);
    const [devicePositionList, setDevicePositionList] = useState([]);
    const [projectNameList, setProjectNameList] = useState([]);
    const [dataTypeAndDeviceTypeMapping, setDataTypeAndDeviceTypeMapping] = useState();
    const [templates, setTemplates] = useState([]);

    const minustestFiles = index => {
        const _testFiles = [...testFiles];
        _testFiles[index] = null;
        setTestFiles(_testFiles);
    };

    const getInitData = async () => {
        const res = await getUploadFilesInitDataServer(detailId);
        if (res?.data?.code == 0) {
            const {
                dataTypeAndDeviceTypeMapping,
                projectNameList,
                devicePositionList,
                testTemplateList,
                scene,
            } = res?.data?.data;
            setDataTypeAndDeviceTypeMapping(dataTypeAndDeviceTypeMapping);
            setProjectNameList(projectNameList);
            setDevicePositionList(devicePositionList);
            setTemplates(testTemplateList);
            form.setFieldsValue({
                ...scene,
                testDate: scene?.testDate ? dayjs(scene?.testDate, "YYYY-MM-DD") : undefined,
            });
            setEditData(scene);
        }
    };

    const onFinish = async values => {
        setSpinning(true);
        let res;
        try {
            res = await saveUploadFilesServer(
                toFormData({
                    id: detailId,
                    ...values,
                    files: values?.testUnits?.map(item => item.file[0]),
                    testUnits: values?.testUnits?.map(item => item.name),
                    testDate: dayjs(values?.testDate).format("YYYY-MM-DD"),
                })
            );
        } catch (e) {
            setSpinning(false);
        }
        setSpinning(false);
        if (res?.data) {
            if (res?.data?.code == 0) {
                message.success("解析成功");
            } else {
                message.error(res?.data?.message);
            }
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
                            {
                                pattern: ALL_SPACE_REG,
                                message: "请输入项目名称",
                            },
                        ]}
                    >
                        <InputSelect
                            defaultValue={editData?.projectName}
                            placeholder="请输入项目名称"
                            list={projectNameList}
                        />
                    </Form.Item>

                    <Form.Item
                        label="测试时间"
                        name="testDate"
                        rules={[
                            {
                                required: true,
                                message: "请选择测试时间",
                            },
                        ]}
                    >
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>

                    <Form.Item
                        label="测试模版"
                        name="testTemplate"
                        rules={[
                            {
                                required: true,
                                message: "请选择测试模版",
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择测试模版"
                            fieldNames={{
                                label: "desc",
                            }}
                            options={templates?.map(item => ({
                                label: item,
                                value: item,
                            }))}
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
                            {
                                pattern: ALL_SPACE_REG,
                                message: "请输入设备位置",
                            },
                        ]}
                    >
                        <InputSelect
                            defaultValue={editData?.devicePosition}
                            placeholder="请输入设备位置"
                            list={devicePositionList}
                        />
                    </Form.Item>

                    <Form.Item
                        label="设备箱号"
                        name="deviceBoxNo"
                        rules={[
                            {
                                required: true,
                                message: "请输入设备箱号",
                            },
                            {
                                pattern: ALL_SPACE_REG,
                                message: "请输入设备箱号",
                            },
                        ]}
                    >
                        <Input placeholder="最多输入30个字符" maxLength={30} />
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
                                                    {
                                                        pattern: ALL_SPACE_REG,
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
                                                    beforeUpload={file => {
                                                        const _testFiles = [...testFiles];
                                                        _testFiles[index] = file;
                                                        setTestFiles(_testFiles);
                                                        return false;
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
