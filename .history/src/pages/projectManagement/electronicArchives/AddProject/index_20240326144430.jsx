import React, { useState, useEffect } from "react";
import {
    message,
    Button,
    Form,
    Input,
    Modal,
    Steps,
    DatePicker,
    Space,
    Select,
    Row,
    Col,
} from "antd";
import dayjs from "dayjs";
import { Title } from "@/components";
import "./index.less";

const AddProject = ({ open, onClose }) => {
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
        return;
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

    useEffect(() => {}, [open]);

    return (
        <Modal
            title={<Title>新增项目</Title>}
            width={1200}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Steps
                style={{ margin: "20px 0" }}
                current={1}
                items={[
                    {
                        title: "项目基础资料维护",
                    },
                    {
                        title: "项目详细资料维护",
                    },
                    {
                        title: "维护实施管理信息",
                    },
                    {
                        title: "运维管理信息",
                    },
                ]}
            />
            <Form
                style={{ width: "100%", margin: "0 auto" }}
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
                    label="立项时间"
                    name="appointedTimeTo"
                    rules={[
                        {
                            required: true,
                            message: "请选择立项时间",
                        },
                    ]}
                >
                    <DatePicker
                        showTime={{
                            format: "HH:mm",
                        }}
                        format="YYYY-MM-DD HH:mm"
                        minuteStep={15}
                    />
                </Form.Item>

                <Form.Item
                    label="项目名称"
                    name="responsePower"
                    rules={[
                        {
                            required: true,
                            message: "请输入项目名称",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入项目名称" />
                </Form.Item>

                <Form.Item
                    label="项目阶段"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择项目阶段",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择项目阶段"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <Form.Item
                    label="项目进度"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择项目进度",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择项目进度"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <Form.Item
                    label="是否支持标准巡检"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择是否支持标准巡检",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择是否支持标准巡检"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <Form.Item
                    label="项目类型"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择项目类型",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择项目类型"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <Form.Item
                    label="产品类型"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择产品类型",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择产品类型"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <Form.Item
                    label="所属区域"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择所属区域",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择所属区域"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <>
                    <div>电站详细信息</div>
                    <Row span={24}>
                        <Col span={8}>
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
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="业主名称"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入业主名称",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入业主名称" />
                            </Form.Item>
                        </Col><Col span={8}>
                            <Form.Item
                                label="公司税号"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入公司税号",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入公司税号" />
                            </Form.Item>
                        </Col>
                    </Row>
                </>

                <Form.Item
                    wrapperCol={{
                        offset: 13,
                        span: 5,
                    }}
                >
                    <Space>
                        <Button>保存</Button>
                        <Button type="primary">下一步</Button>
                    </Space>
                    {/* <Space>
                        <Button onClick={() => onClose(false)}>取消</Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Space> */}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProject;
