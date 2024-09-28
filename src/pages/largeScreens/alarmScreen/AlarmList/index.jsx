import styles from "./index.less";
import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Spin, Tooltip, Pagination } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { toChineseNumber, getAlarmColor } from "@/utils/utils";
import "./index.less";
import Card from "../../components/Card";
import { getAlarmScreenList as getAlarmScreenListServer } from "@/services/largeScreen";

const Index = ({ initData }) => {
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [loading, setLoading] = useState(false);
    const alarmLevelRef = useRef();
    const [alarmLevel, setAlarmLevel] = useState();
    const [alarmLevelOptions, setAlarmLevelOptions] = useState();
    const deviceNameRef = useRef();
    const [deviceName, setDeviceName] = useState();
    const plantNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const [plantNameOptions, setPlantNameOptions] = useState();
    const startTimeRef = useRef();
    const [startTime, setStartTime] = useState();
    const alarmDescRef = useRef();
    const [alarmDesc, setAlarmDesc] = useState();
    const [listData, setListData] = useState([]);

    const columns = [
        {
            title: "告警描述",
            dataIndex: "desc",
        },
        {
            title: "告警等级",
            dataIndex: "prior",
        },
        {
            title: "设备名称",
            dataIndex: "deviceName",
        },
        {
            title: "电站名称",
            dataIndex: "plantName",
        },
        {
            title: "开始时间",
            dataIndex: "begin",
        },
        // {
        //     title: "结束时间",
        //     dataIndex: "end",
        // },
    ];

    const getList = async () => {
        setLoading(true);
        const { current, pageSize } = paginationRef.current;
        const signalName = alarmLevelRef.current;
        const deviceNameLike = deviceNameRef.current;
        const plantId = plantNameRef.current;
        const descLike = alarmDescRef.current;
        const [beginStartDate, beginEndDate] = startTimeRef.current || [];
        const res = await getAlarmScreenListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                prior: signalName,
                deviceNameLike,
                plantId,
                descLike,
                beginStartDate,
                beginEndDate,
            },
        });
        setLoading(false);
        if (res?.data?.status == "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setListData(recordList);
        }
    };

    const onChange = page => {
        paginationRef.current.current = page;
        setPagination({
            ...paginationRef.current,
            current: page,
        });
        getList();
    };

    const handleSearch = () => {
        paginationRef.current.current = 1;
        setPagination({
            ...paginationRef.current,
            current: 1,
        });
        getList();
    };

    const handleReset = () => {
        paginationRef.current.current = 1;
        alarmLevelRef.current = "";
        setAlarmLevel();
        deviceNameRef.current = "";
        setDeviceName();
        plantNameRef.current = "";
        setPlantName();
        startTimeRef.current = "";
        setStartTime();
        alarmDescRef.current = "";
        setAlarmDesc();
        setPagination({
            current: 1,
            total: 0,
        });
        getList();
    };

    useEffect(() => {
        if (!initData) return;
        const { priors, plans } = initData;
        setAlarmLevelOptions(
            priors?.map(item => ({
                name: toChineseNumber(item?._1) + "级",
                code: item?._1,
            }))
        );
        setPlantNameOptions(
            plans.map(item => ({
                name: item?._2,
                code: item?._1,
            }))
        );
    }, [initData]);

    useEffect(() => {
        getList();
    }, []);

    return (
        <div style={{ height: "100%", boxSizing: "border-box" }}>
            <Card
                title="告警列表"
                content={
                    <div style={{ height: "100%", padding: "16px", boxSizing: "border-box" }}>
                        <Space className={styles.searchBar}>
                            <SearchInput
                                label="告警等级"
                                value={alarmLevel}
                                type="select"
                                options={alarmLevelOptions}
                                placeholder="请选择告警等级"
                                onChange={value => {
                                    alarmLevelRef.current = value;
                                    setAlarmLevel(value);
                                }}
                            />
                            <SearchInput
                                label="设备名称"
                                value={deviceName}
                                placeholder="请输入设备名称"
                                onChange={value => {
                                    deviceNameRef.current = value;
                                    setDeviceName(value);
                                }}
                            />
                            <SearchInput
                                label="电站名称"
                                value={plantName}
                                type="select"
                                placeholder="请选择电站"
                                options={plantNameOptions}
                                onChange={value => {
                                    plantNameRef.current = value;
                                    setPlantName(value);
                                }}
                            />
                            <SearchInput
                                label="开始时间"
                                value={startTime}
                                type="rangePicker"
                                placeholder={["起始时间", "结束时间"]}
                                options={plantNameOptions}
                                onChange={value => {
                                    startTimeRef.current = value;
                                    setStartTime(value);
                                }}
                            />

                            <SearchInput
                                label="告警描述"
                                value={alarmDesc}
                                placeholder="请输入告警描述"
                                onChange={value => {
                                    alarmDescRef.current = value;
                                    setAlarmDesc(value);
                                }}
                            />
                            <Space>
                                <div className={styles.btn} onClick={handleSearch}>
                                    搜索
                                </div>
                                <div className={styles.btn} onClick={handleReset}>
                                    重置
                                </div>
                            </Space>
                        </Space>
                        <Spin spinning={loading} style={{ height: "100%" }}>
                            <div className={styles.table}>
                                <div className={styles.row}>
                                    {columns?.map(column => (
                                        <div className={styles.tableTitle}>{column?.title}</div>
                                    ))}
                                </div>
                                <div className={styles.valueWrapper}>
                                    {listData?.length ? (
                                        listData?.map((value, index) => (
                                            <div className={styles.row}>
                                                {columns?.map(column => (
                                                    <div
                                                        className={styles.value}
                                                        // style={{
                                                        //     color:
                                                        //         column.dataIndex == "prior"
                                                        //             ? getAlarmColor(
                                                        //                   value[column.dataIndex]
                                                        //               )
                                                        //             : "#fff",
                                                        // }}
                                                    >
                                                        <Tooltip title={value[column.dataIndex]}>
                                                            {column.dataIndex == "prior"
                                                                ? toChineseNumber(
                                                                      value[column.dataIndex]
                                                                  ) + "级"
                                                                : value[column.dataIndex]}
                                                        </Tooltip>
                                                    </div>
                                                ))}
                                            </div>
                                        ))
                                    ) : (
                                        <div
                                            style={{
                                                width: "100%",
                                                textAlign: "center",
                                                color: "#999",
                                                margin: "20px 0",
                                            }}
                                        >
                                            暂无数据
                                        </div>
                                    )}
                                </div>
                                <div
                                    style={{
                                        textAlign: "right",
                                        padding: "8px 0 ",
                                        boxSizing: "border-box",
                                        marginTop: 10,
                                    }}
                                >
                                    <Pagination
                                        current={pagination?.current}
                                        pageSize={pagination?.pageSize}
                                        total={pagination?.total}
                                        size="small"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </Spin>
                    </div>
                }
            />
        </div>
    );
};

export default Index;
