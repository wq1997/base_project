import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Tabs, DatePicker, message } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import dayjs from "dayjs";
import {
    getAlarmList as getAlarmListServer,
    getAlarmLevel as getAlarmLevelServer,
} from "@/services/alarm";
import { getDeviceType as getDeviceTypeServer } from "@/services/device";
import Detail from "./Detail";
import Clear from "./Clear";

const Log = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeKey, setActiveKey] = useState("active");
    const alarmNameRef = useRef();
    const [alarmName, setAlarmName] = useState();
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
    const [detailId, setDetailId] = useState();
    const [clearId, setClearId] = useState();

    const columns = [
        {
            title: "告警名称",
            dataIndex: "name",
        },
        {
            title: "告警级别",
            dataIndex: "levelName",
        },
        {
            title: "设备名称",
            dataIndex: "deviceName",
        },
        {
            title: "设备类型",
            dataIndex: "deviceTypeName",
        },
        {
            title: "电站名称",
            dataIndex: "plantName",
        },
        {
            title: "发生时间",
            dataIndex: "createTime",
        },
    ];

    const getDeviceType = async () => {
        const res = await getDeviceTypeServer();
        if (res?.data?.code == 200) {
            setDeviceTypeOptions(res?.data?.data);
        }
    };

    const getAlarmLevel = async () => {
        const res = await getAlarmLevelServer();
        if (res?.data?.code == 200) {
            setAlarmLevelOptions(res?.data?.data);
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const deviceType = deviceTypeRef.current;
        const level = alarmLevelRef.current;
        const name = alarmNameRef.current;
        const [startTime, endTime] = executeTimeRef.current || [];
        setLoading(true);
        const res = await getAlarmListServer({
            pageNo: current,
            pageSize,
            deviceType,
            level,
            name,
            startTime,
            endTime,
            status: activeKey == "active" ? "ALARM" : "RECOVER",
        });
        if (res?.data?.code == 200) {
            const { total, records } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(total),
            });
            setDataSource(records);
        } else {
            message.info(res?.data?.description);
        }
        setLoading(false);
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        deviceTypeRef.current = undefined;
        setDeviceType();
        alarmNameRef.current = undefined;
        setAlarmName();
        alarmLevelRef.current = undefined;
        setAlarmLevel();
        executeTimeRef.current = undefined;
        setExecuteTime([]);
        setDataSource();
        setPagination({
            current: 1,
            total: 0,
        });
        getList();
    };

    const handleSearch = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        getList();
    };

    useEffect(() => {
        handleReset();
    }, [activeKey]);

    useEffect(() => {
        getDeviceType();
        getAlarmLevel();
        getList();
    }, []);

    return (
        <>
            <Detail
                activeKey={activeKey}
                detailId={detailId}
                onClose={() => {
                    setDetailId();
                }}
            />
            <Clear
                clearId={clearId}
                onClose={flag => {
                    if (flag) {
                        const { current } = paginationRef?.current;
                        if (current != 1 && dataSource.length == 1) {
                            (paginationRef.current.current = current - 1),
                                setPagination({
                                    current: current - 1,
                                });
                        }
                    }
                    getList();
                    setClearId();
                }}
            />
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
                    value={alarmName}
                    onChange={value => {
                        alarmNameRef.current = value;
                        setAlarmName(value);
                    }}
                />

                <div>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            executeTimeRef.current = dateStr;
                            setExecuteTime(dateStr?.includes("") ? [] : dateStr);
                        }}
                        value={
                            executeTime && executeTime.length > 0
                                ? [dayjs(executeTime[0]), dayjs(executeTime[1])]
                                : []
                        }
                    />
                </div>
                <Button type="primary" onClick={() => handleSearch()}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                loading={loading}
                dataSource={dataSource}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
                columns={[
                    ...columns,
                    ...(activeKey == "history"
                        ? [
                              {
                                  title: "清除时间",
                                  dataIndex: "recoverTime",
                              },
                              {
                                  title: "结束时间",
                                  dataIndex: "finishTime",
                              },
                          ]
                        : []),
                    {
                        title: "操作",
                        dataIndex: "operate",
                        fixed: "right",
                        width: 150,
                        render: (_, { id }) => {
                            return (
                                <Space>
                                    {activeKey == "active" && (
                                        <a onClick={() => setClearId(id)}>清除</a>
                                    )}
                                    <a onClick={() => setDetailId(id)}>详情</a>
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
