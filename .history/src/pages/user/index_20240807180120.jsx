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
            dataIndex: "code",
            width: 150,
        },
        {
            title: "姓名",
            dataIndex: "姓名",
            key: "statusZh",
            width: 150,
        },
        {
            title: "手机号",
            dataIndex: "confirmationDeadline",
            width: 200,
        },
        {
            title: "职务",
            dataIndex: "responseTypeZh",
            width: 150,
        },
        {
            title: "所在末级部门",
            dataIndex: "responseTimeTypeZh",
            width: 150,
        },
        {
            title: "绑定设备序列号",
            dataIndex: "whPrice",
            width: 150,
        },
        {
            title: "是否具备用户管理权限",
            dataIndex: "responsePower",
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
        const username = usernameRef;
        const phoneNumber = phoneNumberRef.current;
        const [applyTimeFrom, applyTimeTo] = applyTimeRef.current || [];
        const res = await getUseristServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                applicationStatus,
                username,
                phoneNumber,
                applyTimeFrom,
                applyTimeTo,
            },
        });
        if (res?.data?.status == "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setUserList(recordList);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        endTimeRef.current = undefined;
        setEndTime([]);
        executeTimeRef.current = undefined;
        setExecuteTime([]);
        codeRef.current = undefined;
        setCode();
        statusRef.current = undefined;
        setStatus();
        responseTypeRef.current = undefined;
        setResponseType();
        responseTimeTypeRef.current = undefined;
        setResponseTimeType();
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
                        paginationRef.current = DEFAULT_PAGINATION;
                        cpuSerialRef.current = value;
                        setCpuSerial(value);
                    }}
                />

                <div>
                    <span>申请时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
               
                            executeTimeRef.current = dateStr;
                            setExecuteTime(dateStr);
                        }}
                        value={
                            executeTime &&
                            executeTime.length > 0 &&
                            executeTime[0] &&
                            executeTime[1]
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
