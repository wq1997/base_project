import React, { useState, useEffect } from "react";
import { message, Button, Select, Form, Input, Modal, Row, Col, Radio, Upload, Space } from "antd";
import ResCapTable from "./ResCapTable";

const Company = ({ open, onClose }) => {

    const onFinish = values => {
        console.log("Success:", values);
    };

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
                                options={[
                                    { value: "jack", label: "Jack" },
                                    { value: "lucy", label: "Lucy" },
                                ]}
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
                                options={[
                                    { value: "jack", label: "Jack" },
                                    { value: "lucy", label: "Lucy" },
                                ]}
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
                                options={[
                                    { value: "jack", label: "Jack" },
                                    { value: "lucy", label: "Lucy" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item label="合同文件" name="contractAtt">
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                headers={{
                                    authorization: "authorization-text",
                                }}
                                onChange={info => {
                                    if (info.file.status !== "uploading") {
                                        console.log(info.file, info.fileList);
                                    }
                                    if (info.file.status === "done") {
                                        message.success(
                                            `${info.file.name} file uploaded successfully`
                                        );
                                    } else if (info.file.status === "error") {
                                        message.error(`${info.file.name} file upload failed.`);
                                    }
                                }}
                            >
                                <Button>点击上传</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="其他附件" name="otherAtt">
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                headers={{
                                    authorization: "authorization-text",
                                }}
                                onChange={info => {
                                    if (info.file.status !== "uploading") {
                                        console.log(info.file, info.fileList);
                                    }
                                    if (info.file.status === "done") {
                                        message.success(
                                            `${info.file.name} file uploaded successfully`
                                        );
                                    } else if (info.file.status === "error") {
                                        message.error(`${info.file.name} file upload failed.`);
                                    }
                                }}
                            >
                                <Button>点击上传</Button>
                            </Upload>
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
