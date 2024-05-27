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
import { useIntl } from "umi";
import Add from './add';
import NewPrice from './newPriceRule';
import ElectricitypricePer from './ElectricitypricePer';
import CalendarEventForm from '../calendar-event-form';
import Detail from './detail';
import { sendBasicParams, getBasicParams, getStrategyInfo, saveStrategy, getPricePlan, savePricePlan } from '@/services/policy'
import { useEffect } from 'react';

const colon = false;
const tabsList = [
    { label: '基础配置', key: 'BaseConfig' },
    { label: '电价配置', key: 'ElectricityPrice' },
    { label: '充放电配置', key: 'ElectricConfig' },
]

const NewStrategy = ({ currentGrid, strategy, deleteStrategy, getStrategy, handleCreate, planList, onDeletePlan }) => {
    const { token } = theme.useToken();
    const [form1] = Form.useForm(); // 电站类型和并网点
    const [form2] = Form.useForm(); // 基础配置
    const [form3] = Form.useForm(); // 电价规则
    const [form4] = Form.useForm(); // 创建策略执行日程
    const [form5] = Form.useForm(); // 新增策略
    const [form6] = Form.useForm(); // 策略详情
    const [data, setData] = useState({}); // 所有的data
    const [drawerOpen, setDrawerOpen] = useState(false); // 控制新建策略右边抽屉开关
    const [activeKey, setActiveKey] = useState('BaseConfig');
    const [createExecutionScheduleOpen, setCreateExecutionScheduleOpen] = useState(false); // 创建策略执行日程
    const [newPlanOpen, setNewPlanOpen] = useState(false); // 新增策略
    const [editPlanOpen, setEditPlanOpen] = useState(false); // 策略详情
    const [newPriceRule, setNewPriceRule] = useState(false); // 价格规则
    const [pricePer, setPricePer] = useState(false); // 时段电价
    const [editKey, setEditKey] = useState(-1); // 新增时重新编辑策略列表key
    const [detailsData, setDetailsData] = useState(); // 策略详情
    const [priceData, setPriceData] = useState(); // 电价表
    const [editIndex, setEditIndex] = useState(-1); // 当前编辑的index
    let currentPlant = JSON.parse(localStorage.getItem('current'));

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
    useEffect(() => {
        getPrice();
    }, [currentGrid?.value])
    const getBasicParamsF = async () => {
        let { data } = await getBasicParams({ gridPointId: currentGrid.value });
        form2.setFieldsValue(data.data);
    }

    const getDetails = async (val) => {
        let { data } = await getStrategyInfo({ strategyId: val?.strategyId });
        setDetailsData(data?.data)
    }
    const getPrice = async () => {
        let { data } = await getPricePlan({ plantId: localStorage.getItem('plantId') });
        setPriceData(data?.data)
    }
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
            dataIndex: 'strategyName',
            key: 'strategyName',
        },
        {
            title: t('创建用户'),
            dataIndex: 'createUserName',
            key: 'createUserName',
        },
        {
            title: t('创建时间'),
            dataIndex: 'createTimeVo',
            key: 'createTimeVo',
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
                                console.log(record);
                                getDetails(record);
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
                                        deleteStrategy(record);
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
    const price = [
        {
            title: t('序号'),
            dataIndex: 'order',
            key: 'order',
            render(_, record, index) {
                return index + 1;
            }
        },
        {
            title: t('规则名称'),
            dataIndex: 'planName',
            key: 'planName',
        },
        {
            title: t('电价类型'),
            dataIndex: 'planType',
            key: 'planType',
        },
        {
            title: t('开始日期'),
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: t('结束日期'),
            dataIndex: 'endDate',
            key: 'endDate',
        }, {
            title: `${t('尖时电价')}/${currentPlant.priceUnit}`,
            dataIndex: 'tipPrice',
            key: 'tipPrice',
        }, {
            title: `${t('峰时电价')}/${currentPlant.priceUnit}`,
            dataIndex: 'peakPrice',
            key: 'peakPrice',
        }, {
            title: `${t('平时电价')}/${currentPlant.priceUnit}`,
            dataIndex: 'flatPrice',
            key: 'flatPrice',
        }, {
            title: `${t('谷时电价')}/${currentPlant.priceUnit}`,
            dataIndex: 'valleyPrice',
            key: 'valleyPrice',
        },
        {
            title: t('备注'),
            dataIndex: 'desc',
            key: 'desc',
            ellipsis: true,
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
                            style={{ color: token.colorPrimary }}
                            onClick={() => {
                                setPricePer(true);
                                setEditIndex(index);
                            }}
                        >
                            {t('时段配置')}
                        </Typography.Link>
                        <Typography.Link
                            style={{ color: token.deleteBtnColor }}
                            onClick={() => {
                                Modal.confirm({
                                    title: t('系统提示'),
                                    content: t('年度执行计划删除后将无法恢复，是否确认删除该年度执行计划？'),
                                    onOk() {
                                        let arr = [...priceData];
                                        arr.splice(index, 1);
                                        setPriceData([...arr])
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
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: t('起始时间'),
            dataIndex: 'start',
            key: 'start',
        },
        {
            title: t('结束时间'),
            dataIndex: 'end',
            key: 'end',
        },
        {
            title: t('备注'),
            dataIndex: 'remarks',
            key: 'remarks',
            ellipsis: true,
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
                            style={{ color: token.deleteBtnColor }}
                            onClick={() => {
                                Modal.confirm({
                                    title: t('系统提示'),
                                    content: t('年度执行计划删除后将无法恢复，是否确认删除该年度执行计划？'),
                                    onOk() {
                                        onDeletePlan(record.id);
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
        } else if (activeKey === 'ElectricityPrice') {
            let { data } = await savePricePlan({ pricePlan: [...priceData], plantId: localStorage.getItem('plantId') });

        }
        setDrawerOpen(false);
        // message.success(t("新建成功"));
    }

    const newStrategy = async (val) => {
        let { data } = await saveStrategy({ ...val, gridPoint: currentGrid?.value });
        getStrategy();
        console.log(getStrategy, 'getStrategy');
        // setDrawerOpen(false);
        // message.success(t("新建成功"));

    }
    const onCancel = () => {
        setDrawerOpen(false);
        setData({});
        form1.resetFields();
        form2.resetFields();
    }
    console.log(planList, 'startDate');
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
                title={t("策略配置")}
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
                    >
                        <Form.Item name="runStrategyPeriod" label="策略运行周期(ms)">
                            <Input placeholder='请输入策略运行周期' style={{ maxWidth: 218 }} />
                        </Form.Item>
                        <Form.Item name="enabled" label="是否启用">
                            <Switch />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={6}><Form.Item name="preventOverloadEnabled" label="是否防过载"><Switch /></Form.Item></Col>
                            <Col span={6}><Form.Item name="expansionEnabled" label="是否扩容" ><Switch disabled={!form2.getFieldValue('preventOverloadEnabled')}/></Form.Item></Col>
                            <Col span={6}><Form.Item name="antiRefluxEnabled" label="是否防逆流"><Switch /></Form.Item></Col>
                            <Col span={6}><Form.Item name="fullTimePeriodEnabled" label="是否全时段"><Switch  disabled={!form2.getFieldValue('antiRefluxEnabled')}/></Form.Item></Col>
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
                {/* 电价 */}
                {
                    activeKey === "ElectricityPrice" &&
                    <div>
                        <Space direction="vertical" style={{ width: '100%' }} size={30}>
                            <Space direction="vertical" style={{ width: '100%' }} size={20}>
                                <Row justify="space-between">
                                    <Space size={30}>
                                        <Title title="电价规则" />
                                        {/* <Button type="primary" onClick={()=>setCreateYearExcuteOpen(true)}>创建年度执行计划</Button> */}
                                    </Space>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setNewPriceRule(true)
                                        }}
                                    >
                                        {t('新增')}
                                    </Button>
                                </Row>
                                <Table
                                    columns={price}
                                    dataSource={priceData}
                                    scroll={{ Y: 300 }}
                                />
                            </Space>

                        </Space>
                    </div>
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
                                    dataSource={strategy[0]?.children}
                                    scroll={{ Y: 300 }}
                                />
                            </Space>
                            <Space direction="vertical" style={{ width: '100%' }} size={20}>
                                <Row justify="space-between">
                                    <Title title="策略执行日程" />
                                    <Button type="primary" onClick={() => setCreateExecutionScheduleOpen(true)}>创建策略执行日程</Button>
                                </Row>
                                <Table
                                    columns={yearExcuteColumns}
                                    dataSource={planList}
                                    scroll={{ Y: 300 }}
                                />
                            </Space>
                        </Space>
                    </div>
                }
            </Drawer>
            {/* 新增价格规则 */}
            <NewPrice
                open={newPriceRule}
                form={form3}
                dataSource={[{
                    name: '市电',
                    value: 1
                }, {
                    name: '光伏上网',
                    value: 2
                }, {
                    name: '充电桩',
                    value: 3
                }]}
                onChangeOpen={(value) => {
                    setNewPriceRule(value);
                }}
                addPriceRules={(value) => {
                    setPriceData(prv => [...prv, value]);
                    // console.log();
                }}
            />
            {/* 时段电价 */}
            <ElectricitypricePer
                open={pricePer}
                form={form4}
                currentData={editIndex>=0?priceData?.[editIndex]:null}
                onSubmit={(values) => {
                    console.log("values", values)
                    let arr=[];
                    values.map(it=>{
                        arr.push({
                            timeType:it.value[0],
                            startHm:it.value[1],
                            endHm:it.value[2]
                        })
                    })
                    const newPriceData = JSON.parse(JSON.stringify(priceData));
                    newPriceData[editIndex].timePeriodList = arr;
                    setPriceData(newPriceData);
                }}
                dataSource={[{
                    name: '尖',
                    value: 0
                }, {
                    name: '峰',
                    value: 1
                }, {
                    name: '平',
                    value: 2
                },
                {
                    name: '谷',
                    value: 3
                }
            ]}
                onChangeOpen={(value) => {
                    setPricePer(value);
                }} />
            {/* 创建策略执行日程 */}
            <CalendarEventForm
                open={createExecutionScheduleOpen}
                type={'add'}
                onCreate={handleCreate}
                strategy={strategy}
                initValues={{}}
                onCancel={() => setCreateExecutionScheduleOpen(false)}
            />

            {/* 新增策略 */}
            <Add
                data={data}
                form={form5}
                newStrategy={newStrategy}
                open={newPlanOpen}
                onChangeOpen={(value) => {
                    setNewPlanOpen(value);
                }}
            />
            {/* 策略详情 */}
            <Detail
                form={form6}
                open={editPlanOpen}
                detailsData={detailsData}
                onChangeOpen={(value) => {
                    setEditPlanOpen(value);
                }}
            />
        </div>
    )
}

export default NewStrategy;