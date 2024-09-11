import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Input, Form, Button, Space } from "antd";
import { MyUpload } from "@/components";

const Index = ({ info }) => {
    const baseUrl = process.env.API_URL;
    const uploadUrl = baseUrl + "/attachment/upload";
    const [form] = Form.useForm();

    const onFinish = async values => {
        console.log(values)
        return;
        const res = await updateAccountServer({
            ...values,
            id: editId || undefined,
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("操作成功");
            onClose();
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(()=>{
form.set
    },[])

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
                style={{ width: "50%" }}
                name="basic"
                labelCol={{
                    span: 3,
                }}
                wrapperCol={{
                    span: 14,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item label="工单描述" name="description">
                    <Input style={{ width: "100%" }} disabled={true} />
                </Form.Item>

                <Form.Item
                    label="处理结果"
                    name="result"
                    rules={[
                        {
                            required: true,
                            message: "请输入处理结果",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入处理结果" />
                </Form.Item>

                <Form.Item label="上传附件" name="remark">
                    <MyUpload
                        url={uploadUrl}
                        // files={
                        //     editData?.logo?.length
                        //         ? editData?.logo?.map(item => ({
                        //               url: `${baseUrl}${item?.fileName}`,
                        //               status: "done",
                        //           }))
                        //         : undefined
                        // }
                    />
                </Form.Item>

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
                        <Button>转办</Button>
                    </Space>
                </Form.Item>
            </Form>
        );
    };

    return (
        <>
            <Descriptions title="业务信息"></Descriptions>
            <div style={{ color: "#fff", paddingLeft: "20px" }}>
                {info?.status == "COMPLETED" ? <Result /> : <DealWith />}
            </div>
        </>
    );
};

export default Index;
