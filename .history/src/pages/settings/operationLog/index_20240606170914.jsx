import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Tooltip, DatePicker } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import dayjs from "dayjs";
import styles from "./index.less";
import {getOperateLog as getOperateLogServer } from "@/services/log";

const Log = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const accountRef = useRef();
    const [account, setAccount] = useState();
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
            title: "用户名",
            dataIndex: "operationPage",
        },
        {
            title: "IP",
            dataIndex: "operatorName",
        },
        {
            title: "操作对象",
            dataIndex: "operationKey",
        },
        {
            title: "操作内容",
            dataIndex: "operationCmd",
            key: "operationCmd",
            width: 400,
            render(value) {
                return (
                    <Tooltip title={value}>
                        <div
                            style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width: 400,
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                );
            },
        },
        {
            title: "操作时间",
            dataIndex: "operationTime",
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
        accountRef.current = undefined;
        setAccount();
        executeTimeRef.current = undefined;
        setExecuteTime([]);
        getList();
    };

    useEffect(() => {
        //  getList();
    }, []);

    return (
        <>
            <Space
                style={{
                    flexWrap: "wrap",
                    marginBottom: "8px",
                }}
            >
                <SearchInput
                    label="操作账号"
                    placeholder="请输入账号名称关键词或编号"
                    inputWidth={250}
                    value={account}
                    onChange={value => {
                        accountRef.current = value;
                        setAccount(value);
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
            />
        </>
    );
};

export default Log;
