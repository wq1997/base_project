import React, { useState, useEffect } from "react";
import { message, Button, Select, Form, Input, Modal, Row, Col, Radio, Space } from "antd";
import {
    getUpdateInitData as getUpdateInitDataServer,
    getCityByProvince as getCityByProvinceServer,
    updateCompany as updateCompanyServer,
} from "@/services/company";
import ResCapTable from "./ResCapTable";
import { MyUpload } from "@/components";

const uploadUrl = process.env.API_URL + "/attachment/upload2";

const Company = ({ open, editId, onClose }) => {
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
        open && getUpdateInitData();
    }, [open]);

    return (
        <Modal
            title={`${editId ? "编辑" : "新增"}公司`}
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
                <strong className="category-title">公司基础信息</strong>
                <Form.Item
                    label="公司名称"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入公司名称",
                        },
                    ]}
                >
                    <Input placeholder="请输入公司名称" />
                </Form.Item>

                <Form.Item
                    label="场站类型"
                    name="stationType"
                    rules={[
                        {
                            required: true,
                            message: "请选择场站类型",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择场站类型"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={stationTypes}
                    />
                </Form.Item>

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

export default Company;
