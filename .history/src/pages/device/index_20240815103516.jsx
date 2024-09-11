import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, theme, notification, message } from "antd";
import { DEFAULT_PAGINATION, COMMANDIDS } from "@/utils/constants";
import AddDevice from "./AddDevice";
import Detail from "./Detail";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
    getDeviceList as getDeviceListServer,
    getDeviceType as getDeviceTypeServer,
    getDeviceModel as getDeviceModelServer,
    deleteDevice as deleteDeviceServer,
    getDeviceInfo as getDeviceInfoServer,
} from "@/services/device";
import "./index.less";
import { connectSocket } from "@/utils/subscribe";

const deviceStatusColor = {
    RUNNING: "#67c23a",
    STANDBY: "#e6a23c",
    MALFUNCTION: "#f56c6c",
    DISCONNECTED: "#909399",
    LOADING: "#409eff",
};

const Log = () => {
    const { token } = theme.useToken();
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addDeviceOpen, setAddDeviceOpen] = useState(false);
    const [editId, setEditId] = useState();
    const [num, setNum] = useState(0);
    const plantNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const [plantNameOptions, setPlantNameOptions] = useState();
    const deviceNameRef = useRef();
    const [deviceName, setDeviceName] = useState();
    const [deviceNameOptions, setDeviceNameOptions] = useState();
    const deviceTypeRef = useRef();
    const [deviceType, setDeviceType] = useState();
    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);
    const snRef = useRef();
    const [sn, setSn] = useState();
    const deviceModelRef = useRef();
    const [deviceModel, setDeviceModel] = useState();
    const [deviceModelOptions, setDeviceModelOptions] = useState([]);
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [detailId, setDetailId] = useState();
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [connectLoading, setConnectLoading] = useState(false);
    const [tip, setTip] = useState();

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
            title: "设备编码",
            dataIndex: "",
        },
        {
            title: "采集器编号",
            dataIndex: "collectorCode",
        },
        {
            title: "设备类型",
            dataIndex: "typeZh",
        },
        {
            title: "设备状态",
            dataIndex: "deviceStatus",
            render: (_, { deviceStatus }) => (
                <div
                    style={{
                        width: "15px",
                        height: "15px",
                        background: deviceStatusColor[deviceStatus],
                        borderRadius: "50%",
                    }}
                ></div>
            ),
        },
        {
            title: "设备型号",
            dataIndex: "model",
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
            title: "操作",
            dataIndex: "operate",
            width: 150,
            render: (_, { id }) => {
                return (
                    <Space size={10}>
                        {/* <Popconfirm
                            title="操作确认"
                            description="确定删除此设备？"
                            onConfirm={() => deleteDevice(id)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{ color: "#ff4d4f" }}>删除</a>
                        </Popconfirm> */}
                        <a onClick={() => setDetailId(id)}>详情</a>
                    </Space>
                );
            },
        },
    ];

    const deleteDevice = async id => {
        const res = await deleteDeviceServer(id);
        if (res?.data?.code == 200) {
            const { current } = paginationRef?.current;
            if (current != 1 && dataSource.length == 1) {
                (paginationRef.current.current = current - 1),
                    setPagination({
                        current: current - 1,
                    });
            }
            getList();
            message.info("删除成功");
        } else {
            message.info(res?.data?.description);
        }
    };

    const getDeviceType = async () => {
        const res = await getDeviceTypeServer();
        if (res?.data?.code == 200) {
            setDeviceTypeOptions(res?.data?.data);
        }
    };

    const getDeviceModel = async () => {
        const res = await getDeviceModelServer();
        if (res?.data?.code == 200) {
            setDeviceModelOptions(
                res?.data?.data?.map(item => ({
                    displayName: item,
                    name: item,
                }))
            );
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const plantName = plantNameRef.current;
        const name = deviceNameRef?.current;
        const type = deviceTypeRef?.current;
        const sn = snRef?.current;
        const model = deviceModelRef?.current;
        setLoading(true);
        try {
            const res = await getDeviceListServer({
                pageNo: current,
                pageSize,
                plantName,
                name,
                type,
                sn,
                model,
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
        }
        setLoading(false);
    };

    const handleSearch = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        getList();
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        deviceTypeRef.current = undefined;
        setDeviceType();
        plantNameRef.current = undefined;
        setPlantName();
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
        getDeviceType();
        getDeviceModel();
        getList();
    }, []);

    useEffect(() => {
        setConnectLoading(true);
        setTip("socket连接中...");
        connectSocket(
            COMMANDIDS,
            result => {
                setConnectLoading(false);
                if (result) {
                    const { code, msg } = result;
                    code === "ok" && setNum(num + 1);
                    notification[code === "ok" ? "success" : "error"]({
                        message: "执行结果",
                        description: msg,
                    });
                }
            },
            failCallback => {
                message.info("socket连接失败，请刷新重试");
                setTip("socket连接失败，请刷新重试");
            }
        );
    }, []);

    return (
        <>
            <AddDevice open={addDeviceOpen} onClose={resFlag => onAddDeviceClose(resFlag)} />
            <Detail
                num={num}
                connectLoading={connectLoading}
                tip={tip}
                detailId={detailId}
                onClose={() => {
                    setDetailId();
                    getList();
                }}
            />
            <Space
                style={{
                    flexWrap: "wrap",
                    marginBottom: "8px",
                }}
            >
                <SearchInput
                    label="电站名称"
                    placeholder="请选择电站"
                    value={plantName}
                    type="select"
                    options={plantNameOptions}
                    onChange={value => {
                        plantNameRef.current = value;
                        setPlantName(value);
                    }}
                />
                <SearchInput
                    label="设备名称"
                    placeholder="请选择设备"
                    type="select"
                    options={deviceNameOptions}
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
                    label="设备型号"
                    placeholder="请选择设备型号"
                    type="select"
                    value={deviceModel}
                    options={deviceModelOptions}
                    onChange={value => {
                        deviceModelRef.current = value;
                        setDeviceModel(value);
                    }}
                />
                <SearchInput
                    label="SN号"
                    placeholder="请输入SN号"
                    value={sn}
                    onChange={value => {
                        snRef.current = value;
                        setSn(value);
                    }}
                />
                <Button type="primary" onClick={() => handleSearch()}>
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
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
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
                        <div className="statusExplain">
                            <div>
                                <QuestionCircleOutlined style={{ marginRight: "5px" }} />
                                设备状态说明
                            </div>
                            <div className="explainTable" style={{ background: token.color5 }}>
                                <Table
                                    bordered
                                    size="small"
                                    dataSource={[
                                        {
                                            status: "运行",
                                            explain: "设备正常运行 (含并网、离网、点检)",
                                            color: deviceStatusColor.RUNNING,
                                        },
                                        {
                                            status: "待机",
                                            explain: "待机 (含指令关机)或非异常关机",
                                            color: deviceStatusColor.STANDBY,
                                        },
                                        {
                                            status: "故障",
                                            explain: "设备存在故障或异常关机",
                                            color: deviceStatusColor.MALFUNCTION,
                                        },
                                        {
                                            status: "断连",
                                            explain: "通信断连",
                                            color: deviceStatusColor.DISCONNECTED,
                                        },
                                        {
                                            status: "载入中",
                                            explain: "设备完成识别，特征信息采集过程中",
                                            color: deviceStatusColor.LOADING,
                                        },
                                    ]}
                                    columns={[
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
                                        { title: "状态", dataIndex: "status" },
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
