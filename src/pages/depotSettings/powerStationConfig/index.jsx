import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { Button, theme, Space, message, Modal, Table } from "antd";
import styles from './index.less'
import { apigetPlantList, apiInsertPlant, apiUpdatePlant, apideletePlantById } from '@/services/plant'
import { useSelector, useIntl } from "umi";
import AddPlantModal,{ formList } from './component/AddPlantModal'
import  { ExclamationCircleFilled } from '@ant-design/icons';


function Com(props) {
    const [xxx, setXxx] = useState('')
    const [data, setData] = useState([]);
    const { token } = theme.useToken();
    const [title, setTitle] = useState('新增电站');
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
            title: t('电站名称'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('所属用户'),
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: t('电站类型'),
            dataIndex: 'typeName',
            key: 'typeName',
        },
        {
            title: t('建站日期'),
            dataIndex: 'installDate',
            key: 'installDate',
            width: 200

        },
        {
            title: t('并网日期'),
            dataIndex: 'networkDate',
            key: 'networkDate',
            // width: 200
        },
        {
            title: t('时区'),
            dataIndex: 'timeZone',
            key: 'timeZone',
            // width: 200
        },
        {
            title: t('货币'),
            dataIndex: 'priceUnit',
            key: 'priceUnit',
            // width: 200
        },
        {
            title: t('储能装机容量'),
            dataIndex: 'capacity',
            key: 'capacity',
            // width: 200
        },
        {
            title: t('光伏装机容量'),
            dataIndex: 'pvCapacity',
            key: 'pvCapacity',
            // width: 200
        },
        {
            title: t('充电桩数量'),
            dataIndex: 'chargePileTotal',
            key: 'chargePileTotal',
            // width: 200
        },
        {
            title: t('电芯安全运行温度'),
            dataIndex: 'cellTempRange',
            key: 'cellTempRange',
            // width: 200
            render:(text,record)=>{
                    return(
                        <>
                        <span>{record.cellTempMin}℃</span>~
                        <span>{record.cellTempMax}℃</span>
                        </>
                    )
            }
        },
        {
            title: t('电站位置'),
            dataIndex: 'position',
            key: 'position',
            // width: 200
        },
        {
            title: t('操作'),
            dataIndex: 'operation',
            key: 'operation',
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
        const { data } = await apigetPlantList();
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
        setTitle('新增电站');
        setIsOpen(!isOpen);
    }
    const edit = (record) => {
        setFormData({
            ...record,
            prior: formList[0].data.find(it => it.label === record.prior)?.value,
            pushType: formList[1].data.find(it => it.label === record.pushType)?.value,
            status: '启用' ? true : false,
        });
        setTitle('编辑电站');
        setIsOpen(!isOpen);
    }
    const changeIsOpenDel=(record)=>{
        setDelId(record.id);
        setIsOpenDel(!isOpenDel)
      }
    const changeData = async (value) => {
        const { data } = await (title === '编辑电站' ?
            apiUpdatePlant({ ...value, plantId: currentPlantId || localStorage.getItem('plantId') }) :
            apiInsertPlant({ ...value, plantId: currentPlantId || localStorage.getItem('plantId') }))
        if (data.data) {
            setFormData(value);
        } else {
            message.error(data.msg)
        }
    }
    const del = async (record) => {
        let data = await apideletePlantById({ id: delId });
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
                    t("电站配置")
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
            <AddPlantModal isOpen={isOpen} title={title} formData={formData} onRef={cancle}
                changeData={(value) => changeData(value)}
            />
            <Modal
                title={[<><ExclamationCircleFilled style={{color:'#FAAD14',marginRight:'10px'}}/>系统提示</>]}
                open={isOpenDel}
                onOk={del}
                onCancel={changeIsOpenDel}
            >
                数据删除后将无法恢复，是否确认删除该条数据？
            </Modal>
        </div>
    )
}

export default Com