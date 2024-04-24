import React, { useState, useEffect } from "react";
import {
    message,
    Button,
    Form,
    Input,
    Modal,
    Steps,
    DatePicker,
    Space,
    Select,
    Row,
    Col,
    Tooltip,
} from "antd";
import dayjs from "dayjs";
import { Title } from "@/components";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import "./index.less";

const AddProject = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [responseTypeList, setResponseTypeList] = useState();
    const [responseTimeTypeList, setResponseTimeTypeList] = useState();

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { responseTypes, responseTimeTypes } = res?.data?.data;
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    const onFinish = async values => {
        return;
        const { appointedTimeFrom, appointedTimeTo } = values;
        const res = await saveEnterRecordServer({
            ...values,
            appointedTimeFrom: dayjs(appointedTimeFrom).format("YYYY-MM-DD HH:mm"),
            appointedTimeTo: dayjs(appointedTimeTo).format("YYYY-MM-DD HH:mm"),
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("录入成功");
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {}, [open]);

    return (
        <Modal
            title={<Title>新增项目</Title>}
            width={1200}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Steps
                style={{ margin: "20px 0" }}
                current={1}
                items={[
                    {
                        title: "项目基础资料维护",
                    },
                    {
                        title: "项目详细资料维护",
                    },
                    {
                        title: "维护实施管理信息",
                    },
                    {
                        title: "运维管理信息",
                    },
                ]}
            />
            <Form
                style={{ width: "100%", margin: "0 auto" }}
                name="basic"
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    span: 14,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="立项时间"
                    name="appointedTimeTo"
                    rules={[
                        {
                            required: true,
                            message: "请选择立项时间",
                        },
                    ]}
                >
                    <DatePicker
                        showTime={{
                            format: "HH:mm",
                        }}
                        format="YYYY-MM-DD HH:mm"
                        minuteStep={15}
                    />
                </Form.Item>

                <Form.Item
                    label="项目名称"
                    name="responsePower"
                    rules={[
                        {
                            required: true,
                            message: "请输入项目名称",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} placeholder="请输入项目名称" />
                </Form.Item>

                <Form.Item
                    label="项目阶段"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择项目阶段",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择项目阶段"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <Form.Item
                    label="项目进度"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择项目进度",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择项目进度"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <Form.Item
                    label="是否支持标准巡检"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择是否支持标准巡检",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择是否支持标准巡检"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <Form.Item
                    label="项目类型"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择项目类型",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择项目类型"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <Form.Item
                    label="产品类型"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择产品类型",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择产品类型"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <Form.Item
                    label="所属区域"
                    name="companyCode"
                    rules={[
                        {
                            required: true,
                            message: "请选择所属区域",
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择所属区域"
                        fieldNames={{
                            label: "name",
                            value: "code",
                        }}
                        options={[]}
                    />
                </Form.Item>

                <>
                    <div>电站详细信息</div>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="业主名称"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入业主名称",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入业主名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="项目地址"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入项目地址",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入项目地址" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="电站名称"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入电站名称",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入电站名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="电站联系人"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入电站联系人",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入电站联系人" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="电站联系方式"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入电站联系方式",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入电站联系方式" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="总包单位名称"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入总包单位名称",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入总包单位名称" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="我方供货范围"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入我方供货范围",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入我方供货范围" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="质保期起止时间"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入质保期起止时间",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入质保期起止时间" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="电站内储能单元分组情况"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入电站内储能单元分组情况",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入电站内储能单元分组情况" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="电站所属省市区/镇"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入电站所属省市区/镇",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入电站所属省市区/镇" />
                            </Form.Item>
                        </Col>
                    </Row>
                </>

                <>
                    <div>设备配置信息</div>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="电池仓数量"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入电池仓数量",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入电池仓数量" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="单台电池仓容量(AH)"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入单台电池仓容量(AH)",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入单台电池仓容量(AH)" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="PCS一体机数量"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入PCS一体机数量",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入PCS一体机数量" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="电芯材料"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入电芯材料",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入电芯材料" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="电池堆成组方式"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入电池堆成组方式",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入电池堆成组方式" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="单台PCS最大功率(kW)"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入单台PCS最大功率(kW)",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入单台PCS最大功率(kW)" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="电池簇成组方式"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入电池簇成组方式",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入电池簇成组方式" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="单电芯额定容量(AH)"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入单电芯额定容量(AH)",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入单电芯额定容量(AH)" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="消防介质"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入消防介质",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入消防介质" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="充放电转换效率"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入充放电转换效率",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入充放电转换效率" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="额定充放电倍率(C)"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入额定充放电倍率(C)",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入额定充放电倍率(C)" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="关联场站信息"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入关联场站信息",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入关联场站信息" />
                            </Form.Item>
                        </Col>
                    </Row>
                </>

                <>
                    <div>厂商信息</div>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="BMS厂商"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入BMS厂商",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入BMS厂商" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="联系方式"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入联系方式",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入联系方式" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="PCS厂商"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入PCS厂商",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入PCS厂商" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="联系方式"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入联系方式",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入联系方式" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="变压器厂商"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入变压器厂商",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入变压器厂商" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="联系方式"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入联系方式",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入联系方式" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="液冷系统厂商"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入液冷系统厂商",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入液冷系统厂商" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="联系方式"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入联系方式",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入联系方式" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="空调厂商"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入空调厂商",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入空调厂商" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="联系方式"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入联系方式",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入联系方式" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="PACK组装厂厂商"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入PACK组装厂厂商",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入PACK组装厂厂商" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="联系方式"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入联系方式",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入联系方式" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="电芯厂商"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入电芯厂商",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入电芯厂商" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="联系方式"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入联系方式",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入联系方式" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="电池仓箱体厂商"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入电池仓箱体厂商",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入电池仓箱体厂商" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="联系方式"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入联系方式",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入联系方式" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="消防厂商"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入消防厂商",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入消防厂商" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="联系方式"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入联系方式",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入联系方式" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="EMS厂商"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入EMS厂商",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入EMS厂商" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="联系方式"
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入联系方式",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入联系方式" />
                            </Form.Item>
                        </Col>
                    </Row>
                </>

                <>
                    <Form.Item
                        label="实施计划时间"
                        name="taxCode"
                        rules={[
                            {
                                required: true,
                                message: "请输入实施计划时间",
                            },
                        ]}
                    >
                        <Input placeholder="请输入实施计划时间" />
                    </Form.Item>
                    <Form.Item
                        label="实施负责人"
                        name="companyCode"
                        rules={[
                            {
                                required: true,
                                message: "请选择实施负责人",
                            },
                        ]}
                    >
                        <Space>
                            <Select
                                placeholder="请选择实施负责人"
                                fieldNames={{
                                    label: "name",
                                    value: "code",
                                }}
                                options={[]}
                                style={{ width: "100%" }}
                            />

                            <Tooltip
                                title="创建项目后，会在计划开始时间时自动创建一条实施工单至实施负责人，实施阶段该项目
                            产生的所有工单会由实施负责人负责。"
                            >
                                <ExclamationCircleOutlined />
                            </Tooltip>
                        </Space>
                    </Form.Item>
                </>

                <Form.Item
                    wrapperCol={{
                        offset: 13,
                        span: 5,
                    }}
                >
                    <Space>
                        <Button>保存</Button>
                        <Button type="primary">下一步</Button>
                    </Space>
                    {/* <Space>
                        <Button onClick={() => onClose(false)}>取消</Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Space> */}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProject;
