import React, { useState, useEffect } from "react";
import { message, Button, Select, Form, Input, Modal, Space } from "antd";
import {
    getUpdateInitData as getUpdateInitDataServer,
    updateCompany as updateCompanyServer,
} from "@/services/company";

const uploadUrl = process.env.API_URL + "/attachment/upload2";

const Company = ({ open, editId, onClose }) => {
    const [form] = Form.useForm();
    const [editData, setEditData] = useState();
    const [stationTypes, setStationTypes] = useState([]);

    const getUpdateInitData = async () => {
        const res = await getUpdateInitDataServer(editId);
        if (res?.data?.status == "SUCCESS") {
            const { editCompany, provinces, stationTypes } = res?.data?.data;
            editCompany ? form.setFieldsValue(editCompany) : form.resetFields();
            setEditData(editCompany);
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
            title="编辑"
            width={700}
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
                    <Input placeholder="请输入公司名称" disabled={true} />
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
                        offset: 17,
                        span: 5,
                    }}
                >
                    <Space  >
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
