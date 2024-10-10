// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from "./index.less";
import { theme, message, Space, Flex, InputNumber, Modal, Form, Input, } from "antd";
import { useSelector, useIntl } from "umi";
import { sendBurCmd2 } from '@/services/policy'
import { Title } from "@/components";
import { getEncrypt, } from "@/utils/utils";
import { FORM_REQUIRED_RULE, } from "@/utils/constants";
import {
    getPublicKey as getPublicKeySever,
} from "@/services/user";
function Com({ devId, dtuId, historyAllData, mode }) {
    const { token } = theme.useToken();
    const [form1] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allPolicy, setAllPolicy] = useState({
        pcsPower:  historyAllData?.pcsPower || 0,
        pcsStartStop:'',
        bmsStartStop:'',
        pcsPowerWaveRange: historyAllData?.pcsPowerWaveRange || 0
    })
    const [type, setType] = useState('pcsPower');
    const [reqType, setReqType] = useState('pcsStartStop');
    const [value, setValue] = useState('0');
    const [title, setTitle] = useState();
    const [currentId, setCurrentId] = useState(devId.pcsDevId);
    const cmdTypeId = {
        pcsPower: 7001,
        pcsStartStop: 7002,
        bmsStartStop: 7003,
        pcsPowerWaveRange: 7004,
    }
    console.log(devId,11111);
    
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
    }, [])
    const changeType = () => {
        setAllPolicy({ ...allPolicy, [type]: value, })
    }
    const showModal = (id, reqType, type, value, title) => {
        if (value === null || value === undefined) {
            message.error(t('参数不能为空'), 3);
            return
        } else {
            setTitle(t(title))
            setIsModalOpen(true);
            setType(type);
            setValue(value);
            setCurrentId(id);
            setReqType(reqType);
        }

    };

    const changeInput = (val, name) => {
        setAllPolicy({ ...allPolicy, [name]: val, });
    }
    return (
        <div className={styles.content} style={{ backgroundColor: token.titleColor1 }}>
            <Space size={30} direction="vertical" >
                <div className={styles.Pcs}> 
                    <Flex gap={18}>
                        <div className={styles.label}>{'PCS'}:</div>
                        <Flex gap={30}>
                            <div className={styles.selectionBox} style={{backgroundColor: allPolicy.pcsStartStop == '0' ? token.colorPrimary : token.buttonBgc  }} onClick={() => showModal(devId.pcsDevId, 'pcsStartStop', 'pcsStartStop', '0', t('PCS开机'))} >{t('PCS开机')}</div>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.pcsStartStop == '1' ? token.colorPrimary : token.buttonBgc  }} onClick={() => showModal(devId.pcsDevId, 'pcsStartStop', 'pcsStartStop', '1', t('PCS关机'))} >{t('PCS关机')}</div>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.pcsStartStop == '2' ? token.colorPrimary : token.buttonBgc  }} onClick={() => showModal(devId.pcsDevId, 'pcsStartStop', 'pcsStartStop', '2', t('PCS复位'))} >{t('PCS复位')}</div>
                        </Flex>
                    </Flex></div>
                <div className={styles.Bms}>
                    <Flex gap={18}>
                        <div className={styles.label}>{'BMS'}:</div>
                        <Flex gap={30}>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.bmsStartStop == '0' ? token.colorPrimary : token.buttonBgc  }} onClick={() => showModal(devId.bms1DevId, 'bmsStartStop', 'bmsStartStop', '0', t('BMS开机'))} >{t('BMS开机')}</div>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.bmsStartStop == '1' ? token.colorPrimary : token.buttonBgc  }} onClick={() => showModal(devId.bms1DevId, 'bmsStartStop', 'bmsStartStop', '1', t('BMS关机'))} >{t('BMS关机')}</div>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.bmsStartStop == '2' ? token.colorPrimary : token.buttonBgc  }} onClick={() => showModal(devId.bms1DevId, 'bmsStartStop', 'bmsStartStop', '2', t('BMS复位'))} >{t('BMS复位')}</div>
                        </Flex>
                    </Flex>
                </div>
                { <div className={styles.power}>
                    <Flex gap={18}>
                        <div className={styles.label}>{t('PCS功率设置')}:</div>
                        <Flex gap={30}>
                            <InputNumber style={{
                                width: '5.6488rem',
                            }}
                                value={allPolicy.pcsPower}
                                onChange={(value) => changeInput(value, 'pcsPower')}
                            />
                            <div className={styles.selectionBox} style={{ backgroundColor: token.defaultBg }} onClick={() => showModal(devId.pcsDevId, 'pcsPower', 'pcsPower', allPolicy.pcsPower, t('PCS功率设置'))} >{t('下发')}</div>
                        </Flex>
                    </Flex>
                </div>}
                {<div className={styles.power}>
                    <Flex gap={18}>
                        <div className={styles.label}>{t('功率波动范围')}:</div>
                        <Flex gap={30}>
                            <InputNumber style={{
                                width: '5.6488rem',
                            }}
                                onChange={(value) => changeInput(value, 'pcsPowerWaveRange')}
                                value={allPolicy.pcsPowerWaveRange}
                            />
                            <div className={styles.selectionBox} style={{ backgroundColor: token.defaultBg }} onClick={() => showModal(devId.pcsDevId, 'pcsPowerWaveRange', 'pcsPowerWaveRange', allPolicy.pcsPowerWaveRange, t('功率波动范围'))} >{t('下发')}</div>
                        </Flex>
                    </Flex>
                </div>}
               
            </Space>
            <Modal
                open={isModalOpen}
                title={<Title title={t('命令下发')} />}
                onOk={async () => {
                    const publicKeyRes = await getPublicKeySever();
                    if (publicKeyRes?.data) {
                        const publicKey = publicKeyRes?.data;
                        const values = await form1.validateFields();
                        let { data } = await sendBurCmd2({
                            devId: currentId,
                            mode: 0,
                            [reqType]: value,
                            dtuId,
                            cmdTypeId: cmdTypeId[type],
                            password: getEncrypt(publicKey, values.password),
                        });
                        if (data.code == 'ok') {
                            changeType();
                            message.success(t('命令下发成功'));
                        } else {
                            message.warning(data?.msg);
                        }
                        setIsModalOpen(false);
                        form1.resetFields();
                    }
                }}
                onCancel={() => {
                    setIsModalOpen(false);
                    form1.resetFields();
                }}>
                <Form
                    form={form1}
                    style={{ marginTop: '1.6667rem' }}
                >
                    <Form.Item name={"password"} label={t("请输入密码")} rules={[FORM_REQUIRED_RULE]}>
                        <Input className="pwd" placeholder={t("请输入密码")} />
                    </Form.Item>
                    {cmdTypeId[type] == 7001 || cmdTypeId[type] == 7011 ? <span style={{ marginLeft: '0.5028rem' }}>{t(`确定将`) + title+ t('设置为') + value + '?'}</span> : <span style={{ marginLeft: '0.5082rem' }}>{t(`确定下发`) + title + t('命令吗')}</span>}
                </Form>
            </Modal>

        </div>
    )
}

export default Com