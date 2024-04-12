import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { Button, theme, Space, message, Modal, Table } from "antd";
import styles from './index.less'
import { apigetPlantList, apiInsertPlant, apiUpdatePlant, apideletePlantById, getInsertPlantInitData } from '@/services/plant'
import { useSelector, useIntl } from "umi";
import AddPlantModal, { formList } from './component/AddPlantModal'
import { ExclamationCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import { timeZoneList } from '@/utils/constants'

function Com(props) {
    const [xxx, setXxx] = useState('')
    const [data, setData] = useState([]);
    const { token } = theme.useToken();
    const [title, setTitle] = useState('新增电站');
    const [formData, setFormData] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDel, setIsOpenDel] = useState(false);
    const [selectId, setSelectId] = useState();
    const [initSelectData, setInitSelectData] = useState();
    const dateFormat = 'YYYY/MM/DD HH/hh/ss';

    useEffect(() => {
        getData();
    }, [formData,])
    useEffect(() => {
        getInitData();
    }, [locale])

    const { locale } = useSelector(state => state.global);
    const intl = useIntl();

    const getInitData = async () => {
        let { data } = await getInsertPlantInitData();
        let str = locale === 'zh-CN' ? 'desc' : 'enDesc'
        data.data.languageList.map(it => {
            it.label = `${it[str]}--${it.value}`
        });
        setInitSelectData({ ...data.data, timeZone: timeZoneList });
    }
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
            width: 200,
            render: (val) => {
                return val ? dayjs(val).format('YYYY-MM-DD ') : ''
            }
        },
        {
            title: t('并网日期'),
            dataIndex: 'networkDate',
            key: 'networkDate',
            render: (val) => {
                return val ? dayjs(val).format('YYYY-MM-DD ') : ''
            }
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
            title: t('充电桩装机容量'),
            dataIndex: 'chargePileTotal',
            key: 'chargePileTotal',
            // width: 200
        },
        {
            title: t('电芯安全运行温度'),
            dataIndex: 'cellTempRange',
            key: 'cellTempRange',
            // width: 200
            render: (text, record) => {
                return (
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
            name: '',
            userName: '',
            position: '',
            typeName: '',
            longitude: '',
            latitude: '',
            installDate: dayjs(new Date()),
            capacity: 0,
            pvCapacity: 0,
            chargePileTotal: 0,
            cellTempMax: 0,
            cellTempMin: 0,
            networkDate: dayjs(new Date()),
            timeZone: '',
            priceUnit: ''
        });
        setTitle('新增电站');
        setIsOpen(!isOpen);
    }
    const edit = (record) => {
        setFormData({
            ...record,
            userName: initSelectData?.userList.find(it => it.label === record.userName)?.value,
            typeName: initSelectData?.plantType.find(it => it.label === record.typeName)?.value,
            priceUnit: initSelectData?.languageList.find(it => it.label === record.priceUnit)?.value || initSelectData.languageList[0].value,
            timeZone: initSelectData?.timeZone.find(it => it.label === record.timeZone)?.value || initSelectData.timeZone[0].value,
            // timeZone:1,
            // priceUnit:1,
            networkDate: dayjs(record?.networkDate),
            installDate: dayjs(record?.installDate)
        });
        setTitle('编辑电站');
        setSelectId(record.plantId)
        setIsOpen(!isOpen);
    }
    const changeIsOpenDel = (record) => {
        setSelectId(record.plantId);
        setIsOpenDel(!isOpenDel)
    }
    const changeData = async (value) => {
        const { data } = await (title === '编辑电站' ?
            apiUpdatePlant({ ...value, plantId: selectId }) :
            apiInsertPlant({ ...value, }))
        if (data.data) {
            getData();
        } else {
            message.error(data.msg)
        }
    }
    const del = async (record) => {
        let data = await apideletePlantById({ plantId: selectId });
        if (data.data) {
            getData();
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
                initSelectData={initSelectData}
            />
            <Modal
                title={[<><ExclamationCircleFilled style={{ color: '#FAAD14', marginRight: '10px' }} />系统提示</>]}
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