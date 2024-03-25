import { Iconify, Title } from '@/components';
import { 
    theme,
    Button, 
    Drawer, 
    Form, 
    Row, 
    Col, 
    Input, 
    Select,
    Tabs, 
    Divider, 
    Space,
    Switch,
    Radio,
    InputNumber,
    Table,
    Typography,
    Modal,
    Tooltip,
    DatePicker,
} from "antd";
import styles from "./newStrategy.less";
import { useState } from 'react';
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import moment from 'moment';

const colon = false;
const timeSplitSymbol = "-";
const tabsList = [
    {label: '基础配置', key: 'BaseConfig'},
    {label: '充放电配置', key: 'ElectricConfig'},
]

const fillInt = (max) => {
    return new Array(max).fill(0).map((item, index)=>{
        if(index<9){
            return `0${index+1}`
        }
        return index+1;
    });
}

const NewStrategy = () => {
    const { token } = theme.useToken();
    const [form1] = Form.useForm(); // 电站类型和并网点
    const [form2] = Form.useForm(); // 基础配置
    const [form3] = Form.useForm(); // 创建年度执行计划
    const [form4] = Form.useForm(); // 创建策略执行日程
    const [data, setData] = useState({}); // 所有的data
    const [drawerOpen, setDrawerOpen] = useState(true); // 控制新建策略右边抽屉开关
    const [activeKey, setActiveKey] = useState('BaseConfig');
    const [createYearExcuteOpen, setCreateYearExcuteOpen] = useState(false);
    const [createExecutionScheduleOpen, setCreateExecutionScheduleOpen] = useState(false); // 创建策略执行日程

    const [strategyDatasource, setStrategyDatasource] = useState([
        {
            id: 1,
            name: '策略1',
            creator: '创建者1',
            createTime: '2024/03/26'
        },
        {
            id: 2,
            name: '策略2',
            creator: '创建者2',
            createTime: '2024/03/27'
        }
    ]);

    const [yearExcuteDatasource, setExcuteDatasource] = useState([
        {
            name: '策略1',
            startTime: `03${timeSplitSymbol}12`,
            endTime: `08${timeSplitSymbol}20`,
        },
        {
            name: '策略2',
            startTime: `05${timeSplitSymbol}01`,
            endTime: `10${timeSplitSymbol}20`,
        }
    ])

    const strategyColumns = [
        {
            title: '序号',
            dataIndex: 'order',
            key: 'order',
            render(_,record,index){
                return index+1;
            }
        },
        {
            title: '策略名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '创建用户',
            dataIndex: 'creator',
            key: 'creator',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            key: "Action",
            render: (_, record, index)=>{
                return (
                    <Space>
                        <Typography.Link style={{color: token.colorPrimary}}>详情</Typography.Link>
                        <Typography.Link 
                            style={{color: token.deleteBtnColor}}
                            onClick={()=>{
                                Modal.confirm({
                                    title: '系统提示',
                                    content: '策略删除后将无法恢复，是否确认删除该策略？',
                                    onOk(){
                                        const cloneStrategyDatasource = JSON.parse(JSON.stringify(strategyDatasource));
                                        const newData = cloneStrategyDatasource.splice(index,1);
                                        setStrategyDatasource(cloneStrategyDatasource);
                                    }
                                })
                            }}
                        >
                            删除
                        </Typography.Link>
                    </Space>
                )
            }
        }
    ]

    const yearExcuteColumns = [
        {
            title: '序号',
            dataIndex: 'order',
            key: 'order',
            render(_,record,index){
                return index+1;
            }
        },
        {
            title: '策略名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '起始时间',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            ellipsis: true,
            width: 300,
            render(value){
                return (
                    <Tooltip title={value}>
                        <div 
                            style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                width: 250,
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                )
            }
        },
        {
            title: '操作',
            key: "Action",
            render: (_, record, index)=>{
                return (
                    <Space>
                        <Typography.Link 
                            style={{color: token.defaultBg}}
                            onClick={()=>{
                                const month1 = record.startTime.split(timeSplitSymbol)[0];
                                const day1 = record.startTime.split(timeSplitSymbol)[1];
                                const month2 = record.endTime.split(timeSplitSymbol)[0];
                                const day2 = record.endTime.split(timeSplitSymbol)[1];
                                form3.setFieldsValue({
                                    ...record,
                                    month1,
                                    month2,
                                    day1,
                                    day2
                                })
                                setCreateYearExcuteOpen(true);
                            }}
                        >
                            编辑
                        </Typography.Link>
                        <Typography.Link 
                            style={{color: token.deleteBtnColor}}
                            onClick={()=>{
                                Modal.confirm({
                                    title: '系统提示',
                                    content: '年度执行计划删除后将无法恢复，是否确认删除该年度执行计划？',
                                    onOk(){
                                        const cloneYearExcuteDatasource = JSON.parse(JSON.stringify(yearExcuteDatasource));
                                        const newData = cloneYearExcuteDatasource.splice(index,1);
                                        setExcuteDatasource(cloneYearExcuteDatasource);
                                    }
                                })
                            }}
                        >
                            删除
                        </Typography.Link>
                    </Space>
                )
            }
        }
    ]

    const onFininsh = async () => {

    }


    const onCancel = () => {
        setDrawerOpen(false);
        setData({});
        form1.resetFields();
        form2.resetFields();
    }

    console.log(data);
    return (
        <div>
            <Button type="primary" onClick={()=>setDrawerOpen(true)}>
                <div className={styles.btn}>
                    <Iconify icon="material-symbols:add" size={24} />
                    新建策略
                </div>
            </Button>

            <Drawer 
                width="980" 
                title="新建策略"
                open={drawerOpen} 
                onClose={onCancel}
                footer={
                    <Row justify="end">
                        <Space>
                            <Button type="primary" onClick={onFininsh}>确定</Button>
                            <Button onClick={onCancel}>取消</Button>
                        </Space>
                    </Row>
                }
            >
                <Form 
                    form={form1} 
                    colon={colon} 
                    onValuesChange={(_,allValues) => {
                        data.form1Data = allValues;
                        setData({...data});
                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="deviceType" label="电站类型">
                                <Input placeholder='请输入电站类型' style={{maxWidth: 320}} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="networkSite" label="并网点">
                                <Select 
                                    options={[
                                        {value: '并网点1', label: '并网点1'},
                                        {value: '并网点2', label: '并网点2'},
                                    ]}
                                    placeholder='请选择并网点'
                                    style={{maxWidth: 240}}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Tabs 
                    items={tabsList}
                    type="card"
                    activeKey={activeKey}
                    onChange={key => setActiveKey(key)}
                />
                <Divider style={{marginTop: 0}}/>
                {/* 基础配置 */}
                {
                    activeKey==="BaseConfig"&&
                    <Form 
                        form={form2}
                        colon={colon}
                        onValuesChange={(_,allValues) => {
                            data.form2Data = allValues;
                            setData({...data});
                        }}
                    >
                        <Form.Item name="runCycle" label="策略运行周期(ms)">
                            <Input placeholder='请输入策略运行周期' style={{maxWidth: 218}} />
                        </Form.Item>
                        <Form.Item name="enable" label="是否启用">
                            <Switch />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={6}><Form.Item name="expansion" label="是否扩容"><Switch /></Form.Item></Col>
                            <Col span={6}><Form.Item name="overload" label="是否防过载"><Switch /></Form.Item></Col>
                            <Col span={6}><Form.Item name="antiReflux" label="是否防逆流"><Switch /></Form.Item></Col>
                            <Col span={6}><Form.Item name="fullTime" label="是否全时段"><Switch /></Form.Item></Col>
                        </Row>
                        <Row gutter={37}>
                            <Col span={12}>
                                <Form.Item 
                                    name="transformerCapacity" 
                                    label="变压器容量"
                                    labelCol={{
                                        span: 8
                                    }}
                                    labelAlign="left"
                                >
                                    <Input placeholder='请输入变压器容量'/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item 
                                    name="transformerCapacityProtectionRatio" 
                                    label="变压器容量保护比例(%)"
                                    labelCol={{
                                        span: 8
                                    }}
                                    labelAlign="left"
                                >
                                    <Input placeholder='请输入变压器容量保护比例'/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={37}>
                            <Col span={12}>
                                <Form.Item 
                                    name="powerTriggerValue" 
                                    label="防逆流功率触发值(kW)"
                                    labelCol={{
                                        span: 8
                                    }}
                                    labelAlign="left"
                                >
                                    <Input placeholder='请输入防逆流功率触发值(kW)'/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item 
                                    name="adjustmentStepSize" 
                                    label="功率调节步长(kW)"
                                    labelCol={{
                                        span: 8
                                    }}
                                    labelAlign="left"
                                >
                                    <Input placeholder='请输入功率调节步长(kW)'/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={37}>
                            <Col span={12}>
                                <Form.Item 
                                    name="regulationFluctuationRange" 
                                    label="功率调节波动范围(kW)"
                                    labelCol={{
                                        span: 8
                                    }}
                                    labelAlign="left"
                                >
                                    <Input placeholder='请输入功率调节波动范围(kW)'/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name="EnergyStorageControlMode"
                            label="储能控制模式"
                            labelCol={{
                                span: 4
                            }}
                            labelAlign="right"
                        >
                            <Radio.Group
                                options={[
                                    {label:'最大功率', value: '最大功率'},
                                    {label:'满时段均匀', value: '满时段均匀'},
                                    {label:'计划曲线', value: '计划曲线'},
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            name="energyStorageBranchPowerDistributionMode"
                            label="储能分支功率下发模式"
                            labelCol={{
                                span: 4
                            }}
                            labelAlign="right"
                        >
                            <Radio.Group
                                options={[
                                    {label:'平均功率', value: '平均功率'},
                                    {label:'SOC动态均衡', value: 'SOC动态均衡'},
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="电价(元)"
                            labelCol={{
                                span: 4
                            }}
                            labelAlign="right"
                        >
                            <Row gutter={20}>
                                <Col>
                                    <Form.Item name='pointed' label="尖" colon={true}>
                                        <InputNumber placeholder='尖'/>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item name='peak' label="峰" colon={true}>
                                        <InputNumber placeholder="峰"/>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item name='flat' label="平" colon={true}>
                                        <InputNumber placeholder="平"/>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item name='valley' label="谷" colon={true}>
                                        <InputNumber placeholder="谷"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                }
                {/* 充放电配置 */}
                {
                    activeKey==="ElectricConfig"&&
                    <div>
                        <Space direction="vertical" style={{width: '100%'}} size={30}>
                            <Space direction="vertical" style={{width: '100%'}} size={20}>
                                <Row justify="space-between">
                                    <Space size={30}>
                                        <Title title="策略列表" />
                                        <Button type="primary" onClick={()=>setCreateYearExcuteOpen(true)}>创建年度执行计划</Button>
                                        <Button type="primary" onClick={()=>setCreateExecutionScheduleOpen(true)}>创建策略执行日程</Button>
                                    </Space>
                                    <Button type="primary">新增</Button>
                                </Row>
                                <Table 
                                    columns={strategyColumns}
                                    dataSource={strategyDatasource}
                                />
                            </Space>
                            <Space direction="vertical" style={{width: '100%'}} size={20}>
                                <Title title="年度执行计划" />
                                <Table 
                                    columns={yearExcuteColumns}
                                    dataSource={yearExcuteDatasource}
                                />
                            </Space>
                        </Space>
                    </div>
                }
            </Drawer>

            {/* 创建年度执行计划 */}
            <Modal
                title={<Title title="创建年度执行计划"/>}
                open={createYearExcuteOpen}
                onOk={async () => {
                    const values = await form3.validateFields();
                    console.log("创建年度执行计划", values);
                    setExcuteDatasource([
                        ...yearExcuteDatasource,
                        {
                            name: values.name,
                            startTime: `${values.month1}${timeSplitSymbol}${values.day1}`,
                            endTime: `${values.month2}${timeSplitSymbol}${values.day2}`,
                            remark: values?.remark
                        },
                    ])
                    setCreateYearExcuteOpen(false);
                    form3.resetFields();
                }}
                width={700}
                onCancel={()=>{
                    setCreateYearExcuteOpen(false);
                    form3.resetFields();
                }}
            >
                <Form
                    form={form3}
                    labelCol={{
                        span: 3
                    }}
                >
                    <Form.Item label="策略" name={"name"} rules={[FORM_REQUIRED_RULE]}>
                        <Select 
                            options={strategyDatasource.map(item => {
                                return {
                                    label: item.name,
                                    value: item.name
                                }
                            })}
                            placeholder="请选择策略"
                        />
                    </Form.Item>
                    <Form.Item 
                        name=""
                        label="时间" 
                        dependencies={['month1', 'day1', 'month2', 'day2']}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const month1 = getFieldValue('month1');
                                    const day1 = getFieldValue('day1');
                                    const month2 = getFieldValue('month2');
                                    const day2 = getFieldValue('day2');
                                    if(month1&&day1&&month2&&day2){
                                        const flag = moment(`${month1}-${day1}`).isBefore(moment(`${month2}-${day2}`));
                                        if(!flag){
                                            return Promise.reject('起始时间应该早于结束时间');
                                        }
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                        required
                    >
                            <Row gutter={5}>
                                <Col span={5}>
                                    <Form.Item name="month1" style={{marginBottom: 0}} rules={[FORM_REQUIRED_RULE]}>
                                        <Select 
                                            placeholder="月"
                                            options={fillInt(12).map((item => {
                                                return {
                                                    label: item,
                                                    value: item
                                                }
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item name="day1" style={{marginBottom: 0}} rules={[FORM_REQUIRED_RULE]}>
                                        <Select 
                                            placeholder="日"
                                            options={fillInt(31).map((item => {
                                                return {
                                                    label: item,
                                                    value: item
                                                }
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Row justify="center" style={{marginTop: 5}}>至</Row>
                                </Col>
                                <Col span={5}>
                                    <Form.Item 
                                        name="month2" 
                                        style={{marginBottom: 0}} 
                                        rules={[FORM_REQUIRED_RULE]}
                                    >
                                        <Select 
                                            placeholder="月"
                                            options={fillInt(12).map((item => {
                                                return {
                                                    label: item,
                                                    value: item
                                                }
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item name="day2" style={{marginBottom: 0}} rules={[FORM_REQUIRED_RULE]}>
                                        <Select 
                                            placeholder="日"
                                            options={fillInt(31).map((item => {
                                                return {
                                                    label: item,
                                                    value: item
                                                }
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                    </Form.Item>
                    <Form.Item label="备注" name="remark">
                        <Input.TextArea placeholder='描述'/>
                    </Form.Item>
                </Form>
            </Modal>

            {/* 创建策略执行日程 */}
            <Modal
                title={<Title title="创建策略执行日程"/>}
                open={createExecutionScheduleOpen}
                onOk={async () => {
                    const values = await form4.validateFields();
                    console.log("创建策略执行日程", values);
                    setCreateExecutionScheduleOpen(false);
                    form4.resetFields();
                }}
                width={700}
                onCancel={()=>{
                    setCreateExecutionScheduleOpen(false);
                    form4.resetFields();
                }}
            >
                <Form
                    form={form4}
                    labelCol={{
                        span: 3
                    }}
                >
                    <Form.Item label="策略" name={"name"} rules={[FORM_REQUIRED_RULE]}>
                        <Select 
                            options={strategyDatasource.map(item => {
                                return {
                                    label: item.name,
                                    value: item.name
                                }
                            })}
                            placeholder="请选择策略"
                        />
                    </Form.Item>
                    <Form.Item label="时间" name={"time"} rules={[FORM_REQUIRED_RULE]}>
                            <DatePicker.RangePicker showTime />
                    </Form.Item>
                    <Form.Item label="备注" name="remark">
                            <Input.TextArea placeholder='描述'/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default NewStrategy;