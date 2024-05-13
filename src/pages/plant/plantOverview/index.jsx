import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Tooltip, DatePicker } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import AddDevice from "./AddDevice";
import dayjs from "dayjs";
import styles from "./index.less";

const Log = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addDeviceOpen, setAddDeviceOpen] = useState(false);
    const [editId, setEditId] = useState();
    const companyRef = useRef();
    const [company, setCompany] = useState();
    const plantTypeRef = useRef();
    const [plantType, setPlantType] = useState();
    const [plantTypeOptions, setPlantTypeOptions] = useState([]);
    const plantNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const communicationStatusRef = useRef();
    const [communicationStatus, setCommunicationStatus] = useState();
    const [communicationStatusOptions, setCommunicationStatusOptions] = useState([]);
    const deviceTypeRef = useRef();
    const [deviceType, setDeviceType] = useState();
    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);
    const deviceNameRef = useRef();
    const [deviceName, setDeviceName] = useState();
    const [deviceNameOptions, setDeviceNameOptions] = useState([]);
    const snRef = useRef();
    const [sn, setSn] = useState();
    const deviceModelRef = useRef();
    const [deviceModel, setDeviceModel] = useState();
    const executeTimeRef = useRef();
    const [executeTime, setExecuteTime] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    const columns = [
        {
            title: "序号",
            dataIndex: "operatorAccount",
        },
        {
            title: "SN号",
            dataIndex: "",
        },
        {
            title: "设备名称",
            dataIndex: "operationPage",
        },
        {
            title: "设备类型",
            dataIndex: "operatorName",
        },
        {
            title: "设备状态",
            dataIndex: "",
        },
        {
            title: "设备型号",
            dataIndex: "",
        },
        {
            title: "电站名称",
            dataIndex: "",
        },
        {
            title: "质保有效期",
            dataIndex: "",
        },
        {
            title: "通信状态",
            dataIndex: "",
        },
    ];

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const account = accountRef.current;
        const pageName = pageRef.current;
        const operationName = operationRef.current;
        setLoading(true);
        try {
            const res = await getOperationLogServe({
                pageNum: current,
                pageSize,
                queryCmd: {
                    operatorAccount: account,
                    operationPage: pageName,
                    operatorName: operationName,
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
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        companyRef.current = undefined;
        setCompany();
        deviceTypeRef.current = undefined;
        setDeviceType();
        plantTypeRef.current = undefined;
        setPlantType();
        plantNameRef.current = undefined;
        setPlantName();
        communicationStatusRef.current = undefined;
        setCommunicationStatus();
        deviceNameRef.current = undefined;
        setDeviceName();
        snRef.current = undefined;
        setSn();
        deviceModelRef.current = undefined;
        setDeviceModel();
        executeTimeRef.current = undefined;
        setExecuteTime([]);
        getList();
    };

    const onAddDeviceClose = resFlag => {
        setEditId();
        resFlag && getCompanyList();
        setAddDeviceOpen(false);
    };

    useEffect(() => {
        //  getList();
    }, []);

    return (
        <>
            <AddDevice open={addDeviceOpen} onClose={resFlag => onAddDeviceClose(resFlag)} />
            <Space
                style={{
                    flexWrap: "wrap",
                    marginBottom: "8px",
                }}
            >
                <SearchInput
                    label="所属公司"
                    placeholder="请输入所属公司"
                    inputWidth={250}
                    value={company}
                    onChange={value => {
                        companyRef.current = value;
                        setCompany(value);
                    }}
                />
                <SearchInput
                    label="电站类型"
                    value={plantType}
                    type="select"
                    options={plantTypeOptions}
                    onChange={value => {
                        plantTypeRef.current = value;
                        setPlantType(value);
                    }}
                />
                <SearchInput
                    label="电站名称"
                    placeholder="请输入电站名称"
                    inputWidth={250}
                    value={plantName}
                    onChange={value => {
                        plantNameRef.current = value;
                        setPlantName(value);
                    }}
                />
                <SearchInput
                    label="通信状态"
                    value={communicationStatus}
                    type="select"
                    options={communicationStatusOptions}
                    onChange={value => {
                        communicationStatusRef.current = value;
                        setCommunicationStatus(value);
                    }}
                />
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
                    label="设备名称"
                    placeholder="请输入设备名称"
                    inputWidth={250}
                    value={deviceName}
                    onChange={value => {
                        deviceNameRef.current = value;
                        setDeviceName(value);
                    }}
                />
                <SearchInput
                    label="SN号"
                    placeholder="请输入SN号"
                    inputWidth={250}
                    value={sn}
                    onChange={value => {
                        snRef.current = value;
                        setSn(value);
                    }}
                />
                <SearchInput
                    label="设备型号"
                    placeholder="请选择设备型号"
                    inputWidth={250}
                    value={deviceModel}
                    onChange={value => {
                        deviceModelRef.current = value;
                        setDeviceModel(value);
                    }}
                />
                <div>
                    <span>开始/结束时间：</span>
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
                dataSource={dataSource?.map(data => {
                    return {
                        ...data,
                        key: data?.id,
                    };
                })}
                columns={columns}
                pagination={pagination}
                title={() => (
                    <Button
                        type="primary"
                        onClick={() => setAddDeviceOpen(true)}
                        style={{ float: "right", marginBottom: '8px' }}
                    >
                        新增设备
                    </Button>
                )}
            />
        </>
    );
};

export default Log;
