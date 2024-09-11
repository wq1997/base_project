import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Input, Form, Button, Space, message } from "antd";
import { MyUpload, UserSelect } from "@/components";
import {
    processOtherWorkOrder as processOtherWorkOrderServer,
    transferWorkOrder as transferWorkOrderServer,
} from "@/services/workOrder";

const Index = ({ info, onClose }) => {
    const baseUrl = process.env.API_URL;
    const uploadUrl = baseUrl + "/attachment/upload";
    const [form] = Form.useForm();
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
                    style={{ width: "50%" }}
                    name="basic"
                    labelCol={{
                        span: 3,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    form={form}
                    disabled={!info?.supportProcessing}
                    variant="borderless"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item label="工单描述" name="description">
                        <Input style={{ width: "100%" }} disabled={true} />
                    </Form.Item>

                    <Form.Item
                        label="处理结果"
                        name="processingResult"
                        rules={[
                            {
                                required: true,
                                message: "请输入处理结果",
                            },
                        ]}
                    >
                        <Input style={{ width: "100%" }} placeholder="请输入处理结果" />
                    </Form.Item>

                    <Form.Item label="上传附件" name="files">
                        <MyUpload url={uploadUrl} />
                    </Form.Item>
                    
                    {info?.supportProcessing && (
                        <Form.Item
                            wrapperCol={{
                                offset: 13,
                                span: 4,
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
                    )}
                </Form>
            </>
        );
    };

    return (
        <div style={{ color: "#fff", paddingLeft: "20px" }}>
            {/* {info?.supportProcessing ? <DealWith /> : <Result />} */}
            <DealWith />
        </div>
    );
};

export default Index;
