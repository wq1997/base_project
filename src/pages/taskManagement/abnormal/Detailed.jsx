import { history } from "umi";
import { Space, Button, Table, theme, DatePicker, Row, Modal, Tooltip, Image } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { SearchInput } from "@/components";
import React, { useState, useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import {
    workOrderFindExceptionStatisticsPage as workOrderFindExceptionStatisticsPageServe,
    workOrderGetExceptionStatisticsPageInitData as workOrderGetExceptionStatisticsPageInitDataServe,
} from "@/services";
import styles from "./index.less";
import dayjs from "dayjs";
import { jsonToUrlParams } from "@/utils/utils";
import { getBaseUrl } from "@/services/request";

const Detailed = () => {
    const { token } = theme.useToken();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [planDate, setPlanDate] = useState();
    const planDateRef = useRef();
    const [code, setCode] = useState();
    const codeRef = useRef();
    const [overDate, setOverDate] = useState();
    const overDateRef = useRef();
    const [name, setName] = useState();
    const nameRef = useRef();
    const [projectName, setProjectName] = useState();
    const projectNameRef = useRef();
    const [orderType, setOrderType] = useState();
    const orderTypeRef = useRef();
    const [manufacturer, setManufacturer] = useState();
    const manufacturerRef = useRef();
    const [handlerPerson, setHandlerPerson] = useState();
    const handlerPersonRef = useRef();
    const [collectingMaterials, setCollectingMaterials] = useState();
    const collectingMaterialsRef = useRef();
    const [exceptionRefBasInspectionItemId, setExceptionRefBasInspectionItemId] = useState();
    const exceptionRefBasInspectionItemIdRef = useRef();
    const [dataSource, setDataSource] = useState([]);
    const [initOption, setInitOption] = useState({});
    const [currentRow, setCurrentRow] = useState({});
    const [fileOpen, setFileOpen] = useState(false);
    const [data, setData] = useState();

    const getOptions = (type) => {
        const options = {
            color: ["#FFCF00", "#54E135", "#00E9EF", "#BE88F8", "#0BD1CB"],
            tooltip: {
                trigger: "item",
            },
            legend: {
                show: false
            },
            series: [
                {
                    type: "pie",
                    radius: ["50%", "70%"],
                    selectedMode: "single",
                    data: Object.keys(data?.[type] || {})?.map(item => {
                        return {
                            name: item,
                            value: data?.[type]?.[item]
                        }
                    }),
                    label: {
                        normal: {
                            textStyle: {
                                color: "#fff",
                            },
                            formatter: "{b}{c|{c}}\n{d|{d}%}",
                            rich: {
                                b: {
                                    color: "#12EABE",
                                    align: "left",
                                    padding: 4,
                                },
                                d: {
                                    color: "#fff",
                                    align: "left",
                                    padding: 4,
                                },
                                c: {
                                    color: "#fff",
                                    align: "left",
                                    padding: 4,
                                },
                            },
                        },
                    },
                },
            ],
        };
        return options;
    };

    const getDataSource = async () => {
        const { current, pageSize } = paginationRef.current;
        const code = codeRef.current;
        const planDate = planDateRef.current;
        const titleLike = nameRef.current;
        const projectId = projectNameRef.current;
        const type = orderTypeRef.current;
        const exceptionParts = exceptionRefBasInspectionItemIdRef.current;
        const exceptionSupplierId = manufacturerRef.current;
        const currentProcessorAccount = handlerPersonRef.current;
        const collectingMaterials = collectingMaterialsRef.current;
        const res = await workOrderFindExceptionStatisticsPageServe({
            pageNum: current,
            pageSize,
            queryCmd: {
                code,
                publishedTimeFrom: planDate && planDate?.length >= 2 && dayjs(planDate?.[0]).format("YYYY-MM-DD"),
                publishedTimeTo: planDate && planDate?.length >= 2 && dayjs(planDate?.[1]).format("YYYY-MM-DD"),
                completedTimeFrom: overDate && overDate?.length >= 2 && dayjs(overDate?.[0]).format("YYYY-MM-DD"),
                completedTimeTo: overDate && overDate?.length >= 2 && dayjs(overDate?.[1]).format("YYYY-MM-DD"),
                titleLike,
                projectId,
                type,
                exceptionParts,
                exceptionSupplierId,
                collectingMaterials,
                currentProcessorAccount,
            },
        });
        if (res?.data?.status == "SUCCESS") {
            const { workOrderPage } = res?.data?.data;
            const { totalRecord, recordList } = workOrderPage || {};
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setData(res?.data?.data);
            setDataSource(recordList);
        }
    }

    const getInitData = async () => {
        const res = await workOrderGetExceptionStatisticsPageInitDataServe();
        if (res?.data?.status == "SUCCESS") {
            setInitOption(res?.data?.data);
        }
    }

    const onReset = () => {
        planDateRef.current = undefined;
        overDateRef.current = undefined;
        nameRef.current = undefined;
        projectNameRef.current = undefined;
        orderTypeRef.current = undefined;
        manufacturerRef.current = undefined;
        handlerPersonRef.current = undefined;
        codeRef.current = undefined;
        setCode(undefined);
        setHandlerPerson(undefined);
        setManufacturer(undefined);
        setOrderType(undefined);
        setProjectName(undefined);
        setName(undefined);
        setOverDate(undefined);
        setPlanDate(undefined);
        getDataSource();
    }

    useEffect(() => {
        getInitData();
        getDataSource();
    }, [])

    return (
        <div className={styles.detailed}>
            <div style={{ fontSize: 20, color: token.fontColor, marginBottom: 28 }}>查询条件</div>
            <Space className={styles.search} size={20}>
                <SearchInput
                    label="工单编号"
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />
                <div>
                    <span style={{ color: "#FFF" }}>异常生成时间：</span>
                    <DatePicker.RangePicker
                        value={planDate && planDate?.length >= 2 && [dayjs(planDate?.[0]), dayjs(planDate?.[1])]}
                        onChange={value => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            planDateRef.current = value;
                            setPlanDate(value);
                        }}
                    />
                </div>
                <div>
                    <span style={{ color: "#FFF" }}>异常完结时间：</span>
                    <DatePicker.RangePicker
                        value={overDate && overDate?.length >= 2 && [dayjs(overDate?.[0]), dayjs(overDate?.[1])]}
                        onChange={value => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            overDateRef.current = value;
                            setOverDate(value);
                        }}
                    />
                </div>
                <SearchInput
                    label="异常名称"
                    value={name}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <SearchInput
                    label="关联项目名称"
                    type="select"
                    value={projectName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        projectNameRef.current = value;
                        setProjectName(value);
                    }}
                    options={initOption?.projects?.map(item => {
                        return {
                            name: item?.name,
                            code: item?.id
                        }
                    })}
                />
                <SearchInput
                    label="关联工单类型"
                    value={orderType}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        orderTypeRef.current = value;
                        setOrderType(value);
                    }}
                    options={initOption?.types}
                />
                <SearchInput
                    label="异常部件"
                    value={exceptionRefBasInspectionItemId}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        exceptionRefBasInspectionItemIdRef.current = value;
                        setExceptionRefBasInspectionItemId(value);
                    }}
                    options={initOption?.exceptionPartsList?.map(item => {
                        return {
                            name: item,
                            code: item
                        }
                    })}
                />
                <SearchInput
                    label="责任厂商"
                    value={manufacturer}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        manufacturerRef.current = value;
                        setManufacturer(value);
                    }}
                    options={initOption?.suppliers?.map(item => {
                        return {
                            name: item?.name,
                            code: item?.id
                        }
                    })}
                />
                <SearchInput
                    label="是否领用/采购备件或耗材"
                    value={collectingMaterials}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        collectingMaterialsRef.current = value;
                        setCollectingMaterials(value);
                    }}
                    options={[
                        { name: '是', code: true },
                        { name: '否', code: false }
                    ]}
                />
                <SearchInput
                    label="异常处理人"
                    value={handlerPerson}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        handlerPersonRef.current = value;
                        setHandlerPerson(value);
                    }}
                    options={initOption?.users}
                />
                <Button type="primary" onClick={getDataSource}>搜索</Button>
                <Button
                    type="primary"
                    danger
                    onClick={onReset}
                >
                    重置
                </Button>
            </Space>
            <div className={styles.center}>
                <Row justify="space-between" style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 20, color: token.fontColor }}>异常统计</div>
                </Row>
                <div className={styles.centerContent}>
                    <div className={styles.centerContent1}>
                        <div className={styles.centerContent1Top}>
                            <span style={{ color: 'white' }}>异常总数</span>
                            <span style={{ color: '#0BAFAB', marginLeft: 30, fontSize: 36 }}>{data?.totalWorkOrderCount}</span>
                        </div>
                        <div className={styles.centerContent1Bottom}>
                            <div className={styles.centerContent1BottomItem}>
                                <div style={{ color: 'white' }}>
                                    计划处理时间总计(天)
                                </div>
                                <div style={{ color: '#60C453', fontSize: 36 }}>
                                    {data?.totalProcessingDaysForPlan}
                                </div>
                            </div>
                            <div className={styles.centerContent1BottomItem}>
                                <div style={{ color: 'white' }}>
                                    实际处理时间总计(天)
                                </div>
                                <div style={{ color: '#4592E3', fontSize: 36 }}>
                                    {data?.totalProcessingDaysForActual}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.centerContent2}>
                        <ReactECharts
                            option={getOptions("costType2Amount")}
                            style={{ width: '100%', height: "calc(100% - 50px)" }}
                        />
                        <div style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>消缺总成本(元)</div>
                    </div>
                    <div className={styles.centerContent3}>
                        <ReactECharts
                            option={getOptions("benefitType2Amount")}
                            style={{ width: '100%', height: "calc(100% - 50px)" }}
                        />
                        <div style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>消缺收益(元)</div>
                    </div>
                </div>
            </div>
            <Table
                rowKey="id"
                dataSource={dataSource}
                columns={[
                    {
                        title: '工单编号',
                        dataIndex: 'code',
                        width: 200,
                    },
                    {
                        title: "异常名称",
                        dataIndex: "title",
                        width: 200,
                    },
                    {
                        title: "异常开始时间",
                        dataIndex: "publishedTime",
                        width: 200,
                    },
                    {
                        title: "异常结束时间",
                        dataIndex: "completedTime",
                        width: 200,
                    },
                    {
                        title: "关联项目名称",
                        dataIndex: "projectId",
                        width: 200,
                        render(value) {
                            return initOption?.projects?.find(item => item?.id === value)?.name
                        }
                    },
                    {
                        title: "异常部件",
                        dataIndex: "exceptionParts",
                        width: 200,
                    },
                    {
                        title: "异常供应商",
                        dataIndex: "exceptionSupplierName",
                        width: 200,
                    },
                    {
                        title: "处理方案",
                        dataIndex: "exceptionSolution",
                        width: 200,
                    },
                    {
                        title: "计划处理时间(天)",
                        dataIndex: "exceptionProcessingDaysForPlan",
                        width: 200,
                    },
                    {
                        title: "实际处理时间(天)",
                        dataIndex: "exceptionProcessingDaysForActual",
                        width: 200,
                    },
                    {
                        title: <span style={{ color: '#F88716' }}>消缺总成本(元)</span>,
                        dataIndex: "exceptionProcessingCost",
                        width: 200,
                        render(_, { exceptionProcessingCost }) {
                            return (
                                <span style={{ color: '#F88716' }}>{(exceptionProcessingCost?.travelCost || 0) + (exceptionProcessingCost?.consumablesCost || 0) + (exceptionProcessingCost?.sparePartCost || 0) + (exceptionProcessingCost?.ownerFineCost || 0) + (exceptionProcessingCost?.laborCost || 0)}</span>
                            )
                        }
                    },
                    {
                        title: "差旅成本(元)",
                        dataIndex: "travelCost",
                        width: 200,
                        render(_, { exceptionProcessingCost }) {
                            return exceptionProcessingCost?.travelCost;
                        }
                    },
                    {
                        title: "耗材成本(元)",
                        dataIndex: "consumablesCost",
                        width: 200,
                        render(_, { exceptionProcessingCost }) {
                            return exceptionProcessingCost?.consumablesCost;
                        }
                    },
                    {
                        title: "备件成本(元)",
                        dataIndex: "sparePartCost",
                        width: 200,
                        render(_, { exceptionProcessingCost }) {
                            return exceptionProcessingCost?.sparePartCost;
                        }
                    },
                    {
                        title: "业主罚款(元)",
                        dataIndex: "ownerFineCost",
                        width: 200,
                        render(_, { exceptionProcessingCost }) {
                            return exceptionProcessingCost?.ownerFineCost;
                        }
                    },
                    {
                        title: "人员成本(元)",
                        dataIndex: "laborCost",
                        width: 200,
                        render(_, { exceptionProcessingCost }) {
                            return exceptionProcessingCost?.laborCost;
                        }
                    },
                    {
                        title: <span style={{ color: '#F88716' }}>消缺收益(元)</span>,
                        dataIndex: "exceptionProcessingBenefit",
                        width: 200,
                        render(_, { exceptionProcessingBenefit }) {
                            return (
                                <span style={{ color: '#F88716' }}>{(exceptionProcessingBenefit?.supplierFineBenefit || 0) + (exceptionProcessingBenefit?.warrantyExpiredPayBenefit || 0)}</span>
                            )
                        }
                    },
                    {
                        title: "供应商罚款收益(元)",
                        dataIndex: "supplierFineBenefit",
                        width: 200,
                        render(_, { exceptionProcessingBenefit }) {
                            return exceptionProcessingBenefit?.supplierFineBenefit;
                        }
                    },
                    {
                        title: "质保外维修收益(元)",
                        dataIndex: "warrantyExpiredPayBenefit",
                        width: 200,
                        render(_, { exceptionProcessingBenefit }) {
                            return exceptionProcessingBenefit?.warrantyExpiredPayBenefit;
                        }
                    },
                    {
                        title: '异常处理人',
                        dataIndex: 'currentProcessorName',
                        width: 200
                    },
                    {
                        title: '消缺总结',
                        dataIndex: 'exceptionProcessingResult',
                        width: 400,
                        render: (exceptionProcessingResult) => (
                            <Tooltip placement="topLeft" title={exceptionProcessingResult} overlayStyle={{ maxWidth: 550 }}>
                                {exceptionProcessingResult}
                            </Tooltip>
                        ),
                    },
                    {
                        title: "操作",
                        dataIndex: "Action",
                        fixed: 'right',
                        width: 200,
                        render: (_, row) => {
                            return (
                                <Space>
                                    <Button
                                        type="link"
                                        style={{ color: token.colorPrimary }}
                                        onClick={() => {
                                            setCurrentRow(row)
                                            setFileOpen(true);
                                        }}
                                    >
                                        附件
                                    </Button>
                                    <Button
                                        type="link"
                                        style={{
                                            color: token.colorPrimary
                                        }}
                                        onClick={() => {
                                            history.push(`/task-management/task-list?code=${row?.code}`)
                                        }}
                                    >
                                        详情
                                    </Button>
                                </Space>
                            );
                        },
                    },
                ]}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                }}
                scroll={{
                    x: 1500
                }}
            />
            <Modal
                width={900}
                title="附件"
                open={fileOpen}
                onCancel={() => setFileOpen(false)}
                onOk={() => setFileOpen(false)}
            >
                <div className={styles.images}>
                    {
                        currentRow?.exceptionProcessingAttachments?.map(item => {
                            return (
                                <Image
                                    width={200}
                                    src={`${getBaseUrl()}/attachment/download/${item?.id}` + jsonToUrlParams({
                                        id: item?.id,
                                        access_token: localStorage.getItem("Token")
                                    })}
                                />
                            )
                        })
                    }
                </div>
            </Modal>
        </div>
    )
}

export default Detailed;