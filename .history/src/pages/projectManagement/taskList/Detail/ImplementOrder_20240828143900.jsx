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

const Index = ({ info, onClose }) => {
    const baseUrl = process.env.API_URL;
    const uploadUrl = baseUrl + "/attachment/upload";
    const [deliveryForm] = Form.useForm();
    const [debuggingForm] = Form.useForm();
    const [runningForm] = Form.useForm();
    const [userSelectOpen, setUserSelectOpen] = useState(false);
    const [users, setUsers] = useState([]);

    const onFinish = async (values, type) => {
        const types = {
            delivery: {
                fileKey: "goodsReceivedNoteId",
                fn: processDeliveryWorkOrderServer,
            },
            debugging: {
                fileKey: "acceptanceReportId",
                fn: processDebuggingWorkOrderServer,
            },
            running: {
                fileKey: "customerAcceptanceFormId",
                fn: processRunningWorkOrderServer,
            },
        };
        const res = await types[type].fn({
            id: info?.id,
            ...values,
            [types[type].fileKey]: values?.files?.[0]?.fileName.id,
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
        // form.setFieldsValue({
        //     description,
        //     processingResult: otherProcessingResult,
        // });
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
            <Descriptions title="" column={1}>
                <Descriptions.Item label="工单描述">{info?.description}</Descriptions.Item>
                <Descriptions.Item label="" style={{ position: "relative", left: "-17px" }}>
                    <Badge status="success" style={{ marginRight: "10px" }} />
                    发货阶段
                </Descriptions.Item>
                <Descriptions.Item label="到货签收单附件">
                    <a href="###">{info?.project?.shippingMaterial?.goodsReceivedNote?.fileName}</a>
                </Descriptions.Item>
                <Descriptions.Item label="备注">
                    {info?.project?.shippingMaterial?.remark}
                </Descriptions.Item>
                <Descriptions.Item label="实际处理人"> {info?.project?.shippingMaterial?.remark}</Descriptions.Item>

                <Descriptions.Item label="" style={{ position: "relative", left: "-17px" }}>
                    <Badge status="success" style={{ marginRight: "10px" }} />
                    调试阶段
                </Descriptions.Item>
                <Descriptions.Item label="调试报告附件">
                    <a href="###">
                        {info?.otherProcessingAttachments?.map(item => item?.fileName)}
                    </a>
                </Descriptions.Item>
                <Descriptions.Item label="备注">{info?.description}</Descriptions.Item>
                <Descriptions.Item label="实际处理人">{info?.description}</Descriptions.Item>

                <Descriptions.Item label="" style={{ position: "relative", left: "-17px" }}>
                    <Badge status="success" style={{ marginRight: "10px" }} />
                    试运行阶段
                </Descriptions.Item>
                <Descriptions.Item label="项目验收单附件">
                    <a href="###">
                        {info?.otherProcessingAttachments?.map(item => item?.fileName)}
                    </a>
                </Descriptions.Item>
                <Descriptions.Item label="备注">{info?.description}</Descriptions.Item>
                <Descriptions.Item label="实际处理人">{info?.description}</Descriptions.Item>
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
                    disabled={
                        !Boolean(info?.implementWorkOrderStatus == "PRE_UPLOAD_SHIPPING_MATERIAL")
                    }
                    form={deliveryForm}
                    onFinish={values => onFinish(values, "delivery")}
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

                    <Form.Item label="备注" name="remark">
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
                    disabled={
                        !Boolean(info?.implementWorkOrderStatus == "PRE_UPLOAD_TESTING_MATERIAL")
                    }
                    form={debuggingForm}
                    onFinish={values => onFinish(values, "debugging")}
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

                    <Form.Item label="备注" name="remark">
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
                    disabled={
                        !Boolean(info?.implementWorkOrderStatus == "PRE_UPLOAD_TRIAL_RUN_MATERIAL")
                    }
                    form={runningForm}
                    onFinish={values => onFinish(values, "running")}
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

                    <Form.Item label="备注" name="remark">
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
        <div style={{ color: "#fff", paddingLeft: info?.supportProcessing ? "20px" : 0 }}>
            {/* {info?.supportProcessing ? <DealWith /> : <Result />} */}
            <Result />
        </div>
    );
};

export default Index;
