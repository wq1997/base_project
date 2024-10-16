import { theme, Select, Row, Space, Button, Modal, Form, Input, message, Tabs,InputNumber } from "antd";
import { Title } from "@/components";
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { FORM_REQUIRED_RULE, } from "@/utils/constants";
import { useSelector, useIntl } from "umi";
import { getEncrypt, } from "@/utils/utils";
import { getOMCommands,sendOMCommands  } from '@/services/policy'

const { Option } = Select;

const OperationManage = () => {
    const { token } = theme.useToken();
    const [form1] = Form.useForm(); // 控制模式
    const [form2] = Form.useForm(); // PCS总开机 / PCS总关机
    const [form3] = Form.useForm(); // 总功率设置
    const [form4] = Form.useForm(); // 其他弹框
    const [controlModeOpen, setControlModeOpen] = useState(false); // 控制模式
    const [powerOnOpen, setPowerOnOpen] = useState(false);  // PCS总开机
    const [powerOffOpen, setPowerOffOpen] = useState(false); // PCS总关机
    const [powerSettingOpen, setPowerSettingOpen] = useState(false) // 总功率设置
    const [otherOpen, setOtherOpen] = useState(false); // 其他弹框
    const [title, setTitle] = useState(); // 其他弹框title
    const [seletOption, setSelectOption] = useState([]);
    const [gridId, setGridId] = useState();
    const [currentGrid, setCurrentGrid] = useState();
    const [initData, setInitData] = useState([]);
    const [cmdKey, setCmdKey] = useState();
    const [devId, setDevId] = useState();
    const [keyObj, setKeyObj] = useState();
    const [valueObj, setValueObj] = useState();
    const [dtuId, setDtuId] = useState();

    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }

    const MyButton = ({ text,keyObj,valueObj, cmdKey, devId, onClick,color }) => {
        const onBtnClick = () => {
            setTitle(t(text));
            setOtherOpen(true);
            setCmdKey(cmdKey);
            setDevId(devId)
            setKeyObj(keyObj);
            setValueObj(valueObj);
            onClick && onClick();
        }
        return (
            <div
                style={{ width: 132, height: 48, borderRadius: 4, background: color?.background||'#D1D9EF', color: color?.color||'#6978A1', fontSize: 18, lineHeight: '48px', textAlign: 'center', cursor: 'pointer' }}
                onClick={onBtnClick}
            >
                {t(text)}
            </div>
        )
    }
    useEffect(() => {
    }, []);
    useEffect(() => {
        getInitData();
    }, [gridId]);


    const getInitData = async () => {
        let { data: res } = await getOMCommands({ plantId: localStorage.getItem('plantId') });
        setInitData(res?.data)
    }
    const onChange = (key) => {
        console.log(key);
    };
    const getChildren = (item) => {
        return (<>
            <div style={{ backgroundColor: token.titleCardBgc, padding: '24px 37px', boxSizing: 'border-box' }}>
                <Row justify="space-between" style={{ marginTop: 20 }}>
                    <Space size={38}>
                        <MyButton text="开机" keyObj='pcsStartStop' valueObj={1} cmdKey='7002' devId={item.devId} color={{background:token.barColor[0],color:'#fff'}}/>
                        <MyButton text="关机" keyObj='pcsStartStop' valueObj={2} cmdKey='7002' devId={item.devId} color={{background:token.barColor[0],color:'#fff'}}/>
                        <MyButton text="复位" keyObj='pcsStartStop' valueObj={3} cmdKey='7002'devId={item.devId} color={{background:token.barColor[0],color:'#fff'}}/>
                        <MyButton text="BMS开机" keyObj='pcsStartStop' valueObj={4}  cmdKey='7016' devId={item.devId} color={{background:token.barColor[5],color:'#fff'}}/>
                        <MyButton text="分闸" keyObj='mcsSwitchOnOff' valueObj={1}  cmdKey='7015'  devId={item.mcsDevId}  color={{background:token.barColor[6],color:'#fff'}}/>
                        <MyButton text="合闸" keyObj='mcsSwitchOnOff' valueObj={0}  cmdKey='7015' devId={item.mcsDevId}  color={{background:token.barColor[6],color:'#fff'}}/>
                        <MyButton text="功率设置"  keyObj='pcsPower' cmdKey='7019' devId={item.devId}/>
                        <span>{item.pcsStatus}</span>
                        <span>{item.power}</span>
                        <span>{item.g3CircuitBreakerState}</span>
                    </Space>
                </Row>
            </div>
            {
                            item?.branchList?.map((it, index) => {
                                return (
                                    <div style={{ backgroundColor: token.titleCardBgc, padding: '20px 37px', boxSizing: 'border-box' }}>
                                        <Title title={it.name} />
                                        <Space size={40} direction="vertical" style={{ width: '100%', marginTop:'20px'}}>
                                            <Row justify="space-between">
                                                <Space size={32}>
                                                    <MyButton text="开机" keyObj='pcsStartStop' valueObj={1}  cmdKey='7004' devId={it.devId} />
                                                    <MyButton text="关机" keyObj='pcsStartStop' valueObj={2}  cmdKey='7004'devId={it.devId} />
                                                    <MyButton text="BMS开机"keyObj='bmsStartStop' valueObj={1}  cmdKey='7003' devId={it.bmsDevId} />
                                                    <MyButton text="BMS关机" keyObj='bmsStartStop' valueObj={2}  cmdKey='7003' devId={it.bmsDevId} />
                                                    <MyButton text="功率设置" keyObj='pcsPower'   cmdKey='7001' devId={it.devId} />
                                                    <span>{t('状态')}：{it?.bmcStatus}</span>
                                                    <span>{t('功率')}：{it?.bmcPower}</span>
                                                </Space>
                                            </Row>
                                        </Space>
                                    </div>
                                )
                            })
                        }
        </>)
    }
    return (
        <div style={{ color: token.titleColor }}>
            <Space size={8} direction="vertical" style={{ width: '100%' }}>
                <div style={{ backgroundColor: token.titleCardBgc, height: 100, padding: '24px 37px', boxSizing: 'border-box' }}>
                    <Space size={44}>
                        <Space size={33}>
                            <Button type="primary" size="large" onClick={() => setControlModeOpen(true)}>{t('控制模式')}</Button>
                            <Button type="primary" size="large" onClick={() => setPowerSettingOpen(true)}>{t('总功率设置')}</Button>
                            <Button type="primary" size="large" onClick={() => setPowerOnOpen(true)}>{t('PCS总开机')}</Button>
                            <Button type="primary" size="large" onClick={() => setPowerOffOpen(true)}>{t('PCS总关机')}</Button>
                        </Space>
                    </Space>
                </div>
                <Tabs defaultActiveKey={initData?.[0]?.id} items={
                    initData?.map((it) => {
                        return {
                            key: it.id,
                            label: it.name,
                            children: getChildren(it),
                        }
                    })
                } onChange={onChange} />
            </Space>

            <Modal
                open={controlModeOpen}
                title={<Title title={t("控制模式")} />}
                onOk={async () => {
                    const values = await form1.validateFields();
                    let { data } = await sendOMCommands({
                        cmdTypeId: 7000,
                        gridPointId: gridId,
                        password: getEncrypt(localStorage.getItem('publicKey'), values.password),
                        mode: values.mode,
                        dtuId,
                    });
                    if (data.code == 200) {
                        message.success(t('命令下发成功'));
                    } else {
                        message.warning(t(data?.msg));
                    }
                    setControlModeOpen(false);
                    form1.resetFields();
                }}
                onCancel={() => {
                    setControlModeOpen(false);
                    form1.resetFields();
                }}
            >
                <Form
                    form={form1}
                >
                    <Form.Item name={"password"} label={t("请输入密码")} rules={[FORM_REQUIRED_RULE]}>
                        <Input className="pwd" placeholder={t("请输入密码")} />
                    </Form.Item>
                    <Form.Item name={"mode"} label={t("请选择模式")} rules={[FORM_REQUIRED_RULE]}>
                        <Select
                            options={[
                                { label: t('手动'), value: 0 },
                                { label: t('自动'), value: 1 }
                            ]}
                            placeholder={t("请选择模式")}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                open={powerOffOpen || powerOnOpen}
                title={<Title title={powerOffOpen ? t('PCS总关机') : t("PCS总开机")} />}
                onOk={async () => {
                    const values = await form2.validateFields();
                    let { data } = await sendOMCommands({
                        cmdTypeId: 7018,
                        gridPointId: gridId,
                        password: getEncrypt(localStorage.getItem('publicKey'), values.password),
                        pcsTotalStartStop:powerOffOpen?0:1,
                        dtuId,
                    });
                    if (data.code == 200) {
                        message.success(t('命令下发成功'));
                    } else {
                        message.warning(t(data?.msg));
                    }
                    setPowerOffOpen(false);
                    setPowerOnOpen(false);
                    form2.resetFields();
                }}
                onCancel={() => {
                    setPowerOffOpen(false);
                    setPowerOnOpen(false);
                    form2.resetFields();
                }}
            >
                <Form
                    form={form2}
                >
                    <Form.Item label={t("请输入密码")} name={"password"} rules={[FORM_REQUIRED_RULE]}>
                        <Input className="pwd" placeholder={t("请输入密码")}/>
                    </Form.Item>
                    <span style={{marginLeft:'10px'}}>{t('确定下发指令吗？')}</span>
                </Form>
            </Modal>

            <Modal
                open={powerSettingOpen}
                title={<Title title={t("总功率设置")} />}
                onOk={async () => {
                    const values = await form3.validateFields();
                    // console.log('总功率设置', values);
                    let { data } = await sendOMCommands({
                        cmdTypeId: 7017,
                        gridPointId: gridId,
                        password: getEncrypt(localStorage.getItem('publicKey'), values.password),
                        pcsTotalPower: values.power,
                        dtuId,
                    });
                    if (data.code == 200) {
                        message.success(t('命令下发成功'));
                    } else {
                        message.warning(t(data?.msg));
                    }
                    setPowerSettingOpen(false);
                    form3.resetFields();
                }}
                onCancel={() => {
                    setPowerSettingOpen(false);
                    form3.resetFields();
                }}
            >
                <Form
                    form={form3}
                    labelCol={{
                        span: 6
                    }}
                >
                    <Form.Item label={t("请输入密码")} name={"password"} rules={[FORM_REQUIRED_RULE]}>
                        <Input className="pwd" type="text" placeholder={t("请输入密码")} />
                    </Form.Item>
                    <Form.Item label={`${t("请输入功率")}(kW)`} name={"power"} rules={[FORM_REQUIRED_RULE]}>
                        <Input placeholder={t("请输入功率")} />
                    </Form.Item>
                </Form>
            </Modal>

            {/* 其他弹框 */}
            <Modal
                open={otherOpen}
                title={<Title title={title} />}
                onOk={async () => {
                    const values = await form4.validateFields();
                    let { data } = await sendOMCommands({
                        [keyObj]:values?.power?values?.power:valueObj,
                        devId,
                        cmdTypeId:cmdKey,
                        gridPointId: gridId,
                        password: getEncrypt(localStorage.getItem('publicKey'), values.password),
                        dtuId
                    });
                    if (data.code == 200) {
                        message.success(t('命令下发成功'));
                    } else {
                        message.warning(t(data?.msg));
                    }
                    setOtherOpen(false);
                    form4.resetFields();
                }}
                onCancel={() => {
                    setOtherOpen(false);
                    form4.resetFields();
                }}
            >
                <Form
                    form={form4}
                >
                    <Form.Item label={t("请输入密码")} name={"password"} rules={[FORM_REQUIRED_RULE]}>
                        <Input className="pwd" placeholder={t("请输入密码")} />
                    </Form.Item>
                    {(cmdKey == 7019||cmdKey == 7017||cmdKey == 7001) && <Form.Item label={t("请输入功率")} name={"power"} rules={[FORM_REQUIRED_RULE]}>
                        <Input style={{
                            width: '100%',
                        }} placeholder={t("请输入功率")} />
                    </Form.Item>}
                    <span style={{marginLeft:'10px'}}>{t('确定下发指令吗？')}</span>
                </Form>
            </Modal>
        </div>
    )
}

export default OperationManage;