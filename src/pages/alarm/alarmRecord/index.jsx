import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Tabs, DatePicker } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import dayjs from "dayjs";

const Log = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeKey, setActiveKey] = useState("active");
    const deviceNameRef = useRef();
    const [deviceName, setDeviceName] = useState();
    const deviceTypeRef = useRef();
    const [deviceType, setDeviceType] = useState();
    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);
    const alarmLevelRef = useRef();
    const [alarmLevel, setAlarmLevel] = useState();
    const [alarmLevelOptions, setAlarmLevelOptions] = useState([]);
    const executeTimeRef = useRef();
    const [executeTime, setExecuteTime] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    const columns = [
        {
            title: "序号",
            dataIndex: "",
        },
        {
            title: "告警级别",
            dataIndex: "",
        },
        {
            title: "告警名称",
            dataIndex: "",
        },
        {
            title: "设备名称",
            dataIndex: "",
        },
        {
            title: "设备类型",
            dataIndex: "",
        },
        {
            title: "电站名称",
            dataIndex: "",
        },
        {
            title: "发生时间",
            dataIndex: "",
        },
    ];

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const deviceName = deviceNameRef.current;
        const pageName = pageRef.current;
        const operationName = operationRef.current;
        setLoading(true);
        try {
            const res = await getOperationLogServe({
                pageNum: current,
                pageSize,
                queryCmd: {},
            });
            if (res?.data?.status == "SUCCESS") {
                const { totalRecord, recordList } = res?.data?.data;
                setPagination({
                    ...paginationRef.current,
                    total: parseInt(totalRecord),
                });
                setDataSource(recordList);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        deviceTypeRef.current = undefined;
        setDeviceType();
        deviceNameRef.current = undefined;
        setDeviceName();
        alarmLevelRef.current = undefined;
        setAlarmLevel();
        executeTimeRef.current = undefined;
        setExecuteTime([]);
        getList();
    };

    useEffect(() => {
        //  getList();
    }, []);

    return (
        <>
            <Tabs
                activeKey={activeKey}
                items={[
                    {
                        key: "active",
                        label: "实时告警",
                    },
                    {
                        key: "history",
                        label: "历史告警",
                    },
                ]}
                onChange={value => setActiveKey(value)}
            />
            <Space
                style={{
                    flexWrap: "wrap",
                    marginBottom: "8px",
                }}
            >
                <SearchInput
                    label="设备类型"
                    value={deviceType}
                    type="select"
                    options={deviceTypeOptions}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        deviceTypeRef.current = value;
                        setDeviceType(value);
                    }}
                />
                <SearchInput
                    label="告警级别"
                    value={alarmLevel}
                    type="select"
                    options={alarmLevelOptions}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        alarmLevelRef.current = value;
                        setAlarmLevel(value);
                    }}
                />
                <SearchInput
                    label="告警名称"
                    placeholder="请输入告警名称"
                    inputWidth={250}
                    value={deviceName}
                    onChange={value => {
                        deviceNameRef.current = value;
                        setDeviceName(value);
                    }}
                />

                <div>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            executeTimeRef.current = dateStr;
                            setExecuteTime(dateStr);
                        }}
                        value={
                            executeTime && executeTime.length > 0
                                ? [dayjs(executeTime[0]), dayjs(executeTime[1])]
                                : []
                        }
                    />
                </div>
                <Button type="primary" onClick={getList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                loading={loading}
                dataSource={[]}
                columns={[
                    ...columns,
                    ...(activeKey == "history"
                        ? [
                            {
                                title: "清除时间",
                                dataIndex: "",
                            },
                            {
                                title: "结束时间",
                                dataIndex: "",
                            },
                        ]
                        : []),
                    {
                        title: "操作",
                        dataIndex: "operate",
                        fixed: "right",
                        width: 200,
                        render: (_, { }) => {
                            return (
                                <Space>
                                    <a>清除</a>
                                    <a>详情</a>
                                </Space>
                            );
                        },
                    },
                ]}
                pagination={pagination}
            />
        </>
    );
};

export default Log;
