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
    Radio,
    Space,
    InputNumber,
} from "antd";
// import {
//     getUpdateInitData as getUpdateInitDataServer,
//     getCityByProvince as getCityByProvinceServer,
//     updateCompany as updateCompanyServer,
// } from "@/services/company";

const Device = ({ open, editId, onClose }) => {
    const [form] = Form.useForm();
    const [editData, setEditData] = useState();
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [stationTypes, setStationTypes] = useState([]);

    const getUpdateInitData = async () => {
        const res = await getUpdateInitDataServer(editId);
        if (res?.data?.status == "SUCCESS") {
            const { editCompany, provinces, stationTypes } = res?.data?.data;
            editCompany ? form.setFieldsValue(editCompany) : form.resetFields();
            setEditData(editCompany);
            setProvinces(provinces);
            setStationTypes(stationTypes);
        }
    };

    const onFinish = async values => {
        const res = await updateCompanyServer({
            id: editId,
            ...values,
        });

        if (res?.data?.status == "SUCCESS") {
            message.success(`${editId ? "编辑" : "添加"}成功`);
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        // open && getUpdateInitData();
    }, [open]);

    return (
        <Modal
            title="新增设备"
            width={900}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
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
                            ]}
                        >
                            <Input placeholder="请输入设备名称" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="设备类型"
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择设备类型",
                                },
                            ]}
                        >
                            <Select placeholder="请选择设备类型" options={[]} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="关联电站"
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择关联电站",
                                },
                            ]}
                        >
                            <Select placeholder="请选择关联电站" options={[]} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="电站地址" name="city">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="设备型号"
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择设备型号",
                                },
                            ]}
                        >
                            <Select placeholder="请选择设备型号" options={[]} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="组串数量"
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入组串数量",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入组串数量"
                                style={{ width: "100%" }}
                                min={0}
                                precision={0}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="有功功率调节上限（kW）"
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入有功功率调节上限",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入有功功率调节上限"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="有功功率调节下限（kW）"
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入有功功率调节下限",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入有功功率调节下限"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="无功功率调节上限（kVar）"
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入无功功率调节上限",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入无功功率调节上限"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="无功功率调节下限（kVar）"
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入无功功率调节下限",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入无功功率调节下限"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="功率因数调节"
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入功率因数调节",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入功率因数调节"
                                style={{ width: "100%" }}
                                min={-1}
                                mix={1}
                                precision={3}
                            />
                            <div style={{ marginTop: "5px", color: "#999" }}>
                                (-1.000 ~ -0.800] U [0.800 ~ 1.000]
                            </div>
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

export default Device;
