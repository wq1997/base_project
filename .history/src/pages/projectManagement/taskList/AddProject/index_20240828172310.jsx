import React, { useState, useEffect, useRef } from "react";
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

    const [projectOptions, setProjectOptions] = useState();

    const [userOptions, setUserOptions] = useState();

    const workOrderTypeRef = useRef();
    const [workOrderType, setWorkOrderType] = useState();
    const [workOrderTypeOptions, setWorkOrderTypeOptions] = useState();

    const associatedProjectRef = useRef();
    const [associatedProject, setAssociatedProject] = useState();

    const planStartDateRef = useRef();
    const [planStartDate, setPlanStartDate] = useState();

    const planEndDateRef = useRef();
    const [planEndDate, setPlanEndDate] = useState();

    const getInitData = async () => {
        const res = await updateWorkOrderInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { createTypes, projects, users } = res?.data?.data;
            setWorkOrderTypeOptions(createTypes);
            setProjectOptions(
                projects?.map(item => ({
                    ...item,
                    code: item.id,
                }))
            );
            setUserOptions(users);
        }
    };

    const onFinish = async values => {
        const { planStartDate, planEndDate } = values;
        const res = await updateWorkOrderServer({
            ...values,
            planStartDate: dayjs(planStartDate).format("YYYY-MM-DD HH:mm"),
            planEndDate: dayjs(planEndDate).format("YYYY-MM-DD HH:mm"),
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("新增成功");
            onClose();
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        getInitData();
        if (!open) {
            form.resetFields();
        }
    }, [open]);

    return (
        <Modal
            title={<Title>手工新增工单</Title>}
            width={700}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose()}
        >
            <Form
                style={{
                    width: "100%",
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
                    name="createType"
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
                        options={workOrderTypeOptions}
                    />
                </Form.Item>

                <Form.Item
                    label="工单名称"
                    name="title"
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
                    name="description"
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
                    name="projectId"
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
                            value: "id",
                        }}
                        options={projectOptions}
                    />
                </Form.Item>

                <Form.Item
                    label="负责人"
                    name="ownerAccount"
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
                        options={userOptions}
                    />
                </Form.Item>

                <Form.Item
                    label="计划开始时间"
                    name="planStartDate"
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
                        onChange={(date, dateStr) => {
                            planStartDateRef.current = dateStr;
                            setPlanStartDate(dateStr);
                        }}
                    />
                </Form.Item>
{planStartDateRef.current}
                <Form.Item
                    label="计划结束时间"
                    name="planEndDate"
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
                        disabledDate={current =>
                            current && current <= new Date(planStartDateRef.current)
                        }
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 15,
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
