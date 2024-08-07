import React, { useState, useEffect } from "react";
import { message, Button, Select, Form, Input, Modal, Row, Col, Radio, Space, InputNumber } from "antd";
import {
    getUpdateInitData as getUpdateInitDataServer,
    updateCompany as updateCompanyServer,
} from "@/services/sz_index";
import { FORM_REQUIRED_RULE, TELPHONE_NUMBER_REG } from "@/utils/constants";

const Company = ({ open, editId, onClose }) => {
    const [form] = Form.useForm();

    const getUpdateInitData = async () => {
        const res = await getUpdateInitDataServer({id: editId});
        if (res?.data?.status == "SUCCESS") {
            const { editData } = res?.data?.data;
            editData ? form.setFieldsValue(editData) : form.resetFields();
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
            <div style={{marginTop: 30}}>
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item label={"公司名称"} name={"userName"} rules={[{ ...FORM_REQUIRED_RULE }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"公司税号"} name={"creditCode"} rules={[{ ...FORM_REQUIRED_RULE }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"注册地址"} name={"operatorAddress"} rules={[{ ...FORM_REQUIRED_RULE }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"联系人"} name={"operator"} rules={[{ ...FORM_REQUIRED_RULE }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label={"联系人电话1"} 
                        name={"operatorTel1"} 
                        rules={[
                            { ...FORM_REQUIRED_RULE },
                            {
                                pattern: TELPHONE_NUMBER_REG,
                                message: '电话格式不正确'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label={"联系人电话2"} 
                        name={"operatorTel2"}
                        rules={[
                            {
                                pattern: TELPHONE_NUMBER_REG,
                                message: '电话格式不正确'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 6,
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
            </div>
        </Modal>
    );
};

export default Company;
