import { Flex, DatePicker, Button, Divider, Space, Typography, Table } from "antd";
import { useRef, useState, useEffect } from "react";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { SearchInput } from "@/components";
import { getTaskIncomeList as getTaskIncomeListServer } from "@/services/income";

const TaskIncome = () => {
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [dataSource, setDataSource] = useState([]);

    const columns = [
        {
            title: "邀约编号",
            dataIndex: "inviteCode",
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
            dataIndex: "code",
        },
        {
            title: "响应类型",
            dataIndex: "responseTypeZh",
            width: 200
        },
        {
            title: "响应要求",
            dataIndex: "responseTimeTypeZh",
            width: 200
        },
        {
            title: "度电报价（元）",
            dataIndex: "whPrice",
        },
        {
            title: "约定响应功率(kW)",
            dataIndex: "responsePower",
            width: 150,
        },
        {
            title: "实际执行功率(kW)",
            dataIndex: "actualAveragePower",
            width: 150,
        },
        {
            title: "实际完成比例",
            dataIndex: "actualCompletionRatio",
            render: (_, { actualCompletionRatio }) => actualCompletionRatio + "%",
            width: 150,
        },
        {
            title: "预计收益（元)",
            dataIndex: "projectedProfit",
        },
        {
            title: "约定开始时间",
            dataIndex: "appointedTimeFrom",
            width: 150,
        },
        {
            title: "收益计费时间",
            dataIndex: "profitBillingTime",
        },
        {
            title: "任务响应公司",
            dataIndex: "companyName",
            width: 200
        },
        {
            title: "打款状态",
            dataIndex: "paymentStatusZh",
            width: 200,
        },
        {
            title: "打款备注",
            dataIndex: "remark",
        },
    ];

    const getTaskIncomeList = async () => {
        const { current, pageSize } = paginationRef.current;
        const res = await getTaskIncomeListServer({
            pageNum: current,
            pageSize,
            queryCmd: {},
        });
        if (res?.data?.status == "SUCCESS") {
            const { _2 } = res?.data?.data;
            const { totalRecord, recordList } = _2;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setDataSource(recordList);
        }
        setTimeout(() => setLoading(false), 1000);
    };

    useEffect(() => {
        getTaskIncomeList();
    }, []);

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
                <SearchInput label="邀约编号" placeholder="请输入邀约编号（数字）" />
                <SearchInput label="任务编号" placeholder="请输入任务编号（数字）" />
                <SearchInput label="任务响应公司" placeholder="请输入响应功率（数字）" />
                <SearchInput
                    label="响应类型"
                    type="select"
                    value={0}
                    options={[
                        { code: 0, name: "全部" },
                        { code: 1, name: "削峰" },
                        { code: 2, name: "填谷" },
                    ]}
                />
                <SearchInput
                    label="响应要求"
                    type="select"
                    value={0}
                    options={[
                        { code: 0, name: "全部" },
                        { code: 1, name: "日前响应" },
                        { code: 2, name: "日中响应" },
                    ]}
                />
                <SearchInput
                    label="打款状态"
                    type="select"
                    value={0}
                    options={[
                        { code: 0, name: "全部" },
                        { code: 1, name: "未打款" },
                        { code: 2, name: "打款成功" },
                        { code: 3, name: "打款失败" },
                    ]}
                />
                <Button type="primary">搜索</Button>
                <Button>重置</Button>
            </Flex>
            <Divider />
            <Flex justify="space-between">
                <Space direction="vertical">
                    <Space size={30}>
                        <Typography.Title level={5} style={{ margin: 0 }}>
                            约定响应功率汇总（KW）：12000
                        </Typography.Title>
                    </Space>
                    <Space size={30}>
                        <Typography.Title level={5} style={{ margin: 0 }}>
                            实际执行功率汇总（KW）：11921
                        </Typography.Title>
                    </Space>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                        预计收益（元）： 62630.16
                    </Typography.Title>
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
                scroll={{
                    x: 1500,
                }}
                style={{
                    marginTop: 20,
                }}
            />
        </div>
    );
};

export default TaskIncome;
