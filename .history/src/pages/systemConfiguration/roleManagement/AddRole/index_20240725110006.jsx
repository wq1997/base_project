import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Space, Tree } from "antd";
import { Title } from "@/components";
import {
    updateRole as updateRoleServer,
    getRolePerms as getRolePermsServer,
} from "@/services/user";
import "./index.less";

const Index = ({ open, editRow, onClose }) => {
    const [form] = Form.useForm();
    const [treeData, setTreeData] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);

    const getRolePerms = async () => {
        const res = await getRolePermsServer();
        if (res?.data?.status == "SUCCESS") {
            const data = res?.data?.data;
            setTreeData(data);
        }
    };

    const onFinish = async values => {
        const res = await updateRoleServer({
            ...values,
            id: editRow?.id || undefined,
            permCodes: checkedKeys,
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("添加成功");
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        getRolePerms();
        if (!open) {
            form.resetFields();
        }
    }, [open]);

    useEffect(() => {
        form.setFieldsValue(editRow);
    }, [editRow]);

    return (
        <Modal
            title={<Title>新增角色</Title>}
            width={800}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose()}
        >
            <Form
                style={{
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
                    label="角色名称"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入角色名称",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入角色名称" />
                </Form.Item>

                <Form.Item label="权限配置" name="permCodes">
                    <Tree
                        treeData={treeData}
                        checkable
                        checkedKeys={editRow?.permCodes}
                        onCheck={checkedKeys => {
                            setCheckedKeys(checkedKeys);
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="角色说明"
                    name="remark"
                    rules={[
                        {
                            required: true,
                            message: "请输入角色说明",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入角色说明" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 11,
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

export default Index;
