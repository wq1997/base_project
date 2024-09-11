import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Input, Form, Button, Space, message, Row, Col, Select } from "antd";
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
    const [inspectionItems, setInspectionItems] = useState([]);
    const [treatment, setTreatment] = useState([]);

    const getInitData = async () => {
        const res = await exceptionWorkOrderProcessInitDataServer(info?.id);
        if (res?.data?.status == "SUCCESS") {
            const { inspectionItemType2Items, exceptionSolutions } = res?.data?.data;
            setInspectionItems(inspectionItemType2Items?.BMS);
            setTreatment(
                exceptionSolutions?.map(item => ({
                    label: item,
                    value: item,
                }))
            );
        }
    };

    const onFinish = async values => {
        const {
            consumablesCost,
            sparePartCost,
            ownerFineCost,
            travelCost,
            laborCost,
            supplierFineBenefit,
            warrantyExpiredPayBenefit,
        } = values;
        const res = await processExceptionWorkOrderServer({
            id: info?.id,
            ...values,
            exceptionProcessingCost: {
                travelCost,
                consumablesCost,
                sparePartCost,
                ownerFineCost,
                laborCost,
            },
            exceptionProcessingBenefit: {
                supplierFineBenefit,
                warrantyExpiredPayBenefit,
            },
            exceptionProcessingAttachmentIds: values?.files?.map(item => item.fileName.id),
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
            <Descriptions title="" column={2}>
                <Descriptions.Item label="异常部件">
                    {info?.exceptionInspectionItemName}
                </Descriptions.Item>
                <Descriptions.Item label="异常描述">{info?.exceptionRemark}</Descriptions.Item>
                <Descriptions.Item label="处理方案">{info?.exceptionSolution}</Descriptions.Item>
                <Descriptions.Item label="是否领用/采购备件或耗材">
                    {info?.collectingMaterials}
                </Descriptions.Item>
                <Descriptions.Item label="计划处理时间(天)">
                    {info?.exceptionProcessingDaysForPlan}
                </Descriptions.Item>
                <Descriptions.Item label="实际处理时间(天)">
                    {info?.exceptionProcessingDaysForActual}
                </Descriptions.Item>
                <span style={{ color: "rgba(255, 255, 255, 0.45)" }}>消缺成本</span>
                <Descriptions.Item label="差旅成本">
                    {info?.exceptionProcessingCost?.travelCost}
                </Descriptions.Item>
                <Descriptions.Item label="耗材成本">
                    {info?.exceptionProcessingCost?.consumablesCost}
                </Descriptions.Item>
                <Descriptions.Item label="备件成本">
                    {info?.exceptionProcessingCost?.sparePartCost}
                </Descriptions.Item>
                <Descriptions.Item label="业主罚款">
                    {info?.exceptionProcessingCost?.ownerFineCost}
                </Descriptions.Item>
                <Descriptions.Item label="人员成本">
                    {info?.exceptionProcessingCost?.laborCost}
                </Descriptions.Item>
                <span style={{ color: "rgba(255, 255, 255, 0.45)" }}>消缺收益</span>
                <Descriptions.Item label="供应商罚款">
                    {info?.exceptionProcessingCost?.supplierFineBenefit}
                </Descriptions.Item>
                <Descriptions.Item label="质保外维修收益(业务付款)">
                    {info?.exceptionProcessingCost?.warrantyExpiredPayBenefit}
                </Descriptions.Item>
                <Descriptions.Item label="消缺总结">
                    {info?.exceptionProcessingResult}
                </Descriptions.Item>
                <Descriptions.Item label="附件">
                    {info?.exceptionProcessingAttachments?.map(item => item?.fileName)}
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
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="异常部件"
                                name="exceptionRefBasInspectionItemId"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择异常部件",
                                    },
                                ]}
                            >
                                <Select
                                    fieldNames={{
                                        label: "name",
                                        value: "id",
                                    }}
                                    options={inspectionItems}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="异常描述"
                                name="exceptionRemark"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入异常描述",
                                    },
                                ]}
                            >
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="处理方案"
                                name="exceptionSolution"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择处理方案",
                                    },
                                ]}
                            >
                                <Select options={treatment} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="是否领用/采购备件或耗材"
                                name="collectingMaterials"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择是否领用/采购备件或耗材",
                                    },
                                ]}
                            >
                                <Select
                                    options={[
                                        { label: "是", value: true },
                                        { label: "否", value: false },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="计划处理时间(天)"
                                name="exceptionProcessingDaysForPlan"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入计划处理时间",
                                    },
                                ]}
                            >
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="实际处理时间(天)"
                                name="exceptionProcessingDaysForActual"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入实际处理时间",
                                    },
                                ]}
                            >
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <span style={{ color: "rgba(255, 255, 255, 0.45)" }}>消缺成本</span>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="差旅成本"
                                name="travelCost"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入差旅成本",
                                    },
                                ]}
                            >
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="耗材成本"
                                name="consumablesCost"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入耗材成本",
                                    },
                                ]}
                            >
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="备件成本"
                                name="sparePartCost"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入备件成本",
                                    },
                                ]}
                            >
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="业主罚款"
                                name="ownerFineCost"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入业主罚款",
                                    },
                                ]}
                            >
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="人员成本"
                                name="laborCost"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入人员成本",
                                    },
                                ]}
                            >
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <span style={{ color: "rgba(255, 255, 255, 0.45)" }}>消缺收益</span>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="供应商罚款"
                                name="supplierFineBenefit"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入供应商罚款",
                                    },
                                ]}
                            >
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="质保外维修收益(业务付款)"
                                name="warrantyExpiredPayBenefit"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入质保外维修收益",
                                    },
                                ]}
                            >
                                <Input style={{ width: "100%" }} />
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
                                        message: "请输入消缺总结",
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
                                <MyUpload url={uploadUrl} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {info?.supportProcessing && (
                        
                    )}
                </Form>
            </>
        );
    };

    return (
        <div style={{ color: "#fff" }}>{info?.supportProcessing ? <DealWith /> : <Result />}</div>
    );
};

export default Index;
