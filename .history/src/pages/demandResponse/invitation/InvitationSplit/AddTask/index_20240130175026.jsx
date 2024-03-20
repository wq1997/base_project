import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Select, Space, InputNumber } from "antd";
import { getSplitInviteInitData as getSplitInviteInitDataServer } from "@/services/invitation";
import "./index.less";

const Company = ({ open, inviteId, editTask, remainCount, disabledCompanyCodes, onClose }) => {
    const [form] = Form.useForm();
    const [companies, setCompanies] = useState();
    const [signResponsePower, setSignResponsePower] = useState();
    const getSplitInviteInitData = async () => {
        const res = await getSplitInviteInitDataServer(inviteId);
        if (res?.data?.status == "SUCCESS") {
            const { companies } = res?.data?.data;
            setCompanies(
                companies?.map(item => ({
                    ...item.company,
                    ...item,
                    disabled: disabledCompanyCodes.includes(item.company.code),
                }))
            );
        }
    };

    const onFinish = async values => {
        const { name } = companies?.find(item => item.code == values?.companyCode);
        onClose({
            ...values,
            index: editTask?.index,
            companyName: name,
            projectedMaxAdjustableLoad: signResponsePower,
        });
        setSignResponsePower();
    };

    useEffect(() => {
        open && getSplitInviteInitData();
        editTask ? form?.setFieldsValue(editTask) : form.resetFields();
    }, [open]);

    return (
        <Modal
            title="手工录入"
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
                            label: "name",
                            value: "code",
                        }}
                        options={companies}
                        onChange={value => {
                            const { projectedMaxAdjustableLoad } = companies?.find(
                                item => item?.code == value
                            );
                            setSignResponsePower(projectedMaxAdjustableLoad);
                        }}
                    />
                </Form.Item>

                <Form.Item label="签约响应功率(kW)" name="signResponsePower">
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
                        {signResponsePower}
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
                        placeholder={`请输入分配任务功率，最多还可分配${remainCount}`}
                        max={remainCount}
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
