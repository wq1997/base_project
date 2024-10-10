import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    Space,
    Table,
    message,
    Modal,
    DatePicker,
    Form,
    theme,
    Radio,
    Drawer,
    Popconfirm,
    Descriptions
} from "antd";
import { useLocation } from "umi";
import { SearchInput, EditTable } from "@/components";
import AddProject from "./AddProject";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import styles from "./index.less";
import {
    getBasProjectInitData as getBasProjectInitDataServe,
    getBaseProjectList as getBaseProjectListServe,
    getSupplierInitData as getSupplierInitDataServe,
    basSupplierList as basSupplierListServe,
    basSupplierModifyAll as basSupplierModifyAllServe,
    basProjectDelete as basProjectDeleteServe,
    getBasProjectEditInitData as getBasProjectEditInitDataServe
} from "@/services";
import { getBaseUrl } from "@/services/request";
import { jsonToUrlParams } from "@/utils/utils";
import {
    FileMarkdownFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";
export const cycleList = [
    { name: "一月一次", code: 1 },
    { name: "两月一次", code: 2 },
    { name: "三月一次", code: 3 },
    { name: "四月一次", code: 4 },
    { name: "五月一次", code: 5 },
    { name: "六月一次", code: 6 },
    { name: "七月一次", code: 7 },
    { name: "八月一次", code: 8 },
    { name: "九月一次", code: 9 },
    { name: "十月一次", code: 10 },
    { name: "十一月一次", code: 11 },
    { name: "十二月一次", code: 12 },
]

const Account = () => {
    const { token } = theme.useToken();
    const [supplierForm] = Form.useForm();
    const location = useLocation();
    const initCode = location?.search.split("=")[1];
    const codeRef = useRef(initCode);
    const areaRef = useRef();
    const [area, setArea] = useState();
    const [areaOptions, setAreaOptions] = useState();
    const confirmStatusRef = useRef();
    const splitStatusRef = useRef();
    const responseTypeRef = useRef();
    const responseTimeTypeRef = useRef();
    const [code, setCode] = useState(initCode);
    const [confirmStatus, setConfirmStatus] = useState();
    const [splitStatus, setSplitStatus] = useState();
    const [responseType, setResponseType] = useState();
    const [responseTimeType, setResponseTimeType] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [putEffectPerson, setPutEffectPerson] = useState();
    const putEffectPersonRef = useRef();
    const [operationPerson, setOperationPerson] = useState();
    const operationPersonRef = useRef();
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [supplierOpen, setSupplierOpen] = useState(false);
    const [phaseList, setPhaseList] = useState([]);
    const [projectScheduleList, setProjectScheduleList] = useState([]);
    const [projectTypeList, setProjectTypeList] = useState([]);
    const [productTypeList, setProductTypeList] = useState([]);
    const [putEffectPersonList, setPutEffectPersonList] = useState([]);
    const [operationPersonList, setOperationPersonList] = useState([]);
    const [initSearchOption, setInitSearchOption] = useState([]);
    const [supportStandardInspection, setSupportStandardInspection] = useState();
    const supportStandardInspectionRef = useRef();
    const [addProjectOpen, setAddProjectOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [detailRow, setDetailRow] = useState();
    const [supplierDataSource, setSupplierDataSource] = useState([]);
    const [projectInitiationTime, setProjectInitiationTime] = useState();
    const projectInitiationTimeRef = useRef();
    const [supplyScopesList, setSupplyScopesList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [detailOpen, setDetailOpen] = useState(false);
    const [searchInitOption, setSearchInitOption] = useState({});

    const columns = [
        {
            title: "项目名称",
            dataIndex: "name",
            width: 300,
        },
        {
            title: "项目编号",
            dataIndex: "code",
            width: 200,
        },
        {
            title: "立项时间",
            dataIndex: "approvalTime",
            width: 200,
        },
        {
            title: "关联工单数",
            dataIndex: "refWorkOrderCount",
            width: 150,
        },
        {
            title: "装机规模(MW/MWh)",
            dataIndex: "installationScale",
            width: 200,
            render: (_, { maxPowerMw, capacityMwh }) => {
                return (
                    <span>
                        {maxPowerMw}MW / {capacityMwh}MWh
                    </span>
                );
            },
        },
        {
            title: "项目阶段",
            dataIndex: "phaseZh",
            width: 150,
        },
        {
            title: "项目进度",
            dataIndex: "subPhaseZh",
            width: 150,
        },
        {
            title: "是否支持标准巡检",
            dataIndex: "supportStandardInspection",
            width: 200,
            render: (_, { supportStandardInspection }) => {
                return (
                    <span style={{ color: supportStandardInspection ? "#1BE72B" : "#F50101" }}>
                        {supportStandardInspection ? "是" : "否"}
                    </span>
                );
            },
        },
        {
            title: "项目类型",
            dataIndex: "typeZh",
            width: 150,
        },
        {
            title: "所属区域",
            dataIndex: "regionZh",
            width: 150,
        },
        {
            title: "产品类型",
            dataIndex: "productTypeZh",
            width: 150,
        },
        {
            title: "实施负责人",
            dataIndex: "implementManagerName",
            width: 150,
        },
        {
            title: "运维负责人",
            dataIndex: "operationsManagerName",
            width: 150,
        },
        {
            title: "状态",
            dataIndex: "statusZh",
            width: 150,
        },
        {
            title: "操作",
            dataIndex: "operate",
            fixed: "right",
            width: 250,
            render: (_, row) => {
                const edit = (key, row) => {
                    setCurrentStep(key);
                    setAddProjectOpen(true);
                    setDetailRow(row);
                };
                return (
                    <Space>
                        <a style={{ color: "rgb(22, 118, 239)" }} onClick={() => edit(0, row)}>
                            编辑
                        </a>
                        <a
                            style={{ color: token.colorPrimary }}
                            onClick={() => {
                                setDetailOpen(true);
                                setDetailRow(row);
                            }}>
                            详情
                        </a>
                        {row?.supportRemove && (
                            <Popconfirm
                                title="确定删除？"
                                onConfirm={async () => {
                                    const res = await basProjectDeleteServe({
                                        ids: [row?.id],
                                    });
                                    if (res?.data?.status === "SUCCESS") {
                                        message.success("删除成功！");
                                        getInviteList();
                                    }
                                }}
                                okText="确定"
                                cancelText="取消"
                            >
                                <a style={{ color: "#dc4446" }}>删除</a>
                            </Popconfirm>
                        )}
                        {row?.status === "ACTIVE" && (
                            <a
                                style={{color: '#ed750e'}}
                                onClick={() => {
                                    const id = row?.id;
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
                            </a>
                        )}
                    </Space>
                );
            },
        },
    ];

    const getSearchInitData = async () => {
        const res = await getBasProjectInitDataServe();
        if (res?.data?.status == "SUCCESS") {
            const { regions, phases, types, productTypes, users } = res?.data?.data || {};
            setInitSearchOption(res?.data?.data || {});
            setPhaseList(phases);
            setProjectTypeList(types);
            setProductTypeList(productTypes);
            setPutEffectPersonList(users);
            setOperationPersonList(users);
            setAreaOptions(regions);
        }
    };

    const getDetailInitOption = async () => {
        const res = await getBasProjectEditInitDataServe();
        if (res?.data?.status == "SUCCESS") {
            let data = res?.data?.data;
            if (detailRow?.sePlants) {
                data.sePlans = data.sePlans?.concat(...detailRow?.sePlants);
            }
            setSearchInitOption(data);
        }
    };

    const getSupplierInitData = async () => {
        const res = await getSupplierInitDataServe();
        if (res?.data?.status == "SUCCESS") {
            setSupplyScopesList(res?.data?.data?.supplyScopes);
        }
    };

    const getSupplyInfo = (type) => {
        const currentSupplier = detailRow?.suppliers?.find(item => item.supplyType === type);
        const currentSupplierId = currentSupplier?.supplierId;
        const name = searchInitOption?.supplierType2Suppliers?.[type]?.find(item => item?.id === currentSupplierId)?.name;
        return {
            name,
            contractNumber: currentSupplier?.contractNumber
        };
    }

    const getinspectionItemName = (id) => {
        const inspectionItemType2Items =
            searchInitOption?.inspectionItemType2Items;
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
        const inspectionItem = inspectionItemType2ItemsOptions.find(item => item.value === id);
        return inspectionItem?.label;
    }

    const getInviteList = async () => {
        const { current, pageSize } = paginationRef.current;
        const nameOrCodeLike = codeRef.current;
        const approvalTime = projectInitiationTimeRef.current;
        const region = areaRef.current;
        const phase = confirmStatusRef.current;
        const subPhase = splitStatusRef.current;
        const type = responseTypeRef.current;
        const productType = responseTimeTypeRef.current;
        const implementManagerAccount = putEffectPersonRef.current;
        const operationsManagerAccount = operationPersonRef.current;
        const supportStandardInspection = supportStandardInspectionRef.current;
        const res = await getBaseProjectListServe({
            pageNum: current,
            pageSize,
            queryCmd: {
                nameOrCodeLike,
                approvalTimeStart: approvalTime,
                approvalTimeEnd: approvalTime,
                region,
                phase,
                subPhase,
                type,
                productType,
                implementManagerAccount,
                operationsManagerAccount,
                supportStandardInspection,
            },
        });
        if (res?.data?.status == "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setUserList(recordList);
        }
    };

    const handleReset = () => {
        codeRef.current = undefined;
        areaRef.current = undefined;
        projectInitiationTimeRef.current = undefined;
        confirmStatusRef.current = undefined;
        splitStatusRef.current = undefined;
        responseTypeRef.current = undefined;
        responseTimeTypeRef.current = undefined;
        putEffectPersonRef.current = undefined;
        operationPersonRef.current = undefined;
        supportStandardInspectionRef.current = undefined;
        setSupportStandardInspection(undefined);
        setOperationPerson(undefined);
        setPutEffectPerson(undefined);
        setResponseTimeType(undefined);
        setResponseType(undefined);
        setSplitStatus(undefined);
        setConfirmStatus(undefined);
        setProjectInitiationTime(undefined);
        setCode(undefined);
        setArea();
        getInviteList();
    };

    useEffect(() => {
        getDetailInitOption();
        getInviteList();
        getSearchInitData();
        getSupplierInitData();
    }, []);

    return (
        <div className="electronic-archives">
            <AddProject
                open={addProjectOpen}
                detailRow={detailRow}
                onClose={resFlag => {
                    getInviteList();
                    setAddProjectOpen(false);
                    setDetailRow(null);
                }}
                editCurrentStep={currentStep}
            />
            <Space className="search">
                <SearchInput
                    label="项目名称"
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />
                <div>
                    <span style={{ color: "#FFF" }}>立项时间：</span>
                    <DatePicker
                        value={projectInitiationTime ? dayjs(projectInitiationTime) : undefined}
                        onChange={data => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            projectInitiationTimeRef.current = data ? dayjs(data).format("YYYY-MM-DD") : undefined;
                            setProjectInitiationTime(data ? dayjs(data).format("YYYY-MM-DD") : undefined);
                        }}
                        allowClear
                    />
                </div>
                <SearchInput
                    label="工单所属区域"
                    value={area}
                    type="select"
                    options={areaOptions}
                    onChange={value => {
                        areaRef.current = value;
                        setArea(value);
                    }}
                />
                <SearchInput
                    label="项目阶段"
                    value={confirmStatus}
                    type="select"
                    options={phaseList}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        splitStatusRef.current = undefined;
                        confirmStatusRef.current = value;
                        setConfirmStatus(value);
                        setSplitStatus(undefined);
                        setProjectScheduleList(initSearchOption?.phase2SubPhases?.[value] || []);
                    }}
                />
                <SearchInput
                    label="项目进度"
                    type="select"
                    value={splitStatus}
                    options={projectScheduleList}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        splitStatusRef.current = value;
                        setSplitStatus(value);
                    }}
                />

                <SearchInput
                    label="项目类型"
                    type="select"
                    options={projectTypeList}
                    value={responseType}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTypeRef.current = value;
                        setResponseType(value);
                    }}
                />
                <SearchInput
                    label="产品类型"
                    type="select"
                    options={productTypeList}
                    value={responseTimeType}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTimeTypeRef.current = value;
                        setResponseTimeType(value);
                    }}
                />
                <SearchInput
                    label="实施负责人"
                    type="select"
                    value={putEffectPerson}
                    options={putEffectPersonList}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        putEffectPersonRef.current = value;
                        setPutEffectPerson(value);
                    }}
                />
                <SearchInput
                    label="运维负责人"
                    type="select"
                    value={operationPerson}
                    options={operationPersonList}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        operationPersonRef.current = value;
                        setOperationPerson(value);
                    }}
                />
                <div>
                    <span style={{ color: "#FFF" }}>是否支持标准巡检：</span>
                    <Radio.Group
                        value={supportStandardInspection}
                        onChange={e => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            supportStandardInspectionRef.current = e.target.value;
                            setSupportStandardInspection(e.target.value);
                        }}
                    >
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                </div>
                <Button type="primary" onClick={getInviteList}>
                    搜索
                </Button>
                <Button type="primary" danger onClick={handleReset}>
                    重置
                </Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={userList}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getInviteList();
                }}
                scroll={{
                    x: 1500,
                }}
                title={() => (
                    <Space className="table-title">
                        <Button
                            onClick={() => setAddProjectOpen(true)}
                            style={{ background: "#1676EF" }}
                        >
                            新增项目
                        </Button>
                        <Button
                            type="primary"
                            onClick={async () => {
                                const res = await basSupplierListServe();
                                if (res?.data?.status == "SUCCESS") {
                                    const data =
                                        res?.data?.data?.map(item => {
                                            return {
                                                ...item,
                                                supplyScope: item?.supplyScope?.join(","),
                                            };
                                        }) || [];
                                    supplierForm.setFieldsValue({
                                        supplierDataSource: data,
                                    });
                                    setSupplierDataSource(data);
                                    setSupplierOpen(true);
                                }
                            }}
                        >
                            供应商维护
                        </Button>
                    </Space>
                )}
            ></Table>
            <Modal
                title="供应商维护"
                destroyOnClose={true}
                open={supplierOpen}
                width={1000}
                onCancel={() => {
                    setSupplierOpen(false);
                }}
                onOk={async () => {
                    const values = await supplierForm.validateFields();
                    const res = await basSupplierModifyAllServe({
                        suppliers: values?.supplierDataSource?.map(item => {
                            return {
                                id: item?.id || undefined,
                                name: item?.name,
                                supplyScope: Array.isArray(item?.supplyScope)
                                    ? item?.supplyScope
                                    : item?.supplyScope?.split(","),
                            };
                        }),
                    });
                    if (res?.data?.status == "SUCCESS") {
                        setSupplierOpen(false);
                        supplierForm.setFieldsValue({
                            supplierDataSource: [],
                        });
                        setSupplierDataSource([]);
                    }
                }}
            >
                <div style={{ minHeight: 300 }}>
                    <Form form={supplierForm} scrollToFirstError>
                        <Form.Item
                            name="supplierDataSource"
                            validateTrigger={false}
                            hidden={!supplierOpen}
                        >
                            <EditTable.EditRowTable
                                showAdd={true}
                                showClear={true}
                                showEdit={true}
                                showDelete={true}
                                data={supplierDataSource}
                                columns={[
                                    {
                                        title: "供应商名称",
                                        dataIndex: "name",
                                        editable: true,
                                        inputType: "Input",
                                    },
                                    {
                                        title: "供货范围",
                                        dataIndex: "supplyScope",
                                        editable: true,
                                        mode: "multiple",
                                        inputType: "Select",
                                        width: 400,
                                        options: supplyScopesList?.map(item => {
                                            return {
                                                label: item,
                                                value: item,
                                            };
                                        }),
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>

            <Drawer
                title="详情"
                onClose={() => {
                    setDetailRow(null);
                    setDetailOpen(false);
                }}
                open={detailOpen}
                width={1000}
            >
                <Descriptions title="基础项目资料">
                    <Descriptions.Item label="立项时间">{detailRow?.approvalTime}</Descriptions.Item>
                    <Descriptions.Item label="项目名称">{detailRow?.name}</Descriptions.Item>
                    <Descriptions.Item label="充放功率(MW)">{detailRow?.maxPowerMw}</Descriptions.Item>
                    <Descriptions.Item label="项目容量(MWh)">{detailRow?.capacityMwh}</Descriptions.Item>
                    <Descriptions.Item label="项目阶段">{detailRow?.phaseZh}</Descriptions.Item>
                    <Descriptions.Item label="项目进度">{detailRow?.subPhaseZh}</Descriptions.Item>
                    <Descriptions.Item label="项目类型">{detailRow?.typeZh}</Descriptions.Item>
                    <Descriptions.Item label="产品类型">{detailRow?.productTypeZh}</Descriptions.Item>
                    <Descriptions.Item label="所属区域">{detailRow?.regionZh}</Descriptions.Item>
                    <Descriptions.Item label="是否支持标准巡检">
                        {detailRow?.supportStandardInspection ? "是" : "否"}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="电站详细信息">
                    <Descriptions.Item label="业主名称">{detailRow?.ownerName}</Descriptions.Item>
                    <Descriptions.Item label="项目地址">{detailRow?.address}</Descriptions.Item>
                    <Descriptions.Item label="电站名称">{detailRow?.plantName}</Descriptions.Item>
                    <Descriptions.Item label="电站联系人">{detailRow?.plantContacts}</Descriptions.Item>
                    <Descriptions.Item label="电站联系方式">{detailRow?.plantContractNumber}</Descriptions.Item>
                    <Descriptions.Item label="总包单位名称">{detailRow?.epcName}</Descriptions.Item>
                    <Descriptions.Item label="我方供货范围">{detailRow?.ourScopeOfSupply}</Descriptions.Item>
                    <Descriptions.Item label="质保期起止时间">{detailRow?.warrantyPeriodStartDate}~{detailRow?.warrantyPeriodEndDate}</Descriptions.Item>
                    <Descriptions.Item label="电站内储能单元分组情况">{detailRow?.esuGroupDesc}</Descriptions.Item>
                    <Descriptions.Item label="电站所属省">{detailRow?.province}</Descriptions.Item>
                    <Descriptions.Item label="电站所屈市">{detailRow?.city}</Descriptions.Item>
                    <Descriptions.Item label="电站所属区/镇">{detailRow?.district}</Descriptions.Item>
                    <Descriptions.Item label="经度">{detailRow?.longitude}</Descriptions.Item>
                    <Descriptions.Item label="纬度">{detailRow?.latitude}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="设备配置信息">
                    <Descriptions.Item label="电池仓数量">{detailRow?.batterySlotCount}</Descriptions.Item>
                    <Descriptions.Item label="单台电池仓容量(kWh)">{detailRow?.singleBatterySlotCapacity}</Descriptions.Item>
                    <Descriptions.Item label="PCS一体机数量">{detailRow?.pcsCount}</Descriptions.Item>
                    <Descriptions.Item label="电芯材料">{detailRow?.cellMaterialZh}</Descriptions.Item>
                    <Descriptions.Item label="电池堆成组方式">{detailRow?.batteryStackComposeMethod}</Descriptions.Item>
                    <Descriptions.Item label="单台PCS最大功率(kW)">{detailRow?.singlePcsMaxPower}</Descriptions.Item>
                    <Descriptions.Item label="池簇成组方式">{detailRow?.batteryClusterComposeMethod}</Descriptions.Item>
                    <Descriptions.Item label="单电芯额定容量(kWh)">{detailRow?.singleCellRatedCapacity}</Descriptions.Item>
                    <Descriptions.Item label="消防介质">{detailRow?.firefightingMedium}</Descriptions.Item>
                    <Descriptions.Item label="充放电转换效率">{detailRow?.chargeDischargeCe}</Descriptions.Item>
                    <Descriptions.Item label="额定充放电倍率(C)">{detailRow?.ratedChargingDischargingRate}</Descriptions.Item>
                    <Descriptions.Item label="关联场站信息">{detailRow?.sePlants?.map(item => item?.name)?.join(',')}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="厂商信息" column={2}>
                    <Descriptions.Item label="BMS产商">{getSupplyInfo("BMS")?.name}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{getSupplyInfo("BMS")?.contractNumber}</Descriptions.Item>
                    <Descriptions.Item label="PCS产商">{getSupplyInfo("PCS")?.name}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{getSupplyInfo("PCS")?.contractNumber}</Descriptions.Item>
                    <Descriptions.Item label="变压器产商">{getSupplyInfo("变压器")?.name}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{getSupplyInfo("变压器")?.contractNumber}</Descriptions.Item>
                    <Descriptions.Item label="液冷系统厂商">{getSupplyInfo("液冷系统")?.name}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{getSupplyInfo("液冷系统")?.contractNumber}</Descriptions.Item>
                    <Descriptions.Item label="空调厂商">{getSupplyInfo("空调")?.name}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{getSupplyInfo("空调")?.contractNumber}</Descriptions.Item>
                    <Descriptions.Item label="PACK组装厂厂商">{getSupplyInfo("PACK组装")?.name}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{getSupplyInfo("PACK组装")?.contractNumber}</Descriptions.Item>
                    <Descriptions.Item label="电芯厂商">{getSupplyInfo("电芯")?.name}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{getSupplyInfo("电芯")?.contractNumber}</Descriptions.Item>
                    <Descriptions.Item label="电池仓箱体厂商">{getSupplyInfo("电池仓箱体")?.name}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{getSupplyInfo("电池仓箱体")?.contractNumber}</Descriptions.Item>
                    <Descriptions.Item label="消防厂商">{getSupplyInfo("消防")?.name}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{getSupplyInfo("消防")?.contractNumber}</Descriptions.Item>
                    <Descriptions.Item label="EMS厂商">{getSupplyInfo("EMS")?.name}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{getSupplyInfo("EMS")?.contractNumber}</Descriptions.Item>
                    <Descriptions.Item label="汇流柜厂商">{getSupplyInfo("汇流柜")?.name}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{getSupplyInfo("汇流柜")?.contractNumber}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="维护实施管理信息" column={2}>
                    <Descriptions.Item label="实施计划时间">{detailRow?.implementPlanStartDate}~{detailRow?.implementPlanEndDate}</Descriptions.Item>
                    <Descriptions.Item label="实施负责人">{detailRow?.creatorName}</Descriptions.Item>
                    <Descriptions.Item label="实施过程档案">
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
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="运维管理信息">
                    <Descriptions.Item label="运维负责人">{detailRow?.operationsManagerName}</Descriptions.Item>
                    <Descriptions.Item label="首次巡检时间">{detailRow?.firstInspectionDate}</Descriptions.Item>
                    <Descriptions.Item label="巡检周期">{cycleList?.find(item => item?.code === detailRow?.inspectionCycle)?.name}</Descriptions.Item>
                    <Descriptions.Item label="巡检组管理">
                        <div>
                            {
                                detailRow?.inspectionGroups?.map(item => {
                                    return (
                                        <div style={{ marginBottom: 10 }}>
                                            <div>{item?.name}</div>
                                            <div>
                                                {item?.inspectionItemIds?.map((inspectionItem, index) => {
                                                    return (
                                                        <div>巡检事项{index}: {getinspectionItemName(inspectionItem)} </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </div>
    );
};

export default Account;
