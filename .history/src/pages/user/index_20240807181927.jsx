import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import {
    getUserist as getUseristServer,
    getSearchInitData as getSearchInitDataServer,
} from "@/services/index";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { history, useLocation, useSelector } from "umi";
import dayjs from "dayjs";

const enumStatus = {
    0: {
        text: "未通过",
        color: "",
    },
    1: {
        text: "已通过",
        color: "#52c41a",
    },
    2: {
        text: "待审批",
        color: "#1677ff",
    },
};

const Account = () => {
    const { user } = useSelector(state => state.user);
    const statusRef = useRef();
    const [status, setStatus] = useState();
    const usernameRef = useRef();
    const [username, setUsername] = useState();
    const phoneNumberRef = useRef();
    const [phoneNumber, setPhoneNumber] = useState();
    const cpuSerialRef = useRef();
    const [cpuSerial, setCpuSerial] = useState();
    const applyTimeRef = useRef();
    const [applyTime, setApplyTime] = useState([]);
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);

    const columns = [
        {
            title: "申请状态",
            dataIndex: "applicationStatus",
            width: 150,
            render(value) {
                return (
                    <span style={{ color: enumStatus[value].color }}>{enumStatus[value].text}</span>
                );
            },
        },
        {
            title: "姓名",
            dataIndex: "姓名",
            key: "username",
            width: 150,
        },
        {
            title: "手机号",
            dataIndex: "phoneNumber",
            width: 200,
        },
        {
            title: "职务",
            dataIndex: "jobTitle",
            width: 150,
        },
        {
            title: "所在末级部门",
            dataIndex: "department",
            width: 150,
        },
        {
            title: "绑定设备序列号",
            dataIndex: "cpuSerial",
            width: 150,
        },
        {
            title: "申请时间",
            dataIndex: "createTime",
            width: 150,
        },
        {
            title: "操作",
            dataIndex: "operate",
            fixed: "right",
            width: 120,
            render: (_, { supportConfirm }) => {
                if (supportConfirm) {
                    return <a onClick={() => {}}>前往确认</a>;
                }
            },
        },
    ];

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const applicationStatus = statusRef.current;
        const username = usernameRef?.current;
        const phoneNumber = phoneNumberRef.current;
        const [applyTimeFrom, applyTimeTo] = applyTimeRef.current || [];
        const res = await getUseristServer({
            pageNum: current,
            pageSize,
            queryParam: {
                applicationStatus,
                username,
                phoneNumber,
                applyTimeFrom,
                applyTimeTo,
            },
        });
        if (res?.data?.data) {
            const { total, items } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(total),
            });
            setUserList(items);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        statusRef.current = undefined;
        setStatus();
        usernameRef.current = undefined;
        setUsername();
        statusRef.current = undefined;
        setStatus();
        getList();
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <div>
            <Space
                className="search"
                style={{
                    flexWrap: "wrap",
                    marginBottom: 8,
                }}
            >
                <SearchInput
                    label="申请状态"
                    value={status}
                    type="select"
                    options={[
                        { name: "已通过", code: 1 },
                        { name: "未通过", code: 0 },
                        { name: "待审批", code: 2 },
                    ]}
                    onChange={value => {
                        statusRef.current = value;
                        setStatus(value);
                    }}
                />

                <SearchInput
                    label="姓名"
                    value={username}
                    onChange={value => {
                        usernameRef.current = value;
                        setUsername(value);
                    }}
                />

                <SearchInput
                    label="手机号"
                    value={phoneNumber}
                    onChange={value => {
                        phoneNumberRef.current = value;
                        setPhoneNumber(value);
                    }}
                />

                <SearchInput
                    label="绑定用户序列号"
                    value={cpuSerial}
                    onChange={value => {
                        cpuSerialRef.current = value;
                        setCpuSerial(value);
                    }}
                />

                <div>
                    <span>申请时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            applyTimeRef.current = dateStr;
                            setExecuteTime(dateStr);
                        }}
                        value={
                            applyTime && applyTime.length > 0 && applyTime[0] && applyTime[1]
                                ? [dayjs(applyTime[0]), dayjs(applyTime[1])]
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
                rowKey="id"
                dataSource={userList}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
                scroll={{
                    x: "100%",
                }}
            ></Table>
        </div>
    );
};

export default Account;
