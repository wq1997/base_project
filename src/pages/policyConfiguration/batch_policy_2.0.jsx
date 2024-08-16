import { Form, theme, Space, Row, Modal, Col, Switch, Input, Radio, InputNumber, Button, message } from "antd";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Title, EditTable } from "@/components";
import { useIntl } from "umi";
import ButtonGroup from "./component/ButtonGroup";
import { useState, useEffect } from "react";
import { getQueryString, translateNmberToTime } from "@/utils/utils";
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import {
    getBurCmdHistory2 as getBurCmdHistory2Serve,
    verifyPassword as verifyPasswordServe,
    batchSendPCSSetting as sendPCSSettingServe,
    batchSendBMSSetting as sendBMSSettingServe,
    updateData as updateDataServe,
    btachSendPCSPower as sendPCSPowerServe,
    batchSendParamSetting as sendParamSettingServe,
    batchSendStrategySelect as sendStrategySelectServe,
    batchSendDehumidifier as sendDehumidifierServe,
    batchSendLiquidCooler as sendLiquidCoolerServe,
    batchSwitchModes as switchModesServe,
    batchSendStrategySetting as sendStrategySettingServe,
    isLive as isLiveServe
} from "@/services";

const PolicyConfiguration = ({ deviceVersion, deviceList }) => {
    const intl = useIntl();
    const id = getQueryString("id");
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [checkForm] = Form.useForm();
    const [mode, setMode] = useState();
    const [tabValue, setTabValue] = useState(0);
    const [nextMode, setNextMode] = useState();
    const [runModePCS, setRunModePCS] = useState();
    const [runModeBMS, setRunModeBMS] = useState();
    const [nextRunModePCS, setNextRunModePCS] = useState();
    const [nextRunModeBMS, setNextRunModeBMS] = useState();
    const [checkModalOpen, setCheckModalOpen] = useState(false);
    const [checkModalType, setCheckModalType] = useState('');
    const [durationList, setDurationList] = useState([]);
    const [durationListDataSource, setDurationListDataSource] = useState({});
    const [isLive, setIsLive] = useState(true);
    const canIssue = mode === 0;

    const strategyList = [
        { label: intl.formatMessage({ id: '策略1' }), value: 0 },
        { label: intl.formatMessage({ id: '策略2' }), value: 1 }
    ]

    const monthList = [
        { label: intl.formatMessage({ id: '1月' }), value: 'januaryStrategy' },
        { label: intl.formatMessage({ id: '2月' }), value: 'februaryStrategy' },
        { label: intl.formatMessage({ id: '3月' }), value: 'marchStrategy' },
        { label: intl.formatMessage({ id: '4月' }), value: 'aprilStrategy' },
        { label: intl.formatMessage({ id: '5月' }), value: 'mayStrategy' },
        { label: intl.formatMessage({ id: '6月' }), value: 'juneStrategy' },
        { label: intl.formatMessage({ id: '7月' }), value: 'julyStrategy' },
        { label: intl.formatMessage({ id: '8月' }), value: 'augustStrategy' },
        { label: intl.formatMessage({ id: '9月' }), value: 'septemberStrategy' },
        { label: intl.formatMessage({ id: '10月' }), value: 'octoberStrategy' },
        { label: intl.formatMessage({ id: '11月' }), value: 'novemberStrategy' },
        { label: intl.formatMessage({ id: '12月' }), value: 'decemberStrategy' }
    ]

    const areaStyle = useEmotionCss(() => {
        return {
            background: token.bgcColorB_l,
            padding: '30px 30px',
        }
    })

    const distributeStyle = useEmotionCss(() => {
        return {
            cursor: 'pointer',
            padding: '5px 20px',
            borderRadius: 5,
            backgroundColor: token.defaultBg,
            color: 'white'
        }
    })

    const disabledDistributeStyle = useEmotionCss(() => {
        return {
            cursor: 'pointer',
            padding: '5px 20px',
            borderRadius: 5,
            background: token.color19,
            color: 'white'
        }
    })

    const getAliveStatus = async () => {
        const res = await isLiveServe({ dtuIds: deviceList });
        setIsLive(res?.data);
    }

    const getInitData = async () => {
        if (deviceList?.length <= 0) return;
        const policyDurationList1 = durationListDataSource?.[0]?.map(item => {
            return {
                ...item,
                action: {
                    3: intl.formatMessage({ id: '充电' }),
                    1: intl.formatMessage({ id: '放电' }),
                    2: intl.formatMessage({ id: '待机' })
                }[item.action],
                timeType: {
                    0: intl.formatMessage({ id: '尖' }),
                    1: intl.formatMessage({ id: '峰' }),
                    2: intl.formatMessage({ id: '平' }),
                    3: intl.formatMessage({ id: '谷' })
                }[item.timeType],
                timeStramp: `${item.startHour}:${item.startMin}~${item.endHour}:${item.endMin}`
            }
        })
        const policyDurationList2 = durationListDataSource?.[1]?.map(item => {
            return {
                ...item,
                action: {
                    3: intl.formatMessage({ id: '充电' }),
                    1: intl.formatMessage({ id: '放电' }),
                    2: intl.formatMessage({ id: '待机' })
                }[item.action],
                timeType: {
                    0: intl.formatMessage({ id: '尖' }),
                    1: intl.formatMessage({ id: '峰' }),
                    2: intl.formatMessage({ id: '平' }),
                    3: intl.formatMessage({ id: '谷' })
                }[item.timeType],
                timeStramp: `${item.startHour}:${item.startMin}~${item.endHour}:${item.endMin}`
            }
        })
        let durationList = (tabValue === 0 ? policyDurationList1 : policyDurationList2) || [];
        const params = {
            // mode: data?.mode,
            // enable: data?.enable,
            // tranCap: data?.tranCap,
            // tranCapPercent: data?.tranCapPercent,
            durationList,
            // pcsPower: data?.pcsPower,
            // tempStart: data?.tempStart,
            // tempStop: data?.tempStop,
            // humStart: data?.humStart,
            // humStop: data?.humStop,
            // coolingPoint: data?.coolingPoint,
            // heatPoint: data?.heatPoint,
            // coolingDiffPoint: data?.coolingDiffPoint,
            // heatDiffPoint: data?.heatDiffPoint,
            // antiRefluxTriggerValue: data?.antiRefluxTriggerValue,
            // pcsPowerWaveRange: data?.pcsPowerWaveRange,
            // runModePCS: data?.pcsStatus,
            // runModeBMS: data?.bmsStatus
        }
        // monthList?.forEach((item, index) => {
        //     params[item.value] = data?.policySelectList?.[index]
        // });
        form.setFieldsValue(params);
        setDurationList([...durationList]);
        // setMode(data?.mode);
        // setRunModePCS(data?.pcsStatus);
        // setRunModeBMS(data?.bmsStatus)
    }

    useEffect(() => {
        getInitData();
    }, [tabValue])

    useEffect(() => {
        // getAliveStatus();
    }, [])

    return (
        <>
            <Form
                form={form}
                colon={false}
                initialValues={{
                    mode: 'Custom'
                }}
            >
                <Space style={{ width: '100%', height: 'auto', minHeight: '100%', background: token.color18 }} direction="vertical" size={12}>
                    <div className={areaStyle}>
                        {/* <div
                            style={{
                                display: 'flex',
                            }}
                        >
                            <Button
                                style={{
                                    background: '#03B417',
                                    border: 'none',
                                    marginBottom: 30,
                                    fontSize: 20,
                                    height: '45px',
                                    width: '90px',
                                    position: 'relative',
                                    bottom: '15px'
                                }}
                                onClick={async () => {
                                    await updateDataServe({ dtuIds: deviceList, type: deviceVersion });
                                    await getInitData();
                                    await getAliveStatus();
                                }}
                            >
                                {intl.formatMessage({ id: '刷新' })}
                            </Button>
                        </div> */}
                        <Space style={{ width: '100%' }} direction="vertical">
                            <Form.Item label={<span style={{ fontSize: 20 }}>{intl.formatMessage({ id: '策略模式' })}</span>} name="mode">
                                <ButtonGroup
                                    value={mode}
                                    mode={'controlled'}
                                    disabled={!isLive}
                                    options={[
                                        { label: intl.formatMessage({ id: '自动' }), value: 1 },
                                        { label: intl.formatMessage({ id: '手动' }), value: 0 },
                                    ]}
                                    onControlledChange={async value => {
                                        setNextMode(value);
                                        setCheckModalOpen(true);
                                        setCheckModalType('switchModes');
                                    }}
                                    style={{ fontSize: 20 }}
                                />
                            </Form.Item>
                            <Space style={{ width: '100%' }} direction="vertical" size={20}>
                                <Row justify="space-between" align="middle">
                                    <Title title={intl.formatMessage({ id: '设备命令' })} />
                                </Row>
                                <Space style={{ width: '100%', padding: '0 20px' }} direction="vertical" size={30}>
                                    <Row>
                                        <Space size={20}>
                                            <Form.Item label={intl.formatMessage({ id: 'PCS/BMS设置' })} name="runModePCS" style={{ margin: 0 }}>
                                                <ButtonGroup
                                                    value={runModePCS}
                                                    mode={'controlled'}
                                                    disabled={!canIssue || !isLive}
                                                    options={[
                                                        { label: intl.formatMessage({ id: 'PCS关机' }), value: 0 },
                                                        { label: intl.formatMessage({ id: 'PCS开机' }), value: 1 },
                                                        { label: intl.formatMessage({ id: 'PCS复位' }), value: 2 }
                                                    ]}
                                                    onControlledChange={async value => {
                                                        setNextRunModePCS(value);
                                                        setCheckModalOpen(true);
                                                        setCheckModalType('runModePCS');
                                                    }}
                                                />
                                            </Form.Item>
                                            <Form.Item name="runModeBMS" style={{ margin: 0 }}>
                                                <ButtonGroup
                                                    value={runModeBMS}
                                                    mode={'controlled'}
                                                    disabled={!canIssue || !isLive}
                                                    options={[
                                                        { label: intl.formatMessage({ id: 'BMS关机' }), value: 0 },
                                                        { label: intl.formatMessage({ id: 'BMS开机' }), value: 1 },
                                                        { label: intl.formatMessage({ id: 'BMS复位' }), value: 2 }
                                                    ]}
                                                    onControlledChange={async value => {
                                                        setNextRunModeBMS(value);
                                                        setCheckModalOpen(true);
                                                        setCheckModalType('runModeBMS');
                                                    }}
                                                />
                                            </Form.Item>
                                        </Space>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Row gutter={24}>
                                                <Col>
                                                    <Form.Item label={`${intl.formatMessage({ id: 'PCS功率' })}(kW)`} name="pcsPower" rules={[{ ...FORM_REQUIRED_RULE }]} style={{ margin: 0 }}>
                                                        <Input disabled={!canIssue || !isLive} placeholder={intl.formatMessage({ id: '请输入PCS功率' })} style={{ width: 300 }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <div
                                                        className={canIssue && isLive ? distributeStyle : disabledDistributeStyle}
                                                        onClick={async () => {
                                                            await form.validateFields(['pcsPower']);
                                                            if (canIssue && isLive) {
                                                                setCheckModalOpen(true);
                                                                setCheckModalType('pcsPower');
                                                            }
                                                        }}
                                                    >
                                                        {intl.formatMessage({ id: '下发' })}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Space>
                            </Space>
                        </Space>
                    </div>
                    <div className={areaStyle}>
                        <Space style={{ width: '100%' }} direction="vertical" size={30}>
                            <Row justify="space-between">
                                <Title title={intl.formatMessage({ id: '参数设置' })} />
                                <div
                                    className={canIssue && isLive ? distributeStyle : disabledDistributeStyle}
                                    onClick={async () => {
                                        if (canIssue && isLive) {
                                            await form.validateFields(['switchOnOffGrid', 'antiReflux', 'overload', 'expansion', 'antiRefluxTriggerValue', 'tranCap', 'tranCapPercent', 'pcsPowerWaveRange']);
                                            setCheckModalOpen(true);
                                            setCheckModalType('sendParamSetting');
                                        }
                                    }}
                                >
                                    {intl.formatMessage({ id: '下发' })}
                                </div>
                            </Row>
                            <Space style={{ width: '100%' }} direction="vertical" size={30}>
                                <Row>
                                    <Col span={6}>
                                        <Form.Item label={intl.formatMessage({ id: '并离网' })} name="switchOnOffGrid" style={{ margin: 0 }}>
                                            <Switch disabled={!isLive} checkedChildren={intl.formatMessage({ id: '离网' })} unCheckedChildren={intl.formatMessage({ id: '并网' })} />
                                        </Form.Item>
                                    </Col>
                                    <Form.Item
                                        noStyle
                                        dependencies={['switchOnOffGrid']}
                                    >
                                        {({ getFieldsValue }) => {
                                            let disabled = false
                                            const { switchOnOffGrid } = getFieldsValue('switchOnOffGrid');
                                            if (mode === 1 && switchOnOffGrid) {
                                                disabled = true;
                                            }
                                            return (
                                                <>
                                                    <Col span={6}>
                                                        <Form.Item label={intl.formatMessage({ id: '防逆流' })} name="antiReflux" style={{ margin: 0 }}>
                                                            <Switch disabled={disabled || !isLive} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item label={intl.formatMessage({ id: '防过载' })} name="overload" style={{ margin: 0 }}>
                                                            <Switch disabled={disabled || !isLive} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Form.Item
                                                        noStyle
                                                        dependencies={['overload']}
                                                    >
                                                        {({ getFieldsValue }) => {
                                                            let disabled = false
                                                            const { overload } = getFieldsValue('overload');
                                                            if (mode === 1 && !overload) {
                                                                disabled = true;
                                                            }
                                                            return (
                                                                <Col span={6}>
                                                                    <Form.Item label={intl.formatMessage({ id: '扩容' })} name="expansion" style={{ margin: 0 }}>
                                                                        <Switch disabled={disabled || !isLive} />
                                                                    </Form.Item>
                                                                </Col>
                                                            )
                                                        }}
                                                    </Form.Item>
                                                </>
                                            )
                                        }}
                                    </Form.Item>
                                </Row>
                                <Row gutter={[0, 30]}>
                                    <Form.Item
                                        noStyle
                                        dependencies={['antiReflux']}
                                    >
                                        {({ getFieldsValue }) => {
                                            let disabled = false
                                            const { antiReflux } = getFieldsValue('antiReflux');
                                            if (mode === 1 && antiReflux) {
                                                disabled = true;
                                            }
                                            return (
                                                <Col span={12}>
                                                    <Form.Item label={`${intl.formatMessage({ id: '防逆流触发值' })}(kW)`} name="antiRefluxTriggerValue" style={{ margin: 0 }}>
                                                        <InputNumber disabled={!disabled || !isLive} placeholder={intl.formatMessage({ id: '请输入防逆流触发值' })} style={{ width: 300 }} />
                                                    </Form.Item>
                                                </Col>
                                            )
                                        }}
                                    </Form.Item>
                                    <Form.Item
                                        noStyle
                                        dependencies={['expansion']}
                                    >
                                        {({ getFieldsValue }) => {
                                            let disabled = false
                                            const { expansion } = getFieldsValue('expansion');
                                            if (mode === 1 && !expansion) {
                                                disabled = true;
                                            }
                                            return (
                                                <Col span={12}>
                                                    <Form.Item label={intl.formatMessage({ id: '变压器容量' })} style={{ margin: 0 }}>
                                                        <Space direction="horizontal">
                                                            <Form.Item style={{ margin: 0 }} name="tranCap">
                                                                <InputNumber disabled={disabled || !isLive} style={{ width: 200 }} placeholder="kW" />
                                                            </Form.Item>
                                                            <Form.Item style={{ margin: 0 }} name="tranCapPercent">
                                                                <InputNumber disabled={disabled || !isLive} style={{ width: 200 }} placeholder="%" min={0} max={100} />
                                                            </Form.Item>
                                                        </Space>
                                                    </Form.Item>
                                                </Col>
                                            )
                                        }}
                                    </Form.Item>
                                    <Col span={12}>
                                        <Form.Item label={`${intl.formatMessage({ id: '功率波动范围' })}(kW)`} name="pcsPowerWaveRange" style={{ margin: 0 }}>
                                            <InputNumber disabled={!canIssue || !isLive} placeholder={intl.formatMessage({ id: '请输入功率波动范围' })} style={{ width: 300 }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Space>
                        </Space>
                    </div>
                    <div className={areaStyle}>
                        <Space style={{ width: '100%' }} direction="vertical" size={30}>
                            <Row justify="space-between">
                                <Title title={intl.formatMessage({ id: '策略配置' })} />
                                <div
                                    className={canIssue && isLive ? distributeStyle : disabledDistributeStyle}
                                    onClick={async () => {
                                        if (canIssue && isLive) {
                                            const { durationList } = await form.getFieldsValue("durationList");
                                            if (durationList && durationList?.length > 0) {
                                                setCheckModalOpen(true);
                                                setCheckModalType('sendStrategySetting');
                                            } else {
                                                message.error(intl.formatMessage({ id: '请至少添加一条策略' }))
                                            }
                                        }
                                    }}
                                >
                                    {intl.formatMessage({ id: '下发' })}
                                </div>
                            </Row>
                            <Form.Item name="durationList" validateTrigger={false} rules={[{ ...FORM_REQUIRED_RULE }]}>
                                <EditTable.EditRowTable
                                    showAdd={canIssue && isLive}
                                    showClear={canIssue && isLive}
                                    showEdit={canIssue && isLive}
                                    showDelete={canIssue && isLive}
                                    data={durationList}
                                    columns={[
                                        {
                                            title: intl.formatMessage({ id: '时段' }),
                                            dataIndex: 'timeType',
                                            editable: true,
                                            inputType: 'Select',
                                            options: [
                                                { value: intl.formatMessage({ id: '尖' }), label: intl.formatMessage({ id: '尖' }) },
                                                { value: intl.formatMessage({ id: '峰' }), label: intl.formatMessage({ id: '峰' }) },
                                                { value: intl.formatMessage({ id: '平' }), label: intl.formatMessage({ id: '平' }) },
                                                { value: intl.formatMessage({ id: '谷' }), label: intl.formatMessage({ id: '谷' }) }
                                            ]
                                        },
                                        {
                                            title: intl.formatMessage({ id: '类型' }),
                                            dataIndex: 'action',
                                            editable: true,
                                            inputType: 'Select',
                                            options: [
                                                { value: intl.formatMessage({ id: '充电' }), label: intl.formatMessage({ id: '充电' }) },
                                                { value: intl.formatMessage({ id: '放电' }), label: intl.formatMessage({ id: '放电' }) },
                                                { value: intl.formatMessage({ id: '待机' }), label: intl.formatMessage({ id: '待机' }) },
                                            ]
                                        },
                                        {
                                            title: intl.formatMessage({ id: 'SOC(%)' }),
                                            dataIndex: 'targetSoc',
                                            editable: true,
                                            inputType: 'InputNumber',
                                        },
                                        {
                                            title: `${intl.formatMessage({ id: '功率' })}(kW)`,
                                            dataIndex: 'pcsPower',
                                            editable: true,
                                            inputType: 'InputNumber',
                                        },
                                        {
                                            title: `${intl.formatMessage({ id: '电价' })}(${intl.formatMessage({ id: '元' })})`,
                                            dataIndex: 'elePrice',
                                            editable: true,
                                            inputType: 'InputNumber',
                                            max: 65.53
                                        },
                                        {
                                            title: `${intl.formatMessage({ id: '开始时间' })}~${intl.formatMessage({ id: '结束时间' })}`,
                                            dataIndex: 'timeStramp',
                                            editable: true,
                                            inputType: 'CustomDatePicker',
                                        }
                                    ]}
                                    strategyList={strategyList}
                                    correlationList={['timeType', 'elePrice']}
                                    maxLength={24}
                                    tabValue={tabValue}
                                    onChangeTabs={value => {
                                        setTabValue(value);
                                    }}
                                />
                            </Form.Item>
                        </Space>
                    </div>

                    <div className={areaStyle}>
                        <Space style={{ width: '100%' }} direction="vertical" size={20}>
                            <Row justify="space-between" align="middle">
                                <Title title={intl.formatMessage({ id: '策略选择' })} />
                                <div
                                    className={canIssue && isLive ? distributeStyle : disabledDistributeStyle}
                                    onClick={async () => {
                                        if (canIssue && isLive) {
                                            await form.validateFields(monthList.map(month => month.value));
                                            setCheckModalOpen(true);
                                            setCheckModalType('sendStrategySelect');
                                        }
                                    }}
                                >
                                    {intl.formatMessage({ id: '下发' })}
                                </div>
                            </Row>
                            <Row>
                                {
                                    monthList.map(month => {
                                        return (
                                            <Col span={24 / monthList.length}>
                                                <div style={{ marginBottom: 10 }}>{month.label}</div>
                                                <Form.Item name={month.value} layout="vertical" style={{ margin: 0 }}>
                                                    <Radio.Group disabled={!canIssue || !isLive}>
                                                        <Space direction="vertical">
                                                            {strategyList?.map(strategy => <Radio value={strategy.value}>{strategy.label}</Radio>)}
                                                        </Space>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Space>
                    </div>

                    <div className={areaStyle}>
                        <Space style={{ width: '100%' }} direction="vertical" size={20}>
                            <Row justify="space-between" align="middle">
                                <Title title={intl.formatMessage({ id: '除湿机参数设置' })} />
                                <div
                                    className={isLive ? distributeStyle : disabledDistributeStyle}
                                    onClick={async () => {
                                        await form.validateFields(['tempStart', 'tempStop', 'humStart', 'humStop']);
                                        setCheckModalOpen(true);
                                        setCheckModalType('sendDehumidifier');
                                    }}

                                >
                                    {intl.formatMessage({ id: '下发' })}
                                </div>
                            </Row>
                            <Row gutter={[20, 20]}>
                                <Col span={12}>
                                    <Form.Item name="tempStart" label={intl.formatMessage({ id: '除湿机温度启动值(℃)' })} rules={[{ ...FORM_REQUIRED_RULE }]} style={{ margin: 0 }}>
                                        <Input style={{ width: "100%" }} disabled={!isLive} placeholder={intl.formatMessage({ id: '请输入除湿机温度启动值' })} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="tempStop" label={intl.formatMessage({ id: '除湿机温度停止值(℃)' })} rules={[{ ...FORM_REQUIRED_RULE }]} style={{ margin: 0 }}>
                                        <Input style={{ width: "100%" }} disabled={!isLive} placeholder={intl.formatMessage({ id: '请输入除湿机温度停止值' })} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="humStart" label={intl.formatMessage({ id: '除湿机湿度启动值(%rh)' })} rules={[{ ...FORM_REQUIRED_RULE }]} style={{ margin: 0 }}>
                                        <Input style={{ width: "100%" }} disabled={!isLive} placeholder={intl.formatMessage({ id: '请输入除湿机湿度启动值' })} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="humStop" label={intl.formatMessage({ id: '除湿机湿度停止值(%rh)' })} rules={[{ ...FORM_REQUIRED_RULE }]} style={{ margin: 0 }}>
                                        <Input style={{ width: "100%" }} disabled={!isLive} placeholder={intl.formatMessage({ id: '请输入除湿机湿度停止值' })} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Space>
                    </div>

                    <div className={areaStyle}>
                        <Space style={{ width: '100%' }} direction="vertical" size={20}>
                            <Row justify="space-between" align="middle">
                                <Title title={intl.formatMessage({ id: '液冷机参数设置' })} />
                                <div
                                    className={isLive ? distributeStyle : disabledDistributeStyle}
                                    onClick={async () => {
                                        await form.validateFields(['coolingPoint', 'heatPoint', 'coolingDiffPoint', 'heatDiffPoint']);
                                        setCheckModalOpen(true);
                                        setCheckModalType('sendLiquidCooler');
                                    }}
                                >
                                    {intl.formatMessage({ id: '下发' })}
                                </div>
                            </Row>
                            <Row gutter={[20, 20]}>
                                <Col span={12}>
                                    <Form.Item name="coolingPoint" label={intl.formatMessage({ id: '液冷制冷点(℃)' })} rules={[{ ...FORM_REQUIRED_RULE }]} style={{ margin: 0 }}>
                                        <Input style={{ width: "100%" }} disabled={!isLive} placeholder={intl.formatMessage({ id: '请输入液冷制冷点' })} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="heatPoint" label={intl.formatMessage({ id: '液冷加热点(℃)' })} rules={[{ ...FORM_REQUIRED_RULE }]} style={{ margin: 0 }}>
                                        <Input style={{ width: "100%" }} disabled={!isLive} placeholder={intl.formatMessage({ id: '请输入液冷加热点' })} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="coolingDiffPoint" label={intl.formatMessage({ id: '液冷制冷回差(℃)' })} rules={[{ ...FORM_REQUIRED_RULE }]} style={{ margin: 0 }}>
                                        <Input style={{ width: "100%" }} disabled={!isLive} placeholder={intl.formatMessage({ id: '请输入液冷制冷回差' })} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="heatDiffPoint" label={intl.formatMessage({ id: '液冷加热回差(℃)' })} rules={[{ ...FORM_REQUIRED_RULE }]} style={{ margin: 0 }}>
                                        <Input style={{ width: "100%" }} disabled={!isLive} placeholder={intl.formatMessage({ id: '请输入液冷加热回差' })} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Space>
                    </div>
                </Space>
            </Form>
            <Modal
                title={<Title title={intl.formatMessage({ id: '命令下发' })} />}
                open={checkModalOpen}
                onCancel={() => {
                    setCheckModalOpen(false);
                    checkForm.resetFields();
                }}
                onOk={async () => {
                    if (deviceList?.length <= 0) {
                        message.error(intl.formatMessage({ id: '请选择具体设备' }));
                        return;
                    }
                    let res = null;
                    let values = null;
                    let newDurationListDataSource = durationListDataSource;
                    const checkValues = await checkForm.validateFields(['password']);
                    const verifyPasswordRes = await verifyPasswordServe(checkValues);
                    if (verifyPasswordRes?.data?.code === "ok") {
                        // 策略模式
                        if (checkModalType === "switchModes") {
                            values = { mode: nextMode }
                            res = await switchModesServe({ ...values, dtuIds: deviceList, type: deviceVersion });
                        }
                        // 设备命令-PCS设置
                        if (checkModalType === "runModePCS") {
                            values = { pcsMode: nextRunModePCS }
                            res = await sendPCSSettingServe({ ...values, dtuIds: deviceList, type: deviceVersion });
                        }
                        // 设备命令-BMS设置
                        if (checkModalType === "runModeBMS") {
                            values = { bmsMode: nextRunModeBMS }
                            res = await sendBMSSettingServe({ ...values, dtuIds: deviceList, type: deviceVersion });
                        }
                        // 设备命令-PCS功率
                        if (checkModalType === "pcsPower") {
                            values = await form.validateFields(['pcsPower']);
                            res = await sendPCSPowerServe({ power: values?.pcsPower, dtuIds: deviceList, type: deviceVersion });
                        }
                        // 参数设置
                        if (checkModalType === "sendParamSetting") {
                            values = await form.validateFields(['switchOnOffGrid', 'antiReflux', 'overload', 'expansion', 'antiRefluxTriggerValue', 'tranCap', 'tranCapPercent', 'pcsPowerWaveRange']);
                            res = await sendParamSettingServe({
                                ...values,
                                expansion: values?.expansion ? 1 : 0,
                                overload: values?.overload ? 1 : 0,
                                antiReflux: values?.antiReflux ? 1 : 0,
                                switchOnOffGrid: values?.switchOnOffGrid ? 1 : 0,
                                dtuIds: deviceList,
                                type: deviceVersion
                            });
                        }
                        // 策略配置
                        if (checkModalType === "sendStrategySetting") {
                            values = await form.validateFields(['durationList']);
                            const durationList = values?.durationList.map(value => {
                                const timeStramp = value.timeStramp;
                                const timeStrampList = timeStramp.split("~");
                                const time1 = timeStrampList[0].split(":");
                                const time2 = timeStrampList[1].split(":");
                                const startHour = time1[0].substring(time1[0].length - 2);
                                const startMin = time1[1].substring(time1[1].length - 2);
                                const endHour = time2[0].substring(time2[0].length - 2);
                                const endMin = time2[1].substring(time2[1].length - 2)
                                return {
                                    ...value,
                                    action: {
                                        [intl.formatMessage({ id: '充电' })]: 3,
                                        [intl.formatMessage({ id: '放电' })]: 1,
                                        [intl.formatMessage({ id: '待机' })]: 2,
                                    }[value.action],
                                    timeType: {
                                        [intl.formatMessage({ id: '尖' })]: 0,
                                        [intl.formatMessage({ id: '峰' })]: 1,
                                        [intl.formatMessage({ id: '平' })]: 2,
                                        [intl.formatMessage({ id: '谷' })]: 3
                                    }[value.timeType],
                                    startHour,
                                    startMin,
                                    endHour,
                                    endMin,
                                    timeStramp: `${startHour}:${startMin}~${endHour}:${endMin}`
                                }
                            })
                            let params = {
                                strategyType: tabValue,
                                dtuIds: deviceList,
                                type: deviceVersion
                            }
                            if (tabValue === 0) {
                                params.policyDurationList1 = durationList;
                            }
                            if (tabValue === 1) {
                                params.policyDurationList2 = durationList;
                            }
                            newDurationListDataSource[tabValue] = durationList;
                            res = await sendStrategySettingServe(params)
                        }
                        // 策略选择
                        if (checkModalType === "sendStrategySelect") {
                            values = await form.validateFields(monthList.map(month => month.value));
                            res = await sendStrategySelectServe({ policySelectList: monthList.map(month => values[month.value]), dtuIds: deviceList, type: deviceVersion })
                        }
                        // 除湿机参数设置
                        if (checkModalType === "sendDehumidifier") {
                            values = await form.validateFields(['tempStart', 'tempStop', 'humStart', 'humStop']);
                            res = await sendDehumidifierServe({ ...values, dtuIds: deviceList, type: deviceVersion })
                        }
                        // 液冷机参数设置
                        if (checkModalType === "sendLiquidCooler") {
                            values = await form.validateFields(['coolingPoint', 'heatPoint', 'coolingDiffPoint', 'heatDiffPoint']);
                            res = await sendLiquidCoolerServe({ ...values, dtuIds: deviceList, type: deviceVersion })
                        }
                    }
                    if (res?.data?.code === "ok") {
                        setCheckModalOpen(false);
                        checkForm.resetFields();
                        setDurationListDataSource(newDurationListDataSource);
                        if (checkModalType === "switchModes") {
                            setMode(nextMode);
                            form.setFieldsValue({ mode: nextMode })
                        }
                        if (checkModalType === "runModePCS" || checkModalType === "runModeBMS") {
                            setTimeout(() => {
                                getInitData();
                            }, 1000 * 60 * 2);
                        }
                    }
                }}
                centered
            >
                <div style={{ padding: 20 }}>
                    <Form form={checkForm} >
                        <Form.Item name={"password"} label={intl.formatMessage({ id: '请输入密码' })} rules={[{ ...FORM_REQUIRED_RULE }]}>
                            <Input placeholder={intl.formatMessage({ id: '请输入密码' })} className="pwd" />
                        </Form.Item>
                    </Form>
                    <div style={{ marginLeft: 10 }}>
                        {
                            checkModalType === "switchModes" && nextMode === 0 &&
                            intl.formatMessage({ id: '确定切换为自动模式吗?' })
                        }
                        {
                            checkModalType === "switchModes" && nextMode === 1 &&
                            intl.formatMessage({ id: '确定切换为手动模式吗?' })
                        }
                        {
                            checkModalType === "runModePCS" && nextRunModePCS === 0 &&
                            intl.formatMessage({ id: '确定下发PCS关机命令吗?' })
                        }
                        {
                            checkModalType === "runModePCS" && nextRunModePCS === 1 &&
                            intl.formatMessage({ id: '确定下发PCS开机命令吗?' })
                        }
                        {
                            checkModalType === "runModePCS" && nextRunModePCS === 2 &&
                            intl.formatMessage({ id: '确定下发PCS复位命令吗?' })
                        }
                        {
                            checkModalType === "runModeBMS" && nextRunModeBMS === 0 &&
                            intl.formatMessage({ id: '确定下发BMS关机命令吗?' })
                        }
                        {
                            checkModalType === "runModeBMS" && nextRunModeBMS === 1 &&
                            intl.formatMessage({ id: '确定下发BMS开机命令吗?' })
                        }
                        {
                            checkModalType === "runModeBMS" && nextRunModeBMS === 2 &&
                            intl.formatMessage({ id: '确定下发BMS复位命令吗?' })
                        }
                        {
                            checkModalType && checkModalType !== "switchModes" && checkModalType !== "runModePCS" && checkModalType !== "runModeBMS" &&
                            intl.formatMessage({ id: '确定执行该操作吗?' })
                        }
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default PolicyConfiguration;