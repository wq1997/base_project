import { Form, theme, Space, Row, Modal, Col, Switch, Input, Radio, InputNumber } from "antd";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Title, EditTable } from "@/components";
import { useIntl } from "umi";
import ButtonGroup from "./component/ButtonGroup";
import { useState, useEffect } from "react";
import {
    getBurCmdHistory2 as getBurCmdHistory2Serve,
    verifyPassword as verifyPasswordServe,
    sendPCSSetting as sendPCSSettingServe,
    sendBMSSetting as sendBMSSettingServe,
    sendPCSPower as sendPCSPowerServe,
    sendParamSetting as sendParamSettingServe,
    sendStrategySelect as sendStrategySelectServe,
    sendDehumidifier as sendDehumidifierServe,
    sendLiquidCooler as sendLiquidCoolerServe,
    switchModes as switchModesServe,
} from "@/services";
import { getQueryString } from "@/utils/utils";
import { FORM_REQUIRED_RULE } from "@/utils/constants";

const PolicyConfiguration = () => {
    const id = getQueryString("id");
    const intl = useIntl();
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [checkForm] = Form.useForm();
    const [mode, setMode] = useState();
    const [nextMode, setNextMode] = useState();
    const [checkModalOpen, setCheckModalOpen] = useState(false);
    const [checkModalType, setCheckModalType] = useState('');
    const canIssue = mode===1;

    const strategyList = [
        {label: intl.formatMessage({id: '策略1'}), value: 0},
        {label: intl.formatMessage({id: '策略2'}), value: 1}
    ]

    const monthList = [
        {label: intl.formatMessage({id: '1月'}), value: 'januaryStrategy'},
        {label: intl.formatMessage({id: '2月'}), value: 'februaryStrategy'},
        {label: intl.formatMessage({id: '3月'}), value: 'marchStrategy'},
        {label: intl.formatMessage({id: '4月'}), value: 'aprilStrategy'},
        {label: intl.formatMessage({id: '5月'}), value: 'mayStrategy'},
        {label: intl.formatMessage({id: '6月'}), value: 'juneStrategy'},
        {label: intl.formatMessage({id: '7月'}), value: 'julyStrategy'},
        {label: intl.formatMessage({id: '8月'}), value: 'augustStrategy'},
        {label: intl.formatMessage({id: '9月'}), value: 'septemberStrategy'},
        {label: intl.formatMessage({id: '10月'}), value: 'octoberStrategy'},
        {label: intl.formatMessage({id: '11月'}), value: 'novemberStrategy'},
        {label: intl.formatMessage({id: '12月'}), value: 'decemberStrategy'}
    ]

    const areaStyle = useEmotionCss(()=>{
        return {
            background: token.bgcColorB_l,
            padding: '40px 30px',
            borderRadius: '16px'
        }
    })

    const distributeStyle = useEmotionCss(()=>{
        return {
            cursor: 'pointer',
            padding: '5px 20px',
            borderRadius: 5,
            backgroundColor: token.defaultBg,
        }
    })

    const disabledDistributeStyle = useEmotionCss(()=>{
        return {
            cursor: 'pointer',
            padding: '5px 20px',
            borderRadius: 5,
            backgroundColor: '#2C638F',
        }
    })

    const getInitData = async () => {
        const res = await getBurCmdHistory2Serve({dtuId:id});
        if(res?.data?.data){
            const data = res?.data?.data;
            form.setFieldsValue({
                ...data
            });
            setMode(res?.data?.data?.mode);
        }
    }

    useEffect(()=>{
        getInitData();
    }, [])

    return (
        <>
            <Form 
                form={form} 
                colon={false}
            >
                <Space style={{width: '100%', height: 'auto', minHeight: '100%',  background: "#0A1328"}} direction="vertical" size={12}>
                    <div className={areaStyle}>
                        <Space style={{width: '100%'}} direction="vertical">
                            <Form.Item label={intl.formatMessage({id: '策略模式'})} name="mode"  rules={[{ ...FORM_REQUIRED_RULE }]}>
                                <ButtonGroup 
                                    value={mode}
                                    mode={'controlled'}
                                    options={[
                                        {label: intl.formatMessage({id: '自动'}), value: 0},
                                        {label: intl.formatMessage({id: '手动'}), value: 1},
                                    ]}
                                    onControlledChange={async value=>{
                                        setNextMode(value);
                                        setCheckModalOpen(true);
                                        setCheckModalType('switchModes');

                                    }}
                                />
                            </Form.Item>
                            <Space style={{width: '100%'}} direction="vertical" size={20}>
                                <Row justify="space-between" align="middle">
                                    <Title title={intl.formatMessage({id: '设备命令'})} />
                                </Row>
                                <Space style={{width: '100%', padding: '0 20px'}} direction="vertical" size={30}>
                                    <Row>
                                        <Col span={12}>
                                            <Row gutter={24}>
                                                <Col>
                                                    <Form.Item label={intl.formatMessage({id: 'PCS设置'})} name="pcsStartStop" rules={[{ ...FORM_REQUIRED_RULE }]}  style={{margin: 0}}>
                                                        <ButtonGroup 
                                                            options={[
                                                                {label: intl.formatMessage({id: 'PCS开机'}), value: 1},
                                                                {label: intl.formatMessage({id: 'PCS关机'}), value: 2},
                                                                {label: intl.formatMessage({id: 'PCS待机'}), value: 3},
                                                                {label: intl.formatMessage({id: 'PCS复位'}), value: 4},
                                                            ]}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <div
                                                        className={canIssue?distributeStyle:disabledDistributeStyle}
                                                        onClick={async ()=>{
                                                            await form.validateFields(['pcsStartStop']);
                                                            if(canIssue){
                                                                setCheckModalOpen(true);
                                                                setCheckModalType('pcsStartStop');
                                                            }
                                                        }}
                                                    >
                                                        {intl.formatMessage({id: '下发'})}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row gutter={12}>
                                                <Col>
                                                    <Form.Item label={intl.formatMessage({id: 'BMS设置'})} name="bmsStartStop" rules={[{ ...FORM_REQUIRED_RULE }]}  style={{margin: 0}}>
                                                        <ButtonGroup 
                                                            options={[
                                                                {label: intl.formatMessage({id: 'BMS开机'}), value: 1},
                                                                {label: intl.formatMessage({id: 'BMS关机'}), value: 2},
                                                            ]}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <div
                                                        className={canIssue?distributeStyle:disabledDistributeStyle}
                                                        onClick={async ()=>{
                                                            await form.validateFields(['bmsStartStop']);
                                                            if(canIssue){
                                                                setCheckModalOpen(true);
                                                                setCheckModalType('bmsStartStop');
                                                            }
                                                        }}
                                                    >
                                                        {intl.formatMessage({id: '下发'})}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Row gutter={24}>
                                                <Col>
                                                    <Form.Item label={`${intl.formatMessage({id: 'PCS功率'})}(kW)`} name="pcsPower"  rules={[{ ...FORM_REQUIRED_RULE }]}  style={{margin: 0}}>
                                                        <Input disabled={!canIssue} placeholder={intl.formatMessage({id: '请输入PCS功率'})} style={{width: 300}} />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <div
                                                        className={canIssue?distributeStyle:disabledDistributeStyle}
                                                        onClick={async ()=>{
                                                            await form.validateFields(['pcsPower']);
                                                            if(canIssue){
                                                                setCheckModalOpen(true);
                                                                setCheckModalType('pcsPower');
                                                            }
                                                        }}
                                                    >
                                                        {intl.formatMessage({id: '下发'})}
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
                        <Space style={{width: '100%'}} direction="vertical" size={30}>
                            <Row justify="space-between">
                                <Title title={intl.formatMessage({id: '参数设置'})} />
                                <div 
                                    className={canIssue?distributeStyle:disabledDistributeStyle}
                                    onClick={async ()=>{
                                        await form.validateFields(['isExpand','kilowatt','percentage']);
                                        if(canIssue){
                                            setCheckModalOpen(true);
                                            setCheckModalType('sendParamSetting');
                                        }
                                    }}
                                >
                                    {intl.formatMessage({id: '下发'})}
                                </div>
                            </Row> 
                            <Row>
                                <Col span={2}>
                                    <Form.Item label={intl.formatMessage({id: '扩容'})} name="isExpand" valuePropName="checked" style={{margin: 0}}>
                                        <Switch disabled={!canIssue} defaultValue={false} />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item label={intl.formatMessage({id: '变压器容量'})} style={{margin: 0}}>
                                        <Space direction="horizontal">
                                            <Form.Item style={{margin: 0}} name="kilowatt" rules={[{ ...FORM_REQUIRED_RULE }]}>
                                                <Input disabled={!canIssue} style={{width: 200}} placeholder="kW" />
                                            </Form.Item>
                                            <Form.Item style={{margin: 0}} name="percentage" rules={[{ ...FORM_REQUIRED_RULE }]}>
                                                <Input disabled={!canIssue} style={{width: 200}} placeholder="%"/>
                                            </Form.Item>
                                        </Space>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Space>
                    </div>
                    <div className={areaStyle}>
                        <Space style={{width: '100%'}} direction="vertical" size={30}>
                            <Row justify="space-between">
                                <Title title={intl.formatMessage({id: '策略配置'})} />
                                <div 
                                    className={canIssue?distributeStyle:disabledDistributeStyle}
                                    onClick={async ()=>{
                                        if(canIssue){
                                            const values = await form.validateFields(['strategyList']);
                                            console.log(values);
                                        }
                                    }}
                                >
                                    {intl.formatMessage({id: '下发'})}
                                </div>
                            </Row> 
                            <Form.Item name="strategyList">
                                <EditTable.EditRowTable
                                    showAdd={canIssue}
                                    showClear={canIssue}
                                    showEdit={canIssue}
                                    showDelete={canIssue}
                                    data={[
                                        {type: '尖'}
                                    ]}
                                    columns={[
                                        {
                                            title: intl.formatMessage({id: '时段'}),
                                            dataIndex: 'shiduan',
                                            editable: true,
                                            inputType: 'Select',
                                            options: [
                                                {value: '尖', name: intl.formatMessage({id: '尖'})},
                                                {value: '峰', name: intl.formatMessage({id: '峰'})},
                                                {value: '平', name: intl.formatMessage({id: '平'})},
                                                {value: '谷', name: intl.formatMessage({id: '谷'})}
                                            ]
                                        },
                                        {
                                            title: intl.formatMessage({id: '类型'}),
                                            dataIndex: 'leixing',
                                            editable: true,
                                            inputType: 'Select',
                                            options: [
                                                {value: '充电', name: intl.formatMessage({id: '充电'})},
                                                {value: '放电', name: intl.formatMessage({id: '放电'})},
                                            ]
                                        },
                                        {
                                            title: intl.formatMessage({id: 'SOC(%)'}),
                                            dataIndex: 'soc',
                                            editable: true,
                                            inputType: 'Input',
                                        },
                                        {
                                            title: `${intl.formatMessage({id: '功率'})}(kW)`,
                                            dataIndex: 'gonglve',
                                            editable: true,
                                            inputType: 'Input',
                                        },
                                        {
                                            title: `${intl.formatMessage({id: '电价'})}(${intl.formatMessage({id: '元'})})`,
                                            dataIndex: 'dianjia',
                                            editable: true,
                                            inputType: 'InputNumber',
                                        },
                                        {
                                            title: `${intl.formatMessage({id: '开始时间'})}~${intl.formatMessage({id: '结束时间'})}`,
                                            dataIndex: 'timetime',
                                            editable: true,
                                            inputType: 'CustomDatePicker',
                                        }
                                    ]}
                                    strategyList={strategyList}
                                    correlationList={['shiduan','dianjia']}
                                    maxLength={2}
                                />
                            </Form.Item>
                        </Space>                              
                    </div>

                    <div className={areaStyle}>
                        <Space style={{width: '100%'}} direction="vertical" size={20}>
                            <Row justify="space-between" align="middle">
                                <Title title={intl.formatMessage({id: '策略选择'})} />
                                <div 
                                    className={canIssue?distributeStyle:disabledDistributeStyle}
                                    onClick={async ()=>{
                                        await form.validateFields(monthList.map(month=>month.value));
                                        if(canIssue){
                                            setCheckModalOpen(true);
                                            setCheckModalType('sendStrategySelect');
                                        }
                                    }}
                                >
                                    {intl.formatMessage({id: '下发'})}
                                </div>
                            </Row>
                            <Row>
                                {
                                    monthList.map(month => {
                                        return (
                                            <Col span={24/monthList.length}>
                                                <div style={{marginBottom: 10}}>{month.label}</div>
                                                <Form.Item name={month.value} layout="vertical" rules={[{ ...FORM_REQUIRED_RULE }]} style={{margin: 0}}>
                                                    <Radio.Group>
                                                        <Space direction="vertical">
                                                            {strategyList?.map(strategy=><Radio value={strategy.value}>{strategy.label}</Radio>)}
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
                        <Space style={{width: '100%'}} direction="vertical" size={20}>
                            <Row justify="space-between" align="middle">
                                <Title title={intl.formatMessage({id: '除湿机参数设置'})} />
                                <div 
                                    className={distributeStyle}
                                    onClick={async ()=>{
                                        await form.validateFields(['tempStart', 'tempStop', 'humidityStart', 'humidityStop']);
                                        if(canIssue){
                                            setCheckModalOpen(true);
                                            setCheckModalType('sendDehumidifier');
                                        }
                                    }}
                                >
                                    {intl.formatMessage({id: '下发'})}
                                </div>
                            </Row>
                            <Row gutter={50}>
                                <Col span={6}>
                                    <Form.Item name="tempStart" label={intl.formatMessage({id: '除湿机温度启动值(℃)'})} rules={[{ ...FORM_REQUIRED_RULE }]} style={{margin: 0}}>
                                        <InputNumber style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入除湿机温度启动值'})}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="tempStop" label={intl.formatMessage({id: '除湿机温度停止值(℃)'})} rules={[{ ...FORM_REQUIRED_RULE }]} style={{margin: 0}}>
                                        <InputNumber style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入除湿机温度停止值'})}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="humidityStart" label={intl.formatMessage({id: '除湿机湿度启动值(%rh)'})} rules={[{ ...FORM_REQUIRED_RULE }]} style={{margin: 0}}>
                                        <InputNumber style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入除湿机湿度启动值'})}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="humidityStop" label={intl.formatMessage({id: '除湿机湿度停止值(%rh)'})} rules={[{ ...FORM_REQUIRED_RULE }]} style={{margin: 0}}>
                                        <InputNumber style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入除湿机湿度停止值'})}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Space>
                    </div>

                    <div className={areaStyle}>
                        <Space style={{width: '100%'}} direction="vertical" size={20}>
                            <Row justify="space-between" align="middle">
                                <Title title={intl.formatMessage({id: '液冷机参数设置'})} />
                                <div 
                                    className={distributeStyle}
                                    onClick={async ()=>{
                                        await form.validateFields(['coldPoint', 'hotPoint', 'coolingDifference', 'heatingDifference']);
                                        if(canIssue){
                                            setCheckModalOpen(true);
                                            setCheckModalType('sendLiquidCooler');
                                        }
                                    }}
                                >
                                    {intl.formatMessage({id: '下发'})}
                                </div>
                            </Row>
                            <Row gutter={50}>
                                <Col span={6}>
                                    <Form.Item name="coldPoint" label={intl.formatMessage({id: '液冷制冷点(℃)'})}  rules={[{ ...FORM_REQUIRED_RULE }]} style={{margin: 0}}>
                                        <InputNumber style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入液冷制冷点'})}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="hotPoint" label={intl.formatMessage({id: '液冷加热点(℃)'})}  rules={[{ ...FORM_REQUIRED_RULE }]} style={{margin: 0}}>
                                        <InputNumber style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入液冷加热点'})}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="coolingDifference" label={intl.formatMessage({id: '液冷制冷回差(℃)'})}  rules={[{ ...FORM_REQUIRED_RULE }]} style={{margin: 0}}>
                                        <InputNumber style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入液冷制冷回差'})}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="heatingDifference" label={intl.formatMessage({id: '液冷加热回差(℃)'})}  rules={[{ ...FORM_REQUIRED_RULE }]} style={{margin: 0}}>
                                        <InputNumber style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入液冷加热回差'})}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Space>
                    </div>
                </Space>
            </Form>
            <Modal
                title={intl.formatMessage({id: '密码校验'})}
                open={checkModalOpen}
                onCancel={()=>{
                    setCheckModalOpen(false);
                    checkForm.resetFields();
                }}
                onOk={async ()=>{
                    let res = null;
                    let values = null;
                    const checkValues = await checkForm.validateFields(['password']);
                    const verifyPasswordRes = await verifyPasswordServe(checkValues);
                    if(verifyPasswordRes?.data?.code==="ok"){
                        // 策略模式
                        if(checkModalType==="switchModes"){
                            values = await form.validateFields(['mode']);
                            res = await switchModesServe({...values, dtuId: id, type: 7});
                        }
                        // 设备命令-PCS设置
                        if(checkModalType==="pcsStartStop"){
                            values = await form.validateFields(['pcsStartStop']);
                            res = await sendPCSSettingServe({...values, dtuId: id, type: 7});
                        }
                        // 设备命令-BMS设置
                        if(checkModalType==="bmsStartStop"){
                            values = await form.validateFields(['bmsStartStop']);
                            res = await sendBMSSettingServe({...values, dtuId: id, type: 7});
                        }
                        // 设备命令-PCS功率
                        if(checkModalType==="pcsPower"){
                            values = await form.validateFields(['pcsPower']);
                            res = await sendPCSPowerServe({...values, dtuId: id, type: 7});
                        }
                        // 参数设置
                        if(checkModalType==="sendParamSetting"){
                            values = await form.validateFields(['isExpand', 'kilowatt', 'kilowatt']);
                            res = await sendParamSettingServe({...values, isExpand: values?.isExpand?1:0, dtuId: id, type: 7});
                        }
                        // 策略选择
                        if(checkModalType==="sendStrategySelect"){
                            values = await form.validateFields(monthList.map(month=>month.value));
                            res = await sendStrategySelectServe({...values, dtuId: id, type: 7})
                        }
                        // 除湿机参数设置
                        if(checkModalType==="sendDehumidifier"){
                            values = await form.validateFields(['tempStart', 'tempStop', 'humidityStart', 'humidityStop']);
                            res = await sendDehumidifierServe({...values, dtuId: id, type: 7})
                        }
                        // 液冷机参数设置
                        if(checkModalType==="sendLiquidCooler"){
                            values = await form.validateFields(['coldPoint', 'hotPoint', 'coolingDifference', 'heatingDifference']);
                            res = await sendLiquidCoolerServe({...values, dtuId: id, type: 7})
                        }
                    }
                    if(res?.data?.code==="ok"){
                        setCheckModalOpen(false);
                        checkForm.resetFields();
                        if(checkModalType==="switchModes"){
                            setMode(nextMode);
                        }
                    }
                }}
                centered
            >
                <Form form={checkForm} >
                    <Form.Item name={"password"} rules={[{ ...FORM_REQUIRED_RULE }]}>
                        <Input className="pwd" />
                    </Form.Item>
                </Form>
                <div>{intl.formatMessage({id: '确定执行该操作吗?'})}</div>
            </Modal>
        </>
    )
}

export default PolicyConfiguration;