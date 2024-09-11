import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Input, Form, Button, Space, message, Row, Col } from "antd";
import { MyUpload, UserSelect } from "@/components";
import {
    processExceptionWorkOrder as processExceptionWorkOrderServer,
    transferWorkOrder as transferWorkOrderServer,
    exceptionWorkOrderProcessInitData as exceptionWorkOrderProcessInitDataServer,
} from "@/services/workOrder";

const Index = ({ info, onClose }) => {
    const baseUrl = process.env.API_URL;
    const uploadUrl = baseUrl + "/attachment/upload";
    const [form] = Form.useForm();
    const [userSelectOpen, setUserSelectOpen] = useState(false);
    const [users, setUsers] = useState([]);

    const getInitData = async () => {
        const res = await exceptionWorkOrderProcessInitDataServer();
        if (res?.data?.status == "SUCCESS") {
        }
    };

    const onFinish = async values => {
        const {
            consumablesCost,
            sparePartCost,
            ownerFineCost,
            laborCost,
            supplierFineBenefit,
            warrantyExpiredPayBenefit,
        } = values;
        const res = await processExceptionWorkOrderServer({
            id: info?.id,
            ...values,
            exceptionProcessingCost: {
                consumablesCost,
                sparePartCost,
                ownerFineCost,
                laborCost,
            },
            exceptionProcessingBenefit: {
                supplierFineBenefit,
                warrantyExpiredPayBenefit,
            },
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
        getInitData();
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
                    style={{ width: "70%" }}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    form={form}
                    disabled={!info?.supportProcessing}
                    variant={info?.supportProcessing ? "outlined" : "borderless"}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="异常部件" name="exceptionRefBasInspectionItemId">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="异常描述" name="">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="处理方案" name="exceptionSolution">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="是否领用/采购备件或耗材" name="collectingMaterials">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="计划处理时间(天)"
                                name="exceptionProcessingDaysForPlan"
                            >
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="实际处理时间(天)"
                                name="exceptionProcessingDaysForActual"
                            >
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    消缺成本
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="差旅成本" name="">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="耗材成本" name="consumablesCost">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="备件成本" name="sparePartCost">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="业主罚款" name="ownerFineCost">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="人员成本" name="laborCost">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    消缺收益
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="供应商罚款" name="supplierFineBenefit">
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="质保外维修收益(业务付款)"
                                name="warrantyExpiredPayBenefit"
                            >
                                <Input style={{ width: "100%" }} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="消缺总结"
                                name="exceptionProcessingResult"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入处理结果",
                                    },
                                ]}
                            >
                                <Input.TextArea rows={3} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item label="附件" name="files">
                                {info?.supportProcessing ? (
                                    <MyUpload url={uploadUrl} />
                                ) : (
                                    <a href="###">
                                        {info?.otherProcessingAttachments?.map(
                                            item => item?.fileName
                                        )}
                                    </a>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    
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
            <DealWith />
        </div>
    );
};

export default Index;
