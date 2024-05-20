import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { Button, theme, Space, message, Modal, Table } from "antd";
import styles from './index.less'
import { apigetAlarmRulesByPlantId, getUpdateAlarmRule, getInsertAlarmRule, getDeleteAlarmRuleById } from '@/services/alarm'
import { useSelector, useIntl } from "umi";
import AddRulesModal from './component/AddRulesModal'
import { formList } from './component/AddRulesModal'
import  { ExclamationCircleFilled } from '@ant-design/icons';


function Com(props) {
    const [xxx, setXxx] = useState('')
    const [data, setData] = useState([]);
    const { token } = theme.useToken();
    const [title, setTitle] = useState('编辑告警规则');
    const [formData, setFormData] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDel, setIsOpenDel] = useState(false);
    const [delId, setDelId] = useState();

    useEffect(() => {
        getData();
    }, [formData])
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const cancle = () => {
        setIsOpen(!isOpen);
    }
    const userTable = [
        {
            title: t('告警等级'),
            dataIndex: 'prior',
            key: 'prior',
            align:'center',


        },
        {
            title: t('推送方式'),
            dataIndex: 'pushType',
            key: 'pushType',
            align:'center',

        },
        {
            title: t('每小时推送上限'),
            dataIndex: 'initNum',
            key: 'initNum',
            align:'center',

        },
        {
            title: t('状态'),
            dataIndex: 'status',
            key: 'status',
            width: 200,
            align:'center',
            render:(text, record) => {
               return text?t('启用'):t('禁用')
            }

        },
        {
            title: t('接收人'),
            dataIndex: 'userName',
            key: 'userName',
            align:'center',

            // width: 200
        },
        {
            title: t('操作'),
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            render: (text, record) => {
                return (
                    <Space>
                        <Button type="primary" onClick={() => edit(record)}>{t('编辑')}</Button>
                        <Button type="primary" danger onClick={() => changeIsOpenDel(record)}>{t('删除')}</Button>
                    </Space>
                )
            }
        }
    ];
    const { currentPlantId } = useSelector(function (state) {
        return state.device
    });
    const getData = async () => {
        const { data } = await apigetAlarmRulesByPlantId({
            plantId: currentPlantId || localStorage.getItem('plantId'),
        });
        setData(data.data);
    }
    const changIsOpen = () => {
        setFormData({
            prior: 1,
            pushType: 1,
            initNum: 0,
            status: false,
            userName: '',
        });
        setTitle('新增告警规则');
        setIsOpen(!isOpen);
    }
    const edit = (record) => {
        setFormData({
            ...record,
            prior: formList[0].data.find(it => it.label === record.prior)?.value,
            pushType: formList[1].data.find(it => it.label === record.pushType)?.value,
            // status: '启用' ? true : false,
        });
        setTitle('编辑告警规则');
        setIsOpen(!isOpen);
    }
    const changeIsOpenDel=(record)=>{
        setDelId(record.id);
        setIsOpenDel(!isOpenDel)
      }
    const changeData = async (value) => {
        const { data } = await (title === '编辑告警规则' ?
            getUpdateAlarmRule({ ...value, plantId: currentPlantId || localStorage.getItem('plantId') }) :
            getInsertAlarmRule({ ...value, plantId: currentPlantId || localStorage.getItem('plantId') }))
        if (data.data) {
            setFormData(value);
        } else {
            message.error(data.msg)
        }
    }
    const del = async (record) => {
        let data = await getDeleteAlarmRuleById({ id: delId });
        if (data.data) {
            getData();
            //   message.success(data.msg)
        };
        setIsOpenDel(!isOpenDel)

    }
   
    return (
        <div className={styles.contents}>
            <CardModel
                title={
                    t("告警规则")
                }
                filterPart={
                    <Button type='primary' onClick={changIsOpen}>{t('新增')}</Button>
                }
                content={
                    <>
                        <Table
                            columns={userTable}
                            dataSource={data}
                            scroll={{ x: 'max-content' }} ></Table>
                    </>
                }
            />
            <AddRulesModal isOpen={isOpen} title={title} formData={formData} onRef={cancle}
                changeData={(value) => changeData(value)}
            />
            <Modal
                title={[<><ExclamationCircleFilled style={{color:'#FAAD14',marginRight:'10px'}}/>系统提示</>]}
                open={isOpenDel}
                onOk={del}
                onCancel={changeIsOpenDel}
            >
               {t('数据删除后将无法恢复，是否确认删除该条数据？')}
            </Modal>
        </div>
    )
}

export default Com