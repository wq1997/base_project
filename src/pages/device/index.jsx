import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Tooltip, DatePicker } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import AddDevice from "./AddDevice";
import dayjs from "dayjs";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
    getDeviceList as getDeviceListServer,
    getCommunicationStatus as getCommunicationStatusServer,
    getDeviceType as getDeviceTypeServer,
} from "@/services/device";
import { color } from "echarts";

const Log = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addDeviceOpen, setAddDeviceOpen] = useState(false);
    const [editId, setEditId] = useState();

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
    const snRef = useRef();
    const [sn, setSn] = useState();
    const deviceModelRef = useRef();
    const [deviceModel, setDeviceModel] = useState();

    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    const columns = [
        {
            title: "SN号",
            dataIndex: "snNumber",
        },
        {
            title: "设备名称",
            dataIndex: "name",
        },
        {
            title: "设备类型",
            dataIndex: "typeZh",
        },
        {
            title: "设备状态",
            dataIndex: "deviceStatusZh",
        },
        {
            title: "设备型号",
            dataIndex: "",
        },
        {
            title: "电站名称",
            dataIndex: "plantName",
        },
        {
            title: "质保有效期",
            dataIndex: "warrantyPeriod",
        },
        {
            title: "通信状态",
            dataIndex: "communicationStatusZh",
        },
    ];

    const getCommunicationStatus = async () => {
        const res = await getCommunicationStatusServer();
        if (res?.data?.code == 200) {
            setCommunicationStatusOptions(res?.data?.data);
        }
    };

    const getDeviceType = async () => {
        const res = await getDeviceTypeServer();
        if (res?.data?.code == 200) {
            setDeviceTypeOptions(res?.data?.data);
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;

        const plantName = plantNameRef.current;
        const communicationStatus = communicationStatusRef?.current;
        const name = deviceNameRef?.current;
        const type = deviceTypeRef?.current;
        const sn = snRef?.current;

        setLoading(true);
        try {
            const res = await getDeviceListServer({
                pageNo: current,
                pageSize,
                plantName,
                communicationStatus,
                name,
                type,
                sn,
            });
            if (res?.data?.code == 200) {
                const { total, records } = res?.data?.data;
                setPagination({
                    ...paginationRef.current,
                    total: parseInt(total),
                });
                setDataSource(records);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        deviceTypeRef.current = undefined;
        setDeviceType();
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
        getList();
    };

    const onAddDeviceClose = () => {
        setEditId();
        getList();
        setAddDeviceOpen(false);
    };

    useEffect(() => {
        getCommunicationStatus();
        getDeviceType();
        getList();
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
                    <Space
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div style={{ position: "relative" }}>
                            <QuestionCircleOutlined style={{ marginRight: "5px" }} />
                            状态说明
                            <div
                                style={{
                                    position: "absolute",
                                    zIndex: 99,
                                    background: "#fff",
                                    width: "400px",
                                    boxShadow: "0 2px 0 rgba(5, 145, 255, 0.1)",
                                }}
                            >
                                <Table
                                    bordered
                                    size="small"
                                    dataSource={[
                                        {
                                            status: "运行",
                                            explain: "设备正常运行 (含并网、离网、点检)",
                                            color: "#67c23a",
                                        },
                                        {
                                            status: "待机",
                                            explain: "待机 (含指令关机)或非异常关机",
                                            color: "#e6a23c",
                                        },
                                        {
                                            status: "故障",
                                            explain: "设备存在故障或异常关机",
                                            color: "#f56c6c",
                                        },
                                        {
                                            status: "断连",
                                            explain: "通信断连",
                                            color: "#909399",
                                        },
                                        {
                                            status: "载入中",
                                            explain: "设备完成识别，特征信息采集过程中",
                                            color: "#409eff",
                                        },
                                    ]}
                                    columns={[
                                        { title: "状态", dataIndex: "status" },
                                        {
                                            title: "颜色",
                                            dataIndex: "color",
                                            render(_, { color }) {
                                                return (
                                                    <div
                                                        style={{
                                                            width: "20px",
                                                            height: "20px",
                                                            background: color,
                                                            borderRadius: "50%",
                                                        }}
                                                    ></div>
                                                );
                                            },
                                        },
                                        { title: "说明", dataIndex: "explain" },
                                    ]}
                                    pagination={false}
                                />
                            </div>
                        </div>
                        <Button
                            type="primary"
                            onClick={() => setAddDeviceOpen(true)}
                            style={{ float: "right", marginBottom: "8px" }}
                        >
                            新增设备
                        </Button>
                    </Space>
                )}
            />
        </>
    );
};

export default Log;
