import React, { useState, useEffect } from "react";
import {
    message,
    Button,
   
    Form,
    Input,
    Modal,
  
    Radio,
    DatePicker,
    Space,
} from "antd";
import {
    getSearchInitData as getSearchInitDataServer,
    saveEnterRecord as saveEnterRecordServer,
} from "@/services/invitation";

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
        const res = await saveEnterRecordServer(values);
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
                    label="响应类型"
                    name="responseType"
                    rules={[
                        {
                            required: true,
                            message: "请选择响应类型",
                        },
                    ]}
                >
                    <Radio.Group>
                        {responseTypeList?.map(item => (
                            <Radio value={item?.code} key={item?.code}>
                                {item.name}
                            </Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="响应要求"
                    name="responseTimeType"
                    rules={[
                        {
                            required: true,
                            message: "请选择响应要求",
                        },
                    ]}
                >
                    <Radio.Group>
                        {responseTimeTypeList?.map(item => (
                            <Radio value={item?.code} key={item?.code}>
                                {item.name}
                            </Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="度电报价(元)"
                    name="whPrice"
                    rules={[
                        {
                            required: true,
                            message: "请输入度电报价",
                        },
                    ]}
                >
                    <Input placeholder="请输入度电报价" />
                </Form.Item>

                <Form.Item
                    label="响应功率(kW)"
                    name="responsePower"
                    rules={[
                        {
                            required: true,
                            message: "请输入响应功率",
                        },
                    ]}
                >
                    <Input placeholder="请输入响应功率" />
                </Form.Item>

                <Form.Item
                    label="约定开始时间"
                    name="appointedTimeFrom"
                    rules={[
                        {
                            required: true,
                            message: "请选择约定开始时间",
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label="约定结束时间"
                    name="appointedTimeTo"
                    rules={[
                        {
                            required: true,
                            message: "请选择约定结束时间",
                        },
                    ]}
                >
                    <DatePicker />
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
