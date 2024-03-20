import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, InputNumber, Modal, DatePicker, Drawer } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import {
    getInviteList as getInviteListServer,
    getSearchInitData as getSearchInitDataServer,
    sureInvite as sureInviteServer,
    deleteInvite as deleteInviteServer,
    invalidInvite as invalidInviteServer,
} from "@/services/invitation";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";

let invalidReason = undefined;

const Account = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const [canSure, setCanSure] = useState(true);
    const [canDelete, setCanDelete] = useState(true);
    const [canInvalid, setCanInvalid] = useState(true);
    const releaseTimeRef = useRef();
    const executeTimeRef = useRef();
    const codeRef = useRef();
    const confirmStatusRef = useRef();
    const splitStatusRef = useRef();
    const responsePowerRef = useRef();
    const responseTypeRef = useRef();
    const responseTimeTypeRef = useRef();
    const [editId, setEditId] = useState();
    const [code, setCode] = useState();
    const [releaseTime, setReleaseTime] = useState();
    const [executeTime, setExecuteTime] = useState();
    const [confirmStatus, setConfirmStatus] = useState();
    const [confirmStatusList, setConfirmStatusList] = useState();
    const [splitStatus, setSplitStatus] = useState();
    const [splitStatusList, setSplitStatusList] = useState();
    const [responsePower, setResponsePower] = useState();
    const [responseType, setResponseType] = useState();
    const [responseTypeList, setResponseTypeList] = useState();
    const [responseTimeType, setResponseTimeType] = useState();
    const [responseTimeTypeList, setResponseTimeTypeList] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [invitationSplitId, setInvitationSplitId] = useState();
    const [detailId, setDetailId] = useState(false);

    const columns = [
        {
            title: "交易开始时间",
            dataIndex: "name",
            render: () => {
                return (
                    <DatePicker
                        showTime={{
                            format: "HH:mm",
                        }}
                        format="YYYY-MM-DD HH:mm"
                        minuteStep={15}
                    />
                );
            },
        },
        {
            title: "交易结束时间",
            dataIndex: "code",
        },
        {
            title: "申报电量(MWH)",
            dataIndex: "type",
            render: () => {
                return <InputNumber placeholder="请输入申报电量" />;
            },
        },
        {
            title: "参考电价（元）",
            dataIndex: "method",
        },
        {
            title: "申报电价（元）",
            dataIndex: "limit",
            render: () => {
                return <InputNumber  placeholder="请输入申报电价" />;
            },
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: _ => {
                return <a onClick={() => setDetailId(id)}>删除</a>;
            },
        },
    ];

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        const hasNoSure = Boolean(newSelectedRows?.some(item => item.supportConfirm == false));
        setCanSure(!hasNoSure);
        const hasNoDelete = Boolean(newSelectedRows?.some(item => item.supportDelete == false));
        setCanDelete(!hasNoDelete);
        const hasNoInvalid = Boolean(newSelectedRows?.some(item => item.supportInvalid == false));
        setCanInvalid(!hasNoInvalid);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { confirmStatuses, splitStatuses, responseTypes, responseTimeTypes } =
                res?.data?.data;
            setConfirmStatusList(confirmStatuses);
            setSplitStatusList(splitStatuses);
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    const getInviteList = async () => {
        const { current, pageSize } = paginationRef.current;
        const code = codeRef.current;
        const confirmStatus = confirmStatusRef.current;
        const splitStatus = splitStatusRef.current;
        const responsePower = +responsePowerRef.current;
        const responseType = responseTypeRef.current;
        const res = await getInviteListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                code,
                confirmStatus,
                splitStatus,
                responsePower,
                responseType,
            },
        });
        if (res?.data?.status == "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;

        codeRef.current = undefined;
        setCode();
        confirmStatusRef.current = undefined;
        setConfirmStatus();
        splitStatusRef.current = undefined;
        setSplitStatus();
        responsePowerRef.current = undefined;
        setResponsePower();
        responseTypeRef.current = undefined;
        setResponseType();
        responseTimeTypeRef.current = undefined;
        setResponseTimeType();
        getInviteList();
    };

    useEffect(() => {
        getSearchInitData();
        setLoading(true);
        setTimeout(() => {
            setUserList([
                {
                    name: "模拟交易-20240304-1",
                    code: "ZXSR19872",
                    type: "日前市场",
                    method: "231.5",
                    limit: "查看交易单元限额",
                    start: "2024-03-04 00：00:00",
                    end: "2024-03-04 20：00:00",
                    email: "查看附件",
                },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <Drawer title="交易申报" width={"88%"} onClose={() => setOpen(false)} open={open}>
            <Space className="search">
                <SearchInput
                    label="选择交易角色"
                    value={1}
                    type="select"
                    options={[{ name: "购方", code: 1 }]}
                />

                <SearchInput label="交易名称" value={code} />
                <Button type="primary" onClick={getInviteList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                loading={loading}
                rowKey="id"
                dataSource={userList}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getInviteList();
                }}
                title={() => (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Space className="table-title">
                            <span>维护价量信息</span>
                            <Button type="primary">批量导入报价表</Button>
                        </Space>
                        <Button type="primary">新增价量信息</Button>
                    </div>
                )}
            ></Table>

            <div style={{ marginTop: "30px", textAlign: "center" }}>
                <Button type="primary">确认申报</Button>
            </div>
        </Drawer>
    );
};

export default Account;
