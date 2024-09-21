import React, { useState, useEffect } from "react";
import {
    Button,
    Form,
    Input,
    Modal,
    Radio,
    Select,
    Space,
    message
} from "antd";
import { Title } from "@/components";
import {  
    basInspectionItemSaveOrUpdateInitData as basInspectionItemSaveOrUpdateInitDataServe,
    basInspectionItemSaveOrUpdate as basInspectionItemSaveOrUpdateServe,
} from "@/services";
import "./index.less";

const AddProject = ({ open, editData, onClose }) => {
    const [form] = Form.useForm();
    const [typeList, setTypeList] = useState([]);
    const onFinish = async values => {
        const res = await basInspectionItemSaveOrUpdateServe({id: editData?.id, ...values});
        if(res?.data?.status==="SUCCESS"){
            message.success("提交成功");
            onClose();
        }else{
            message.error("提交失败");
        }
    };

    const getBasInspectionItemSaveOrUpdateInitData = async () => {
        const res = await basInspectionItemSaveOrUpdateInitDataServe();
        if(res?.data?.status==="SUCCESS"){
            setTypeList(res?.data?.data?.types?.map(item => {
                return {
                    value: item?.code,
                    label: item?.name
                }
            }))
        }
    }

    useEffect(() => { 
        form.resetFields();
        if(open){
            getBasInspectionItemSaveOrUpdateInitData()
        }
    }, [open]);

    useEffect(()=>{
        form.setFieldsValue(editData);
    }, [JSON.stringify(editData||{})]);

    return (
        <Modal
            title={<Title>新增巡检项</Title>}
            width={800}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
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
                    label="巡检项名称"
                    name={"name"}
                    rules={[
                        {
                            required: true,
                            message: "请输入巡检项名称",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入巡检项名称" />
                </Form.Item>

                <Form.Item
                    label="巡检项类型"
                    name={"type"}
                    rules={[
                        {
                            required: true,
                            message: "请选择巡检项类型",
                        },
                    ]}
                >
                    <Select options={typeList} style={{ width: "100%" }} placeholder="请选择巡检项类型" />
                </Form.Item>

                <Form.Item
                    label="巡检项内容"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "请输入巡检项描述",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入巡检项内容" />
                </Form.Item>

                <Form.Item
                    label="是否需要上传拍照信息"
                    name="needPhotoUpload"
                    rules={[
                        {
                            required: true,
                            message: "请选择是否需要上传拍照信息",
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="是否需要上传备注"
                    name="needRemark"
                    rules={[
                        {
                            required: true,
                            message: "请选择是否需要上传备注",
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
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

export default AddProject;
