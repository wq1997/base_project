import { Space, Button, Table, theme, DatePicker, Row } from "antd";
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

const Detailed = () => {
    const { token } = theme.useToken();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [planDate, setPlanDate] = useState();
    const planDateRef = useRef();
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
    const [dataSource, setDataSource] = useState([]);
    const [initOption, setInitOption] = useState({});

    const getOptions = () => {
        const options = {
            color: ["#00FFF8", "#8FC0FF"],
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
                    data: [
                        { value: 1285, name: "维保项目" },
                        { value: 85, name: "实施项目" },
                    ],
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
        const planDate = planDateRef.current;
        const titleLike = nameRef.current;
        const projectId = projectNameRef.current;
        const type = orderTypeRef.current;
        const exceptionSupplierId = manufacturerRef.current;
        const actualProcessorNameLike = handlerPersonRef.current;
        const collectingMaterials = collectingMaterialsRef.current;
        const res = await workOrderFindExceptionStatisticsPageServe({
            pageNum: current,
            pageSize,
            queryCmd: {
                publishedTimeFrom: planDate&&planDate?.length>=2&&dayjs(planDate?.[0]).format("YYYY-MM-DD"),
                publishedTimeTo: planDate&&planDate?.length>=2&&dayjs(planDate?.[1]).format("YYYY-MM-DD"),
                completedTimeFrom: overDate&&overDate?.length>=2&&dayjs(overDate?.[0]).format("YYYY-MM-DD"),
                completedTimeTo: overDate&&overDate?.length>=2&&dayjs(overDate?.[1]).format("YYYY-MM-DD"),
                titleLike,
                projectId,
                type,
                exceptionSupplierId,
                collectingMaterials,
                actualProcessorNameLike,
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
        setHandlerPerson(undefined);
        setManufacturer(undefined);
        setOrderType(undefined);
        setProjectName(undefined);
        setName(undefined);
        setOverDate(undefined);
        setPlanDate(undefined);
    }

    useEffect(() => {
        getInitData();
        getDataSource();
    }, [])

    return (
        <div className={styles.detailed}>
            <div style={{ fontSize: 20, color: token.fontColor, marginBottom: 28 }}>查询条件</div>
            <Space className={styles.search} size={20}>
                <div>
                    <span style={{ color: "#FFF" }}>异常生成时间：</span>
                    <DatePicker.RangePicker
                        value={planDate&&planDate?.length>=2&&[dayjs(planDate?.[0]),dayjs(planDate?.[1])]}
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
                        value={overDate&&overDate?.length>=2&&[dayjs(overDate?.[0]), dayjs(overDate?.[1])]}
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
                        {name: '是', code: true},
                        {name: '否', code: false}
                    ]}
                />
                <SearchInput
                    label="异常处理人"
                    value={handlerPerson}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        handlerPersonRef.current = value;
                        setHandlerPerson(value);
                    }}
                />
                <Button type="primary">搜索</Button>
                <Button
                    type="primary"
                    danger
                    onClick={onReset}
                >
                    重置
                </Button>
            </Space>
            <div className={styles.center}>
                <Row justify="space-between" style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 20, color: token.fontColor }}>异常统计</div>
                    <div style={{ fontSize: 20, color: token.fontColor }}>异常总数：21</div>
                </Row>
                <Row justify="space-between">
                    <ReactECharts
                        option={getOptions()}
                        style={{ flex: 1, height: "300px" }}
                    />
                    <ReactECharts
                        option={getOptions()}
                        style={{ flex: 1, height: "300px" }}
                    />
                    <ReactECharts
                        option={getOptions()}
                        style={{ flex: 1, height: "300px" }}
                    />
                </Row>
                <Row justify="space-around">
                    <div style={{ fontSize: 20, color: token.fontColor, marginBottom: 15 }}>所属类型统计</div>
                    <div style={{ fontSize: 20, color: token.fontColor, marginBottom: 15 }}>异常类型统计</div>
                    <div style={{ fontSize: 20, color: token.fontColor, marginBottom: 15 }}>厂商类型统计</div>
                </Row>
            </div>
            <Table
                rowKey="id"
                dataSource={dataSource}
                columns={[
                    {
                        title: "异常生成时间",
                        dataIndex: "name",
                    },
                    {
                        title: "异常完结时间",
                        dataIndex: "name1",
                    },
                    {
                        title: "异常名称",
                        dataIndex: "name2",
                    },
                    {
                        title: "关联项目名称",
                        dataIndex: "name3",
                    },
                    {
                        title: "关联工单类型",
                        dataIndex: "name4",
                    },
                    {
                        title: "异常所属类型",
                        dataIndex: "name5",
                    },
                    {
                        title: "异常类型",
                        dataIndex: "name6",
                    },
                    {
                        title: "责任厂商",
                        dataIndex: "name7",
                    },
                    {
                        title: "异常处理人",
                        dataIndex: "name8",
                    },
                    {
                        title: "异常处理结果",
                        dataIndex: "name9",
                    },
                    {
                        title: "处理附件",
                        dataIndex: "name11",
                    },
                    {
                        title: "操作",
                        dataIndex: "Action",
                        render: (_, row) => {
                            return (
                                <Space>
                                    <Button type="link" style={{ color: token.colorPrimary }}>
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
            />
        </div>
    )
}

export default Detailed;