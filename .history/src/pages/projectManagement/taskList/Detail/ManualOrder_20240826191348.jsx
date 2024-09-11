import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Input } from "antd";

const Index = ({ info }) => {
    const DealWith = () => {
        return info?.inspectionRequire?.map((group, index) => {
            return (
                <div>
                    <div>
                        <Badge status="success" style={{ marginRight: "10px" }} />
                        <span>{group.name}</span>
                    </div>
                    {group?.items?.map(item => {
                        return (
                            <div>
                                <div>
                                    <Badge status="success" style={{ marginRight: "10px" }} />
                                    <span>{item.name}</span>
                                </div>
                                {item?.photos?.map(img => (
                                    <img
                                        src={img}
                                        alt=""
                                        style={{ width: "100px", height: "120px" }}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>
            );
        });
    };

    const Result = () => {
        return (
            <Form
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
                    label="账号"
                    name="account"
                    rules={[
                        {
                            required: true,
                            message: "请输入账号",
                        },
                    ]}
                >
                    <Input
                        style={{ width: "100%" }}
                        disabled={Boolean(editId)}
                        placeholder="请输入账号"
                    />
                </Form.Item>

                <Form.Item
                    label="姓名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入姓名",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入姓名" />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: !Boolean(editId),
                            message: "请输入密码",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入密码" />
                </Form.Item>

                <Form.Item
                    label="关联手机号"
                    name="phoneNo"
                    rules={[
                        {
                            required: true,
                            message: "请输入关联手机号",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入关联手机号" />
                </Form.Item>

                <Form.Item
                    label="管辖区域"
                    name="regions"
                    rules={[
                        {
                            required: true,
                            message: "请选择管辖区域",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="请选择管辖区域"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={regionsOptions}
                    />
                </Form.Item>

                <Form.Item
                    label="绑定角色"
                    name="roleCodes"
                    rules={[
                        {
                            required: true,
                            message: "请选择绑定角色",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="请选择绑定角色"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={roleOptions}
                    />
                </Form.Item>

                <Form.Item label="备注" name="remark">
                    <Input style={{ width: "100%" }} placeholder="请输入备注" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 16,
                        span: 5,
                    }}
                >
                    <Space
                        style={{
                            position: "relative",
                            left: "-15px",
                        }}
                    >
                        <Button onClick={() => onClose(false)}>取消</Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        );
    };

    return (
        <>
            <Descriptions title="业务信息"></Descriptions>
            <div style={{ color: "#fff", paddingLeft: "20px" }}>
                <div style={{ margin: "10px 0" }}>工单描述：{info?.description}</div>
                {info?.status == "COMPLETED" ? <Result /> : <DealWith />}
            </div>
        </>
    );
};

export default Index;
