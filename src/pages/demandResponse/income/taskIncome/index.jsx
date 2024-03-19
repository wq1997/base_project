import { Flex, DatePicker, Button, Divider, theme, Typography, Table } from "antd";
import { useRef, useState, useEffect } from "react";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { SearchInput, StaticsCard } from "@/components";
import { getTaskIncomeList as getTaskIncomeListServer } from "@/services/income";
import dayjs from "dayjs";
import { useLocation, history } from "umi";

const TaskIncome = () => {
    const location = useLocation();
    const initInviteCode = location?.search.split("=")[1];
    const { token } = theme.useToken();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [dataSource, setDataSource] = useState([]);

    const appointedTimeRef = useRef();
    const chargingTimeRef = useRef();
    const inviteCodeRef = useRef(initInviteCode);
    const codeRef = useRef();
    const responseTypeRef = useRef();
    const responseTimeTypeRef = useRef();
    const paymentStatusRef = useRef();
    const [appointedTime, setAppointedTime] = useState();
    const [chargingTime, setChargingTime] = useState();
    const [inviteCode, setInviteCode] = useState(initInviteCode);
    const [code, setCode] = useState();
    const [responseType, setResponseType] = useState();
    const [responseTimeType, setResponseTimeType] = useState();
    const [paymentStatus, setPaymentStatus] = useState();

    const [staticsData, setStaticsData] = useState([
        {
            icon: 'icon-yuedingxiangyinggongshuaihuizong',
            label: '约定响应功率汇总(kW)',
            data: 0,
            color: token.color12
        },
        {
            icon: 'icon-shijizhihanggongshuaihuizong1',
            label: '实际执行功率汇总(kW)',
            data: 0,
            color: token.color7
        },
        {
            icon: 'icon-yaoyuezongshouyi',
            label: '预计收益(元)',
            data: 0,
            color: token.color18
        },
    ])

    const columns = [
        {
            title: "邀约编号",
            dataIndex: "inviteCode"
        },
        {
            title: "任务编号",
            dataIndex: "code",
        },
        {
            title: "响应类型",
            dataIndex: "responseTypeZh",
            width: 200,
        },
        {
            title: "响应要求",
            dataIndex: "responseTimeTypeZh",
            width: 200,
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
            width: 200,
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
        setLoading(true);
        setDataSource([]);
        const { current, pageSize } = paginationRef.current;
        const [ appointedTimeRangeStart, appointedTimeRangeEnd ] = appointedTimeRef.current || [];
        const [ profitBillingTimeFrom, profitBillingTimeTo ] = chargingTimeRef.current || [];
        const inviteCode = inviteCodeRef.current;
        const code = codeRef.current;
        const responseType = responseTypeRef.current;
        const responseTimeType = responseTimeTypeRef.current;
        const paymentStatus = paymentStatusRef.current;

        const res = await getTaskIncomeListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                appointedTimeRangeStart,
                appointedTimeRangeEnd,
                profitBillingTimeFrom,
                profitBillingTimeTo,
                inviteCode,
                code,
                responseType,
                responseTimeType,
                paymentStatus
            },
        });
        if (res?.data?.status == "SUCCESS") {
            const { _1, _2 } = res?.data?.data;
            const { totalRecord, recordList } = _2;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setDataSource(recordList);

            staticsData[0].data = _1.totalResponsePower;
            staticsData[1].data = _1.totalActualAveragePower;
            staticsData[2].data = _1.totalProjectedProfit;
            setStaticsData(staticsData)
        }
        setLoading(false);
    };

    const handleReset = async () => {
        history.push('/vpp/demandResponse/income/task');
        paginationRef.current = DEFAULT_PAGINATION;
        appointedTimeRef.current = undefined;
        setAppointedTime([]);
        chargingTimeRef.current = undefined;
        setChargingTime([]);
        inviteCodeRef.current = undefined;
        setInviteCode(undefined);
        codeRef.current = undefined;
        setCode(undefined);
        responseTypeRef.current = undefined;
        setResponseType(undefined);
        responseTimeTypeRef.current = undefined;
        setResponseTimeType(undefined);
        paymentStatusRef.current = undefined;
        setPaymentStatus(undefined);
        getTaskIncomeList();
    }

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
                            appointedTimeRef.current = dateStr;
                            setAppointedTime(dateStr)
                        }}
                        value={
                            appointedTime && appointedTime.length > 0
                                ? [dayjs(appointedTime[0]), dayjs(appointedTime[1])]
                                : []
                        }
                    />
                </div>
                <div>
                    <span>收益计费时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            chargingTimeRef.current = dateStr;
                            setChargingTime(dateStr);
                        }}
                        value={
                            chargingTime && chargingTime.length > 0
                                ? [dayjs(chargingTime[0]), dayjs(chargingTime[1])]
                                : []
                        }
                    />
                </div>
                <SearchInput 
                    label="邀约编号" 
                    placeholder="请输入邀约编号" 
                    value={inviteCode}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        inviteCodeRef.current = value;
                        setInviteCode(value);   
                    }}
                />
                <SearchInput 
                    label="任务编号" 
                    placeholder="请输入任务编号" 
                    value={code}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />
                <SearchInput label="任务响应公司" placeholder="请输入任务响应公司" />
                <SearchInput
                    label="响应类型"
                    type="select"
                    value={responseType}
                    options={[
                        { code: 'HEIGHT_PEAK_CUT', name: "削峰" },
                        { code: 'LOW_PEAK_CUT', name: "填谷" },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTypeRef.current = value;
                        setResponseType(value);
                    }}
                />
                <SearchInput
                    label="响应要求"
                    type="select"
                    value={responseTimeType}
                    options={[
                        { code: 'DAY_BEFORE', name: "日前响应" },
                        { code: 'DAY_IN', name: "日中响应" },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        responseTimeTypeRef.current = value;
                        setResponseTimeType(value);
                    }}
                />
                <SearchInput
                    label="打款状态"
                    type="select"
                    value={paymentStatus}
                    options={[
                        { code: "WAIT_PAYMENT", name: "未打款" },
                        { code: "PAID", name: "打款成功" },
                        { code: "NON_PAYMENT", name: "打款失败" },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        paymentStatusRef.current = value;
                        setPaymentStatus(value);
                    }}
                />
                <Button type="primary" onClick={getTaskIncomeList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Flex>
            <Divider />
            <Flex justify="end">
                <Button type="primary" onClick={getTaskIncomeList}>
                    刷新
                </Button>
            </Flex>
            <div
                style={{
                    display: 'flex',
                    gap: 8,
                    height: 140,
                    marginTop: 20
                }}
            >
                {
                    staticsData?.map(item => {
                        return (
                            <StaticsCard 
                                icon={item.icon}
                                color={item.color}
                                label={item.label}
                                value={item.data}
                            />
                        )
                    })
                }
            </div>
            <Table
                rowKey="id"
                loading={loading}
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
