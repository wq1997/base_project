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
    const roleRef = useRef();
    const [role, setRole] = useState();
    const [roleOptions, setRoleOptions] = useState();
    const usernameRef = useRef();
    const [username, setUsername] = useState();
    const [usernameOptions, setUsernameOptions] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [detailId, setDetailId] = useState();
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [connectLoading, setConnectLoading] = useState(false);
    const [tip, setTip] = useState();

    const columns = [
        {
            title: "用户名",
            dataIndex: "",
        },
        {
            title: "角色",
            dataIndex: "",
        },
        {
            title: "子用户",
            dataIndex: "",
        },
        {
            title: "手机号",
            dataIndex: "",
        },
        {
            title: "电子",
            dataIndex: "",
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
            title: "关联电站",
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

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const role = roleRef.current;
        const username = usernameRef?.current;
        setLoading(true);
        try {
            const res = await getDeviceListServer({
                pageNo: current,
                pageSize,
                role,
                username,
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
                    label="角色名称"
                    placeholder="请选择角色"
                    value={role}
                    type="select"
                    options={roleOptions}
                    onChange={value => {
                        roleRef.current = value;
                        setRole(value);
                    }}
                />
                <SearchInput
                    label="用户名"
                    placeholder="请输入用户名"
                    value={username}
                    onChange={value => {
                        usernameRef.current = value;
                        setUsername(value);
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
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={() => setAddDeviceOpen(true)}
                            style={{ float: "right", marginBottom: "8px" }}
                        >
                            新增
                        </Button>
                    </Space>
                )}
            />
        </>
    );
};

export default Log;
