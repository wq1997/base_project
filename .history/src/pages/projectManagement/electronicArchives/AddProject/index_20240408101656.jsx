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
    Collapse,
    Radio,
} from "antd";
import dayjs from "dayjs";
import { Title } from "@/components";
import { ExclamationCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import "./index.less";

const { Panel } = Collapse;

const AddProject = ({ detailRow, open, onClose, editCurrentStep }) => {
    console.log(detailRow);
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [checkGroup, setCheckGroup] = useState([]);
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

    useEffect(() => {
        setCurrentStep(editCurrentStep);
        if (detailRow) {
            form.setFieldsValue({
                ...detailRow,
                time: dayjs(detailRow?.time),
            });
        }
    }, [editCurrentStep, detailRow]);

    return (
        <Modal
            title={<Title>新增项目</Title>}
            width={1200}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => {
                form.resetFields();
                onClose(true);
            }}
        >
            <Steps
                style={{ margin: "20px 0" }}
                current={currentStep}
                onChange={step => setCurrentStep(step)}
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
                style={{
                    width: currentStep == 1 || currentStep == 3 ? "100%" : "50%",
                    margin: "0 auto",
                }}
                name="basic"
                labelCol={{
                    span: 9,
                }}
                wrapperCol={{
                    span: 16,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                disabled={Boolean(detailRow)}
            >
                {currentStep == 0 && (
                    <>
                        <Form.Item
                            label="立项时间"
                            name="time"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择立项时间",
                                },
                            ]}
                        >
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                        <Form.Item
                            label="项目名称"
                            name="name"
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
                            name="stage"
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
                                options={[
                                    { name: "待实施阶段", code: "待实施阶段" },
                                    { name: "实施阶段", code: "实施阶段" },
                                    { name: "售后阶段", code: "售后阶段" },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="项目进度"
                            name="schedule"
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
                                options={[
                                    { name: "计划期", code: "计划期" },
                                    { name: "试运行", code: "试运行" },
                                    { name: "质保期", code: "质保期" },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="是否支持标准巡检"
                            name="standard"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择是否支持标准巡检",
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={"是"}>是</Radio>
                                <Radio value={"否"}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="项目类型"
                            name="projectType"
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
                                options={[
                                    { name: "工商业", code: "工商业" },
                                    { name: "源网侧", code: "源网侧" },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="产品类型"
                            name="productType"
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
                                options={[
                                    { name: "集装箱", code: "集装箱" },
                                    { name: "户外柜", code: "户外柜" },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="所属区域"
                            name="area"
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
                                options={[
                                    { name: "上海", code: "上海" },
                                    { name: "宁夏", code: "上海" },
                                    { name: "浙江", code: "上海" },
                                ]}
                            />
                        </Form.Item>
                    </>
                )}

                {currentStep == 1 && (
                    <>
                        <Collapse
                            defaultActiveKey={["1"]}
                            expandIcon={({ isActive }) => (
                                <CaretRightOutlined rotate={isActive ? 90 : 0} />
                            )}
                            bordered={false}
                            style={{ background: "none" }}
                        >
                            <Panel header="电站详细信息" key="1">
                                <>
                                    <Row span={24}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="业主名称"
                                                name="owner"
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
                                                name="adress"
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
                                                name="plantName"
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
                                                name="plantUser"
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
                                                name="plantPhone"
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
                                                name="unit"
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
                                                name="range"
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
                                                name="start"
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
                                                name="group"
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
                                                name="detailAdress"
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
                            </Panel>
                        </Collapse>
                        <Collapse
                            defaultActiveKey={["1"]}
                            expandIcon={({ isActive }) => (
                                <CaretRightOutlined rotate={isActive ? 90 : 0} />
                            )}
                            bordered={false}
                            style={{ background: "none" }}
                        >
                            <Panel header="设备配置信息" key="1">
                                <>
                                    <Row span={24}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="电池仓数量"
                                                name="batteryCount"
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
                                                name="singleBattery"
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
                                                name="PCSCount"
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
                                                name="cellMaterial"
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
                                                name="heapMethod"
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
                                                name="singlePCS"
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
                                                name="clusterMethod"
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
                                                name="singleCell"
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
                                                name="firefightingMedium"
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
                                                name="effect"
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
                                                name="multiplier"
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
                                                name="plantInfo"
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
                            </Panel>
                        </Collapse>
                        <Collapse
                            defaultActiveKey={["1"]}
                            expandIcon={({ isActive }) => (
                                <CaretRightOutlined rotate={isActive ? 90 : 0} />
                            )}
                            bordered={false}
                            style={{ background: "none" }}
                        >
                            <Panel header="厂商信息" key="1">
                                <>
                                    <Row span={24}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="BMS厂商"
                                                name="BMSManufacturer"
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
                                                name="BMSManufacturerPhone"
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
                                                name="PCSManufacturer"
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
                                                name="PCSManufacturerPhone"
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
                                                name="transformerManufacturer"
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
                                                name="transformerManufacturerPhone"
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
                                                name="liquidCoolingManufacturer"
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
                                                name="liquidCoolingManufacturerPhone"
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
                                                name="airManufacturer"
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
                                                name="airManufacturerPhone"
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
                                                name="PACKManufacturer"
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
                                                name="PACKManufacturerPhone"
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
                                                name="cellManufacturer"
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
                                                name="cellManufacturerPhone"
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
                                                name="batteryManufacturer"
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
                                                name="batteryManufacturerPhone"
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
                                                name="fireManufacturer"
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
                                                name="fireManufacturerPhone"
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
                                                name="emsManufacturer"
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
                                                name="emsManufacturerPhone"
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
                            </Panel>
                        </Collapse>
                    </>
                )}

                {currentStep == 2 && (
                    <>
                        <Form.Item
                            label="实施计划时间"
                            name="implementationPlanTime"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入实施计划时间",
                                },
                            ]}
                        >
                            <Input placeholder="请输入实施计划时间" />
                        </Form.Item>
                        <Form.Item label="实施负责人">
                            <Space>
                                <Form.Item
                                    noStyle
                                    name="implementationManager"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请选择实施负责人",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="请选择实施负责人"
                                        fieldNames={{
                                            label: "name",
                                            value: "code",
                                        }}
                                        style={{ width: '200px' }}
                                        options={[
                                            { name: "张**", code: "张**" },
                                            { name: "李**", code: "李**" },
                                            { name: "郑**", code: "郑**" },
                                            { name: "孙**", code: "孙**" },
                                            { name: "王**", code: "王**" },
                                        ]}
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>
                                <Tooltip
                                    title="创建项目后，会在计划开始时间时自动创建一条实施工单至实施负责人，实施阶段该项目
                            产生的所有工单会由实施负责人负责。"
                                >
                                    <ExclamationCircleOutlined />
                                </Tooltip>
                            </Space>
                        </Form.Item>
                    </>
                )}

                {currentStep == 3 && (
                    <>
                        <Row span={24}>
                            <Col span={8}>
                                <Form.Item label="运维负责人">
                                    <Space>
                                        <Form.Item
                                            noStyle
                                            name="operationsManager"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "请选择运维负责人",
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="请选择运维负责人"
                                                fieldNames={{
                                                    label: "name",
                                                    value: "code",
                                                }}
                                                options={[
                                                    { name: "张**", code: "张**" },
                                                    { name: "李**", code: "李**" },
                                                    { name: "郑**", code: "郑**" },
                                                    { name: "孙**", code: "孙**" },
                                                    { name: "王**", code: "王**" },
                                                ]}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                        <Tooltip title="创建项目后，实施阶段该项目产生的所有工单将由实施负责人处理。">
                                            <ExclamationCircleOutlined />
                                        </Tooltip>
                                    </Space>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="首次巡检时间"
                                    name="firstInspectionTime"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请选择首次巡检时间",
                                        },
                                    ]}
                                >
                                    <Input placeholder="请输入首次巡检时间" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="巡检周期"
                                    name="inspectionCycle"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请选择巡检周期",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="请选择巡检周期"
                                        fieldNames={{
                                            label: "name",
                                            value: "code",
                                        }}
                                        options={[
                                            { name: "一天一次", code: 1 },
                                            { name: "一周一次", code: 2 },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={20}>
                                <Form.Item
                                    label="巡检组管理"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请添加巡检组管理",
                                        },
                                    ]}
                                    labelCol={{
                                        span: 24,
                                    }}
                                    wrapperCol={{
                                        offset: 1,
                                    }}
                                >
                                    <div>
                                        <Form.List name="inspectionTeam">
                                            {(fields, { add, remove }) => {
                                                return (
                                                    <>
                                                        {fields.map(
                                                            ({ key, name, ...restField }) => {
                                                                return (
                                                                    <div>
                                                                        <Space
                                                                            style={{
                                                                                marginBottom: 10,
                                                                            }}
                                                                        >
                                                                            <span>
                                                                                巡检组{name + 1}
                                                                            </span>
                                                                            <Button
                                                                                onClick={() =>
                                                                                    remove([
                                                                                        name,
                                                                                        "inspectionTeamGroup",
                                                                                    ])
                                                                                }
                                                                            >
                                                                                -
                                                                            </Button>
                                                                        </Space>
                                                                        <div
                                                                            style={{
                                                                                width: "640px",
                                                                                borderRadius: 8,
                                                                                border: `1px solid rgba(255,255,255,0.3)`,
                                                                                padding:
                                                                                    "28px 30px",
                                                                                marginBottom: 24,
                                                                            }}
                                                                        >
                                                                            <Form.List
                                                                                name={[
                                                                                    name,
                                                                                    "inspectionTeamGroup",
                                                                                ]}
                                                                            >
                                                                                {(
                                                                                    fields,
                                                                                    { add, remove }
                                                                                ) => {
                                                                                    return (
                                                                                        <>
                                                                                            {fields.map(
                                                                                                ({
                                                                                                    key,
                                                                                                    name,
                                                                                                    ...restField
                                                                                                }) => {
                                                                                                    return (
                                                                                                        <Space
                                                                                                            style={{
                                                                                                                width: "100%",
                                                                                                                marginBottom: 10,
                                                                                                            }}
                                                                                                            align="center"
                                                                                                        >
                                                                                                            <Form.Item
                                                                                                                name={[
                                                                                                                    name,
                                                                                                                    "inspectionTeamGroupItem",
                                                                                                                ]}
                                                                                                                label={`巡检事项${name +
                                                                                                                    1
                                                                                                                    }`}
                                                                                                                style={{
                                                                                                                    marginBottom: 0,
                                                                                                                }}
                                                                                                            >
                                                                                                                <Input
                                                                                                                    placeholder={`请输入巡检项${name +
                                                                                                                        1
                                                                                                                        }`}
                                                                                                                    style={{
                                                                                                                        width: 500,
                                                                                                                    }}
                                                                                                                />
                                                                                                            </Form.Item>
                                                                                                            <Button
                                                                                                                onClick={() =>
                                                                                                                    remove(
                                                                                                                        [
                                                                                                                            name,
                                                                                                                            "inspectionTeamGroupItem",
                                                                                                                        ]
                                                                                                                    )
                                                                                                                }
                                                                                                            >
                                                                                                                -
                                                                                                            </Button>
                                                                                                        </Space>
                                                                                                    );
                                                                                                }
                                                                                            )}
                                                                                            <Space>
                                                                                                <Button
                                                                                                    onClick={
                                                                                                        add
                                                                                                    }
                                                                                                >
                                                                                                    +
                                                                                                    添加巡检事项
                                                                                                </Button>
                                                                                            </Space>
                                                                                        </>
                                                                                    );
                                                                                }}
                                                                            </Form.List>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                        <Button
                                                            onClick={add}
                                                            style={{ width: 200, height: 40 }}
                                                            type="primary"
                                                        >
                                                            + 添加巡视组
                                                        </Button>
                                                    </>
                                                );
                                            }}
                                        </Form.List>
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}

                <Form.Item
                    wrapperCol={{
                        offset: 11,
                        span: 5,
                    }}
                >
                    <Space>
                        <Button htmlType="submit">保存</Button>
                        {currentStep != 0 && (
                            <Button type="primary" onClick={() => setCurrentStep(currentStep - 1)}>
                                上一步
                            </Button>
                        )}
                        {currentStep != 3 && (
                            <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                                下一步
                            </Button>
                        )}
                    </Space>
                    {/* <Space>
                        <Button onClick={() => onClose(true)}>取消</Button>
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
