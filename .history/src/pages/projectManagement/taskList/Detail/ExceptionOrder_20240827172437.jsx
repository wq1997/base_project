import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Input, Form, Button, Space, message, Row, Col } from "antd";
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
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    form={form}
                    disabled={!info?.supportProcessing}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="异常部件" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="异常描述" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="处理方案" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="是否领用/采购备件或耗材" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="计划处理时间(天)" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="实际处理时间(天)" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="消缺成本" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="差旅成本" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}> <Col span={12}>
                                <Form.Item label="耗材成本" name="description">
                                    <Input style={{ width: "100%" }} disabled={true} />
                                </Form.Item>
                            </Col>
                        <Col span={12}>
                           
                            <Form.Item label="备件成本" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="业主罚款" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="人员成本" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="消缺收益" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="供应商罚款" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="质保外维修收益(业务付款)" name="description">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="上传附件" name="files">
                                <MyUpload url={uploadUrl} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="消缺总结"
                                name="processingResult"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入处理结果",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={3}
                                    style={{ width: "100%" }}
                                    placeholder="请输入数据"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="上传附件" name="files">
                                <MyUpload url={uploadUrl} />
                            </Form.Item>
                        </Col>
                    </Row>

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
                </Form>
            </>
        );
    };

    return (
        <div style={{ color: "#fff", paddingLeft: "20px" }}>
            {!info?.supportProcessing ? <DealWith /> : <Result />}
        </div>
    );
};

export default Index;
