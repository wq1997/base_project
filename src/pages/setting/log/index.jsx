import React, { useState, useEffect, useRef } from "react";
import { SearchInput, CardPage } from "@/components";
import { Button, Space, Table, Tooltip } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { recordPage } from "@/utils/utils";
import { 
    getOperationLog as getOperationLogServe
} from "@/services"
import styles from "./index.less";

const Log = () => {
    recordPage('menu:sys_logs');
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    const accountRef = useRef();
    const [account, setAccount] = useState();

    const pageRef = useRef();
    const [pageName, setPageName] = useState();

    const operationRef = useRef();
    const [operationName, setOperationName] = useState();

    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    const columns = [
        {
            title: "操作账号",
            dataIndex: "operatorAccount",
        },
        {
            title: "操作页面",
            dataIndex: "operationPage",
        },
        {
            title: "操作等级",
            dataIndex: "level",
        },
        {
            title: "操作名称",
            dataIndex: "operationName",
        },
        {
            title: "操作KEY",
            dataIndex: "operationKey",
        },
        {
            title: '下发指令',
            dataIndex: 'operationCmd',
            key: 'operationCmd',
            width: 400,
            render(value){
                return (
                    <Tooltip title={value}>
                        <div 
                            style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                width: 400,
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                )
            }
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
        try{
            const res = await getOperationLogServe({
                pageNum: current,
                pageSize,
                queryCmd: { 
                    operatorAccount: account,
                    operationPage: pageName,
                    operationName: operationName
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
        }finally{
            setLoading(false);
        }
    }

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        accountRef.current="";
        pageRef.current="";
        operationRef.current="";
        setAccount("");
        setPageName("");
        setOperationName("");
        getList();
    };

    useEffect(()=>{
        getList();
    }, [])

    return (
        <CardPage>
            <Space className={styles.search}>
                <SearchInput 
                    label="操作账号" 
                    placeholder="请输入账号名称关键词或编号" 
                    inputWidth={250} 
                    value={account} 
                    onChange={value => {
                        accountRef.current=value;
                        setAccount(value)
                    }} 
                />
                <SearchInput 
                    label="操作页面" 
                    placeholder="请输入页面名称或关键词" 
                    inputWidth={250} 
                    value={pageName} 
                    onChange={value => {
                        pageRef.current=value;
                        setPageName(value)
                    }} 
                />
                <SearchInput 
                    label="操作名称" 
                    placeholder="请输入操作名称" 
                    inputWidth={250} 
                    value={operationName} 
                    onChange={value => {
                        operationRef.current=value;
                        setOperationName(value)
                    }} 
                />
                <Button type="primary" onClick={getList}>搜索</Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                loading={loading}
                dataSource={dataSource?.map(data=> {
                    return {
                        ...data,
                        key: data?.id
                    }
                })}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
            />
        </CardPage>
    )
}

export default Log;