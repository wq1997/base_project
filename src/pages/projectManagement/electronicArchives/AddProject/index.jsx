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
    InputNumber,
} from "antd";
import dayjs from "dayjs";
import { Title } from "@/components";
import {
    ExclamationCircleOutlined,
    CaretRightOutlined,
    FileMarkdownFilled,
} from "@ant-design/icons";
import {
    basProjectPart1SaveOrUpdate as basProjectPart1SaveOrUpdateServe,
    getBasProjectEditInitData as getBasProjectEditInitDataServe,
    basProjectPart2SaveOrUpdate as basProjectPart2SaveOrUpdateServe,
    basProjectPart3SaveOrUpdate as basProjectPart3SaveOrUpdateServe,
    basProjectPart4SaveOrUpdate as basProjectPart4SaveOrUpdateServe,
    basProjectPart4Submit as basProjectPart4SubmitServe,
} from "@/services";
import { getBaseUrl } from "@/services/request";
import { jsonToUrlParams } from "@/utils/utils";
import styles from "./index.less";
import { cycleList } from "../index";

const { Panel } = Collapse;

const AddProject = ({ detailRow, open, onClose, editCurrentStep }) => {
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [addId, setAddId] = useState();
    const [initOption, setInitOption] = useState({});
    const [phase, setPhase] = useState();

    const getInitOption = async () => {
        const res = await getBasProjectEditInitDataServe();
        if (res?.data?.status == "SUCCESS") {
            let data = res?.data?.data;
            if (detailRow?.sePlants) {
                data.sePlans = data.sePlans?.concat(...detailRow?.sePlants);
            }
            setInitOption(data);
        }
    };

    useEffect(() => {
        setCurrentStep(editCurrentStep);
        if (detailRow) {
            setPhase(detailRow?.phase);
            form.setFieldsValue({
                ...detailRow,
                approvalTime: detailRow?.approvalTime ? dayjs(detailRow?.approvalTime) : undefined,
                warrantyPeriodDate:
                    detailRow?.warrantyPeriodStartDate && detailRow?.warrantyPeriodEndDate
                        ? [
                              dayjs(detailRow?.warrantyPeriodStartDate),
                              dayjs(detailRow?.warrantyPeriodEndDate),
                          ]
                        : undefined,
                sePlants: detailRow?.sePlants?.map?.(item => {
                    return JSON.stringify({
                        name: item?.name,
                        plantId: item?.plantId,
                    });
                }),
                BMSManufacturer: detailRow?.suppliers?.find(item => item.supplyType === "BMS")?.[
                    "supplierId"
                ],
                BMSManufacturerPhone: detailRow?.suppliers?.find(
                    item => item.supplyType === "BMS"
                )?.["contractNumber"],
                PCSManufacturer: detailRow?.suppliers?.find(item => item.supplyType === "PCS")?.[
                    "supplierId"
                ],
                PCSManufacturerPhone: detailRow?.suppliers?.find(
                    item => item.supplyType === "PCS"
                )?.["contractNumber"],
                transformerManufacturer: detailRow?.suppliers?.find(
                    item => item.supplyType === "变压器"
                )?.["supplierId"],
                transformerManufacturerPhone: detailRow?.suppliers?.find(
                    item => item.supplyType === "变压器"
                )?.["contractNumber"],
                liquidCoolingManufacturer: detailRow?.suppliers?.find(
                    item => item.supplyType === "液冷系统"
                )?.["supplierId"],
                liquidCoolingManufacturerPhone: detailRow?.suppliers?.find(
                    item => item.supplyType === "液冷系统"
                )?.["contractNumber"],
                airManufacturer: detailRow?.suppliers?.find(item => item.supplyType === "空调")?.[
                    "supplierId"
                ],
                airManufacturerPhone: detailRow?.suppliers?.find(
                    item => item.supplyType === "空调"
                )?.["contractNumber"],
                PACKManufacturer: detailRow?.suppliers?.find(
                    item => item.supplyType === "PACK组装"
                )?.["supplierId"],
                PACKManufacturerPhone: detailRow?.suppliers?.find(
                    item => item.supplyType === "PACK组装"
                )?.["contractNumber"],
                cellManufacturer: detailRow?.suppliers?.find(item => item.supplyType === "电芯")?.[
                    "supplierId"
                ],
                cellManufacturerPhone: detailRow?.suppliers?.find(
                    item => item.supplyType === "电芯"
                )?.["contractNumber"],
                batteryManufacturer: detailRow?.suppliers?.find(
                    item => item.supplyType === "电池仓箱体"
                )?.["supplierId"],
                batteryManufacturerPhone: detailRow?.suppliers?.find(
                    item => item.supplyType === "电池仓箱体"
                )?.["contractNumber"],
                fireManufacturer: detailRow?.suppliers?.find(item => item.supplyType === "消防")?.[
                    "supplierId"
                ],
                fireManufacturerPhone: detailRow?.suppliers?.find(
                    item => item.supplyType === "消防"
                )?.["contractNumber"],
                emsManufacturer: detailRow?.suppliers?.find(item => item.supplyType === "EMS")?.[
                    "supplierId"
                ],
                emsManufacturerPhone: detailRow?.suppliers?.find(
                    item => item.supplyType === "EMS"
                )?.["contractNumber"],
                combinerCabinetManufacturer: detailRow?.suppliers?.find(
                    item => item.supplyType === "汇流柜"
                )?.["supplierId"],
                combinerCabinetManufacturerPhone: detailRow?.suppliers?.find(
                    item => item.supplyType === "汇流柜"
                )?.["contractNumber"],
                implementationPlanTime:
                    detailRow?.implementPlanStartDate && detailRow?.implementPlanEndDate
                        ? [
                              dayjs(detailRow?.implementPlanStartDate),
                              dayjs(detailRow?.implementPlanEndDate),
                          ]
                        : undefined,
                firstInspectionDate: detailRow?.firstInspectionDate
                    ? dayjs(detailRow?.firstInspectionDate)
                    : undefined,
                inspectionGroups: detailRow?.inspectionGroups?.map(item => {
                    return {
                        nameLabel: item?.name,
                        inspectionTeamGroup: item?.inspectionItemIds?.map(item => {
                            return {
                                inspectionItemIds: item,
                            };
                        }),
                    };
                }),
            });
        }else{
            form.resetFields();
        }
    }, [editCurrentStep, detailRow]);

    const save = async type => {
        let values = {};
        let res = undefined;
        let flag = false;
        if (currentStep === 0) {
            values = await form.validateFields([
                "approvalTime",
                "name",
                "maxPowerMw",
                "capacityMwh",
                "phase",
                "subPhase",
                "supportStandardInspection",
                "type",
                "productType",
                "region",
            ]);
            res = await basProjectPart1SaveOrUpdateServe({
                ...values,
                approvalTime: dayjs(values?.approvalTime).format("YYYY-MM-DD"),
                id: detailRow?.id || addId,
            });
            if (res?.data?.status === "SUCCESS") {
                setAddId(res?.data?.data);
                flag = true;
            }
        }
        if (currentStep === 1) {
            values = await form.validateFields([
                "ownerName",
                "address",
                "plantName",
                "plantContacts",
                "plantContractNumber",
                "epcName",
                "ourScopeOfSupply",
                "warrantyPeriodDate",
                "esuGroupDesc",
                "province",
                "city",
                "district",
                "longitude",
                "latitude",
                "batterySlotCount",
                "singleBatterySlotCapacity",
                "pcsCount",
                "singlePcsMaxPower",
                "batteryClusterComposeMethod",
                "batteryStackComposeMethod",
                "cellMaterial",
                "singleCellRatedCapacity",
                "ratedChargingDischargingRate",
                "chargeDischargeCe",
                "firefightingMedium",
                "sePlants",
                "BMSManufacturer",
                "BMSManufacturerPhone",
                "PCSManufacturer",
                "PCSManufacturerPhone",
                "transformerManufacturer",
                "transformerManufacturerPhone",
                "liquidCoolingManufacturer",
                "liquidCoolingManufacturerPhone",
                "airManufacturer",
                "airManufacturerPhone",
                "PACKManufacturer",
                "PACKManufacturerPhone",
                "cellManufacturer",
                "cellManufacturerPhone",
                "batteryManufacturer",
                "batteryManufacturerPhone",
                "fireManufacturer",
                "fireManufacturerPhone",
                "emsManufacturer",
                "emsManufacturerPhone",
                "combinerCabinetManufacturer",
                "combinerCabinetManufacturerPhone",
            ]);
            const {
                ownerName,
                address,
                plantName,
                plantContacts,
                plantContractNumber,
                epcName,
                ourScopeOfSupply,
                warrantyPeriodDate,
                esuGroupDesc,
                province,
                city,
                district,
                longitude,
                latitude,
                batterySlotCount,
                singleBatterySlotCapacity,
                pcsCount,
                singlePcsMaxPower,
                batteryClusterComposeMethod,
                batteryStackComposeMethod,
                cellMaterial,
                singleCellRatedCapacity,
                ratedChargingDischargingRate,
                chargeDischargeCe,
                firefightingMedium,
                sePlants,
                BMSManufacturer,
                BMSManufacturerPhone,
                PCSManufacturer,
                PCSManufacturerPhone,
                transformerManufacturer,
                transformerManufacturerPhone,
                liquidCoolingManufacturer,
                liquidCoolingManufacturerPhone,
                airManufacturer,
                airManufacturerPhone,
                PACKManufacturer,
                PACKManufacturerPhone,
                cellManufacturer,
                cellManufacturerPhone,
                batteryManufacturer,
                batteryManufacturerPhone,
                fireManufacturer,
                fireManufacturerPhone,
                emsManufacturer,
                emsManufacturerPhone,
                combinerCabinetManufacturer,
                combinerCabinetManufacturerPhone,
            } = values;
            res = await basProjectPart2SaveOrUpdateServe({
                id: detailRow?.id || addId,
                ownerName,
                address,
                plantName,
                plantContacts,
                plantContractNumber,
                epcName,
                ourScopeOfSupply,
                warrantyPeriodStartDate: warrantyPeriodDate?.[0]
                    ? dayjs(warrantyPeriodDate?.[0]).format("YYYY-MM-DD")
                    : undefined,
                warrantyPeriodEndDate: warrantyPeriodDate?.[1]
                    ? dayjs(warrantyPeriodDate?.[1]).format("YYYY-MM-DD")
                    : undefined,
                esuGroupDesc,
                province,
                city,
                district,
                longitude,
                latitude,
                batterySlotCount,
                singleBatterySlotCapacity,
                pcsCount,
                singlePcsMaxPower,
                batteryClusterComposeMethod,
                batteryStackComposeMethod,
                cellMaterial,
                singleCellRatedCapacity,
                ratedChargingDischargingRate,
                chargeDischargeCe,
                firefightingMedium,
                sePlants: sePlants?.map(item => {
                    const data = JSON.parse(item);
                    return {
                        name: data?.name,
                        plantId: data?.plantId,
                    };
                }),
                suppliers: [
                    {
                        supplyType: "BMS",
                        supplierId: BMSManufacturer,
                        contractNumber: BMSManufacturerPhone,
                    },
                    {
                        supplyType: "PCS",
                        supplierId: PCSManufacturer,
                        contractNumber: PCSManufacturerPhone,
                    },
                    {
                        supplyType: "变压器",
                        supplierId: transformerManufacturer,
                        contractNumber: transformerManufacturerPhone,
                    },
                    {
                        supplyType: "液冷系统",
                        supplierId: liquidCoolingManufacturer,
                        contractNumber: liquidCoolingManufacturerPhone,
                    },
                    {
                        supplyType: "空调",
                        supplierId: airManufacturer,
                        contractNumber: airManufacturerPhone,
                    },
                    {
                        supplyType: "PACK组装",
                        supplierId: PACKManufacturer,
                        contractNumber: PACKManufacturerPhone,
                    },
                    {
                        supplyType: "电芯",
                        supplierId: cellManufacturer,
                        contractNumber: cellManufacturerPhone,
                    },
                    {
                        supplyType: "电池仓箱体",
                        supplierId: batteryManufacturer,
                        contractNumber: batteryManufacturerPhone,
                    },
                    {
                        supplyType: "消防",
                        supplierId: fireManufacturer,
                        contractNumber: fireManufacturerPhone,
                    },
                    {
                        supplyType: "EMS",
                        supplierId: emsManufacturer,
                        contractNumber: emsManufacturerPhone,
                    },
                    {
                        supplyType: "汇流柜",
                        supplierId: combinerCabinetManufacturer,
                        contractNumber: combinerCabinetManufacturerPhone,
                    },
                ],
            });
            if (res?.data?.status === "SUCCESS") {
                flag = true;
            }
        }
        if (currentStep === 2) {
            values = await form.validateFields([
                "implementationPlanTime",
                "implementManagerAccount",
            ]);
            const { implementationPlanTime, implementManagerAccount } = values;
            res = await basProjectPart3SaveOrUpdateServe({
                id: detailRow?.id || addId,
                implementPlanStartDate: dayjs(implementationPlanTime?.[0]).format("YYYY-MM-DD"),
                implementPlanEndDate: dayjs(implementationPlanTime?.[1]).format("YYYY-MM-DD"),
                implementManagerAccount,
            });
            if (res?.data?.status === "SUCCESS") {
                flag = true;
            }
        }
        if (currentStep === 3) {
            values = await form.validateFields([
                "operationsManagerAccount",
                "firstInspectionDate",
                "inspectionCycle",
                "inspectionGroups",
            ]);
            const {
                operationsManagerAccount,
                firstInspectionDate,
                inspectionCycle,
                inspectionGroups,
            } = values;
            await basProjectPart4SaveOrUpdateServe({
                id: detailRow?.id || addId,
                operationsManagerAccount,
                firstInspectionDate: dayjs(firstInspectionDate).format("YYYY-MM-DD"),
                inspectionCycle,
                inspectionGroups: inspectionGroups?.map(item => {
                    return {
                        name: item?.nameLabel,
                        inspectionItemIds: item?.inspectionTeamGroup?.map(
                            subItem => subItem?.inspectionItemIds
                        ),
                    };
                }),
            });
            res = await basProjectPart4SubmitServe({
                id: detailRow?.id || addId,
                operationsManagerAccount,
                firstInspectionDate: dayjs(firstInspectionDate).format("YYYY-MM-DD"),
                inspectionCycle,
                inspectionGroups: inspectionGroups?.map(item => {
                    return {
                        name: item?.nameLabel,
                        inspectionItemIds: item?.inspectionTeamGroup?.map(
                            subItem => subItem?.inspectionItemIds
                        ),
                    };
                }),
            });
            if (res?.data?.status === "SUCCESS") {
                flag = true;
            }
        }
        if (flag) {
            if (type === "save") message.success("保存成功");
            if (type === "nexStep") {
                if (currentStep === 1 && phase === "POST_IMPLEMENTATION") {
                    setCurrentStep(3);
                } else {
                    setCurrentStep(currentStep + 1);
                }
            }
            if (type === "submit") onClose();
        }
    };

    useEffect(() => {
        if (open) {
            getInitOption();
            setAddId();
        }
    }, [open]);

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
                items={[
                    {
                        title: "项目基础资料维护",
                        disabled: !detailRow,
                    },
                    {
                        title: "项目详细资料维护",
                        disabled: !detailRow,
                    },
                    {
                        title: "维护实施管理信息",
                        disabled: !detailRow,
                    },
                    {
                        title: "运维管理信息",
                        disabled: !detailRow,
                    },
                ]}
                onChange={value => setCurrentStep(value)}
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
                autoComplete="off"
            >
                {currentStep == 0 && (
                    <>
                        <Form.Item
                            label="立项时间"
                            name="approvalTime"
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
                            label="充放功率(MW)"
                            name="maxPowerMw"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入充放功率",
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} placeholder="请输入充放功率" />
                        </Form.Item>
                        <Form.Item
                            label="项目容量(MWh)"
                            name="capacityMwh"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入项目容量",
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} placeholder="请输入项目容量" />
                        </Form.Item>
                        <Form.Item
                            label="项目阶段"
                            name="phase"
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
                                options={initOption?.phases || []}
                                onChange={value => {
                                    form.setFieldsValue({subPhase: undefined})
                                    setPhase(value);
                                }}
                            />
                        </Form.Item>
                        <Form.Item noStyle dependencies={["phase"]}>
                            {({ getFieldsValue }) => {
                                const { phase } = getFieldsValue(["phase"]);
                                return (
                                    <Form.Item
                                        label="项目进度"
                                        name="subPhase"
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
                                            options={initOption?.phase2SubPhases?.[phase]}
                                        />
                                    </Form.Item>
                                );
                            }}
                        </Form.Item>
                        <Form.Item
                            label="项目类型"
                            name="type"
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
                                options={initOption?.types || []}
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
                                options={initOption?.productTypes || []}
                            />
                        </Form.Item>
                        <Form.Item
                            label="所属区域"
                            name="region"
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
                                options={initOption?.regions || []}
                            />
                        </Form.Item>
                        <Form.Item
                            label="是否支持标准巡检"
                            name="supportStandardInspection"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择是否支持标准巡检",
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>
                            </Radio.Group>
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
                                                name="ownerName"
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
                                                name="address"
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
                                                name="plantContacts"
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
                                                name="plantContractNumber"
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
                                                name="epcName"
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
                                                name="ourScopeOfSupply"
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
                                                name="warrantyPeriodDate"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入质保期起止时间",
                                                    },
                                                ]}
                                            >
                                                <DatePicker.RangePicker
                                                    placeholder={["开始时间", "截止时间"]}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row span={24}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="电站内储能单元分组情况"
                                                name="esuGroupDesc"
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
                                                label="电站所属省"
                                                name="province"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入电站所属省",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="请输入电站所属省" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="电站所属市"
                                                name="city"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入电站所属市",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="请输入电站所属市" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="电站所属区/镇"
                                                name="district"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入电站所属区/镇",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="请输入电站所属区/镇" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="经度"
                                                name="longitude"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入电站经度",
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    style={{ width: "100%" }}
                                                    placeholder="请输入电站经度"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="纬度"
                                                name="latitude"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入电站纬度",
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    style={{ width: "100%" }}
                                                    placeholder="请输入电站纬度"
                                                />
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
                                                name="batterySlotCount"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入电池仓数量",
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    precision={0}
                                                    style={{ width: "100%" }}
                                                    placeholder="请输入电池仓数量"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="单台电池仓容量(kWh)"
                                                name="singleBatterySlotCapacity"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入单台电池仓容量(kWh)",
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    style={{ width: "100%" }}
                                                    placeholder="请输入单台电池仓容量(kWh)"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row span={24}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="PCS一体机数量"
                                                name="pcsCount"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入PCS一体机数量",
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    precision={0}
                                                    style={{ width: "100%" }}
                                                    placeholder="请输入PCS一体机数量"
                                                />
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
                                                <Select
                                                    options={initOption?.cellMaterials?.map(
                                                        item => {
                                                            return {
                                                                label: item?.name,
                                                                value: item?.code,
                                                            };
                                                        }
                                                    )}
                                                    placeholder="请输入电芯材料"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row span={24}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="电池堆成组方式"
                                                name="batteryStackComposeMethod"
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
                                                name="singlePcsMaxPower"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入单台PCS最大功率(kW)",
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    style={{ width: "100%" }}
                                                    placeholder="请输入单台PCS最大功率(kW)"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row span={24}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="电池簇成组方式"
                                                name="batteryClusterComposeMethod"
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
                                                label="单电芯额定容量(Ah)"
                                                name="singleCellRatedCapacity"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入单电芯额定容量(Ah)",
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    style={{ width: "100%" }}
                                                    placeholder="请输入单电芯额定容量(Ah)"
                                                />
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
                                                name="chargeDischargeCe"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入充放电转换效率",
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    style={{ width: "100%" }}
                                                    placeholder="请输入充放电转换效率"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row span={24}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="额定充放电倍率(C)"
                                                name="ratedChargingDischargingRate"
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
                                                name="sePlants"
                                                rules={[
                                                    {
                                                        validator: (rule, value) => {
                                                            if (
                                                                value?.length !== 0 &&
                                                                value?.length > 1
                                                            ) {
                                                                return Promise.reject(
                                                                    "只能关联一个场站"
                                                                );
                                                            }
                                                            return Promise.resolve();
                                                        },
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    mode="multiple"
                                                    placeholder="请输入关联场站信息"
                                                    options={initOption?.sePlans?.map(item => {
                                                        return {
                                                            label: item?.name,
                                                            value: JSON.stringify({
                                                                name: item?.name,
                                                                plantId: item?.plantId,
                                                            }),
                                                        };
                                                    })}
                                                />
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
                                                <Select
                                                    placeholder="请输入BMS厂商"
                                                    options={initOption?.supplierType2Suppliers?.[
                                                        "BMS"
                                                    ]?.map(item => {
                                                        return {
                                                            value: item?.id,
                                                            label: item?.name,
                                                        };
                                                    })}
                                                />
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
                                                <Select
                                                    placeholder="请输入PCS厂商"
                                                    options={initOption?.supplierType2Suppliers?.[
                                                        "PCS"
                                                    ]?.map(item => {
                                                        return {
                                                            value: item?.id,
                                                            label: item?.name,
                                                        };
                                                    })}
                                                />
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
                                                <Select
                                                    placeholder="请输入变压器厂商"
                                                    options={initOption?.supplierType2Suppliers?.[
                                                        "变压器"
                                                    ]?.map(item => {
                                                        return {
                                                            value: item?.id,
                                                            label: item?.name,
                                                        };
                                                    })}
                                                />
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
                                                <Select
                                                    placeholder="请输入液冷系统厂商"
                                                    options={initOption?.supplierType2Suppliers?.[
                                                        "液冷系统"
                                                    ]?.map(item => {
                                                        return {
                                                            value: item?.id,
                                                            label: item?.name,
                                                        };
                                                    })}
                                                />
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
                                                <Select
                                                    placeholder="请输入空调厂商"
                                                    options={initOption?.supplierType2Suppliers?.[
                                                        "空调"
                                                    ]?.map(item => {
                                                        return {
                                                            value: item?.id,
                                                            label: item?.name,
                                                        };
                                                    })}
                                                />
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
                                                <Select
                                                    placeholder="请输入PACK组装厂厂商"
                                                    options={initOption?.supplierType2Suppliers?.[
                                                        "PACK组装"
                                                    ]?.map(item => {
                                                        return {
                                                            value: item?.id,
                                                            label: item?.name,
                                                        };
                                                    })}
                                                />
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
                                                <Select
                                                    placeholder="请输入电芯厂商"
                                                    options={initOption?.supplierType2Suppliers?.[
                                                        "电芯"
                                                    ]?.map(item => {
                                                        return {
                                                            value: item?.id,
                                                            label: item?.name,
                                                        };
                                                    })}
                                                />
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
                                                <Select
                                                    placeholder="请输入电池仓箱体厂商"
                                                    options={initOption?.supplierType2Suppliers?.[
                                                        "电池仓箱体"
                                                    ]?.map(item => {
                                                        return {
                                                            value: item?.id,
                                                            label: item?.name,
                                                        };
                                                    })}
                                                />
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
                                                <Select
                                                    placeholder="请输入消防厂商"
                                                    options={initOption?.supplierType2Suppliers?.[
                                                        "消防"
                                                    ]?.map(item => {
                                                        return {
                                                            value: item?.id,
                                                            label: item?.name,
                                                        };
                                                    })}
                                                />
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
                                                <Select
                                                    placeholder="请输入EMS厂商"
                                                    options={initOption?.supplierType2Suppliers?.[
                                                        "EMS"
                                                    ]?.map(item => {
                                                        return {
                                                            value: item?.id,
                                                            label: item?.name,
                                                        };
                                                    })}
                                                />
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
                                    <Row span={24}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="汇流柜厂商"
                                                name="combinerCabinetManufacturer"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入汇流柜厂商",
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    placeholder="请输入汇流柜厂商"
                                                    options={initOption?.supplierType2Suppliers?.[
                                                        "汇流柜"
                                                    ]?.map(item => {
                                                        return {
                                                            value: item?.id,
                                                            label: item?.name,
                                                        };
                                                    })}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="联系方式"
                                                name="combinerCabinetManufacturerPhone"
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
                            <DatePicker.RangePicker
                                placeholder={["计划开始时间", "计划结束时间"]}
                            />
                        </Form.Item>
                        <Form.Item label="实施负责人">
                            <Space>
                                <Form.Item
                                    noStyle
                                    name="implementManagerAccount"
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
                                        style={{ width: "200px" }}
                                        options={initOption?.users}
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
                        {(detailRow?.shippingMaterial ||
                            detailRow?.testingMaterial ||
                            detailRow?.trialRunMaterial) && (
                            <div className={styles.steps3}>
                                <Form.Item label="实施过程档案">
                                    <Space direction="vertical">
                                        {detailRow?.shippingMaterial && (
                                            <div className={styles.cardItem}>
                                                <div className={styles.cardItemRow1}>
                                                    <div className={styles.cardItemRow1Time}>
                                                        发货阶段(
                                                        {detailRow?.shippingMaterial?.operationTime}
                                                        )
                                                    </div>
                                                    <div>
                                                        实际操作人(
                                                        {detailRow?.shippingMaterial?.operatorName})
                                                    </div>
                                                </div>
                                                <div className={styles.cardItemRow2}>
                                                    <div className={styles.cardItemRow2Label}>
                                                        签收货单
                                                    </div>
                                                    {detailRow?.shippingMaterial?.goodsReceivedNote
                                                        ?.id && (
                                                        <div className={styles.cardItemRow2Content}>
                                                            <FileMarkdownFilled
                                                                style={{
                                                                    color: "#0EBCB6",
                                                                    fontSize: 30,
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => {
                                                                    window.open(
                                                                        `${getBaseUrl()}/attachment/download/${detailRow?.shippingMaterial?.goodsReceivedNote?.id}` +
                                                                            jsonToUrlParams({
                                                                                id: detailRow
                                                                                    ?.shippingMaterial
                                                                                    ?.goodsReceivedNote
                                                                                    ?.id,
                                                                                access_token:
                                                                                    localStorage.getItem(
                                                                                        "Token"
                                                                                    ),
                                                                            }),
                                                                        "_blank"
                                                                    );
                                                                }}
                                                            />
                                                            <div>
                                                                {
                                                                    detailRow?.shippingMaterial
                                                                        ?.goodsReceivedNote
                                                                        ?.fileName
                                                                }
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={styles.cardItemRow3}>
                                                    <div className={styles.cardItemRow3Label}>
                                                        备注：
                                                    </div>
                                                    <div>{detailRow?.shippingMaterial?.remark}</div>
                                                </div>
                                            </div>
                                        )}
                                        {detailRow?.testingMaterial && (
                                            <div className={styles.cardItem}>
                                                <div className={styles.cardItemRow1}>
                                                    <div className={styles.cardItemRow1Time}>
                                                        调试阶段(
                                                        {detailRow?.testingMaterial?.operationTime})
                                                    </div>
                                                    <div>
                                                        实际操作人(
                                                        {detailRow?.testingMaterial?.operatorName})
                                                    </div>
                                                </div>
                                                <div className={styles.cardItemRow2}>
                                                    <div className={styles.cardItemRow2Label}>
                                                        验收报告
                                                    </div>
                                                    {detailRow?.testingMaterial?.acceptanceReport
                                                        ?.id && (
                                                        <div className={styles.cardItemRow2Content}>
                                                            <FileMarkdownFilled
                                                                style={{
                                                                    color: "#0EBCB6",
                                                                    fontSize: 30,
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => {
                                                                    window.open(
                                                                        `${getBaseUrl()}/attachment/download/${detailRow?.testingMaterial?.acceptanceReport?.id}` +
                                                                            jsonToUrlParams({
                                                                                id: detailRow
                                                                                    ?.testingMaterial
                                                                                    ?.acceptanceReport
                                                                                    ?.id,
                                                                                access_token:
                                                                                    localStorage.getItem(
                                                                                        "Token"
                                                                                    ),
                                                                            }),
                                                                        "_blank"
                                                                    );
                                                                }}
                                                            />
                                                            <div>
                                                                {
                                                                    detailRow?.testingMaterial
                                                                        ?.acceptanceReport?.fileName
                                                                }
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={styles.cardItemRow3}>
                                                    <div className={styles.cardItemRow3Label}>
                                                        备注：
                                                    </div>
                                                    <div>{detailRow?.testingMaterial?.remark}</div>
                                                </div>
                                            </div>
                                        )}
                                        {detailRow?.trialRunMaterial && (
                                            <div className={styles.cardItem}>
                                                <div className={styles.cardItemRow1}>
                                                    <div className={styles.cardItemRow1Time}>
                                                        试运行阶段(
                                                        {detailRow?.trialRunMaterial?.operationTime}
                                                        )
                                                    </div>
                                                    <div>
                                                        实际操作人(
                                                        {detailRow?.trialRunMaterial?.operatorName})
                                                    </div>
                                                </div>
                                                <div className={styles.cardItemRow2}>
                                                    <div className={styles.cardItemRow2Label}>
                                                        客户验收单
                                                    </div>
                                                    {detailRow?.trialRunMaterial
                                                        ?.customerAcceptanceForm?.id && (
                                                        <div className={styles.cardItemRow2Content}>
                                                            <FileMarkdownFilled
                                                                style={{
                                                                    color: "#0EBCB6",
                                                                    fontSize: 30,
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => {
                                                                    window.open(
                                                                        `${getBaseUrl()}/attachment/download/${detailRow?.trialRunMaterial?.customerAcceptanceForm?.id}` +
                                                                            jsonToUrlParams({
                                                                                id: detailRow
                                                                                    ?.trialRunMaterial
                                                                                    ?.customerAcceptanceForm
                                                                                    ?.id,
                                                                                access_token:
                                                                                    localStorage.getItem(
                                                                                        "Token"
                                                                                    ),
                                                                            }),
                                                                        "_blank"
                                                                    );
                                                                }}
                                                            />
                                                            <div>
                                                                {
                                                                    detailRow?.trialRunMaterial
                                                                        ?.customerAcceptanceForm
                                                                        ?.fileName
                                                                }
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={styles.cardItemRow3}>
                                                    <div className={styles.cardItemRow3Label}>
                                                        备注：
                                                    </div>
                                                    <div>{detailRow?.trialRunMaterial?.remark}</div>
                                                </div>
                                            </div>
                                        )}
                                    </Space>
                                </Form.Item>
                            </div>
                        )}
                    </>
                )}

                {currentStep == 3 && (
                    <>
                        <Row span={24}>
                            <Col span={8}>
                                <Form.Item label="运维负责人">
                                    <Row>
                                        <Form.Item
                                            name="operationsManagerAccount"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "请选择运维负责人",
                                                },
                                            ]}
                                            style={{ marginBottom: 0 }}
                                        >
                                            <Select
                                                placeholder="请选择运维负责人"
                                                fieldNames={{
                                                    label: "name",
                                                    value: "code",
                                                }}
                                                options={initOption?.users}
                                                style={{ width: "200px" }}
                                            />
                                        </Form.Item>
                                        <Tooltip title="创建项目后，实施阶段该项目产生的所有工单将由实施负责人处理。">
                                            <ExclamationCircleOutlined />
                                        </Tooltip>
                                    </Row>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="首次巡检时间"
                                    name="firstInspectionDate"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请选择首次巡检时间",
                                        },
                                    ]}
                                >
                                    <DatePicker placeholder="请输入首次巡检时间" />
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
                                        options={cycleList}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{ marginLeft: 58, marginTop: 10 }}>
                            <Col span={20}>
                                <Form.Item noStyle dependencies={["supportStandardInspection"]}>
                                    {({ getFieldsValue }) => {
                                        const { supportStandardInspection } = getFieldsValue([
                                            "supportStandardInspection",
                                        ]);
                                        return (
                                            <Form.Item
                                                hidden={!supportStandardInspection}
                                                label={
                                                    <div style={{ marginBottom: 20 }}>
                                                        <span>巡检组管理</span>
                                                        {detailRow?.status === "ACTIVE" && (
                                                            <Button
                                                                type="primary"
                                                                style={{ marginLeft: 50 }}
                                                                onClick={() => {
                                                                    const id =
                                                                        detailRow?.id || addId;
                                                                    if (id) {
                                                                        window.open(
                                                                            `${getBaseUrl()}/bas-project/download-inspection-code` +
                                                                                jsonToUrlParams({
                                                                                    id,
                                                                                    access_token:
                                                                                        localStorage.getItem(
                                                                                            "Token"
                                                                                        ),
                                                                                }),
                                                                            "_blank"
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                批量下载巡检码
                                                            </Button>
                                                        )}
                                                    </div>
                                                }
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
                                                    <Form.List name="inspectionGroups">
                                                        {(fields, { add, remove }) => {
                                                            const inspectionItemType2Items =
                                                                initOption?.inspectionItemType2Items;
                                                            let inspectionItemType2ItemsOptions =
                                                                [];
                                                            const keysList = Object.keys(
                                                                inspectionItemType2Items || {}
                                                            );
                                                            keysList?.forEach(key => {
                                                                const list =
                                                                    inspectionItemType2Items[
                                                                        key
                                                                    ]?.map(item => {
                                                                        return {
                                                                            label: item?.name,
                                                                            value: item?.id,
                                                                        };
                                                                    });
                                                                inspectionItemType2ItemsOptions =
                                                                    inspectionItemType2ItemsOptions.concat(
                                                                        list
                                                                    );
                                                            });
                                                            return (
                                                                <>
                                                                    {fields.map(
                                                                        ({
                                                                            key,
                                                                            name: oueterName,
                                                                            ...restField
                                                                        }) => {
                                                                            return (
                                                                                <div>
                                                                                    <Space
                                                                                        style={{
                                                                                            marginBottom: 10,
                                                                                        }}
                                                                                    >
                                                                                        <Form.Item
                                                                                            name={[
                                                                                                oueterName,
                                                                                                "nameLabel",
                                                                                            ]}
                                                                                            style={{
                                                                                                marginBottom: 0,
                                                                                            }}
                                                                                            rules={[
                                                                                                {
                                                                                                    required: true,
                                                                                                    message:
                                                                                                        "请输入巡检组名",
                                                                                                },
                                                                                            ]}
                                                                                        >
                                                                                            <Input
                                                                                                placeholder={`请输入巡检组名`}
                                                                                            />
                                                                                        </Form.Item>
                                                                                        <Button
                                                                                            onClick={() =>
                                                                                                remove(
                                                                                                    [
                                                                                                        oueterName,
                                                                                                        "inspectionTeamGroup",
                                                                                                    ]
                                                                                                )
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
                                                                                                oueterName,
                                                                                                "inspectionTeamGroup",
                                                                                            ]}
                                                                                        >
                                                                                            {(
                                                                                                fields,
                                                                                                {
                                                                                                    add,
                                                                                                    remove,
                                                                                                }
                                                                                            ) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        {fields.map(
                                                                                                            ({
                                                                                                                key,
                                                                                                                name: innerName,
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
                                                                                                                                innerName,
                                                                                                                                "inspectionItemIds",
                                                                                                                            ]}
                                                                                                                            label={`巡检事项${innerName + 1}`}
                                                                                                                            style={{
                                                                                                                                marginBottom: 0,
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            <Select
                                                                                                                                placeholder={`请输入巡检项${innerName + 1}`}
                                                                                                                                style={{
                                                                                                                                    width: 500,
                                                                                                                                }}
                                                                                                                                options={
                                                                                                                                    inspectionItemType2ItemsOptions
                                                                                                                                }
                                                                                                                            />
                                                                                                                        </Form.Item>
                                                                                                                        <Button
                                                                                                                            onClick={() =>
                                                                                                                                remove(
                                                                                                                                    [
                                                                                                                                        innerName,
                                                                                                                                        "inspectionItemIds",
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
                                                                        style={{
                                                                            width: 200,
                                                                            height: 40,
                                                                        }}
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
                                        );
                                    }}
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
                        <Button
                            htmlType="submit"
                            onClick={() => {
                                save("save");
                            }}
                        >
                            保存
                        </Button>
                        {currentStep != 0 && (
                            <Button
                                type="primary"
                                onClick={() => {
                                    if (currentStep === 3 && phase === "POST_IMPLEMENTATION") {
                                        setCurrentStep(1);
                                    } else {
                                        setCurrentStep(currentStep - 1);
                                    }
                                }}
                            >
                                上一步
                            </Button>
                        )}
                        {currentStep != 3 && (
                            <Button
                                type="primary"
                                onClick={() => {
                                    save("nexStep");
                                }}
                            >
                                下一步
                            </Button>
                        )}
                        {currentStep === 3 && (
                            <Button type="primary" onClick={() => save("submit")}>
                                提交
                            </Button>
                        )}
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProject;
