import React, { useState, useEffect } from "react";
import { message, Button, Select, Form, Input, Modal, Space } from "antd";
import {
    getUpdateInitData as getUpdateInitDataServer,
    updateCompanyLevel as updateCompanyLevelServer,
    getLevelSearchInitData as getLevelSearchInitDataServer,
} from "@/services/company";

const Company = ({ open, editData, onClose }) => {
    const [form] = Form.useForm();

    const [levels, setLevels] = useState([]);

    const getLevelSearchInitData = async () => {
        const res = await getLevelSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { levelStatus } = res?.data?.data;
            setStatusList(levelStatus);
        }
    };

    const onFinish = async values => {
        const res = await updateCompanyLevelServer({
            id: editData?.companyId,
            level: values?.levelText,
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("编辑成功");
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        open &&  
        {
            form.setFieldsValue(editData)
            getLevelSearchInitData()
        }
    }, [open]);

    return (
        <Modal
            title="编辑"
            width={700}
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
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item label="公司名称" name="name">
                    <Input disabled={true} />
                </Form.Item>

                <Form.Item
                    label="等级"
                    name="levelText"
                    rules={[
                        {
                            required: true,
                            message: "请选择等级",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择等级"
                        fieldNames={{
                            label: "text",
                            value: "name",
                        }}
                        options={levels}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 17,
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

export default Company;
