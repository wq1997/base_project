// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from "./index.less";
import { theme, message, Space, Flex, InputNumber , Modal } from "antd";
import { useSelector, useIntl } from "umi";
import { sendBurCmd2 } from '@/services/policy'

function Com({ devId,dtuId,historyAllData }) {
    const { token } = theme.useToken();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allPolicy, setAllPolicy] = useState({
        allBranch: 1,
        branchOne: 1,
        branchTwo: 1,
        bms: 1,
        pcsPowerOne: 0,
        pcsPowerTow: 0,
        pcsPowerWaveRange: historyAllData?.pcsPowerWaveRange||0
    })
    const [type, setType] = useState('allBranch');
    const [reqType, setReqType] = useState('pcsStartStop');
    const [value, setValue] = useState('0');
    const [currentId, setCurrentId] = useState(devId.pcsDevId);
    const cmdTypeId={
        allBranch: 7002,
        branchOne: 7004,
        branchTwo: 7004,
        bms:7003,
        pcsPowerOne: 7001,
        pcsPowerTow: 7001,
        pcsPowerWaveRange: 7011
    }
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
    const showModal = (id, reqType,type, value) => {
        setIsModalOpen(true);
        setType(type);
        setValue(value);
        setCurrentId(id);
        setReqType(reqType);
    };
    const handleOk = async () => {
        changeType();
        let { data } = await sendBurCmd2({
            devId: currentId,
            mode:0,
            [reqType]: value,
            dtuId,
            cmdTypeId:cmdTypeId[type]
        })
        if (data.code=='ok') {
            message.success(t('命令下发成功'), 3);
        }else{
            message.error(t('命令下发失败'), 3);

        }
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const changeInput=(val,name)=>{
        setAllPolicy({ ...allPolicy, [name]: val, });
    }
    return (
        <div className={styles.content} style={{ backgroundColor: token.contentBgc }}>
            <Space size={30} direction="vertical" >
                {devId.pcsDevId&&<div className={styles.generalBranchRoad}>
                    <Flex gap={18}>
                        <div className={styles.label}>{t('总支路')}:</div>
                        <Flex gap={30}>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.allBranch == '1' ? token.colorPrimary : '#20284D' }} onClick={() => showModal(devId.pcsDevId, 'pcsStartStop', 'allBranch', '1')} >{t('PCS开机')}</div>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.allBranch == '2' ? token.colorPrimary : '#20284D' }} onClick={() => showModal(devId.pcsDevId, 'pcsStartStop', 'allBranch', '2')} >{t('PCS关机')}</div>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.allBranch == '3' ? token.colorPrimary : '#20284D' }} onClick={() => showModal(devId.pcsDevId, 'pcsStartStop', 'allBranch', '3')} >{t('PCS复位')}</div>
                        </Flex>
                    </Flex>
                </div>}
               {devId.pcs1DevId&& <div className={styles.Branch}>
                    <Flex gap={18}>
                        <div className={styles.label}>{t('支路')}1:</div>
                        <Flex gap={30}>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.branchOne == '1' ? token.colorPrimary : '#20284D' }} onClick={() => showModal(devId.pcs1DevId, 'pcsStartStop','branchOne', '1')} >{t('PCS开机')}</div>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.branchOne == '2' ? token.colorPrimary : '#20284D' }} onClick={() => showModal(devId.pcs1DevId, 'pcsStartStop', 'branchOne','2')} >{t('PCS关机')}</div>

                        </Flex>
                    </Flex>
                </div>}
             {   devId.pcs2DevId&&<div className={styles.Branch}>
                    <Flex gap={18}>
                        <div className={styles.label}>{t('支路')}2:</div>
                        <Flex gap={30}>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.branchTwo == '1' ? token.colorPrimary : '#20284D' }} onClick={() => showModal(devId.pcs2DevId, 'pcsStartStop','branchTwo', '1')} >{t('PCS开机')}</div>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.branchTwo == '2' ? token.colorPrimary : '#20284D' }} onClick={() => showModal(devId.pcs2DevId,'pcsStartStop', 'branchTwo', '2')} >{t('PCS关机')}</div>
                        </Flex>
                    </Flex>
                </div>}
            {devId.bms1DevId&&<div className={styles.Branch}>
                <Flex gap={18}>
                    <div className={styles.label}>{t('BMS')}:</div>
                    <Flex gap={30}>
                        <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.bms == '1' ? token.colorPrimary : '#20284D' }} onClick={() => showModal(devId.bms1DevId, 'bmsStartStop','bms', '1')} >{t('BMS开机')}</div>
                        <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.bms == '2' ? token.colorPrimary : '#20284D' }} onClick={() => showModal(devId.bms1DevId, 'bmsStartStop', 'bms','2')} >{t('BMS关机')}</div>
                        <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.bms == '3' ? token.colorPrimary : '#20284D' }} onClick={() => showModal(devId.bms1DevId, 'bmsStartStop', 'bms','3')} >{t('BMS复位')}</div>
                    </Flex>
                </Flex>
            </div>}
                {/* <div className={styles.Branch}>
                    <Flex gap={22}>
                        <div className={styles.label}>{t('BMS')}2:</div>
                        <Flex gap={30}>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.bms2 == '1' ? token.colorPrimary : '#20284D' }} onClick={() => showModal(devId.bms2DevId, 'bmsStartStop', 'bms2','1')} >{t('BMS开机')}</div>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.bms2 == '2' ? token.colorPrimary : '#20284D' }} onClick={() => showModal(devId.bms2DevId, 'bmsStartStop', 'bms2','2')} >{t('BMS关机')}</div>
                            <div className={styles.selectionBox} style={{ backgroundColor: allPolicy.bms2 == '3' ? token.colorPrimary : '#20284D' }} onClick={() => showModal(devId.bms2DevId, 'bmsStartStop', 'bms2','3')} >{t('BMS复位')}</div>
                        </Flex>
                    </Flex>
                </div> */}
                {devId.pcs1DevId&&<div className={styles.power}>
                    <Flex gap={18}>
                        <div className={styles.label}>{t('PCS支路1功率设置')}:</div>
                        <Flex gap={30}>
                            <InputNumber  style={{
                                width: '105px',
                            }}
                                defaultValue={allPolicy.pcsPowerOne}
                                onChange={(value)=>changeInput(value,'pcsPowerOne')}
                            />
                            <div className={styles.selectionBox} style={{ backgroundColor: token.defaultBg }} onClick={() => showModal(devId.pcs1DevId, 'pcsPower','pcsPowerOne', allPolicy.pcsPowerOne)} >{t('下发')}</div>
                        </Flex>
                    </Flex>
                </div>}
            {  devId.pcs2DevId&&  <div className={styles.power}>
                    <Flex gap={18}>
                        <div className={styles.label}>{t('PCS支路2功率设置')}:</div>
                        <Flex gap={30}>
                            <InputNumber  style={{
                                width: '105px',
                            }}
                            onChange={(value)=>changeInput(value,'pcsPowerTow')}
                            defaultValue={allPolicy.pcsPowerTow}
                            />
                            <div className={styles.selectionBox} style={{ backgroundColor: token.defaultBg }} onClick={() => showModal(devId.pcs2DevId, 'pcsPower','pcsPowerOne',allPolicy.pcsPowerTow)} >{t('下发')}</div>
                        </Flex>
                    </Flex>
                </div>}
            {   devId.pcsDevId&& <div className={styles.power}>
                    <Flex gap={18}>
                        <div className={styles.label}>{t('功率波动范围')}:</div>
                        <Flex gap={30}>
                            <InputNumber   style={{
                                width: '105px',
                            }}
                            defaultValue={allPolicy.pcsPowerWaveRange}
                            onChange={(value)=>changeInput(value,'pcsPowerWaveRange')}
                            />
                            <div className={styles.selectionBox} style={{ backgroundColor: token.defaultBg }} onClick={() => showModal(devId.pcsDevId,'pcsPowerWaveRange', 'pcsPowerWaveRange', allPolicy.pcsPowerWaveRange)} >{t('下发')}</div>
                        </Flex>
                    </Flex>
                </div>}
            </Space>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{t('确定下发命令吗')}</p>
            </Modal>

        </div>
    )
}

export default Com