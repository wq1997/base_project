import styles from "./index.less";
import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";
import arrow from "../images/箭头.svg";

const Index = () => {
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const deviceTypeRef = useRef();
    const [deviceType, setDeviceType] = useState();
    const alarmLevelRef = useRef();
    const [alarmLevel, setAlarmLevel] = useState();
    const deviceNameRef = useRef();
    const [deviceName, setDeviceName] = useState();
    const gridPointRef = useRef();
    const [gridPoint, setGridPoint] = useState();
    const plantNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const startTimeRef = useRef();
    const [startTime, setStartTime] = useState();
    const alarmDescRef = useRef();
    const [alarmDesc, setAlarmDesc] = useState();
    const [listData, setListData] = useState([]);

    const columns = [
        {
            title: "设备类型",
            dataIndex: "type",
        },
        {
            title: "告警等级",
            dataIndex: "level",
        },
        {
            title: "告警描述",
            dataIndex: "desc",
        },
        {
            title: "设备名称",
            dataIndex: "name",
        },
        {
            title: "并网点",
            dataIndex: "grid",
        },
        {
            title: "电站名称",
            dataIndex: "plantName",
        },
        {
            title: "开始时间",
            dataIndex: "startTime",
        },
    ];

    const values = [
        {
            type: "逆变器1",
            level: "紧急",
            desc: "BMC_200063",
            name: "BMC_200063",
            grid: "BMC_200063",
            plantName: "BMC_200063",
            startTime: "BMC_200063",
        },
        {
            type: "逆变器2",
            level: "紧急",
            desc: "BMC_200063",
            name: "BMC_200063",
            grid: "BMC_200063",
            plantName: "BMC_200063",
            startTime: "BMC_200063",
        },
    ];

    const getList = async () => {
        return;
        const { current, pageSize } = paginationRef.current;
        const name = nameRef.current;
        const res = await getCompanyListServer({
            pageNum: current,
            pageSize,
            queryCmd: { keyword: name },
        });
        if (res?.data?.status == "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setCompanyList(recordList);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        nameRef.current = "";
        setDeviceType();
        alarmLevelRef.current = "";
        setAlarmLevel();
        deviceNameRef.current = "";
        setDeviceName();
        gridPointRef.current = "";
        setGridPoint();
        plantNameRef.current = "";
        setPlantName();
        startTimeRef.current = "";
        setStartTime();
        alarmDescRef.current = "";
        setAlarmDesc();
        getList();
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <div className={styles.index}>
            <div className={styles.title}>
                <img src={arrow} className={styles.arrow} />
                告警列表
            </div>
            <div className={styles.list}>
                <Space
                    style={{
                        flexWrap: "wrap",
                        marginBottom: "8px",
                    }}
                >
                    <SearchInput
                        label="设备类型"
                        value={deviceType}
                        placeholder="请选择设备类型"
                        onChange={value => {
                            deviceTypeRef.current = value;
                            setDeviceType(value);
                        }}
                    />
                    <SearchInput
                        label="告警等级"
                        value={alarmLevel}
                        placeholder="请选择告警等级"
                        onChange={value => {
                            deviceTypeRef.current = value;
                            setAlarmLevel(value);
                        }}
                    />
                    <SearchInput
                        label="设备名称"
                        value={deviceName}
                        placeholder="请选择设备名称"
                        onChange={value => {
                            deviceNameRef.current = value;
                            setDeviceName(value);
                        }}
                    />
                    <SearchInput
                        label="并网点"
                        value={gridPoint}
                        placeholder="请选择并网点"
                        onChange={value => {
                            gridPointRef.current = value;
                            setGridPoint(value);
                        }}
                    />
                    <SearchInput
                        label="电站名称"
                        value={plantName}
                        placeholder="请选择电站名称"
                        onChange={value => {
                            plantNameRef.current = value;
                            setPlantName(value);
                        }}
                    />
                    <SearchInput
                        label="开始时间"
                        value={startTime}
                        placeholder="请选择开始时间"
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
                    <Button type="primary" onClick={getList}>
                        搜索
                    </Button>
                    <Button onClick={handleReset}>重置</Button>
                </Space>
                <div className={styles.table}>
                    <div className={styles.row}>
                        {columns?.map(item => (
                            <div className={styles.tableTitle}>{item?.title}</div>
                        ))}
                    </div>
                    {columns?.map(item => {
                        <div className={styles.row}>
                            {values?.map(value => (
                                <div className={styles.value}>{value[item.dataIndex]}</div>
                            ))}
                        </div>;
                    })}
                    {/* {columns?.map(item => (
                        <div className={styles.column}>
                            <div className={styles.tableTitle}>{item?.title}</div>
                            {values?.map(value => (
                                <div className={styles.value}>{value[item.dataIndex]}</div>
                            ))}
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
};

export default Index;
