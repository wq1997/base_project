import React, { useState, useEffect } from "react";
import { message, Button, Select, Form, Input, Modal, Row, Col, Radio, Upload, Space } from "antd";
import {
    getUpdateInitData as getUpdateInitDataServer,
    getCityByProvince as getCityByProvinceServer,
    updateCompany as updateCompanyServer,
} from "@/services/company";
import ResCapTable from "./ResCapTable";
import { MyUpload } from "@/components";

const Company = ({ open, onClose }) => {
    const uploadUrl = process.env.API_URL + "/attachment/upload2";

    const onFinish = async values => {
        const res = await updateCompanyServer(values);
        if (res?.data?.status == "SUCCESS") {
            message.success("添加成功");
            onClose(true);
        }
    };

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [stationTypes, setStationTypes] = useState([]);

    const getUpdateInitData = async () => {
        const res = await getUpdateInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { provinces, stationTypes } = res?.data?.data;
            setProvinces(provinces);
            setStationTypes(stationTypes);
        }
    };

    const getCityByProvince = async province => {
        const res = await getCityByProvinceServer(province);
        if (res?.data?.status == "SUCCESS") {
            setCities(res?.data?.data || []);
        }
    };

    useEffect(() => {
        open && getUpdateInitData();
    }, [open]);

    return (
        <Modal
            title="新增公司"
            width={900}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 14,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <strong className="category-title">公司基础信息</strong>
                <Row span={24}>
                    <Col span={12}>
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
                    <Col span={12}>
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

                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="所在省份"
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择所在省份",
                                },
                            ]}
                        >
                            <Select
                                placeholder="请选择所在省份"
                                options={provinces?.map(item => ({ label: item, value: item }))}
                                onSelect={value => getCityByProvince(value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="所在市"
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择所在市",
                                },
                            ]}
                        >
                            <Select
                                placeholder="请选择所在市"
                                options={cities?.map(item => ({ label: item, value: item }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="场站类型"
                            name="stationType"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择场站类型",
                                },
                            ]}
                        >
                            <Select
                                placeholder="请选择场站类型"
                                fieldNames={{
                                    label: "name",
                                    value: "code",
                                }}
                                options={stationTypes}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item label="合同文件" name="contractAtt">
                            <MyUpload url={uploadUrl} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="其他附件" name="otherAtt">
                            <MyUpload url={uploadUrl} />
                        </Form.Item>
                    </Col>
                </Row>

                <strong className="category-title">响应能力</strong>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="是否支持自动执行"
                            name="supportAutoExecute"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择是否支持自动执行",
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="场站编号" name="stationCode">
                            <Input placeholder="请输入采日云平台登记场站号" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="是否默认确认任务"
                            name="autoConfirmTask"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择是否默认确认任务",
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="最大负载量(KW)"
                            name="maxLoad"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入最大负载量",
                                },
                            ]}
                        >
                            <Input placeholder="请输入签约响应功率，要求整数" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="紧急联系人"
                            name="contactPerson"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入紧急联系人",
                                },
                            ]}
                        >
                            <Input placeholder="请输入紧急联系人名称" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="紧急联系人电话"
                            name="contractPhone"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入紧急联系人电话",
                                },
                            ]}
                        >
                            <Input placeholder="请输入紧急联系人电话" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="邀约分润比列"
                            name="profitSharingRatio"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入邀约分润比列",
                                },
                            ]}
                        >
                            <Input placeholder="请输入0-100以内数字" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="响应设备数"
                            name="deviceCount"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入响应设备数",
                                },
                            ]}
                        >
                            <Input placeholder="请输入0-1000以内数字" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={24}>
                        <Form.Item
                            label="响应能力统计"
                            name="responsivenessDetail"
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 19,
                            }}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <ResCapTable />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    wrapperCol={{
                        offset: 19,
                        span: 5,
                    }}
                >
                    <Space style={{ position: "relative", left: 8 }}>
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
