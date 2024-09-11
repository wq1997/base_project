import React, { useState, useEffect } from "react";
import {
    message,
    Button,
    Select,
    Form,
    Input,
    Modal,
    Row,
    Col,
    DatePicker,
    Space,
    InputNumber,
} from "antd";
import { ALL_SPACE_REG } from "@/utils/constants";
import { getPlantNames as getPlantNamesServer } from "@/services/plant";
import {
    getDeviceType as getDeviceTypeServer,
    getDeviceInfo as getDeviceInfoServer,
    saveDevice as saveDeviceServer,
    updateDevice as updateDeviceServer,
} from "@/services/device";
import dayjs from "dayjs";

const formatTime = time => (time ? dayjs(time).format("YYYY-MM-DD") : undefined);

const Device = ({ open, editId, onClose }) => {
    const [form] = Form.useForm();
    const [editData, setEditData] = useState();
    const [plantNamesOptions, setPlantNamesOptions] = useState([]);
    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);

    const getPlantNames = async () => {
        const res = await getPlantNamesServer();
        if (res?.data?.code == 200) {
            setPlantNamesOptions(res?.data?.data);
        }
    };

    const getDeviceType = async () => {
        const res = await getDeviceTypeServer();
        if (res?.data?.code == 200) {
            setDeviceTypeOptions(res?.data?.data);
        }
    };

    const getPlantInfo = async () => {
        const res = await getDeviceInfoServer(editId);
        if (res?.data?.code == 200) {
            const values = res?.data?.data || {};
            form.setFieldsValue({
                ...values,
                warrantyPeriod: dayjs(values?.warrantyPeriod, "YYYY-MM-DD"),
            });
            setEditData(values);
        }
    };

    const onFinish = async values => {
        const fn = editId ? updateDeviceServer : saveDeviceServer;
        const res = await fn({
            id: editData?.id,
            commit: true,
            ...values,
            warrantyPeriod: formatTime(values?.warrantyPeriod),
        });
        if (res?.data?.code == 200) {
            message.success(`${editData?.id ? "保存" : "添加"}成功`);
            localStorage.removeItem("deviceDraft");
            onCancel(true);
        } else {
            message.info(res?.data?.description);
        }
    };

    useEffect(() => {
        getPlantNames();
        getDeviceType();
        if (open) {
            if (editId) {
                getPlantInfo();
            } else {
                const deviceDraft = JSON.parse(localStorage.getItem("deviceDraft"));
                if (deviceDraft) {
                    setEditData(deviceDraft);
                    form.setFieldsValue({
                        ...deviceDraft,
                        warrantyPeriod: deviceDraft?.warrantyPeriod
                            ? dayjs(deviceDraft?.warrantyPeriod, "YYYY-MM-DD")
                            : undefined,
                    });
                }
            }
        }
    }, [open]);

    const onCancel = isSaveOK => {
        if (!editId && !isSaveOK) {
            localStorage.setItem("deviceDraft", JSON.stringify(form.getFieldsValue()));
        }
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="新增设备"
            width={900}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onCancel(false)}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 14,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="设备名称"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入设备名称",
                                },
                                {
                                    pattern: ALL_SPACE_REG,
                                    message: "请输入设备名称",
                                },
                            ]}
                        >
                            <Input placeholder="请输入设备名称" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="设备类型"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择设备类型",
                                },
                            ]}
                        >
                            <Select
                                placeholder="请选择设备类型"
                                options={deviceTypeOptions}
                                fieldNames={{ label: "displayName", value: "name" }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="关联电站"
                            name="plantId"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择关联电站",
                                },
                            ]}
                        >
                            <Select
                                placeholder="请选择关联电站"
                                options={plantNamesOptions}
                                fieldNames={{ label: "name", value: "id" }}
                            />
                        </Form.Item>
                    </Col>{" "}
                    <Col span={12}>
                        <Form.Item label="质保有效期" name="warrantyPeriod">
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="sn号码"
                            name="snNumber"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入sn号",
                                },
                                {
                                    pattern: ALL_SPACE_REG,
                                    message: "请输入sn号",
                                },
                            ]}
                        >
                            <Input placeholder="请输入sn号" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="设备型号"
                            name="model"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入设备型号",
                                },
                                {
                                    pattern: ALL_SPACE_REG,
                                    message: "请输入设备型号",
                                },
                            ]}
                        >
                            <Input placeholder="请输入设备型号" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="有功功率调节上限（kW）"
                            name="activePowerUpperLimit"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入有功功率调节上限",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入有功功率调节上限"
                                precision={1}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="有功功率调节下限（kW）"
                            name="activePowerLowerLimit"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入有功功率调节下限",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入有功功率调节下限"
                                precision={1}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="无功功率调节上限（kVar）"
                            name="reactivePowerUpperLimit"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入无功功率调节上限",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入无功功率调节上限"
                                precision={3}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="无功功率调节下限（kVar）"
                            name="reactivePowerLowerLimit"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入无功功率调节下限",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入无功功率调节下限"
                                precision={3}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
 

                <Form.Item
                    wrapperCol={{
                        offset: 19,
                        span: 5,
                    }}
                >
                    <Space style={{ position: "relative", left: 8 }}>
                        <Button onClick={() => onCancel(false)}>取消</Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Device;
