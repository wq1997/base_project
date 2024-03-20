import {
    Flex,
    DatePicker,
    Button,
    Divider,
    Space,
    theme,
    Table,
    Modal,
    Form,
    Radio,
    Input,
    message,
} from "antd";
import { useRef, useState, useEffect } from "react";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE } from "@/utils/constants";
import { SearchInput, StaticsCard } from "@/components";
import { getInvitationIncomeList as getInvitationIncomeListServer, confirmPayment as confirmPaymentServe } from "@/services/income";
import dayjs from "dayjs";
import { history } from "umi";

const InvitationIncome = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const appointedTimeRef = useRef();
    const chargingTimeRef = useRef();
    const codeRef = useRef();
    const responseTypeRef = useRef();
    const responseTimeTypeRef = useRef();
    const paymentStatusRef = useRef();
    const executeStatusRef = useRef();
    const [appointedTime, setAppointedTime] = useState();
    const [chargingTime, setChargingTime] = useState();
    const [code, setCode] = useState();
    const [responseType, setResponseType] = useState();
    const [responseTimeType, setResponseTimeType] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const [executeStatus, setExecuteStatus] = useState();

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
            label: '邀约总收益(元)',
            data: 0,
            color: token.color18
        },
        {
            icon: 'icon-pingtaizongshouyi',
            label: '平台总收益(元)',
            data: 0,
            color: token.color19
        },
        {
            icon: 'icon-renwuzongshouyi',
            label: '任务总收益(元)',
            data: 0,
            color: token.color13
        },
    ])

    const columns = [
        {
            title: "邀约编号",
            dataIndex: "code",
            render(_,recode){
                return <a onClick={_=>history.push(`/vpp/demandResponse/income/task?inviteCode=${recode.code}`)}>{recode.code}</a>
            }
        },
        {
            title: "任务编号",
            dataIndex: "code",
        },
        {
            title: "响应类型",
            dataIndex: "responseTypeZh",
            width: 100,
        },
        {
            title: "响应要求",
            dataIndex: "responseTimeTypeZh",
            width: 100,
        },
        {
            title: "邀约是否执行成功",
            dataIndex: "executeResult",
            width: 200,
            render(_,record){
                return record?.executeResult?.success?"是":"否"
            }
        },
        {
            title: "度电报价(元)",
            dataIndex: "whPrice",
            width: 100,
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
            title: "邀约达成比例",
            dataIndex: "actualResponsePercent",
            render: (_, { actualResponsePercent }) => actualResponsePercent? actualResponsePercent + "%" : '',
            width: 150,
        },
        {
            title: "邀约预计总收益(元)",
            dataIndex: "projectedTotalProfit",
            width: 200,
        },
        {
            title: "平台分润(元)",
            dataIndex: "projectedPlatformProfit",
            width: 200,
        },
        {
            title: "任务收益(元)",
            dataIndex: "projectedTaskProfit",
            width: 150,
        },
        {
            title: "约定开始时间",
            dataIndex: "appointedTimeFrom",
            width: 200,
        },
        {
            title: "收益计费时间",
            dataIndex: "profitBillingTimeFrom",
            width: 200,
        },
        {
            title: "系统备注",
            dataIndex: "executeStatusZh",
            width: 200,
        },
        {
            title: "打款状态",
            dataIndex: "paymentStatusZh",
            width: 100,
        },
        {
            title: "打款备注",
            dataIndex: "remark",
            width: 200,
        },
    ];

    const getInvitationIncomeList = async () => {
        setLoading(true);
        const { current, pageSize } = paginationRef.current;
        const [ appointedTimeRangeStart, appointedTimeRangeEnd ] = appointedTimeRef.current || [];
        const [ profitBillingTimeFrom, profitBillingTimeTo ] = chargingTimeRef.current || [];
        const code = codeRef.current;
        const responseType = responseTypeRef.current;
        const responseTimeType = responseTimeTypeRef.current;
        const paymentStatus = paymentStatusRef.current;
        const executeStatus = executeStatusRef.current;
        const res = await getInvitationIncomeListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                appointedTimeRangeStart,
                appointedTimeRangeEnd,
                profitBillingTimeFrom,
                profitBillingTimeTo,
                code,
                responseType,
                responseTimeType,
                paymentStatus,
                executeStatus,
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
            setSelectedRowKeys([]);

            staticsData[0].data = _1.totalResponsePower;
            staticsData[1].data = _1.totalActualAveragePower;
            staticsData[2].data = _1.totalInviteProfit;
            staticsData[3].data = _1.platformProfit;
            staticsData[4].data = _1.totalTaskProfit;
            setStaticsData(staticsData)
        }
        setLoading(false);
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        appointedTimeRef.current = undefined;
        setAppointedTime([]);
        chargingTimeRef.current = undefined;
        setChargingTime([]);
        codeRef.current = undefined;
        setCode(undefined);
        responseTypeRef.current = undefined;
        setResponseType(undefined);
        responseTimeTypeRef.current = undefined;
        setResponseTimeType(undefined);
        paymentStatusRef.current = undefined;
        setPaymentStatus(undefined);
        executeStatusRef.current = undefined;
        setExecuteStatus(undefined);
        getInvitationIncomeList();
    }

    useEffect(() => {
        getInvitationIncomeList();
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
                     value={code}
                     onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setCode(value);
                    }}
                />
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
                    label="邀约是否执行成功"
                    type="select"
                    value={executeStatus}
                    options={[
                        { code: 'EXECUTED_SUCCESS', name: "是" },
                        { code: 'EXECUTED_FAIL', name: "否" },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        executeStatusRef.current = value;
                        setExecuteStatus(value);
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
                <Button type="primary" onClick={getInvitationIncomeList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Flex>
            <Divider />
            <Flex justify="flex-end">
                <Space>
                    <Button type="primary" onClick={() => setOpen(true)}>
                        手工确认打款
                    </Button>
                    <Button type="primary" onClick={getInvitationIncomeList}>
                        刷新
                    </Button>
                </Space>
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
                rowSelection={{
                    selectedRowKeys,
                    onChange: (newSelectedRowKeys)=>{
                        setSelectedRowKeys(newSelectedRowKeys);
                    },
                    getCheckboxProps: record => ({
                        disabled: !record.supportPaymentConfirm,
                    }),
                }}
                scroll={{
                    x: 2000,
                }}
                style={{
                    marginTop: 20,
                }}
            />
            <Modal
                title="手工确认打款"
                open={open}
                width={700}
                onOk={async () => {
                    if(selectedRowKeys.length>0){
                        const values = await form.validateFields();
                        const res = await confirmPaymentServe({
                            ...values,
                            ids: selectedRowKeys
                        })
                        if(res){
                            setOpen(false);
                            form.resetFields();
                            getInvitationIncomeList();
                        }
                    }else{
                        message.error("请选择需要确认打款的记录！")
                    }
                }}
                onCancel={() => {
                    setOpen(false);
                    form.resetFields();
                }}
                centered
            >
                <Form form={form}>
                    <Form.Item label="打款状态" name="paymentStatus" rules={[{ ...FORM_REQUIRED_RULE }]}>
                        <Radio.Group
                            options={[
                                { label: "打款成功", value: "PAID" },
                                { label: "打款失败", value: "NON_PAYMENT" },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="备注" name="remark">
                        <Input.TextArea autoSize={{ minRows: 6, maxRows: 6 }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default InvitationIncome;
