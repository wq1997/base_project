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
    Upload
} from "antd";
import { PlusCircleOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Title } from "@/components";
import { MyUpload } from "@/components";
import "./index.less";

const uploadUrl = process.env.API_URL_1 + "/attachment/upload2";

const Company = ({ uploadOpen, onClose }) => {
    const [form] = Form.useForm();
    const [testFiles, setTestFiles] = useState([]);
    const [editData, setEditData] = useState();

    const addTestFiles = () => {
        setTestFiles([...testFiles, { name: undefined, value: undefined }]);
    };

    const minusTestFiles = index => {
        const _testFiles = [...testFiles];
        _testFiles.splice(index, 1);
        setTestFiles(_testFiles);
    };

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { responseTypes, responseTimeTypes } = res?.data?.data;
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    const onFinish = async values => {
        return console.log(
            values?.files?.map(item => ({
                name: item?.name,
                fileId: item?.value[0]?.name,
            }))
        );
        const { appointedTimeFrom, appointedTimeTo } = values;
        const res = await saveEnterRecordServer({
            ...values,
            appointedTimeFrom: dayjs(appointedTimeFrom).format("YYYY-MM-DD HH:mm"),
            appointedTimeTo: dayjs(appointedTimeTo).format("YYYY-MM-DD HH:mm"),
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("录入成功");
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        if (uploadOpen) {
            // getSearchInitData();
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
            onCancel={() => onClose(false)}
        >
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
                    name="whPrice"
                    rules={[
                        {
                            required: true,
                            message: "请输入项目名称",
                        },
                    ]}
                >
                    <Input placeholder="可以重复，最多输入30个字符" maxLength={30} />
                </Form.Item>

                <Form.Item
                    label="子项目名称"
                    name="whPrice"
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
                    name="companyCode"
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
                            label: "name",
                            value: "code",
                        }}
                    // options={companies}
                    // onChange={value => {
                    //     const { contractedResponsePower } = companies?.find(
                    //         item => item?.code == value
                    //     );
                    //     setContractedResponsePower(contractedResponsePower);
                    // }}
                    />
                </Form.Item>

                <Form.Item
                    label="设备类型"
                    name="companyCode"
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
                            label: "name",
                            value: "code",
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="设备位置"
                    name="whPrice"
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
                    name="whPrice"
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
                        placeholder="请选择设取值维度"
                        options={[
                            { label: "堆", value: 1 },
                            { label: "簇", value: 2 },
                        ]}
                    // fieldNames={{
                    //     label: "name",
                    //     value: "code",
                    // }}
                    />
                </Form.Item>

                <Form.Item
                    label={"测试单元"}
                    name="files"
                    rules={[
                        {
                            required: true,
                            message: "请输入测试单元",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                console.log(2222, getFieldValue("dimension"));
                            },
                        }),
                    ]}
                    style={{ marginBottom: 0 }}
                >
                    <Form.List name="files">
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
                                            name={[name, "value"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "请上传文件",
                                                },
                                            ]}
                                            style={{ marginBottom: 0 }}
                                        >
                                            {testFiles[index]?.value ? (
                                                <Tooltip title={testFiles[index]?.value?.name}>
                                                    <div
                                                        style={{
                                                            width: "144px",
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                        }}
                                                    >
                                                        {testFiles[index]?.value?.name}
                                                    </div>
                                                </Tooltip>
                                            ) : (
                                                <Upload
                                                     
                                                >
                                                     <Button  >Click to Upload</Button>
                                                </Upload>
                                            )}
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
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            const _testFiles = [...testFiles, { value: undefined }];
                                            setTestFiles(_testFiles);
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

                <Form.Item label="文件" name="contractAtt">
                    <MyUpload
                        url={uploadUrl}
                        files={editData?.contractAtt?.map(item => ({
                            ...item,
                            name: item.fileName,
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 16,
                        span: 5,
                    }}
                >
                    <Space>
                        <Button onClick={() => onClose(false)}>取消</Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Company;
