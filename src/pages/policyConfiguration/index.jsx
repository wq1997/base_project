// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from "./index.less";
import { theme, notification, Space, Flex, Select, message } from "antd";
import { useSelector, useIntl } from "umi";
import ManualMode from './component/ManualMode'
import AutoMode from './component/AutoMode'
import { getBurDtuDevInfo2, getBurCmdHistory2 } from '@/services/policy'
import { connectSocket } from '@/utils/subscribe';
import { ISSUE_COMMAND } from '@/utils/subscribe/types';
import { sendBurCmd2 } from '@/services/policy'


function Com(props) {
    const [mode, setMode] = useState(0)
    const { token } = theme.useToken();
    const [devId, setDevId] = useState({});
    const [options, setOptions] = useState([]);
    const [initAllData, setInitAllData] = useState([]);
    const [historyAllData, setHistoryAllData] = useState({});

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
    const handleOk = async () => {
        // changeType();
        let { data } = await sendBurCmd2({
            mode,
            dtuId,
            cmdTypeId: 7000
        })
        if (data.code == 'ok') {
            message.success(t('命令下发成功'), 3);
        } else {
            message.error(t('命令下发失败'), 3);
        }
    };

    useEffect(() => {
        getInitData();
    }, []);
    useEffect(() => {
        getHistory();
    }, [dtuId])
    useEffect(() => {
        connectSocket(
            ISSUE_COMMAND,
            () => {

            },
            res => {
                if (res.hasOwnProperty("progress")) {
                } else {
                    notification[res.code === "ok" ? "success" : "error"]({
                        message: t("执行结果"),
                        description: res.msg,
                    });
                }
            }
        );
    }, [])

    const changeType = (type) => {
        setMode(type)
        // setIsModalOpen(true);
        handleOk();
    }
    const getInitData = async () => {
        let { data } = await getBurDtuDevInfo2();
        let option = [];
        data.data?.map(it => {
            option.push({
                label: it.sn,
                value: it.sn,
                dtuId: it.dtuId
            })
        });
        setOptions(option);
        setInitAllData(data.data);
        setDevId({
            pcsDevId: data?.data[0].devInfo?.pcs,
            pcs1DevId: data.data[0].devInfo?.pcsBranch[0],
            pcs2DevId: data.data[0].devInfo?.pcsBranch[1],
            bms1DevId: data.data[0].devInfo?.bms[0],
            bms2DevId: data.data[0].devInfo?.bms[1],
        });
        setDtuId(option[0].dtuId);

    }
    const getHistory = async () => {
        if (dtuId) {
            let { data } = await getBurCmdHistory2({ dtuId });
            const result = data.data;
            setHistoryAllData(result);
            if(result.hasOwnProperty("mode")){
                setMode(result?.mode)
            }
        }
    }
    const changeDevice = async (val) => {
        let arr = initAllData.find(it => it.sn === val);
        setDevId({
            pcsDevId: arr.devInfo?.pcs,
            pcs1DevId: arr.devInfo?.pcsBranch[0],
            pcs2DevId: arr.devInfo?.pcsBranch[1],
            bms1DevId: arr.devInfo?.bms[0],
            bms2DevId: arr.devInfo?.bms[1],
        });
        setDtuId(arr.dtuId);
    }
    return (
        <div className={styles.content} style={{ backgroundColor: token.contentBgc }}>
            <Space style={{ width: '100%' }} size={30} direction="vertical" >
                <div className={styles.device}>
                    <Flex gap={12}>
                        <div className={styles.label}>{t('设备')}:</div>
                        <Select
                            style={{
                                width: 240,
                            }}
                            onChange={(val) => changeDevice(val)}
                            key={options[0]?.value}
                            defaultValue={options[0]?.value}
                        >
                            {options && options?.map(item => {
                                return (<Option key={item.value} value={item.value}>{item.label}</Option>);
                            })
                            }
                        </Select>
                    </Flex>
                </div>
                <div className={styles.mode}>
                    <Flex gap={18}>
                        <div className={styles.label}>{t('模式')}:</div>
                        <Flex gap={30}>
                            <div className={styles.selectionBox} style={{ backgroundColor: mode == 0 ? token.colorPrimary : '#20284D' }} onClick={() => changeType(0)} >{t('自动')}</div>
                            <div className={styles.selectionBox} style={{ backgroundColor: mode == 1 ? token.colorPrimary : '#20284D' }} onClick={() => changeType(1)} >{t('手动')}</div>
                        </Flex>
                    </Flex>
                </div>
                { mode == 0 ? <AutoMode devId={devId} dtuId={dtuId} historyAllData={historyAllData}/> : <ManualMode devId={devId} dtuId={dtuId} historyAllData={historyAllData}/>}
            </Space>

        </div>
    )
}

export default Com