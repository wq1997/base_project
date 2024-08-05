import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, theme, Space, message, Modal, Table, Select, Input } from "antd";
import styles from './index.less'
import { apigetPlantList, apiInsertPlant, apiUpdatePlant, apideletePlantById, getInsertPlantInitData } from '@/services/plant'
import { useSelector, useIntl } from "umi";
import AddPlantModal, { formList } from './component/AddPlantModal'
import { ExclamationCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import { timeZoneList, alarmLevel } from '@/utils/constants'
import { fetchAllUsersList } from '@/services/user'

function Com(props) {
    const { Search } = Input;
    const [data, setData] = useState([]);
    const { token } = theme.useToken();
    const [title, setTitle] = useState('新增电站');
    const [formData, setFormData] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDel, setIsOpenDel] = useState(false);
    const [selectId, setSelectId] = useState();
    const [selectPlantId, setSelectPlantId] = useState();
    const [initSelectData, setInitSelectData] = useState();
    const [allUser, setAllUser] = useState([]);

    const [textSearch, setTextSearch] = useState('');
    useEffect(() => {
        getData();
    }, [formData,])
    useEffect(() => {
        getInitData();
        getAllUser();

    }, [locale])

    const { locale } = useSelector(state => state.global);
    const intl = useIntl();

    const getInitData = async () => {
        let { data } = await getInsertPlantInitData()||{};
        let str = locale === 'zh-CN' ? 'desc' : 'enDesc'
        data.data?.currencyList?.map(it => {
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
            dataIndex: 'userNames',
            key: 'userNames',
        },
        {
            title: t('设备总数'),
            dataIndex: 'dtuSize',
            key: 'dtuSize',
            width: 150
        },    {
            title: t('设备在线'),
            dataIndex: 'onlines',
            key: 'onlines',
            width: 100
        },
        {
            title: t('建站日期'),
            dataIndex: 'installDate',
            key: 'installDate',
            width: 150,
            render:(val)=>{
                return dayjs(val).format('YYYY-MM-DD')
            }
        },
        {
            title: t('时区'),
            dataIndex: 'timeZone',
            key: 'timeZone',
            width: 100
        },
        {
            title: t('货币'),
            dataIndex: 'priceUnit',
            key: 'priceUnit',
            width: 100
        },
        {
            title: t('经度'),
            dataIndex: 'longitude',
            key: 'longitude',
            width: 100
        },
        {
            title: t('纬度'),
            dataIndex: 'latitude',
            key: 'latitude',
            width: 100
        },
        {
            title: t('告警类型'),
            dataIndex: 'alarms',
            key: 'alarms',
            width: 200,
            render(value){
                const valueList = value?value?.split(","):[];
                const labelList = valueList?.map((item, index) => {
                    const level = alarmLevel?.filter(level => level.value===item);
                    return t(level?.[0]?.label?.props?.id)+(index===valueList?.length-1?"":', ');
                })
                return labelList;
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
    const { user } = useSelector(function (state) {
        return state.user
    });
    const getAllUser = async () => {
        const { data } = await fetchAllUsersList();
        let arr=[];
        data.data?.map(it=>{
            arr.push({
                label:it.name,
                value:it.f0102_Id
            })
        })
        setAllUser(arr)
    }
    const getData = async () => {
        const res = await apigetPlantList({
            UserId: selectId,
            plantName: textSearch
        });
        setData(res?.data?.data);
    }
    const changIsOpen = () => {
        setFormData({
            name: '',
            userName: '',
            position: '',
            typeName: '',
            longitude: '',
            latitude: '',
            installDate:  dayjs(new Date()),
            // networkDate: new Date(),
            timeZone: '',
            priceUnit:''
        });
        setSelectPlantId(undefined);
        setTitle('新增电站');
        setIsOpen(!isOpen);
    }
    const edit = (record) => {
        setFormData({
            ...record,
            userName: initSelectData?.userList.find(it => it.label === record.userNames?.[0])?.value,
            priceUnit: initSelectData?.currencyList.find(it => it.value === record.priceUnit)?.value || initSelectData.currencyList?.[0]?.value,
            timeZone: initSelectData?.timeZone.find(it => it.label === record.timeZone)?.value || initSelectData.timeZone?.[0]?.value,
            // networkDate: dayjs(record.networkDate),
            installDate: dayjs(record.installDate),
        });
        setTitle('编辑电站');
        setSelectPlantId(record.plantId)
        setIsOpen(!isOpen);
    }
    const changeIsOpenDel = (record) => {
        setIsOpenDel(!isOpenDel)
        setSelectPlantId(record.plantId)
    }
    const changeData = async (value) => {
        const { data } = await apiUpdatePlant({ ...value, plantId: selectPlantId,deviceTypeId:21 }) 
        if (data.data) {
            getData();
        } else {
            message.error(data.msg)
        }
    }
    const del = async () => {
        let data = await apideletePlantById({ plantId: selectPlantId });
        if (data.data) {
            getData();
        };
        setIsOpenDel(!isOpenDel)
    }
    const onChangeText = (e) => {
        setTextSearch(e.target.value);
    }
    const onChangeSelectId = (value) => {
        setSelectId(value);
    }
    return (
        <div className={styles.contents}>
            <div className={styles.title}>
                <div className={styles.level}>
                    <Select
                        style={{
                            width: 180,
                        }}
                        value={selectId}
                        placeholder={t('选择用户') }
                        options={allUser}
                        onChange={onChangeSelectId}
                        allowClear
                    />
                </div>
                <Input style={{width: 180}} value={textSearch} onChange={onChangeText} placeholder={t("电站名筛选")} allowClear />

                <div className={styles.dataItem}>
                    <Button type='primary' onClick={getData}>{t('查询')}</Button>
                </div>
 
                <div className={styles.search}>
                    <Button type='primary' onClick={changIsOpen} >{t('新增')}</Button>
                </div>
            </div>
            <div className={styles.tablePart}>
                <Table
                    columns={userTable}
                    dataSource={data}
                    scroll={{ x: 'max-content' }} ></Table>
            </div>
            <AddPlantModal isOpen={isOpen} title={title} formData={formData} onRef={cancle}
                changeData={(value) => changeData(value)}
                initSelectData={initSelectData}
            />
            <Modal
                title={[<><ExclamationCircleFilled style={{ color: '#FAAD14', marginRight: '10px' }} />{t('系统提示')}</>]}
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