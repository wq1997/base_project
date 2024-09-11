import React, { useState, useEffect } from "react";
import { message, Button, Select, Form, Input, Modal, Row, Col, Radio, Space, InputNumber } from "antd";
import {
    getUpdateInitData as getUpdateInitDataServer,
    getCityByProvince as getCityByProvinceServer,
    updateCompany as updateCompanyServer,
} from "@/services/company";
import ResCapTable from "./ResCapTable";
import { MyUpload } from "@/components";
import { TELPHONE_NUMBER_REG } from "@/utils/constants";

const uploadUrl = process.env.API_URL_1 + "/attachment/upload2";

const Company = ({ open, editId, onClose }) => {
    const [form] = Form.useForm();
    const [editData, setEditData] = useState();
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [stationTypes, setStationTypes] = useState([]);

    const getUpdateInitData = async () => {
        const res = await getUpdateInitDataServer(editId);
        if (res?.data?.status == "SUCCESS") {
            const { editCompany, provinces, stationTypes } = res?.data?.data;
            editCompany ? form.setFieldsValue(editCompany) : form.resetFields();
            setEditData(editCompany);
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

    const onFinish = async values => {
        const { heightPeakCut, lowPeakCut } = values?.responsivenessDetail;
        const hValues = Object.values(heightPeakCut);
        const lValues = Object.values(lowPeakCut);
        if (
            hValues.includes("") ||
            hValues.includes(undefined) ||
            lValues.includes("") ||
            lValues.includes(undefined)
        ) {
            return message.info("请完整填写响应能力表格");
        }
        const res = await updateCompanyServer({
            id: editId,
            ...values,
        });

        if (res?.data?.status == "SUCCESS") {
            message.success(`${editId ? "编辑" : "添加"}成功`);
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        open && getUpdateInitData();
    }, [open]);

    return (
        <Modal
            title={`${editId ? "编辑" : "新增"}公司`}
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
                form={form}
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
                            <MyUpload
                                url={uploadUrl}
                                files={editData?.contractAtt?.map(item => ({
                                    ...item,
                                    name: item.fileName,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="其他附件" name="otherAtt">
                            <MyUpload
                                url={uploadUrl}
                                files={editData?.otherAtt?.map(item => ({
                                    ...item,
                                    name: item.fileName,
                                }))}
                            />
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
                        <Form.Item noStyle dependencies={['supportAutoExecute']}>
                            {({getFieldsValue}) => {
                                const supportAutoExecute = getFieldsValue(['supportAutoExecute'])?.supportAutoExecute;
                                // if(supportAutoExecute){
                                //     form.setFieldsValue({
                                //         stationCode: ""
                                //     })
                                // }
                                return (
                                    <Form.Item label="场站编号" name="stationCode">
                                        <Input placeholder="请输入采日云平台登记场站号" disabled={!supportAutoExecute}/>
                                    </Form.Item>
                                )
                            }}
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item noStyle dependencies={['supportAutoExecute']}>
                            {({getFieldsValue}) => {
                                const supportAutoExecute = getFieldsValue(['supportAutoExecute'])?.supportAutoExecute;
                                // if(supportAutoExecute){
                                //     form.setFieldsValue({
                                //         autoConfirmTask: undefined
                                //     })
                                // }
                                return (
                                    <Form.Item
                                        label="是否默认确认任务"
                                        name="autoConfirmTask"
                                        rules={[
                                            {
                                                required: supportAutoExecute,
                                                message: "请选择是否默认确认任务",
                                            },
                                        ]}
                                    >
                                        <Radio.Group disabled={!supportAutoExecute}>
                                            <Radio value={true}>是</Radio>
                                            <Radio value={false}>否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                )
                            }}
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
                            <InputNumber placeholder="请输入签约响应功率，要求整数" style={{ width: '100%' }} min={0} precision={0} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
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
                            <InputNumber placeholder="请输入签约响应功率，要求整数" style={{ width: '100%' }} min={0} precision={0} />
                        </Form.Item>
                    </Col>
                </Row>


                <Row span={24}>
                    <Col span={12}>
                        <Form.Item noStyle dependencies={['supportAutoExecute']}>
                            {({getFieldsValue}) => {
                                const supportAutoExecute = getFieldsValue(['supportAutoExecute'])?.supportAutoExecute;
                                return (
                                    <Form.Item
                                        label="紧急联系人"
                                        name="contactPerson"
                                        rules={[
                                            {
                                                required: !supportAutoExecute,
                                                message: "请输入紧急联系人",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="请输入紧急联系人名称" />
                                    </Form.Item>
                                )
                            }}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item noStyle dependencies={['supportAutoExecute']}>
                            {({getFieldsValue}) => {
                                const supportAutoExecute = getFieldsValue(['supportAutoExecute'])?.supportAutoExecute;
                                return (
                                    <Form.Item
                                        label="紧急联系人电话"
                                        name="contractPhone"
                                        rules={[
                                            {
                                                required: !supportAutoExecute,
                                                message: "请输入紧急联系人电话",
                                            },
                                            { pattern: TELPHONE_NUMBER_REG, message: '请输入正确的号码' }
                                        ]}
                                    >
                                        <Input placeholder="请输入紧急联系人电话" />
                                    </Form.Item>
                                )
                            }}
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
                            <InputNumber placeholder="请输入0-100以内数字" style={{ width: '100%' }} min={0} max={100} />
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
                            <InputNumber placeholder="请输入0-1000以内数字" style={{ width: '100%' }} min={0} max={1000} precision={0} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={24}>
                        <Form.Item noStyle dependencies={['supportAutoExecute']}>
                            {({getFieldsValue}) => {
                                const supportAutoExecute = getFieldsValue(['supportAutoExecute'])?.supportAutoExecute;
                                return (
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
                                        <ResCapTable data={editData?.responsivenessDetail} supportAutoExecute={supportAutoExecute} />
                                    </Form.Item>
                                )
                            }}
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
