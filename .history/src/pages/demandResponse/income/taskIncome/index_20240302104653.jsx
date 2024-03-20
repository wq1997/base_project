
import { Flex, DatePicker, Button, Divider, Space, Typography, Table } from 'antd';
import { useRef, useState } from "react";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { SearchInput } from "@/components";
import { dataSource2 } from '../invitationIncome/mock';
import {
    getTaskIncomeList as getTaskIncomeListServer
} from "@/services/task";

const TaskIncome = () => {
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [dataSource, setDataSource] = useState(dataSource2);

    const columns = [
        {
            title: "邀约编号",
            dataIndex: "code",
            render: (_, record) => {
                return record?.splitStatus == "INVALID" ? (
                    <a>{record?.code}</a>
                ) : (
                    <span>{record?.code}</span>
                );
            },
        },
        {
            title: "任务编号",
            dataIndex: "1",
        },
        {
            title: "响应类型",
            dataIndex: "2",
        },
        {
            title: "响应要求",
            dataIndex: "3",
        },
        {
            title: "度电报价（元）",
            dataIndex: "4",
        },
        {
            title: "约定响应功率（KW）",
            dataIndex: "5",
        },
        {
            title: "实际执行功率（KW）",
            dataIndex: "6",
        },
        {
            title: "任务达成比例",
            dataIndex: "7",
        },
        {
            title: "预计收益（元)",
            dataIndex: "8",
        },
        {
            title: "约定开始时间",
            dataIndex: "9",
        },
        {
            title: "收益计费时间",
            dataIndex: "10",
        },
        {
            title: "任务响应公司",
            dataIndex: "11",
        },
        {
            title: "打款状态",
            dataIndex: "12",
        },
        {
            title: "打款备注",
            dataIndex: "13",
        },
    ]

    const getTaskIncomeList = async () => {
        const { current, pageSize } = paginationRef.current;
        const [confirmationDeadlineFrom, confirmationDeadlineTo] = endTimeRef.current || [];
        const [appointedTimeRangeStart, appointedTimeRangeEnd] = executeTimeRef.current || [];
        const code = codeRef.current;
        const confirmStatus = confirmStatusRef.current;
        const splitStatus = splitStatusRef.current;
        const responseType = responseTypeRef.current;
        const res = await getTaskistServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                confirmationDeadlineFrom,
                confirmationDeadlineTo,
                appointedTimeRangeStart,
                appointedTimeRangeEnd,
                code,
                confirmStatus,
                splitStatus,
                responseType,
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
    

    return (
        <div>
            <Flex gap="middle" wrap="wrap" align="center">
                <div>
                    <span>约定执行时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                        }}
                    />
                </div>
                <div>
                    <span>收益计费时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                        }}
                    />
                </div>
                <SearchInput
                    label="邀约编号"
                    placeholder="请输入邀约编号（数字）"
                />
                <SearchInput
                    label="任务编号"
                    placeholder="请输入任务编号（数字）"
                />
                <SearchInput
                    label="任务响应公司"
                    placeholder="请输入响应功率（数字）"
                />
                <SearchInput
                    label="响应类型"
                    type="select"
                    value={0}
                    options={[
                        {code: 0, name: '全部'},
                        {code: 1, name: '削峰'},
                        {code: 2, name: '填谷'}
                    ]}
                />
                <SearchInput
                    label="响应要求"
                    type="select"
                    value={0}
                    options={[
                        {code: 0, name: '全部'},
                        {code: 1, name: '日前响应'},
                        {code: 2, name: '日中响应'}
                    ]}
                />
                <SearchInput
                    label="打款状态"
                    type="select"
                    value={0}
                    options={[
                        {code: 0, name: '全部'},
                        {code: 1, name: '未打款'},
                        {code: 2, name: '打款成功'},
                        {code: 3, name: '打款失败'}
                    ]}
                />
                <Button type="primary">搜索</Button>
                <Button>重置</Button>
            </Flex>
            <Divider />
            <Flex justify="space-between">
                <Space direction="vertical">
                    <Space size={30}>
                        <Typography.Title level={5} style={{margin: 0}}>约定响应功率汇总（KW）：1350</Typography.Title>
                    </Space>
                    <Space size={30}>
                        <Typography.Title level={5} style={{margin: 0}}>实际执行功率汇总（KW）：15800</Typography.Title>
                    </Space>
                    <Typography.Title level={5} style={{margin: 0}}>预计收益（元）：15800</Typography.Title>
                </Space>
                <Space>
                    <Button type="primary">刷新</Button>
                </Space>
            </Flex>
            <Table 
                rowKey="id"
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                }}
                style={{
                    marginTop: 20
                }}
            />
        </div>
    )
}

export default TaskIncome;