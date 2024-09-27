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
    Row,
    Col,
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
    getTemplateInitData as getTemplateInitDataServer,
    updateTemplete as updateTempleteServer,
} from "@/services/api";
import { toFormData } from "@/utils/utils";
import { ALL_SPACE_REG } from "@/utils/constants";
import "./index.less";

const Company = ({ editId, detailId, uploadOpen, onClose }) => {
    const [form] = Form.useForm();
    const [testFiles, setTestFiles] = useState([]);
    const [editData, setEditData] = useState();
    const [spinning, setSpinning] = useState(false);
    const [dataTypeOptions, setDataTypeOptions] = useState([]);
    const [dimensionOptions, setDimensionOptions] = useState([]);
    const [columnOptions, setColumnOptions] = useState([]);
    const [timeOptions, setTimeOptions] = useState([]);
    const [currentOptions, setCurrentOptions] = useState([]);
    const [volUnitOptions, setVolUnitOptions] = useState([]);

    const getInitData = async () => {
        const res = await getTemplateInitDataServer(editId);
        if (res?.data?.code == 0) {
            const {
                dataTypeList,
                dimensionEnumList,
                columnPositionList,
                timeFormatList,
                currentStrategyList,
                voltageUnitList,
                templateVo,
            } = res?.data?.data;
            setDataTypeOptions(dataTypeList);
            setTimeOptions(timeFormatList);
            setDimensionOptions(dimensionEnumList);
            setColumnOptions(
                columnPositionList?.map(item => ({
                    label: item,
                    value: item,
                }))
            );
            setCurrentOptions(currentStrategyList);
            setVolUnitOptions(voltageUnitList);
            form.setFieldsValue({
                ...templateVo,
            });
            setEditData(templateVo);
        }
    };

    const onFinish = async values => {
        setSpinning(true);
        let res;
        try {
            res = await updateTempleteServer({
                id: editId,
                ...values,
            });
        } catch (e) {
            setSpinning(false);
        }
        setSpinning(false);
        if (res?.data?.code == 0) {
            message.success(editId ? "编辑成功" : "新增成功");
            onCloseModal();
        } else {
            message.error(res?.data?.message);
        }
    };

    useEffect(() => {
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
            title={<Title>{editId ? "编辑模版" : "新增模版"}</Title>}
            width={1000}
            confirmLoading={true}
            open={uploadOpen}
            footer={null}
            onCancel={onCloseModal}
        >
            <Spin spinning={spinning} tip="解析中...">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row span={24}>
                        <Col span={12}>
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
                                    options={dataTypeOptions?.map(item => ({
                                        label: item,
                                        value: item,
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="设备类型"
                                name="deviceType"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入设备类型",
                                    },
                                    {
                                        pattern: ALL_SPACE_REG,
                                        message: "请输入设备类型",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入设备类型" maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="取值维度"
                                name="dimension"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择取值维度",
                                    },
                                ]}
                                initialValue={"CLUSTER"}
                            >
                                <Select
                                    disabled={true}
                                    placeholder="请选择取值维度"
                                    fieldNames={{
                                        label: "desc",
                                    }}
                                    options={dimensionOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="sheet名"
                                name="sheetName"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入sheet名",
                                    },
                                    {
                                        pattern: ALL_SPACE_REG,
                                        message: "请输入sheet名",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="若为空，则取上传文件中首个sheet"
                                    maxLength={10}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="详细时间格式"
                                name="timeFormat"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择详细时间格式",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="请选择详细时间格式"
                                    fieldNames={{
                                        label: "desc",
                                    }}
                                    options={timeOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="详细时间列"
                                name="systemTime"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择所在列",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="请选择所在列"
                                    options={columnOptions}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="电流取值逻辑"
                                name="currentStrategy"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择电流取值逻辑",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="请选择电流取值逻辑"
                                    fieldNames={{
                                        label: "desc",
                                    }}
                                    options={currentOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}></Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="簇电压所在列"
                                name="stackVoltage"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择所在列",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="请选择所在列"
                                    options={columnOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="簇电流所在列"
                                name="clusterCurrent"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择所在列",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="请选择所在列"
                                    options={columnOptions}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="簇SOC所在列"
                                name="clusterSoc"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择所在列",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="请选择所在列"
                                    options={columnOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="单体电压单位"
                                name="singleVoltageUnit"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择所单体电压单位",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="请选择单体电压单位"
                                    fieldNames={{
                                        label: "desc",
                                    }}
                                    options={volUnitOptions}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="单体电压开始列"
                                name="singleVoltageStart"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择所在列",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="请选择所在列"
                                    options={columnOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="单体电压结束列"
                                name="singleVoltageEnd"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择所在列",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="请选择所在列"
                                    options={columnOptions}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="单体温度开始列"
                                name="singleTemperatureStart"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择所在列",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="请选择所在列"
                                    options={columnOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="单体温度结束列"
                                name="singleTemperatureEnd"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择所在列",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="请选择所在列"
                                    options={columnOptions}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="极柱温度开始列"
                                name="poleTemperatureStart"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择所在列",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="请选择所在列"
                                    options={columnOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="极柱温度结束列"
                                name="poleTemperatureEnd"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择所在列",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="请选择所在列"
                                    options={columnOptions}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="备注" name="description">
                                <Input.TextArea placeholder="请输入备注" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        wrapperCol={{
                            offset: 20,
                            span: 4,
                        }}
                        style={{
                            position: "relative",
                            left: 20,
                            marginTop: 10,
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
