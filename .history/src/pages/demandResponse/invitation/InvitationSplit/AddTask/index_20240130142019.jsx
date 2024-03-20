import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Radio, Select, Space } from "antd";
import {
    getSplitInviteInitData as getSplitInviteInitDataServer,
    saveEnterRecord as saveEnterRecordServer,
} from "@/services/invitation";
import dayjs from "dayjs";
import "./index.less";

const Company = ({ open, inviteId, onClose }) => {
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
                }))
            );
        }
    };

    const onFinish = async values => {
        const { name } = companies?.find(item => item.code == values?.companyCode);
        onClose({
            ...values,
            name,
            signResponsePower,
        });
    };

    useEffect(() => {
        open && getSplitInviteInitData();
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
                                item => item.code == value
                            );
                            setSignResponsePower(projectedMaxAdjustableLoad);
                        }}
                    />
                </Form.Item>

                <Form.Item label="签约响应功率" name="signResponsePower">
                    {signResponsePower}
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
                    <Input placeholder="请输入分配任务功率" />
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
