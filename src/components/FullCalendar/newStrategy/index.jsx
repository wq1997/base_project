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
    Table,
    Typography,
    Modal,
    Tooltip,
    message,
} from "antd";
import styles from "./index.less";
import { useState } from 'react';
import { timeSplitSymbol } from "@/utils/constants";
import { useIntl } from "umi";
import Add from './add';
import NewYear from './newYear';
import NewSchedule from './newSchedule';
import Detail from './detail';
import { sendBasicParams, getBasicParams } from '@/services/policy'
import { useEffect } from 'react';

const colon = false;
const tabsList = [
    { label: '基础配置', key: 'BaseConfig' },
    { label: '电价配置', key: 'ElectricityPrice' },
    { label: '充放电配置', key: 'ElectricConfig' },
]

const NewStrategy = ({ currentGrid }) => {
    const { token } = theme.useToken();
    const [form1] = Form.useForm(); // 电站类型和并网点
    const [form2] = Form.useForm(); // 基础配置
    const [form3] = Form.useForm(); // 创建年度执行计划
    const [form4] = Form.useForm(); // 创建策略执行日程
    const [form5] = Form.useForm(); // 新增策略
    const [form6] = Form.useForm(); // 策略详情
    const [data, setData] = useState({}); // 所有的data
    const [drawerOpen, setDrawerOpen] = useState(false); // 控制新建策略右边抽屉开关
    const [activeKey, setActiveKey] = useState('BaseConfig');
    const [createYearExcuteOpen, setCreateYearExcuteOpen] = useState(false);
    const [createExecutionScheduleOpen, setCreateExecutionScheduleOpen] = useState(false); // 创建策略执行日程
    const [newPlanOpen, setNewPlanOpen] = useState(false); // 新增策略
    const [editPlanOpen, setEditPlanOpen] = useState(false); // 策略详情
    const [editKey, setEditKey] = useState(-1); // 新增时重新编辑策略列表key
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    useEffect(() => {
        getBasicParamsF();
    }, [drawerOpen])
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
    const getBasicParamsF = async () => {
        let { data } = await getBasicParams({ gridPointId: currentGrid.value });
        form2.setFieldsValue(data.data);
    }
    const [yearExcuteDatasource, setYearExcuteDatasource] = useState([
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
            title: t('序号'),
            dataIndex: 'order',
            key: 'order',
            render(_, record, index) {
                return index + 1;
            }
        },
        {
            title: t('策略名称'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('创建用户'),
            dataIndex: 'creator',
            key: 'creator',
        },
        {
            title: t('创建时间'),
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: t('操作'),
            key: "Action",
            render: (_, record, index) => {
                return (
                    <Space>
                        <Typography.Link
                            style={{ color: token.colorPrimary }}
                            onClick={() => {
                                form6.setFieldsValue({
                                    ...record
                                });
                                setEditPlanOpen(true);
                                setEditKey(index);
                            }}
                        >
                            {t('详情')}
                        </Typography.Link>
                        <Typography.Link
                            style={{ color: token.deleteBtnColor }}
                            onClick={() => {
                                Modal.confirm({
                                    title: t('系统提示'),
                                    content: t('策略删除后将无法恢复，是否确认删除该策略？'),
                                    onOk() {
                                        const cloneStrategyDatasource = JSON.parse(JSON.stringify(strategyDatasource));
                                        const newData = cloneStrategyDatasource.splice(index, 1);
                                        setStrategyDatasource(cloneStrategyDatasource);
                                    }
                                })
                            }}
                        >
                            {t('删除')}
                        </Typography.Link>
                    </Space>
                )
            }
        }
    ]

    const yearExcuteColumns = [
        {
            title: t('序号'),
            dataIndex: 'order',
            key: 'order',
            render(_, record, index) {
                return index + 1;
            }
        },
        {
            title: t('策略名称'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('起始时间'),
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: t('结束时间'),
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: t('备注'),
            dataIndex: 'remark',
            key: 'remark',
            ellipsis: true,
            width: 300,
            render(value) {
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
            title: t('操作'),
            key: "Action",
            render: (_, record, index) => {
                return (
                    <Space>
                        <Typography.Link
                            style={{ color: token.defaultBg }}
                            onClick={() => {
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
                            {t('编辑')}
                        </Typography.Link>
                        <Typography.Link
                            style={{ color: token.deleteBtnColor }}
                            onClick={() => {
                                Modal.confirm({
                                    title: t('系统提示'),
                                    content: t('年度执行计划删除后将无法恢复，是否确认删除该年度执行计划？'),
                                    onOk() {
                                        const cloneYearExcuteDatasource = JSON.parse(JSON.stringify(yearExcuteDatasource));
                                        const newData = cloneYearExcuteDatasource.splice(index, 1);
                                        // setExcuteDatasource(cloneYearExcuteDatasource);
                                    }
                                })
                            }}
                        >
                            {t('删除')}
                        </Typography.Link>
                    </Space>
                )
            }
        }
    ]

    const onFininsh = async () => {
        if (activeKey === 'BaseConfig') {
            let { data } = await sendBasicParams({ ...form2.getFieldsValue(), gridPointId: currentGrid?.value });
        }
        setDrawerOpen(false);
        // message.success(t("新建成功"));
    }


    const onCancel = () => {
        setDrawerOpen(false);
        setData({});
        form1.resetFields();
        form2.resetFields();
    }

    return (
        <div>
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
                <div className={styles.btn}>
                    <Iconify icon="material-symbols:add" size={24} />
                    {t('新建策略')}
                </div>
            </Button>

            <Drawer
                width="980"
                title={t("策略详情")}
                open={drawerOpen}
                onClose={onCancel}
                footer={
                    <Row justify="end">
                        <Space>
                            <Button type="primary" onClick={onFininsh}>{t('确定')}</Button>
                            <Button onClick={onCancel}>{t('取消')}</Button>
                        </Space>
                    </Row>
                }
            >
                <Form
                    form={form1}
                    // colon={colon} 
                    onValuesChange={(_, allValues) => {
                        data.form1Data = allValues;
                        setData({ ...data });
                    }}
                    initialValues={{
                        networkSite: '并网点1'
                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="deviceType" label="电站类型">
                                {JSON.parse(localStorage.getItem('current')).typeName}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="networkSite" label="并网点">
                                {currentGrid?.gridPointName}
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
                <Divider style={{ marginTop: 0 }} />
                {/* 基础配置 */}
                {
                    activeKey === "BaseConfig" &&
                    <Form
                        form={form2}
                        colon={colon}
                        onValuesChange={(_, allValues) => {
                            data.form2Data = allValues;
                            setData({ ...data });
                        }}
                    // initialValues={{
                    //     antiRefluxEnabled: true,
                    //     // antiRefluxTriggerPower:0,
                    //     branchDispatchPowerMode:1,
                    //     enabled:true,
                    //     expansionEnabled:true,
                    //     fullTimePeriodEnabled:true,
                    //     powerAdjustStep:0,
                    //     powerFluctuateRange:0,
                    //     preventOverloadEnabled:true,
                    //     runStrategyPeriod:0,
                    //     storageControlMode:1,
                    //     // transformCap:0,
                    // }}
                    >
                        <Form.Item name="runStrategyPeriod" label="策略运行周期(ms)">
                            <Input placeholder='请输入策略运行周期' style={{ maxWidth: 218 }} />
                        </Form.Item>
                        <Form.Item name="enabled" label="是否启用">
                            <Switch />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={6}><Form.Item name="expansionEnabled" label="是否扩容" ><Switch /></Form.Item></Col>
                            <Col span={6}><Form.Item name="preventOverloadEnabled" label="是否防过载"><Switch /></Form.Item></Col>
                            <Col span={6}><Form.Item name="antiRefluxEnabled" label="是否防逆流"><Switch /></Form.Item></Col>
                            <Col span={6}><Form.Item name="fullTimePeriodEnabled" label="是否全时段"><Switch /></Form.Item></Col>
                        </Row>
                        <Row gutter={37}>
                            <Col span={12}>
                                <Form.Item
                                    name="transformCap"
                                    label="变压器容量"
                                    labelCol={{
                                        span: 8
                                    }}
                                    labelAlign="left"
                                >
                                    <Input disabled={true} placeholder='请输入变压器容量' />
                                </Form.Item>
                            </Col>
                            {/* <Col span={12}>
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
                            </Col> */}
                            <Col span={12}>
                                <Form.Item
                                    name="antiRefluxTriggerPower"
                                    label="防逆流功率触发值(kW)"
                                    labelCol={{
                                        span: 8
                                    }}
                                    labelAlign="left"
                                >
                                    <Input disabled={true} placeholder='请输入防逆流功率触发值(kW)' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={37}>

                            <Col span={12}>
                                <Form.Item
                                    name="powerAdjustStep"
                                    label="功率调节步长(kW)"
                                    labelCol={{
                                        span: 8
                                    }}
                                    labelAlign="left"
                                >
                                    <Input placeholder='请输入功率调节步长(kW)' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="powerFluctuateRange"
                                    label="功率调节波动范围(kW)"
                                    labelCol={{
                                        span: 8
                                    }}
                                    labelAlign="left"
                                >
                                    <Input placeholder='请输入功率调节波动范围(kW)' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name="storageControlMode"
                            label="储能控制模式"
                            labelCol={{
                                span: 4
                            }}
                            labelAlign="right"
                        >
                            <Radio.Group
                                options={[
                                    { label: '最大功率', value: 1 },
                                    { label: '满时段均匀', value: 2 },
                                    { label: '计划曲线', value: 3 },
                                ]}
                                defaultValue={1}
                            />
                        </Form.Item>
                        <Form.Item
                            name="branchDispatchPowerMode"
                            label="储能分支功率下发模式"
                            labelCol={{
                                span: 4
                            }}
                            labelAlign="right"
                        >
                            <Radio.Group
                                options={[
                                    { label: '平均功率', value: 1 },
                                    { label: 'SOC动态均衡', value: 2 },
                                ]}
                                defaultValue={1}
                            />
                        </Form.Item>
                    </Form>
                }
                {/* 充放电配置 */}
                {
                    activeKey === "ElectricConfig" &&
                    <div>
                        <Space direction="vertical" style={{ width: '100%' }} size={30}>
                            <Space direction="vertical" style={{ width: '100%' }} size={20}>
                                <Row justify="space-between">
                                    <Space size={30}>
                                        <Title title="策略列表" />
                                        {/* <Button type="primary" onClick={()=>setCreateYearExcuteOpen(true)}>创建年度执行计划</Button> */}
                                    </Space>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setNewPlanOpen(true);
                                        }}
                                    >
                                        {t('新增')}
                                    </Button>
                                </Row>
                                <Table
                                    columns={strategyColumns}
                                    dataSource={strategyDatasource}
                                />
                            </Space>
                            <Space direction="vertical" style={{ width: '100%' }} size={20}>
                                <Row justify="space-between">
                                    <Title title="年度执行计划" />
                                    <Button type="primary" onClick={() => setCreateExecutionScheduleOpen(true)}>创建策略执行日程</Button>
                                </Row>


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
            <NewYear
                form={form3}
                dataSource={yearExcuteDatasource}
                onChangeDatasource={(value) => {
                    setYearExcuteDatasource(value);
                }}
                open={createYearExcuteOpen}
                onChangeOpen={value => {
                    setCreateYearExcuteOpen(value);
                }}
            />

            {/* 创建策略执行日程 */}
            <NewSchedule
                form={form4}
                dataSource={strategyDatasource}
                open={createExecutionScheduleOpen}
                onChangeOpen={(value) => {
                    setCreateExecutionScheduleOpen(value);
                }}
            />

            {/* 新增策略 */}
            <Add
                data={data}
                form={form5}
                dataSource={strategyDatasource}
                onChangeDatasource={(value) => {
                    setStrategyDatasource(value);
                }}
                open={newPlanOpen}
                onChangeOpen={(value) => {
                    setNewPlanOpen(value);
                }}
            />
            {/* 策略详情 */}
            <Detail
                form={form6}
                open={editPlanOpen}
                onChangeOpen={(value) => {
                    setEditPlanOpen(value);
                }}
            />
        </div>
    )
}

export default NewStrategy;