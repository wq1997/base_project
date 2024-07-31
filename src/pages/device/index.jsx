// import Table from '@/components/Table.jsx'
import { useEffect, useState } from 'react'
import { useSelector, useIntl, history } from "umi";
import styles from "./index.less";
import { Select, Space, theme, Button, Modal, message, Tooltip, Drawer } from "antd"
import { deleteDtu, updateDtus } from "@/services/deviceTotal"
import { getAllRevenue as getAllRevenueServe } from "@/services";
import { getBurEnergyStats2, getDeviceStats, getDtusOfPlant } from "@/services/plant"
import {
    getFetchPlantList2 as getFetchPlantListServe,
    getSocialBenefit as getSocialBenefitServe,
} from "@/services";
import {
    ExclamationCircleFilled
} from '@ant-design/icons';
import Add from './components/addDevices'
import classNames from 'classnames';
import Title from './components/Title';
import DeviceRunDesc from './components/deviceRunDesc';
import IncomeRanking from './components/incomeRanking';
import ElectricityRanking from './components/electricityRanking';
import Table from "./components/table";
import Map from './components/map';
import dayjs from 'dayjs';
const { Option } = Select;

const RealtimeAlarm = () => {
    const [data, setData] = useState([]);
    const [dataTotal, setDatadataTotal] = useState([]);
    const [dataEle, setDataEle] = useState([]);
    const [dataOption, setDataOption] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('新增设备');
    const [formData, setFormData] = useState();
    const [isOpenDel, setIsOpenDel] = useState(false);
    const [initSelectData, setInitSelectData] = useState();
    const [record, setRecord] = useState([]);
    const [currentPlantId, setCurrentPlantId] = useState();
    const [socialBenefit, setSocialBenefit] = useState();
    const { token } = theme.useToken();
    const intl = useIntl();
    const [mapPanTo, setPanTo] = useState();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const { user } = useSelector(function (state) {
        return state.user
    });

    const eleData = [
        {
            label: t('日充电量'),
            name: 'dailyCharge',
            value: '',
            unit: 'kWh',
            color: '#FF9D4F'
        },
        {
            label: t('月充电量'),
            name: 'monthCharge',
            value: '',
            unit: 'kWh',
            color: '#03B4B4'
        },
        {
            label: t('累计充电量'),
            name: 'totalCharge',
            value: '',
            unit: 'kWh',
            color: '#DE83C4'
        },
        {
            label: t('日放电量'),
            name: 'dailyDisCharge',
            value: '',
            unit: 'kWh',
            color: '#FF9D4F'
        },
        {
            label: t('月放电量'),
            name: 'monthDisCharge',
            value: '',
            unit: 'kWh',
            color: '#03B4B4'
        },
        {
            label: t('累计放电量'),
            name: 'totalDisCharge',
            value: '',
            unit: 'kWh',
            color: '#DE83C4'
        },

    ];


    const [incomeData, setIncomeData] = useState([
        {
            label: t('日收益'),
            value: 0,
            color: '#20C2FF'
        },
        {
            label: t('月收益'),
            value: 0,
            color: '#20C2FF'
        },
        // {
        //     label: t('年收益'),
        //     value: 0,
        //     color: '#20C2FF'
        // },
        {
            label: t('累计收益'),
            value: 0,
            color: '#20C2FF'
        }
    ])

    useEffect(() => {
        getAllPlant();
    }, [])

    const changeIsOpenDel = (record) => {
        setIsOpenDel(!isOpenDel)
        setRecord(record)
    }
    const cancle = () => {
        setIsOpen(!isOpen);
    }

    const tableColum = [
        {
            title: t('设备编码'),
            dataIndex: 'sn',
            key: 'sn',
        },
        {
            title: t('设备名称'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('设备类型'),
            dataIndex: 'version',
            key: 'version',
        },
        {
            title: t('设备状态'),
            dataIndex: 'online',
            key: 'online',
        },
        {
            title: t('安装位置'),
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: t('操作'),
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => {
                return (
                    <Space>
                        <div type="link" style={{ color: token.colorPrimary, cursor: 'pointer' }} onClick={() => edit(record)}>{t('编辑')}</div>
                        <Button type="link" danger onClick={() => changeIsOpenDel(record)}>{t('删除')}</Button>
                    </Space>
                )
            }
        },
        {
            title: t('详情'),
            dataIndex: 'details',
            key: 'details',
            render: (text, record) => {
                return (
                    <div
                        type="link"
                        style={{ color: token.colorPrimary, cursor: 'pointer' }}
                        onClick={() => {
                            history.push(`/device?activeKey=OverView&id=${record.id}&title=${record.name || ""}&type=${record.deviceTypeId || ""}`)
                        }}
                    >
                        {t('详情')}
                    </div>
                )
            }
        },
    ]

    const edit = (record) => {
        setFormData({
            ...record,
        });
        setTitle('编辑设备');
        setRecord(record)
        setIsOpen(!isOpen);
    }
    const changIsOpen = () => {
        setFormData({
            name: '',
            type: '',
            sn: '',
            plantId: '',
            address: currentPlant?.position||"",
        });
        setTitle('新增设备');
        setIsOpen(!isOpen);
    }

    const delDevice = async () => {
        let { data } = await deleteDtu({ id: record.id });
        if (data.code == 'ok') {
            changePlant(currentPlantId)
        } else {
            message.error(data.code)
        }
        setIsOpenDel(!isOpenDel);
    };
    const changeData = async (value) => {
        const { data } = await updateDtus({ ...value, id: record.id });
        if (data.data) {
            changePlant(currentPlantId)
        } else {
            message.error(data.msg)
        }
    }
    const getAllPlant = async () => {
        const res = await getFetchPlantListServe();
        const data = res?.data;
        if(data?.data){
            const result = data?.data;
            let arr = [];
            result?.plantList?.map((it, index) => {
                arr.push({
                    ...it,
                    label: it.name,
                    value: it.plantId,
                    key: it.plantId,
                    dtuSize: result?.deviceCount?.[index]
                })
            })
            let initPlantId = arr[0].value;
            let localStoragePlantId = parseInt(localStorage.getItem("currentPlant")||0);
            if(arr?.map(item=>item.key)?.includes(localStoragePlantId)){
                initPlantId = localStoragePlantId;
            }
            setDataOption([...arr]);
            changePlant(initPlantId, arr);
        }
    }

    const changePlant = async (val) => {
        if(!val) return;
        let { data } = await getDtusOfPlant({
            plantId: val
        });
        data?.data === '' ? setData([]) : setData(JSON.parse(String(data?.data)))
        setCurrentPlantId(val);
        let res1 = await getBurEnergyStats2({ plantId: val });
        let res2 = await getDeviceStats({ plantId: val });
        let res3 = await getSocialBenefitServe({ plantId: val });

        setDataEle(res1?.data?.data);
        setDatadataTotal(res2?.data?.data);
        setSocialBenefit(res3?.data?.data);
        localStorage.setItem("currentPlant", val);
    }

    if (tableColum.length === 7 && user?.roleId == 1) {
        tableColum[5] = {};
    }

    const getAllRevenue = async () => {
        const res = await getAllRevenueServe({ plantId: currentPlantId });
        if (res?.data?.data) {
            const data = res?.data?.data;
            const newIncomeData = JSON.parse(JSON.stringify(incomeData));
            newIncomeData[0].value = data?.dayEarning || 0;
            newIncomeData[1].value = data?.monthEarning || 0;
            // newIncomeData[2].value = data?.yearEarning || 0;
            newIncomeData[2].value = data?.allEarning || 0;
            setIncomeData(newIncomeData);
        }
    }

    const currentPlant = dataOption?.find(plant => (plant?.value===(currentPlantId||dataOption[0]?.value)))
    useEffect(() => {
        if (currentPlant){
            getAllRevenue();
            setPanTo([currentPlant?.longitude||108.9, currentPlant?.latitude||34.2]);
        }
    }, [currentPlantId]);

    return (
        <div
            className={styles.content}
        >
            <div className={styles.left}>
                <div className={classNames(styles.leftItem, styles.leftItem1)}>
                    {
                        currentPlant&&
                        <Map
                            plants={[
                                {
                                    ...currentPlant,
                                    longitude: currentPlant?.longitude||0, 
                                    latitude: currentPlant?.latitude||0,
                                    plantName: currentPlant?.name,
                                    installDate: dayjs(currentPlant?.installDate).format('YYYY-MM-DD')
                                }
                            ]}
                            showInfo={true} 
                            panTo={mapPanTo}
                        />
                    }
                    <div className={styles.plantSelect}>
                        <Select
                            style={{ width: 300 }}
                            onChange={(val) => {
                                changePlant(val)
                            }}
                            value={currentPlantId}
                        >
                            {dataOption && dataOption?.map(item => {
                                return (<Option key={item.value} value={item.value}>{item.label}</Option>);
                            })
                            }
                        </Select>
                    </div>
           
                </div>
                <div className={classNames(styles.rightItem, styles.leftItem2)}>
                    <Title title={t('设备列表')} />
                    <div className={styles.add}>
                        {(user?.roleId===2||user?.roleId===3)&&<div onClick={changIsOpen} className={styles.addBtn}>{t('新增设备')}</div>}
                    </div>
                    <div className={styles.cardContent} style={{backgroundColor:token.darkbgc}}>
                        <Table
                            dataSource={data}
                            changeIsOpenDel={changeIsOpenDel}
                            edit={edit}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={classNames(styles.rightItem, styles.rightItem1)} style={{backgroundColor:token.darkbgc}}>
                    <Title title={t('设备运行情况')} />

                    <div className={styles.cardContent}>
                        <DeviceRunDesc
                            dataSource={dataTotal}
                        />
                    </div>
                </div>
                <div className={classNames(styles.rightItem, styles.rightItem2)}style={{backgroundColor:token.darkbgc}}>
                    <Title title={`${t('实时电量')}(${t('kWh')})`} />
                    <div className={styles.cardContent}>
                        <IncomeRanking currentPlantId={currentPlantId||dataOption[0]?.value}/>
                    </div>
                </div>
                <div className={classNames(styles.rightItem, styles.rightItem3)}style={{backgroundColor:token.darkbgc}}>
                    <Title title={`${t('历史电量')}(${t('kWh')})`} />
                    <div className={styles.cardContent}>
                        <ElectricityRanking
                            currentPlantId={currentPlantId||dataOption[0]?.value}
                        />
                    </div>
                </div>
           
            </div>
            <Add isOpen={isOpen} title={title} formData={formData} onRef={cancle}
                changeData={(value) => changeData(value)}
                initSelectData={initSelectData}
                plantSelect={dataOption}
            ></Add>
            <Modal
                title={[<><ExclamationCircleFilled style={{ color: '#FAAD14', marginRight: '10px' }} />{t('系统提示')}</>]}
                open={isOpenDel}
                onOk={() => delDevice()}
                onCancel={changeIsOpenDel}
            >
                {t('数据删除后将无法恢复，是否确认删除该条数据？')}
            </Modal>
           
        </div>
    )
}

export default RealtimeAlarm;