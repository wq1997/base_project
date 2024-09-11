import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Select, Space, InputNumber } from "antd";
import { Title } from "@/components";

const Company = ({
    open,
    resources,

    editTask,

    disabledResourceIds,
    onClose,
}) => {
    const [form] = Form.useForm();
    const [companies, setCompanies] = useState();
    const [contractedResponsePower, setContractedResponsePower] = useState();

    const onFinish = async values => {
        const { name } = companies?.find(item => item.code == values?.companyCode);
        onClose({
            ...values,
            index: editTask?.index,
            companyName: name,
            contractedResponsePower,
            statusZh: "待确认",
        });
    };

    useEffect(() => {
        if (editTask) {
            form?.setFieldsValue(editTask);
            setContractedResponsePower(editTask?.contractedResponsePower);
        } else {
            form.resetFields();
            setContractedResponsePower();
        }
    }, [open]);

    return (
        <Modal
            title={<Title>手工录入</Title>}
            width={700}
            confirmLoading={true}
            open={open}
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
                    label="公司"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择公司",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择公司"
                        fieldNames={{
                            label: "companyName",
                            value: "resourceId",
                        }}
                        options={resources?.map(item => ({
                            ...item,
                            disabled: disabledResourceIds.includes(item.resourceId),
                        }))}
                        onChange={value => {
                            const { contractedResponsePower } = companies?.find(
                                item => item?.code == value
                            );
                            setContractedResponsePower(contractedResponsePower);
                        }}
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
