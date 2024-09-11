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
        const plantId = nameRef.current;
        const deviceName = deviceNameRef.current;
        const descLike = alarmNameRef.current;
        const mmsEventClassify = alarmTypeRef
        const mmsEventLevel = alarmLevelRef.current;
        const res = await alarmStatisticsTableServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                beginStartDate:
                    planDate && planDate?.length >= 2 && dayjs(planDate?.[0]).format("YYYY-MM-DD"),
                beginEndDate:
                    planDate && planDate?.length >= 2 && dayjs(planDate?.[1]).format("YYYY-MM-DD"),
                plantId,
                deviceName,
                descLike,
                mmsEventLevel,
            },
        });
        if (res?.data?.status == "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
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
        alarmNameRef.current = undefined;
        alarmLevelRef.current = undefined;
        setAlarmType(undefined);
        setDeviceName(undefined);
        setName(undefined);
        setPlanDate(undefined);
        setAlarmName(undefined);
        setAlarmLevel(undefined);
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
                    type="select"
                    options={initOption?.mmsEventClassifies}
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
                            dataIndex: "desc",
                        },
                        {
                            title: "告警开始时间",
                            dataIndex: "begin",
                        },
                        {
                            title: "告警结束时间",
                            dataIndex: "end",
                        },
                        {
                            title: "项目名称",
                            dataIndex: "projectName",
                            render(_, { project }) {
                                return project?.name;
                            },
                        },
                        {
                            title: "电站名称",
                            dataIndex: "plantName",
                            render(_, { plant }) {
                                return plant?.name;
                            },
                        },
                        {
                            title: "设备名称",
                            dataIndex: "deviceName",
                        },
                        // {
                        //     title: "运维告警类型",
                        //     dataIndex: "",
                        // },
                        {
                            title: "运维告警等级",
                            dataIndex: "mmsEventLevel",
                            render(_, { alarmType }) {
                                return alarmType?.mmsEventLevel;
                            },
                        },
                        {
                            title: "运维告警描述",
                            dataIndex: "mmsEventDesc",
                            render(_, { alarmType }) {
                                return alarmType?.mmsEventDesc;
                            },
                        },
                        {
                            title: "是否同步生成工单",
                            dataIndex: "autoGenerateWorkOrder",
                            render(_, { alarmType }) {
                                return alarmType?.autoGenerateWorkOrder ? "是" : "否";
                            },
                        },
                        {
                            title: "操作",
                            dataIndex: "Action",
                            fixed: "right",
                            width: 150,
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
                        getDataSource();
                    }}
                    scroll={{
                        x: 2000,
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
                        <Descriptions.Item label="项目名称">
                            {currentRow?.project?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="所在地址">
                            {currentRow?.project?.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="产品类型">
                            {currentRow?.project?.productTypeZh}
                        </Descriptions.Item>
                        <Descriptions.Item label="项目阶段">
                            {currentRow?.project?.phaseZh}
                        </Descriptions.Item>
                        <Descriptions.Item label="项目进度">
                            {currentRow?.project?.subPhaseZh}
                        </Descriptions.Item>
                        <Descriptions.Item label="当前阶段负责人">
                            {currentRow?.project?.currentStepOwner?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="负责人电话">
                            {currentRow?.project?.currentStepOwner?.phoneNo}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </Modal>
        </div>
    );
};

export default Detailed;
