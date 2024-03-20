import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Radio, DatePicker, Space } from "antd";
import {
    getSearchInitData as getSearchInitDataServer,
    saveEnterRecord as saveEnterRecordServer,
} from "@/services/invitation";
import dayjs from "dayjs";
import "./index.less";

const Company = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [responseTypeList, setResponseTypeList] = useState();
    const [responseTimeTypeList, setResponseTimeTypeList] = useState();

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { responseTypes, responseTimeTypes } = res?.data?.data;
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    const onFinish = async values => {
        const { appointedTimeFrom, appointedTimeTo } = values;
        const res = await saveEnterRecordServer({
            ...values,
            appointedTimeFrom: dayjs(appointedTimeFrom).format("YYYY-MM-DD HH:mm"),
            appointedTimeTo: dayjs(appointedTimeTo).format("YYYY-MM-DD HH:mm"),
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("录入成功");
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        open && getSearchInitData();
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
                    name="responseType"
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
                />
                </Form.Item>

                <Form.Item
                    label="分配任务功率"
                    name="responseTimeType"
                    rules={[
                        {
                            required: true,
                            message: "请输入分配任务功率",
                        },
                    ]}
                >
                    <Input placeholder="请输入度电报价" />
                </Form.Item>

                <Form.Item
                    label="备注"
                    name="whPrice"
                     
                >
                    <Input placeholder="请输入备注" />
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
