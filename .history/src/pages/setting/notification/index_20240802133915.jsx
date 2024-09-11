import React, { useState, useEffect, useRef } from "react";
import { CardPage } from "@/components";
import { Button, Space, Table, Tooltip, Card } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { recordPage } from "@/utils/utils";
import {
    getNotificationList as getNotificationListServe,
    changeNotificationStatus as changeNotificationStatusServe,
} from "@/services";
import { history } from "umi";

const Notification = () => {
    recordPage("menu:notification");
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    const columns = [
        {
            title: "序号",
            dataIndex: "name",
            render(text, record, index) {
                return (pagination.current - 1) * pagination.pageSize + index + 1;
            },
        },
        {
            title: "处理状态",
            dataIndex: "statusZh",
        },
        {
            title: "通知类型",
            dataIndex: "typeZh",
        },
        {
            title: "通知详情",
            dataIndex: "detail",
            key: "detail",
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
            title: "发布时间",
            dataIndex: "createdTime",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (text, record) => {
                const { status, id, businessKey, businessType } = record;
                if (status === "WAIT_PROCESSING") {
                    return (
                        <Button
                            type="link"
                            onClick={async () => {
                                const res = await changeNotificationStatusServe({ id });
                                if (res?.data?.status=='SUCCESS') {
                                    if (businessType === "INVITE_SPLIT") {
                                        history.push(`/vpp/demandResponse/invitation/invitationList`);
                                    }
                                    if (businessType === "RESOURCE_PLAN_CONFIG") {
                                        history.push(
                                            `/vpp/demandResponse/task/confirm?code=${businessKey}`
                                        );
                                    }
                                    if (businessType === "PLAN_EXECUTED") {
                                        history.push(
                                            `/vpp/demandResponse/task/confirm?code=${businessKey}`
                                        );
                                    }
                                }
                            }}
                        >
                            去处理
                        </Button>
                    );
                }
                return null;
            },
        },
    ];

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        setLoading(true);
        try {
            const res = await getNotificationListServe({
                pageNum: current,
                pageSize,
                queryCmd: {},
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

    useEffect(() => {
        getList();
    }, []);

    return (
        <CardPage>
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
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
            />
        </CardPage>
    );
};

export default Notification;
