import { Flex, DatePicker, Button, Divider, Space, Typography, Table, Modal, Form, Radio, Input } from 'antd';
import { useRef, useState } from "react";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE } from "@/utils/constants";
import { SearchInput } from "@/components";
import { dataSource1 } from './mock';
import { getTaskIncomeList as getTaskIncomeListServer } from "@/services/income";


const InvitationIncome = () => {
    const [form] = Form.useForm();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [dataSource, setDataSource] = useState(dataSource1);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [open, setOpen] = useState(false);

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
            title: "响应类型",
            dataIndex: "1",
        },
        {
            title: "响应要求",
            dataIndex: "2",
        },
        {
            title: "度电报价（元）",
            dataIndex: "3",
        },
        {
            title: "约定响应功率（KW）",
            dataIndex: "4",
        },
        {
            title: "实际执行功率（KW）",
            dataIndex: "5",
        },
        {
            title: "邀约达成比例",
            dataIndex: "6",
        },
        {
            title: "任务预计总收益（元）",
            dataIndex: "7",
        },
        {
            title: "平台分润（元）",
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
            title: "打款状态",
            dataIndex: "11",
        },
        {
            title: "打款备注",
            dataIndex: "12",
        },
    ]

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
    };

    useEffect(() => {
        getTaskIncomeList();
    }, []);

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {

    }

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
                        <Typography.Title level={5} style={{margin: 0}}>约定响应功率汇总（KW）：13500</Typography.Title>
                        <Typography.Title level={5} style={{margin: 0}}>任务总收益（元）：5800</Typography.Title>
                    </Space>
                    <Space size={30}>
                        <Typography.Title level={5} style={{margin: 0}}>实际执行功率汇总（KW）：15800</Typography.Title>
                        <Typography.Title level={5} style={{margin: 0}}>平台总收益（元）：2580</Typography.Title>
                    </Space>
                    <Typography.Title level={5} style={{margin: 0}}>预计收益（元）：15800</Typography.Title>
                </Space>
                <Space>
                    <Button type="primary" onClick={()=>setOpen(true)}>手工确认打款</Button>
                    <Button type="primary">刷新</Button>
                </Space>
            </Flex>
            <Table 
                rowKey="id"
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                    getCheckboxProps: record => ({
                        disabled: record.account === "admin",
                    }),
                }}
                onChange={pagination => {
                    paginationRef.current = pagination;
                }}
                style={{
                    marginTop: 20
                }}
            />
            <Modal
                title="手工确认打款"
                open={open}
                width={700}
                onOk={()=>{
                    setOpen(false);
                }}
                onCancel={()=>{
                    setOpen(false);
                    form.resetFields();
                }}
                centered
            >
                <Form form={form}>
                    <Form.Item label="打款状态" name="status" rules={[{...FORM_REQUIRED_RULE}]}>
                        <Radio.Group
                            options={
                                [
                                    { label: '打款成功', value: '1' },
                                    { label: '打款失败', value: '0' },
                                ]
                            }
                        />
                    </Form.Item>
                    <Form.Item label="备注" name="remark">
                        <Input.TextArea autoSize={{minRows: 6, maxRows: 6}}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default InvitationIncome;