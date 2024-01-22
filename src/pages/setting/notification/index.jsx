import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Tooltip} from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { 
    getNotificationList as getNotificationListServe,
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
            render(text, record, index){
                return (pagination.current - 1) * pagination.pageSize + index + 1;
            }
        },
        {
            title: "处理状态",
            dataIndex: "statusZh",
        },
        {
            title: "发布时间",
            dataIndex: "createdTime",
        },
        {
            title: '通知详情',
            dataIndex: 'detail',
            key: 'detail',
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
                const { status } = record;
                if(status === "WAIT_PROCESSING"){
                    return (
                        <Button 
                            type="link"
                            onClick={()=>{
                            }}
                        >
                            去处理
                        </Button>
                    )
                }
                return null;
            },
        },
    ];

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        setLoading(true);
        try{
            const res = await getNotificationListServe({
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