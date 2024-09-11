import { history } from "umi";
import { Space, Button, Table, theme, DatePicker, Modal, Descriptions } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { SearchInput } from "@/components";
import React, { useState, useEffect, useRef } from "react";
import {
    alarmStatisticsTablePageInitData as alarmStatisticsTablePageInitDataServer,
    alarmStatisticsTable as alarmStatisticsTableServer,
} from "@/services";
import styles from "./index.less";
import dayjs from "dayjs";

const Detailed = () => {
    const { token } = theme.useToken();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [planDate, setPlanDate] = useState();
    const planDateRef = useRef();
    const [branchName, setBranchName] = useState();
    const branchNameRef = useRef();
    const [name, setName] = useState();
    const nameRef = useRef();
    const [deviceName, setDeviceName] = useState();
    const deviceNameRef = useRef();
    const [alarmName, setAlarmName] = useState();
    const alarmNameRef = useRef();
    const [alarmType, setAlarmType] = useState();
    const alarmTypeRef = useRef();
    const [alarmLevel, setAlarmLevel] = useState();
    const alarmLevelRef = useRef();
    const [dataSource, setDataSource] = useState([]);
    const [initOption, setInitOption] = useState({});
    const [currentRow, setCurrentRow] = useState({});
    const [open, setOpen] = useState(false);

    const getDataSource = async () => {
        const { current, pageSize } = paginationRef.current;
        const planDate = planDateRef.current;
        const titleLike = nameRef.current;
        const res = await alarmStatisticsTableServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                publishedTimeFrom:
                    planDate && planDate?.length >= 2 && dayjs(planDate?.[0]).format("YYYY-MM-DD"),
                publishedTimeTo:
                    planDate && planDate?.length >= 2 && dayjs(planDate?.[1]).format("YYYY-MM-DD"),
                titleLike,
            },
        });
        if (res?.data?.status == "SUCCESS") {
            const { workOrderPage } = res?.data?.data;
            const { totalRecord, recordList } = workOrderPage || {};
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setDataSource(recordList);
        }
    };

    const getInitData = async () => {
        const res = await alarmStatisticsTablePageInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            setInitOption(res?.data?.data);
        }
    };

    const onReset = () => {
        planDateRef.current = undefined;
        nameRef.current = undefined;
        deviceNameRef.current = undefined;
        alarmTypeRef.current = undefined;
        setAlarmType(undefined);
        setDeviceName(undefined);
        setName(undefined);
        setPlanDate(undefined);
        getDataSource();
    };

    useEffect(() => {
        getInitData();
        getDataSource();
    }, []);

    return (
        <div className={styles.detailed}>
            <div style={{ fontSize: 20, color: token.fontColor, marginBottom: 28 }}>查询条件</div>
            <Space className={styles.search} size={20}>
                <div>
                    <span style={{ color: "#FFF" }}>时间：</span>
                    <DatePicker.RangePicker
                        value={
                            planDate &&
                            planDate?.length >= 2 && [dayjs(planDate?.[0]), dayjs(planDate?.[1])]
                        }
                        onChange={value => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            planDateRef.current = value;
                            setPlanDate(value);
                        }}
                    />
                </div>
                <SearchInput
                    label="电站名称"
                    type="select"
                    value={name}
                    options={initOption?.plans?.map(item => ({
                        name: item.name,
                        code: item.plantId,
                    }))}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <SearchInput
                    label="并网点名称"
                    type="select"
                    value={branchName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        branchNameRef.current = value;
                        setBranchName(value);
                    }}
                />
                <SearchInput
                    label="设备名称"
                    value={deviceName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        deviceNameRef.current = value;
                        setDeviceName(value);
                    }}
                />
                <SearchInput
                    label="告警名称"
                    value={alarmName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        alarmNameRef.current = value;
                        setAlarmName(value);
                    }}
                />
                <SearchInput
                    label="运维告警类型"
                    value={alarmType}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        alarmTypeRef.current = value;
                        setAlarmType(value);
                    }}
                />
                <SearchInput
                    label="运维告警等级"
                    type="select"
                    value={alarmLevel}
                    options={initOption?.mmsEventLevels?.map(item => ({
                        name: item,
                        code: item,
                    }))}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        alarmLevelRef.current = value;
                        setAlarmLevel(value);
                    }}
                />
                <Button type="primary" onClick={getDataSource}>
                    搜索
                </Button>
                <Button type="primary" danger onClick={onReset}>
                    重置
                </Button>
            </Space>
            <div style={{ marginTop: 18 }}>
                <Table
                    rowKey="id"
                    dataSource={dataSource}
                    columns={[
                        {
                            title: "告警名称",
                            dataIndex: "",
                            width: 200,
                        },
                        {
                            title: "告警开始时间",
                            dataIndex: "publishedTime",
                            width: 200,
                        },
                        {
                            title: "告警结束时间",
                            dataIndex: "completedTime",
                            width: 200,
                        },
                        {
                            title: "项目名称",
                            dataIndex: "projectId",
                            width: 200,
                            render(value) {
                                return initOption?.projects?.find(item => item?.id === value)?.name;
                            },
                        },
                        {
                            title: "电站名称",
                            dataIndex: "exceptionParts",
                            width: 200,
                        },
                        {
                            title: "设备名称",
                            dataIndex: "exceptionSupplierName",
                            width: 200,
                        },
                        {
                            title: "运维告警类型",
                            dataIndex: "exceptionSolution",
                            width: 200,
                        },
                        {
                            title: "运维告警等级",
                            dataIndex: "exceptionProcessingDaysForPlan",
                            width: 200,
                        },
                        {
                            title: "运维告警描述",
                            dataIndex: "exceptionProcessingDaysForActual",
                            width: 200,
                        },
                        {
                            title: "是否同步生成工单",
                            dataIndex: "exceptionProcessingCost",
                            width: 200,
                        },
                        {
                            title: "操作",
                            dataIndex: "Action",
                            fixed: "right",
                            width: 200,
                            render: (_, row) => {
                                return (
                                    <Space>
                                        <Button
                                            type="link"
                                            style={{ color: token.colorPrimary }}
                                            onClick={() => {
                                                setCurrentRow(row);
                                                setOpen(true);
                                            }}
                                        >
                                            关联项目信息
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
                        x: 1500,
                    }}
                />
            </div>
            <Modal
                width={600}
                title="项目信息"
                open={open}
                onCancel={() => setOpen(false)}
                onOk={() => setOpen(false)}
            >
                <div className={styles.images}>
                    <Descriptions column={1}>
                        <Descriptions.Item label="项目名称">Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="所在地址">1810000000</Descriptions.Item>
                        <Descriptions.Item label="产品类型">Hangzhou, Zhejiang</Descriptions.Item>
                        <Descriptions.Item label="项目阶段">empty</Descriptions.Item>
                        <Descriptions.Item label="项目进度"></Descriptions.Item>
                        <Descriptions.Item label="当前阶段负责人">
                            Hangzhou, Zhejiang
                        </Descriptions.Item>
                        <Descriptions.Item label="负责人电话">empty</Descriptions.Item>
                    </Descriptions>
                </div>
            </Modal>
        </div>
    );
};

export default Detailed;
