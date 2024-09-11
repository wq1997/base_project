import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Input, Form, Button, Space, message } from "antd";
import { MyUpload, UserSelect } from "@/components";
import {
    processOtherWorkOrder as processOtherWorkOrderServer,
    transferWorkOrder as transferWorkOrderServer,
    processDeliveryWorkOrder as processDeliveryWorkOrderServer,
    processDebuggingWorkOrder as processDebuggingWorkOrderServer,
    processRunningWorkOrder as processRunningWorkOrderServer,
} from "@/services/workOrder";
import { values } from "lodash";

const Index = ({ info, onClose }) => {
    const baseUrl = process.env.API_URL;
    const uploadUrl = baseUrl + "/attachment/upload";
    const [deliveryForm] = Form.useForm();
    const [debuggingForm] = Form.useForm();
    const [runningForm] = Form.useForm();
    const [userSelectOpen, setUserSelectOpen] = useState(false);
    const [users, setUsers] = useState([]);

    const onFinish = async values => {
        
        const res = await processOtherWorkOrderServer({
            id: info?.id,
            ...values,
            attachmentIds: values?.files?.map(item => item.fileName.id),
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("操作成功");
            onClose();
        } else {
            message.info(res?.data?.msg);
        }
    };

    const transferWorkOrder = async () => {
        const res = await transferWorkOrderServer({
            id: info?.id,
            targetAccount: users?.[0]?.account,
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("操作成功");
            onClose();
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        const { description, otherProcessingResult } = info;
        form.setFieldsValue({
            description,
            processingResult: otherProcessingResult,
        });
    }, []);

    const handleTransferWorkOrder = () => {
        if (users?.length) {
            transferWorkOrder();
        } else {
            setUserSelectOpen(true);
        }
    };

    const Result = () => {
        return (
            <Descriptions title="基础信息" column={1}>
                <Descriptions.Item label="工单描述">{info?.description}</Descriptions.Item>
                <Descriptions.Item label="处理结果">
                    {info?.otherProcessingResult}
                </Descriptions.Item>
                <Descriptions.Item label="附件">
                    <a href="###">
                        {info?.otherProcessingAttachments?.map(item => item?.fileName)}
                    </a>
                </Descriptions.Item>
            </Descriptions>
        );
    };

    const DealWith = () => {
        return (
            <>
                <UserSelect
                    open={userSelectOpen}
                    onClose={() => setUserSelectOpen(false)}
                    onChange={data => setUsers(data)}
                />
                <Form
                    style={{ width: "60%" }}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    form={deliveryForm}
                    onFinish={values=>onFinish(values)}
                    autoComplete="off"
                >
                    <Form.Item label="工单描述" name="description">
                        <span>{info?.description}</span>
                    </Form.Item>

                    <div style={{ margin: "10px 0", position: "relative", left: "-15px" }}>
                        <Badge status="success" style={{ marginRight: "8px" }} />
                        <span>发货阶段</span>
                    </div>

                    <Form.Item
                        label="上传到货签收单附件"
                        name="files"
                        rules={[
                            {
                                required: true,
                                message: "请上传附件",
                            },
                        ]}
                    >
                        <MyUpload maxCount={1} url={uploadUrl} />
                    </Form.Item>

                    <Form.Item label="备注" name="processingResult">
                        <Input.TextArea rows={4} style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                        }}
                    >
                        <Space>
                            <Button type="primary" htmlType="submit">
                                提交并开启下一阶段任务
                            </Button>
                            <Button onClick={handleTransferWorkOrder}>
                                {users?.length ? `确认转办` : "转办"}
                            </Button>
                            {users?.length ? (
                                <>
                                    <Button onClick={() => setUserSelectOpen(true)}>
                                        转办人：{users?.[0]?.name}
                                    </Button>
                                </>
                            ) : (
                                ""
                            )}
                        </Space>
                    </Form.Item>
                </Form>

                <div style={{ margin: "10px 0", position: "relative", left: "-15px" }}>
                    <Badge status="success" style={{ marginRight: "8px" }} />
                    <span>调试阶段</span>
                </div>

                <Form
                    style={{ width: "60%" }}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    form={debuggingForm}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item label="工单描述" name="description">
                        <span>{info?.description}</span>
                    </Form.Item>

                    <Form.Item
                        label="上传调试报告附件"
                        name="files"
                        rules={[
                            {
                                required: true,
                                message: "请上传附件",
                            },
                        ]}
                    >
                        <MyUpload maxCount={1} url={uploadUrl} />
                    </Form.Item>

                    <Form.Item label="备注" name="processingResult">
                        <Input.TextArea rows={4} style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                        }}
                    >
                        <Space>
                            <Button type="primary" htmlType="submit">
                                提交并开启下一阶段任务
                            </Button>
                            <Button onClick={handleTransferWorkOrder}>
                                {users?.length ? `确认转办` : "转办"}
                            </Button>
                            {users?.length ? (
                                <>
                                    <Button onClick={() => setUserSelectOpen(true)}>
                                        转办人：{users?.[0]?.name}
                                    </Button>
                                </>
                            ) : (
                                ""
                            )}
                        </Space>
                    </Form.Item>
                </Form>

                <div style={{ margin: "10px 0", position: "relative", left: "-15px" }}>
                    <Badge status="success" style={{ marginRight: "8px" }} />
                    <span>试运行阶段</span>
                </div>

                <Form
                    style={{ width: "60%" }}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    form={runningForm}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="上传项目验收单附件"
                        name="files"
                        rules={[
                            {
                                required: true,
                                message: "请上传附件",
                            },
                        ]}
                    >
                        <MyUpload maxCount={1} url={uploadUrl} />
                    </Form.Item>

                    <Form.Item label="备注" name="processingResult">
                        <Input.TextArea rows={4} style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                        }}
                    >
                        <Space>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                            <Button onClick={handleTransferWorkOrder}>
                                {users?.length ? `确认转办` : "转办"}
                            </Button>
                            {users?.length ? (
                                <>
                                    <Button onClick={() => setUserSelectOpen(true)}>
                                        转办人：{users?.[0]?.name}
                                    </Button>
                                </>
                            ) : (
                                ""
                            )}
                        </Space>
                    </Form.Item>
                </Form>
            </>
        );
    };

    return (
        <div style={{ color: "#fff", paddingLeft: "20px" }}>
            {info?.supportProcessing ? <DealWith /> : <Result />}
        </div>
    );
};

export default Index;
