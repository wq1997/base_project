import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Tooltip} from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { 
    getRoleList as getRoleListServe,
} from "@/services"

const Notification = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    const columns = [
        {
            title: "序号",
            dataIndex: "name",
        },
        {
            title: "处理状态",
            dataIndex: "code",
        },
        {
            title: "发布时间",
            dataIndex: "1",
        },
        {
            title: '通知详情',
            dataIndex: 'remark',
            key: 'remark',
            ellipsis: true,
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
            title: "操作",
            dataIndex: "operate",
            render: (text,record) => {
                return (
                    <Button 
                        type="link"
                        onClick={()=>{
                        }}
                    >
                        去处理
                    </Button>
                )
            },
        },
    ];

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        setLoading(true);
        try{
            const res = await getRoleListServe({
                pageNum: current,
                pageSize,
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

    useEffect(()=>{
        getList();
    }, [])

    return (
        <div>
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
            />
        </div>
    )
}

export default Notification;