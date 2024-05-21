import { theme, Select, Row, Space, Button, Modal, Form, Input, message, InputNumber } from "antd";
import { Title } from "@/components";
import { getGridPointList, getOMCommands, sendOMCommands } from '@/services/policy'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { FORM_REQUIRED_RULE, } from "@/utils/constants";
import { useSelector, useIntl } from "umi";
import { getEncrypt, } from "@/utils/utils";

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
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }

    const MyButton = ({ text, cmdKey, devId, onClick }) => {
        const onBtnClick = () => {
            setTitle(text);
            setOtherOpen(true);
            setCmdKey(cmdKey);
            setDevId(devId)
            onClick && onClick();
        }
        return (
            <div
                style={{ width: 132, height: 48, borderRadius: 4, background: '#D1D9EF', color: '#6978A1', fontSize: 18, lineHeight: '48px', textAlign: 'center', cursor: 'pointer' }}
                onClick={onBtnClick}
            >
                {t(text)}
            </div>
        )
    }
    useEffect(() => {
        getInit();
    }, []);
    useEffect(() => {
        getInitData();
    }, [gridId]);
    const changeGrid = (val) => {
        setCurrentGrid(
            seletOption.find(it => it.value == val)
        )
        setGridId(val);
    }
    const getInit = async () => {
        let { data } = await getGridPointList({ plantId: localStorage.getItem('plantId') });
        let arr = [];
        data?.data.map(it => {
            arr.push({
                label: it.gridPointName,
                value: it.id,
                ...it
            })
        })
        setSelectOption([...arr]);
        setGridId(arr[0]?.value);
        setCurrentGrid(arr[0]);
    }

    const getInitData = async () => {
        let { data: res } = await getOMCommands({ gridPointId: gridId });
        setInitData(res?.data)
    }
    return (
        <div style={{ color: token.titleColor }}>
            <Space size={8} direction="vertical" style={{ width: '100%' }}>
                <div style={{ backgroundColor: token.titleCardBgc, height: 100, padding: '24px 37px', boxSizing: 'border-box' }}>
                    <Space size={44}>
                        <Row align="middle" style={{ height: '100%' }}>
                            <span>{t('并网点')}：</span>
                            <Select
                                style={{ width: 240, }}
                                placeholder={t('请选择并网点')}
                                key={seletOption[0]?.value}
                                defaultValue={seletOption[0]?.value}
                                onChange={changeGrid}
                            >{seletOption && seletOption.map(item => {
                                return (<Option key={item.value} value={item.value}>{item.label}</Option>);
                            })
                                }
                            </Select>
                        </Row>
                        <Space size={33}>
                            <Button type="primary" size="large" onClick={() => setControlModeOpen(true)}>{t('控制模式')}</Button>
                            <Button type="primary" size="large" onClick={() => setPowerSettingOpen(true)}>{t('总功率设置')}</Button>
                            <Button type="primary" size="large" onClick={() => setPowerOnOpen(true)}>{t('PCS总开机')}</Button>
                            <Button type="primary" size="large" onClick={() => setPowerOffOpen(true)}>{t('PCS总关机')}</Button>
                        </Space>
                    </Space>
                </div>

                {initData?.branchDataList?.map(item => {
                    return (<>
                        <div style={{ backgroundColor: token.titleCardBgc, padding: '24px 37px', boxSizing: 'border-box' }}>
                            <Title title={item?.tranDevName} />
                            <Row justify="space-between" style={{ marginTop: 20 }}>
                                <Space size={38}>
                                    <span>{t('通讯状态')}：{item.transformComState == 1 ? t('连接') : t('断开')}</span>
                                    <span>{t('低压侧有功功率')}：{item.lowVolSidePower}</span>
                                    <span>{t('高压侧有功功率')}：{item.highVolSidePower}</span>
                                    <span>{t('低压侧频率')}：{item.lowVolSideFreq}</span>
                                    <span>{t('高压侧频率')}：{item.highVolSideFreq}</span>
                                </Space>
                                <Space>
                                    <MyButton text="低压分闸" cmdKey='7' devId={item.devId} />
                                    <MyButton text="低压合闸" cmdKey='8' devId={item.devId} />
                                    <MyButton text="高压分闸" cmdKey='9' devId={item.devId} />
                                    <MyButton text="高压合闸" cmdKey='10' devId={item.devId} />
                                </Space>
                            </Row>
                        </div>
                        {
                            item.branchInfoList?.map((it, index) => {
                                return (
                                    <div style={{ backgroundColor: token.titleCardBgc, padding: '24px 37px', boxSizing: 'border-box' }}>
                                        <Title title={`第${index + 1}分支`} />
                                        <Space size={40} direction="vertical" style={{ width: '100%' }}>
                                            <Row justify="space-between">
                                                <Space size={38}>
                                                    <span>{t('设备名称')}：{it?.pcsDevName}</span>
                                                    <span>{t('通讯状态')}：{it?.pcsComState == 1 ? '正常' : '断开 '}</span>
                                                    <span>{t('运行状态')}：{it?.pcsState == 0 ? '开机' : (it?.pcsState == 1 ? '关机' : '待机')}</span>
                                                    <span>{t('有功功率')}：{it?.pcsPower}kW</span>
                                                </Space>
                                                <Space>
                                                    <MyButton text="功率设置" cmdKey='4' devId={item.devId} />
                                                    <MyButton text="开机" cmdKey='1' devId={item.devId} />
                                                    <MyButton text="关机" cmdKey='2' devId={item.devId} />
                                                    <MyButton text="复位" cmdKey='3' devId={item.devId} />
                                                </Space>
                                            </Row>
                                            <Row justify="space-between">
                                                <Space size={38}>
                                                    <span>{t('设备名称')}：{it?.bmsDevName}</span>
                                                    <span>{t('通讯状态')}：{it?.bmsComState == 1 ? '正常' : '断开 '}</span>
                                                    <span>{t('运行状态')}：{it?.bmsState == 0 ? '开机' : (it?.bmsState == 1 ? '关机' : '待机')}</span>
                                                    <span>SOC: {it?.bmsSoc}%</span>
                                                </Space>
                                                <Space>
                                                    <MyButton text="开机" cmdKey='12' devId={item.devId} />
                                                    <MyButton text="关机" cmdKey='13' devId={item.devId} />
                                                    <MyButton text="复位" cmdKey='14' devId={item.devId} />
                                                </Space>
                                            </Row>
                                        </Space>
                                    </div>
                                )
                            })
                        }
                    </>)

                })}

            </Space>

            <Modal
                open={controlModeOpen}
                title={<Title title="控制模式" />}
                onOk={async () => {
                    const values = await form1.validateFields();
                    // console.log('控制模式', values);
                    let { data } = await sendOMCommands({
                        cmdKey: 11,
                        gridPointId: gridId,
                        password: getEncrypt(localStorage.getItem('publicKey'), values.password),
                        keyData: values.mode
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
                    <Form.Item name={"password"} label="请输入密码" rules={[FORM_REQUIRED_RULE]}>
                        <Input className="pwd" placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item name={"mode"} label="请选择模式" rules={[FORM_REQUIRED_RULE]}>
                        <Select
                            options={[
                                { label: '手动', value: '1' },
                                { label: '自动', value: '2' }
                            ]}
                            placeholder="请选择模式"
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                open={powerOffOpen || powerOnOpen}
                title={<Title title={powerOffOpen ? 'PCS总关机' : "PCS总开机"} />}
                onOk={async () => {
                    const values = await form2.validateFields();
                    // console.log('总关机|总开机', values);
                    let { data } = await sendOMCommands({
                        cmdKey: powerOffOpen ? 6 : 5,
                        gridPointId: gridId,
                        password: getEncrypt(localStorage.getItem('publicKey'), values.password),

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
                    <Form.Item label="请输入密码" name={"password"} rules={[FORM_REQUIRED_RULE]}>
                        <Input className="pwd" placeholder="请输入密码" />
                    </Form.Item>
                    <span>确定下发PCS总{powerOffOpen ? '关机' : '开机'}指令吗？</span>
                </Form>
            </Modal>

            <Modal
                open={powerSettingOpen}
                title={<Title title={"总功率设置"} />}
                onOk={async () => {
                    const values = await form3.validateFields();
                    // console.log('总功率设置', values);
                    let { data } = await sendOMCommands({
                        cmdKey: 15,
                        gridPointId: gridId,
                        password: getEncrypt(localStorage.getItem('publicKey'), values.password),

                        keyData: values.power
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
                    <Form.Item label="请输入密码" name={"password"} rules={[FORM_REQUIRED_RULE]}>
                        <Input className="pwd" type="text" placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item label="请输入功率(kW)" name={"power"} rules={[FORM_REQUIRED_RULE]}>
                        <Input placeholder="请输入功率" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* 其他弹框 */}
            <Modal
                open={otherOpen}
                title={<Title title={title} />}
                onOk={async () => {
                    const values = await form4.validateFields();
                    // console.log('其他', values);
                    let { data } = await sendOMCommands({
                        devId,
                        cmdKey,
                        gridPointId: gridId,
                        password: getEncrypt(localStorage.getItem('publicKey'), values.password),
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
                    <Form.Item label="请输入密码" name={"password"} rules={[FORM_REQUIRED_RULE]}>
                        <Input className="pwd" placeholder="请输入密码" />
                    </Form.Item>
                    {cmdKey == 4 && <Form.Item label="请输入功率" name={"power"} rules={[FORM_REQUIRED_RULE]}>
                        <InputNumber style={{
                            width: '100%',
                        }} placeholder="请输入功率" />
                    </Form.Item>}
                    <span>确定下发指令吗？</span>
                </Form>
            </Modal>
        </div>
    )
}

export default OperationManage;