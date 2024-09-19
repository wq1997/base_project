import { Space, Button, Table, theme, Modal, Row } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import styles from "./index.less";
import {
    getHumanResourceInventoryPageInitData as getHumanResourceInventoryPageInitDataServe,
    findHumanResourceInventory as findHumanResourceInventoryServe,
    humanProjectInvntoryData as humanProjectInvntoryDataServe,
    humanWorkOrderInvntoryData as humanWorkOrderInvntoryDataServe,
} from "@/services";

const ResourcesInventory = () => {
    const { token } = theme.useToken();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [name, setName] = useState();
    const nameRef = useRef();
    const [area, setArea] = useState();
    const areaRef = useRef();
    const [dataSource, setDataSource] = useState([{}]);
    const [initOptions, setInitOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState();
    const [modalDataSource, setModalDataSource] = useState([]);

    const getInitOptions = async () => {
        const res = await getHumanResourceInventoryPageInitDataServe();
        if (res?.data?.status === "SUCCESS") {
            setInitOptions(res?.data?.data);
        }
    }

    const getDatasource = async () => {
        const { current, pageSize } = paginationRef.current;
        const nameLike = nameRef.current;
        const region = areaRef.current;
        const res = await findHumanResourceInventoryServe({
            pageNum: current,
            pageSize,
            queryCmd: {
                nameLike,
                region
            }
        })
        if (res?.data?.status) {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setDataSource(recordList);
        }
    }

    const getProjectDetail = async (params) => {
        const res = await humanProjectInvntoryDataServe(params);
        if (res?.data?.status === "SUCCESS") {
            setModalDataSource(res?.data?.data);
        }
    }

    const getWorkOrderDetail = async (params) => {
        const res = await humanWorkOrderInvntoryDataServe(params);
        if (res?.data?.status === "SUCCESS") {
            setModalDataSource(res?.data?.data);
        }else{
            setModalDataSource([]);
        }
    }

    const onRest = () => {
        nameRef.current = undefined;
        areaRef.current = undefined;
        setArea(undefined);
        setName(undefined);
        getDatasource();
    }

    useEffect(() => {
        getDatasource();
        getInitOptions();
    }, [])

    return (
        <div className={styles.resourcesInventory}>
            <Space className={styles.search} size={20}>
                <SearchInput
                    label="人员名称"
                    value={name}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <SearchInput
                    label="所属区域"
                    value={area}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        areaRef.current = value;
                        setArea(value);
                    }}
                    options={initOptions?.regions}
                />
                <Button
                    type="primary"
                    onClick={getDatasource}
                >
                    搜索
                </Button>
                <Button
                    type="primary"
                    danger
                    onClick={onRest}
                >
                    重置
                </Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={dataSource}
                columns={[
                    {
                        title: "人员名称",
                        dataIndex: "name",
                        render(_, row) {
                            return row?.user?.name;
                        }
                    },
                    {
                        title: "负责项目总数",
                        dataIndex: "projectTotalCount",
                        render(_, row) {
                            return <span
                                style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    await getProjectDetail({ userAccount: row?.user?.account, searchType: "TOTAL_PHASE" })
                                    setModalType("Project");
                                    setOpen(true)
                                }}
                            >
                                {row?.projectSummery?.projectTotalCount}
                            </span>;
                        }
                    },
                    {
                        title: "实施阶段项目数",
                        dataIndex: "implementationPhaseProjectCount",
                        render(_, row) {
                            return <span
                                style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    await getProjectDetail({ userAccount: row?.user?.account, searchType: "IMPLEMENTATION_PHASE" })
                                    setModalType("Project");
                                    setOpen(true)
                                }}>{row?.projectSummery?.implementationPhaseProjectCount}</span>
                        }
                    },
                    {
                        title: "售后质保项目数",
                        dataIndex: "warrantyPhaseProjectCount",
                        render(_, row) {
                            return <span
                                style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    await getProjectDetail({ userAccount: row?.user?.account, searchType: "WARRANTY_PHASE" })
                                    setModalType("Project");
                                    setOpen(true)
                                }}>{row?.projectSummery?.warrantyPhaseProjectCount}</span>;
                        }
                    },
                    {
                        title: "售后过保项目数",
                        dataIndex: "warrantyExpiredPhaseProjectCount",
                        render(_, row) {
                            return <span
                                style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    await getProjectDetail({ userAccount: row?.user?.account, searchType: "WARRANTY_EXPIRED_PHASE" })
                                    setModalType("Project");
                                    setOpen(true)
                                }}>{row?.projectSummery?.warrantyExpiredPhaseProjectCount}</span>;
                        }
                    },
                    {
                        title: "处理任务总数",
                        dataIndex: "processedWorkOrderTotalCount",
                        render(_, row) {
                            return <span 
                                style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    await getWorkOrderDetail({ userAccount: row?.user?.account, searchType: "TOTAL" })
                                    setModalType("WorkOrder");
                                    setOpen(true)
                                }}
                                >{row?.workOrderSummery?.processedWorkOrderTotalCount}</span>;
                        }
                    },
                    {
                        title: "处理实施工单数",
                        dataIndex: "processedImplementWorkOrderCount",
                        render(_, row) {
                            return <span 
                            style={{ cursor: 'WorkOrder' }}
                            onClick={async() => {
                                await getWorkOrderDetail({ userAccount: row?.user?.account, searchType: "PROCESSED_IMPLEMENT" })
                                setModalType("Project");
                                setOpen(true)
                            }}
                            >{row?.workOrderSummery?.processedImplementWorkOrderCount}</span>;
                        }
                    },
                    {
                        title: "处理巡检工单数",
                        dataIndex: "processedInspectionWorkOrderCount",
                        render(_, row) {
                            return <span 
                            style={{ cursor: 'WorkOrder' }}
                            onClick={async () => {
                                await getWorkOrderDetail({ userAccount: row?.user?.account, searchType: "PROCESSED_INSPECTION" })
                                setModalType("Project");
                                setOpen(true)
                            }}
                            >{row?.workOrderSummery?.processedInspectionWorkOrderCount}</span>;
                        }
                    },
                    {
                        title: "处理异常工单数",
                        dataIndex: "processedExceptionWorkOrderCount",
                        render(_, row) {
                            return <span 
                                style={{ cursor: 'pointer' }}
                                onClick={async() => {
                                    await getWorkOrderDetail({ userAccount: row?.user?.account, searchType: "PROCESSED_EXCEPTION" })
                                    setModalType("WorkOrder");
                                    setOpen(true)
                                }}
                                >{row?.workOrderSummery?.processedExceptionWorkOrderCount}</span>;
                        }
                    },
                    {
                        title: "待办工单数",
                        dataIndex: "todoWorkOrderCount",
                        render(_, row) {
                            return <span 
                                style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    await getWorkOrderDetail({ userAccount: row?.user?.account, searchType: "TODO" })
                                    setModalType("WorkOrder");
                                    setOpen(true)
                                }}
                                >{row?.workOrderSummery?.todoWorkOrderCount}</span>;
                        }
                    },
                ]}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getDatasource();
                }}
            />
            <Modal
                open={open}
                width={1000}
                onCancel={() => {
                    setModalType();
                    setOpen(false);
                }}
            >
                <Table
                    style={{ marginTop: 30 }}
                    columns={
                        modalType === "Project" ?
                            [
                                {
                                    title: "项目名称",
                                    dataIndex: "project",
                                    render(_, row) {
                                        return row?.project?.name
                                    }
                                },
                                {
                                    title: "项目当前阶段",
                                    dataIndex: "project",
                                    render(_, row) {
                                        return row?.project?.phaseZh
                                    }
                                },
                                {
                                    title: "项目工单总数",
                                    dataIndex: "project",
                                    render(_, row) {
                                        return row?.summery?.workOrderTotalCount
                                    }
                                },
                                {
                                    title: "项目异常工单数",
                                    dataIndex: "project",
                                    render(_, row) {
                                        return row?.summery?.exceptionWorkOrderCount
                                    }
                                },
                                {
                                    title: "项目代办工单数",
                                    dataIndex: "project",
                                    render(_, row) {
                                        return row?.summery?.todoWorkOrderCount
                                    }
                                },
                            ]
                            :
                            [
                                {
                                    title: "工单名称",
                                    dataIndex: "title",
                                    render(_, row) {
                                        return row?.workOrder?.title
                                    }
                                },
                                {
                                    title: "关联项目",
                                    dataIndex: "project",
                                    render(_, row) {
                                        return row?.workOrder?.project?.name
                                    }
                                },
                                {
                                    title: "项目工单类型",
                                    dataIndex: "typeZh",
                                    render(_, row) {
                                        return row?.workOrder?.typeZh
                                    }
                                },
                                {
                                    title: "处理人",
                                    dataIndex: "userName",
                                },
                            ]
                    }
                    dataSource={modalDataSource}
                    pagination={false}
                    scroll={{
                        y: 800
                    }}
                />
            </Modal>
        </div>
    )
}

export default ResourcesInventory;