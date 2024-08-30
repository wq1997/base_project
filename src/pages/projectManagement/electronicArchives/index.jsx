import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    Space,
    Table,
    message,
    Modal,
    DatePicker,
    Form,
    Input,
    Radio,
    Dropdown,
} from "antd";
import {
    ExclamationCircleOutlined,
    FileSearchOutlined,
    FileProtectOutlined,
    UnorderedListOutlined,
    UserOutlined,
    DeleteOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";
import { history, useLocation } from "umi";
import { SearchInput, EditTable } from "@/components";
import AddProject from "./AddProject";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";
import {
    getBasProjectInitData as getBasProjectInitDataServe,
    getBaseProjectList as getBaseProjectListServe,
    getSupplierInitData as getSupplierInitDataServe,
    basSupplierList as basSupplierListServe,
    basSupplierModifyAll as basSupplierModifyAllServe,
    basProjectDelete as basProjectDeleteServe,
} from "@/services"
import dayjs from "dayjs";

const Account = () => {
    const [supplierForm] = Form.useForm();
    const location = useLocation();
    const initCode = location?.search.split("=")[1];
    const codeRef = useRef(initCode);
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
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addProjectOpen, setAddProjectOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [detailRow, setDetailRow] = useState(0);
    const [supplierDataSource, setSupplierDataSource] = useState([]);
    const [projectInitiationTime, setProjectInitiationTime] = useState();
    const projectInitiationTimeRef = useRef();
    const [supplyScopesList, setSupplyScopesList] = useState([]);
    const [userList, setUserList] = useState([
        // {
        //     id: 1,
        //     number: 1,
        //     name: "宁储**100MW/200MWh共享储能电站",
        //     code: "CR20220412",
        //     approvalTime: "2022-04-12",
        //     maxPowerKw: '100MW',
        //     capacityKwh: '200MWh',
        //     phaseZh: "售后阶段",
        //     subPhaseZh: "质保期",
        //     supportStandardInspection: true,
        //     typeZh: "源网侧",
        //     productTypeZh: "集装箱",
        //     implementManagerAccount: "张**",
        //     operationsManagerAccount: "李**",
        //     area: "宁夏",
        //     owner: "**有限公司",
        //     adress: "宁夏回族自治区吴忠市**",
        //     plantName: "第一储能电站",
        //     plantUser: "**",
        //     plantPhone: "**",
        //     unit: "中国电建集团**研究院有限公司",
        //     range: "储能电池舱，PCS一体机",
        //     start: "2022年**-2025年**",
        //     group: "2条汇集线，每条15组储能单元",
        //     detailAdress: "宁夏回族自治州吴忠市**",
        //     batteryCount: "30台",
        //     singleBattery: "6670KWh",
        //     PCSCount: "30台",
        //     cellMaterial: "磷酸铁锂",
        //     heapMethod: "9簇",
        //     singlePCS: "3450KW",
        //     clusterMethod: "8个",
        //     singleCell: "280AH",
        //     firefightingMedium: "全氟己酮",
        //     effect: "85%",
        //     multiplier: "0.5C",
        //     plantInfo: "无",
        //     BMSManufacturer: "杭州**股份有限公司",
        //     BMSManufacturerPhone: "**",
        //     PCSManufacturer: "**电气股份有限公司",
        //     PCSManufacturerPhone: "**",
        //     transformerManufacturer: "广东**股份有限公司",
        //     transformerManufacturerPhone: "**",
        //     liquidCoolingManufacturer: "深圳市**股份有限公司",
        //     liquidCoolingManufacturerPhone: "**",
        //     airManufacturer: "深圳市**股份有限公司",
        //     airManufacturerPhone: "**",
        //     PACKManufacturer: "苏州**科技股份有限公司",
        //     PACKManufacturerPhone: "**",
        //     cellManufacturer: "**能源股份有限公司 ",
        //     cellManufacturerPhone: "**",
        //     batteryManufacturer: "上海**有限公司",
        //     batteryManufacturerPhone: "**",
        //     fireManufacturer: "安徽**新能源有限公司",
        //     fireManufacturerPhone: "**",
        //     emsManufacturer: "国电**控制系统有限公司",
        //     emsManufacturerPhone: "**",
        //     implementationPlanTime: "2022-05-03",
        //     firstInspectionTime: "2022-05-20",
        //     inspectionCycle: 2,
        // },
        // {
        //     id: 2,
        //     number: 2,
        //     name: "上海**有限公司7.5MW/22.5MWh用户储能项目",
        //     code: "CR20230223",
        //     approvalTime: "2023-02-23",
        //     maxPowerKw: '7.5MW',
        //     capacityKwh: '22.5MWh',
        //     phaseZh: "售后阶段",
        //     subPhaseZh: "质保期",
        //     supportStandardInspection: true,
        //     typeZh: "工商业",
        //     productTypeZh: "集装箱",
        //     implementManagerAccount: "张**",
        //     operationsManagerAccount: "郑**",
        //     area: "上海",
        //     owner: "**有限公司",
        //     adress: "上海市嘉定区**",
        //     plantName: "**用户侧储能电站",
        //     plantUser: "**",
        //     plantPhone: "**",
        //     unit: "中国**有限公司",
        //     range: "储能电池舱，PCS一体机，EMS系统",
        //     start: "2022年**-2024年**",
        //     group: "2条汇集线，每条3组储能单元",
        //     detailAdress: "上海市**",
        //     batteryCount: "6台",
        //     singleBattery: "4055KWh",
        //     PCSCount: "2台",
        //     cellMaterial: "磷酸铁锂",
        //     heapMethod: "12簇",
        //     singlePCS: "690KW",
        //     clusterMethod: "15个",
        //     singleCell: "220AH",
        //     firefightingMedium: "全氟己酮",
        //     effect: "83%",
        //     multiplier: "0.5C",
        //     plantInfo: "无",
        //     BMSManufacturer: "杭州**股份有限公司",
        //     BMSManufacturerPhone: "**",
        //     PCSManufacturer: "苏州**技术有限公司",
        //     PCSManufacturerPhone: "**",
        //     transformerManufacturer: "**",
        //     transformerManufacturerPhone: "**",
        //     liquidCoolingManufacturer: "深圳市**股份有限公司",
        //     liquidCoolingManufacturerPhone: "**",
        //     airManufacturer: "深圳市**股份有限公司",
        //     airManufacturerPhone: "**",
        //     PACKManufacturer: "**科技股份有限公司",
        //     PACKManufacturerPhone: "**",
        //     cellManufacturer: "**能源股份有限公司 ",
        //     cellManufacturerPhone: "**",
        //     batteryManufacturer: "上海**有限公司",
        //     batteryManufacturerPhone: "**",
        //     fireManufacturer: "安徽**新能源有限公司",
        //     fireManufacturerPhone: "**",
        //     emsManufacturer: "上海采日能源科技有限公司",
        //     emsManufacturerPhone: "**",
        //     implementationPlanTime: "2023-03-03",
        //     firstInspectionTime: "2023-03-10",
        //     inspectionCycle: 1,
        // },
        // {
        //     id: 3,
        //     number: 3,
        //     name: "浙江**能源科技有限公司100KW/215KWh储能项目",
        //     code: "CR20230605",
        //     approvalTime: "2023-06-05",
        //     maxPowerKw: 100,
        //     capacityKwh: '215kWh',
        //     phaseZh: "售后阶段",
        //     subPhaseZh: "质保期",
        //     supportStandardInspection: false,
        //     typeZh: "工商业",
        //     productTypeZh: "户外柜",
        //     implementManagerAccount: "孙**",
        //     operationsManagerAccount: "王**",
        //     area: "浙江",
        //     owner: "浙江**有限公司",
        //     adress: "浙江省温州市永嘉县**",
        //     plantName: "**",
        //     plantUser: "**",
        //     plantPhone: "**",
        //     unit: "**",
        //     range: "215KWh户外柜",
        //     start: "2023年**-2024年**",
        //     group: "1条汇集线，每条1组储能单元",
        //     detailAdress: "上海市**",
        //     batteryCount: "1台",
        //     singleBattery: "215KWh",
        //     PCSCount: "1台",
        //     cellMaterial: "磷酸铁锂",
        //     heapMethod: "1簇",
        //     singlePCS: "110KW",
        //     clusterMethod: "5个",
        //     singleCell: "280AH",
        //     firefightingMedium: "全氟己酮",
        //     effect: "86%",
        //     multiplier: "0.5C",
        //     plantInfo: "无",
        //     BMSManufacturer: "上海采日能源科技有限公司",
        //     BMSManufacturerPhone: "**",
        //     PCSManufacturer: "苏州**技术有限公司",
        //     PCSManufacturerPhone: "**",
        //     transformerManufacturer: "广东**股份有限公司",
        //     transformerManufacturerPhone: "**",
        //     liquidCoolingManufacturer: "深圳市**股份有限公司",
        //     liquidCoolingManufacturerPhone: "**",
        //     airManufacturer: "深圳市**股份有限公司",
        //     airManufacturerPhone: "**",
        //     PACKManufacturer: "**科技股份有限公司",
        //     PACKManufacturerPhone: "**",
        //     cellManufacturer: "上海**有限公司 ",
        //     cellManufacturerPhone: "**",
        //     batteryManufacturer: "上海**有限公司",
        //     batteryManufacturerPhone: "**",
        //     fireManufacturer: "**新能源科技股份有限公司",
        //     fireManufacturerPhone: "**",
        //     emsManufacturer: "上海采日能源科技有限公司",
        //     emsManufacturerPhone: "**",
        //     implementationPlanTime: "2022-06-10",
        // },
    ]);

    const columns = [
        {
            title: "项目名称",
            dataIndex: "name",
            width: 200
        },
        {
            title: "项目编号",
            dataIndex: "code",
            width: 200
        },
        {
            title: "立项时间",
            dataIndex: "approvalTime",
            width: 200
        },
        {
            title: "充放功率(kW)",
            dataIndex: "maxPowerKw",
            width: 200
        },
        {
            title: "项目容量(kWh)",
            dataIndex: "capacityKwh",
            width: 200
        },
        {
            title: "项目阶段",
            dataIndex: "phaseZh",
            width: 200
        },
        {
            title: "项目进度",
            dataIndex: "subPhaseZh",
            width: 200
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
            width: 200
        },
        {
            title: "产品类型",
            dataIndex: "productTypeZh",
            width: 200
        },
        {
            title: "实施负责人",
            dataIndex: "implementManagerAccount",
            width: 200
        },
        {
            title: "运维负责人",
            dataIndex: "operationsManagerAccount",
            width: 200
        },
        {
            title: "状态",
            dataIndex: "statusZh",
            width: 200
        },
        {
            title: "操作",
            dataIndex: "operate",
            fixed: 'right',
            width: 100,
            render: (_, row) => {
                const edit = (key, row) => {
                    setCurrentStep(key);
                    setAddProjectOpen(true);
                    setDetailRow(row);
                };
                return (
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: "1",
                                    label: <div onClick={() => edit(0, row)}>基础信息维护</div>,
                                    icon: <FileSearchOutlined />,
                                },
                                {
                                    key: "2",
                                    label: <div onClick={() => edit(1, row)}>详细信息维护</div>,
                                    icon: <FileProtectOutlined />,
                                },
                                {
                                    key: "3",
                                    label: <div onClick={() => edit(2, row)}>实施管理</div>,
                                    icon: <UnorderedListOutlined />,
                                },
                                {
                                    key: "4",
                                    label: <div onClick={() => edit(3, row)}>巡检管理</div>,
                                    icon: <UserOutlined />,
                                },
                                {
                                    key: "5",
                                    label: (
                                        <div
                                            onClick={() => {
                                                Modal.confirm({
                                                    title: "系统提示",
                                                    content:
                                                        "删除此条记录不可恢复，请确认后再删除！",
                                                    onOk: async () => {
                                                        const res = await basProjectDeleteServe({
                                                            ids: [row?.id]
                                                        })
                                                        if (res?.data?.status === "SUCCESS") {
                                                            message.success("删除成功！");
                                                            getInviteList();
                                                        }
                                                    },
                                                });
                                            }}
                                        >
                                            删除项目
                                        </div>
                                    ),
                                    icon: <DeleteOutlined />,
                                },
                            ],
                        }}
                    >
                        <a onClick={e => e.preventDefault()}>
                            <EllipsisOutlined style={{ color: "#FFF" }} />
                        </a>
                    </Dropdown>
                );
            },
        },
    ];

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getSearchInitData = async () => {
        const res = await getBasProjectInitDataServe();
        if (res?.data?.status == "SUCCESS") {
            const { phases, types, productTypes, users } = res?.data?.data || {}
            setInitSearchOption(res?.data?.data || {});
            setPhaseList(phases);
            setProjectTypeList(types);
            setProductTypeList(productTypes);
            setPutEffectPersonList(users);
            setOperationPersonList(users);
        }
    };

    const getSupplierInitData = async () => {
        const res = await getSupplierInitDataServe();
        if (res?.data?.status == "SUCCESS") {
            setSupplyScopesList(res?.data?.data?.supplyScopes);
        }
    }

    const getInviteList = async () => {
        const { current, pageSize } = paginationRef.current;
        const nameOrCodeLike = codeRef.current;
        const approvalTime = projectInitiationTimeRef.current;
        const phase = confirmStatusRef.current;
        const subPhase = splitStatusRef.current;
        const type = responseTypeRef.current;
        const productTypeZh = responseTimeTypeRef.current;
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
                phase,
                subPhase,
                type,
                productTypeZh,
                implementManagerAccount,
                operationsManagerAccount,
                supportStandardInspection
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
        projectInitiationTimeRef.current = undefined;
        confirmStatusRef.current = undefined;
        splitStatusRef.current = undefined;
        responseTypeRef.current = undefined;
        responseTimeTypeRef.current = undefined;
        putEffectPersonRef.current = undefined;
        operationPersonRef.current = undefined;
        supportStandardInspectionRef.current = undefined
        setSupportStandardInspection(undefined)
        setOperationPerson(undefined);
        setPutEffectPerson(undefined);
        setResponseTimeType(undefined);
        setResponseType(undefined);
        setSplitStatus(undefined);
        setConfirmStatus(undefined);
        setProjectInitiationTime(undefined)
        setCode(undefined);
        getInviteList();
    };

    useEffect(() => {
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
                        onChange={(data) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            projectInitiationTimeRef.current = dayjs(data).format("YYYY-MM-DD");
                            setProjectInitiationTime(dayjs(data).format("YYYY-MM-DD"))
                        }}
                        allowClear
                    />
                </div>
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
                        setProjectScheduleList(initSearchOption?.phase2SubPhases?.[value] || [])
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
                        onChange={(e) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            supportStandardInspectionRef.current = e.target.value
                            setSupportStandardInspection(e.target.value)
                        }}
                    >
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                </div>
                <Button type="primary" onClick={getInviteList}>搜索</Button>
                <Button type="primary" danger onClick={handleReset}>重置</Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={userList}
                columns={columns}
                pagination={pagination}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                    getCheckboxProps: record => ({
                        disabled: record.account === "admin",
                    }),
                }}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getInviteList();
                }}
                scroll={{
                    x: 1200,
                }}
                title={() => (
                    <Space className="table-title">
                        <Button onClick={() => setAddProjectOpen(true)} style={{ background: '#1676EF' }}>
                            新增项目
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={async () => {
                                const res = await basProjectDeleteServe({
                                    ids: selectedRowKeys
                                })
                                if (res?.data?.status === "SUCCESS") {
                                    message.success("删除成功！");
                                    getInviteList();
                                }
                            }}
                        >
                            删除项目
                            {selectedRowKeys?.length ? (
                                <span>({selectedRowKeys?.length})</span>
                            ) : (
                                ""
                            )}
                        </Button>
                        <Button
                            type="primary"
                            onClick={async () => {
                                const res = await basSupplierListServe();
                                if (res?.data?.status == "SUCCESS") {
                                    const data = res?.data?.data?.map(item => {
                                        return {
                                            ...item,
                                            supplyScope: item?.supplyScope?.join(',')
                                        }
                                    }) || [];
                                    supplierForm.setFieldsValue({
                                        supplierDataSource: data
                                    })
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
                                supplyScope: Array.isArray(item?.supplyScope) ? item?.supplyScope : item?.supplyScope?.split(',')
                            }
                        })
                    })
                    if (res?.data?.status == "SUCCESS") {
                        setSupplierOpen(false);
                        supplierForm.setFieldsValue({
                            supplierDataSource: []
                        })
                        setSupplierDataSource([]);
                    }
                }}
            >
                <div style={{ minHeight: 300 }}>
                    <Form form={supplierForm}>
                        <Form.Item name="supplierDataSource" validateTrigger={false}>
                            <EditTable.EditRowTable
                                showAdd={true}
                                showClear={true}
                                showEdit={true}
                                showDelete={true}
                                data={supplierDataSource}
                                columns={[
                                    {
                                        title: "供应商名称",
                                        dataIndex: 'name',
                                        editable: true,
                                        inputType: 'Input',
                                    },
                                    {
                                        title: "供货范围",
                                        dataIndex: 'supplyScope',
                                        editable: true,
                                        mode: 'multiple',
                                        inputType: 'Select',
                                        width: 400,
                                        options: supplyScopesList?.map(item => {
                                            return {
                                                label: item,
                                                value: item
                                            }
                                        })
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default Account;
