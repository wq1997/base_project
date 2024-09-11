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
    Tooltip,
    Collapse,
} from "antd";
import dayjs from "dayjs";
import { Title } from "@/components";
import { ExclamationCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import {
    updateWorkOrderInitData as updateWorkOrderInitDataServer,
    updateWorkOrder as updateWorkOrderServer,
} from "@/services/workOrder";
import "./index.less";

const { Panel } = Collapse;

const AddProject = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [responseTypeList, setResponseTypeList] = useState();
    const [responseTimeTypeList, setResponseTimeTypeList] = useState();

    const workOrderTypeRef = useRef();
    const [workOrderType, setWorkOrderType] = useState();
    const [workOrderTypeOptions, setWorkOrderTypeOptions] = useState();

    

    const getInitData = async () => {
        const res = await updateWorkOrderInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { responseTypes, responseTimeTypes } = res?.data?.data;
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    const onFinish = async values => {
        return;
        const { appointedTimeFrom, appointedTimeTo } = values;
        const res = await updateWorkOrderServer({
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
        getInitData();
    }, [open]);

    return (
        <Modal
            title={<Title>手工新增工单</Title>}
            width={800}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Form
                style={{
                    width: currentStep == 1 || currentStep == 3 ? "100%" : "50%",
                    margin: "0 auto",
                }}
                name="basic"
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    span: 13,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="工单类型"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择工单类型",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择工单类型"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <Form.Item
                    label="工单名称"
                    name="responsePower"
                    rules={[
                        {
                            required: true,
                            message: "请输入工单名称",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入工单名称" />
                </Form.Item>

                <Form.Item
                    label="工单描述"
                    name="responsePower"
                    rules={[
                        {
                            required: true,
                            message: "请输入工单描述",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入工单描述" />
                </Form.Item>

                <Form.Item
                    label="关联项目"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择关联项目",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择关联项目"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <Form.Item
                    label="负责人"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择负责人",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择负责人"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <Form.Item
                    label="计划开始时间"
                    name="appointedTimeTo"
                    rules={[
                        {
                            required: true,
                            message: "请选择计划开始时间",
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
                    label="计划结束时间"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择计划结束时间",
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
                    wrapperCol={{
                        offset: 11,
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

export default AddProject;
