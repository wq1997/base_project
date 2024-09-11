import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Select, Space, InputNumber } from "antd";
import { getSplitInviteInitData as getSplitInviteInitDataServer } from "@/services/invitation";
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

                <Form.Item label="签约响应功率(kW)" name="contractedResponsePower">
                    <div
                        style={{
                            color: "rgba(0, 0, 0, 0.25)",
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                            borderRadius: "6px",
                            border: "1px solid #d9d9d9",
                            boxShadow: "none",
                            padding: "4px 11px",
                            cursor: "not-allowed",
                            boxSizing: "border-box",
                            height: "32px",
                            opacity: 1,
                        }}
                    >
                        {contractedResponsePower}
                    </div>
                </Form.Item>

                <Form.Item
                    label="分配任务功率(kW)"
                    name="responsePower"
                    rules={[
                        {
                            required: true,
                            message: "请输入分配任务功率",
                        },
                    ]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        placeholder="请输入分配任务功率"
                        step="0.01"
                    />
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
