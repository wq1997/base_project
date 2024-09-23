import { Form, Input, Select, Button, Modal, Radio, Space } from "antd";
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import {
    getQueryString
} from "@/utils/utils";
import {
    knowledgeEditInitData as knowledgeEditInitDataServe,
    knowledgeSaveOrUpdate as knowledgeSaveOrUpdateServe,
    knowledgeAudit as knowledgeAuditServe,
    knowledgeSubmit as knowledgeSubmitServe
} from "@/services";
import { useEffect, useState } from "react";
import { history } from "umi";
import {
    Editor
} from "@/components";

const EditOrCheck = () => {
    const openType = getQueryString("openType");
    const id = getQueryString("id");
    const [form] = Form.useForm();
    const [checkForm] = Form.useForm();
    const [data, setData] = useState();
    const [checkOpen, setCheckOpen] = useState(false);

    const onFinish = async (btnType) => {
        if (openType === "Add" || openType === "Edit") {
            const values = await form.validateFields();
            let res;
            if (btnType === "Submit") {
                res = await knowledgeSubmitServe({
                    ...values,
                    id
                })
            } else if (btnType === "Save") {
                res = await knowledgeSaveOrUpdateServe({
                    ...values,
                    id
                })
            }
            if (res?.data?.status === "SUCCESS") {
                history.push("/knowledgeBase");
            }
        }
        if (openType === "Check") {
            const saveValues = await form.validateFields();
            const checkValues = await checkForm.validateFields();
            const saveRes = await knowledgeSaveOrUpdateServe({
                ...saveValues,
                id
            })
            const checkRes = await knowledgeAuditServe({
                ...checkValues,
                id
            })
            if (checkRes?.data?.status === "SUCCESS" && saveRes?.data?.status === "SUCCESS") {
                setCheckOpen(false);
                history.push("/knowledgeBase");
            }
        }
    }

    const getInitData = async () => {
        const res = await knowledgeEditInitDataServe({ id });
        if (res?.data?.status === "SUCCESS") {
            const data = res?.data?.data;
            const refusedList = data?.editData?.auditHistory?.filter(item => item?.operation === "REFUSE");
            form.setFieldsValue({
                ...data?.editData || {},
            });
            setData({
                ...data,
                editData: {
                    ...data?.editData,
                    refusedReson: refusedList?.[refusedList?.length - 1]?.remark
                }
            });
        }
    }

    useEffect(() => {
        getInitData();
    }, []);

    return (
        <div>
            <Form
                form={form}
                labelCol={{
                    span: 6
                }}
                style={{
                    width: 600,
                    marginTop: 20
                }}
                initialValues={{
                    type: "问题总结"
                }}
            >
                <Form.Item
                    label="知识类型"
                    name={"type"}
                    rules={[{ ...FORM_REQUIRED_RULE }]}
                >
                    <Select
                        placeholder="请选择知识类型"
                        options={[
                            { label: '问题总结', value: '问题总结' },
                            { label: '规章制度', value: '规章制度' },
                            { label: '行业标准', value: '行业标准' },
                            { label: '项目资料', value: '项目资料' }
                        ]}
                        disabled={data?.editData?.supportAudit}
                    />
                </Form.Item>
                <Form.Item noStyle dependencies={['type']}>
                    {({ getFieldsValue }) => {
                        const { type } = getFieldsValue(['type']);
                        return (
                            <>
                                <Form.Item name="title" label="标题" rules={[{ ...FORM_REQUIRED_RULE }]} hidden={!type}>
                                    <Input placeholder="请输入标题" disabled={data?.editData?.supportAudit} />
                                </Form.Item>
                                <Form.Item
                                    name="projectId"
                                    label="关联项目"
                                    rules={[
                                        { required: type === '问题总结' || type === '项目资料', message: "请输入必填字段" }
                                    ]}
                                    hidden={!(type === '问题总结' || type === '项目资料')}
                                >
                                    <Select
                                        placeholder="请选择关联项目"
                                        options={data?.projects?.map(item => {
                                            return {
                                                label: item?.name,
                                                value: item?.id
                                            }
                                        })}
                                        disabled={data?.editData?.supportAudit}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="deviceTypes"
                                    label="关联设备类型"
                                    rules={[
                                        { required: type === '问题总结', message: "请输入必填字段" }
                                    ]}
                                    hidden={!(type === '问题总结')}
                                >
                                    <Select
                                        mode="multiple"
                                        maxTagCount={5}
                                        placeholder="请选择关联设备类型"
                                        options={data?.deviceTypes?.map(item => {
                                            return {
                                                label: item?.name,
                                                value: item?.code
                                            }
                                        })}
                                        disabled={data?.editData?.supportAudit}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="exceptionRefIds"
                                    label="异常环节"
                                    rules={[
                                        { required: type === '问题总结', message: "请输入必填字段" }
                                    ]}
                                    hidden={!(type === '问题总结')}
                                    disabled={data?.editData?.supportAudit}
                                >
                                    <Select
                                        mode="multiple"
                                        maxTagCount={5}
                                        placeholder="请选择异常环节"
                                        options={data?.exceptionRefs?.map(item => {
                                            return {
                                                label: item?.name,
                                                value: item?.code
                                            }
                                        })}
                                        disabled={data?.editData?.supportAudit}
                                    />
                                </Form.Item>
                                <Form.Item name="content" label="知识内容" rules={[{ ...FORM_REQUIRED_RULE }]} hidden={!type}>
                                    <Editor placeholder="请输入知识内容" />
                                </Form.Item>
                                {
                                    data?.editData?.status === "REFUSED" &&
                                    <Form.Item name="refusedReson" label="拒绝原因" rules={[{ ...FORM_REQUIRED_RULE }]} hidden={!type}>
                                        {data?.editData?.refusedReson}
                                    </Form.Item>
                                }
                            </>
                        )
                    }}
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6 }}>
                    <Space>
                        {
                            data?.editData?.supportAudit &&
                            <Button type="primary" onClick={() => {
                                setCheckOpen(true)
                            }}>
                                审核
                            </Button>
                        }
                        {
                            (data?.editData?.supportSaveOrSubmit || openType === "Add") &&
                            <>
                                <Button type="primary" onClick={() => { onFinish("Submit") }}>提交</Button>
                                <Button type="primary" onClick={() => { onFinish("Save") }}>保存</Button>
                            </>
                        }
                        <Button onClick={() => history.back()}>返回</Button>
                    </Space>
                </Form.Item>
            </Form>
            <Modal
                title="审核"
                width={600}
                open={checkOpen}
                onOk={onFinish}
                onCancel={() => {
                    setCheckOpen(false);
                    checkForm.resetFields();
                }}
            >
                <Form
                    form={checkForm}
                    labelCol={{
                        span: 6
                    }}
                >
                    <Form.Item label="审核状态" name="operation">
                        <Radio.Group>
                            <Radio value="PASS">审核通过</Radio>
                            <Radio value="REFUSE">审核拒绝</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="审核备注" name="remark">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default EditOrCheck;