// import Table from '@/components/Table.jsx'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useIntl, history } from "umi";
import styles from "./index.less";
import { Table, Select, Space, theme, Button, Modal, message } from "antd"
import { CardModel } from "@/components";
import { getFetchPlantList, deleteDtu, updateDtus } from "@/services/deviceTotal"
import { getAllRevenue as getAllRevenueServe } from "@/services";
import { getBurEnergyStats2, getDeviceStats,getDtusOfPlant } from "@/services/plant"
import {
    HistoryOutlined,
    PieChartOutlined,
    ScheduleOutlined,
    AlertOutlined,
    ExclamationCircleFilled
} from '@ant-design/icons';
import Add from './components/addDevices'
const { Option } = Select;

const RealtimeAlarm = () => {
    const [data, setData] = useState([]);
    const [dataTotal, setDatadataTotal] = useState([]);
    const [dataEle, setDataEle] = useState([]);
    const [dataOption, setDataOption] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const activitesRef = useRef([]);
    const [current, setCurrent] = useState(1);
    const [title, setTitle] = useState('新增设备');
    const [formData, setFormData] = useState();
    const [isOpenDel, setIsOpenDel] = useState(false);
    const [initSelectData, setInitSelectData] = useState();
    const [record, setRecord] = useState([]);
    const [currentPlantId, setCurrentPlantId] = useState();
    const { token } = theme.useToken();
    const [screenH, setScreenH] = useState('');
    const [scroolY, setScroolY] = useState(200);
    const intl = useIntl();
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
    useEffect(() => {
        setScreenH(document.documentElement.clientHeight || document.body.clientHeight)
        window.addEventListener("resize", handleWindowResize)
        return () => {
          window.removeEventListener("resize", handleWindowResize)
        }
      }, [])
    
      const handleWindowResize = () => {
        setScreenH(document.documentElement.clientHeight || document.body.clientHeight)
      }
      useEffect(() => {
        if (screenH < 1000) {
          setScroolY(200);
        } else if (screenH > 1000 && screenH < 1300) {
          setScroolY(400);
        } else if (screenH > 1300) {
          setScroolY(500);
        }
      }, [screenH])
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
            color: '#0082FF'
        },
        {
            label: t('月收益'),
            value: 0,
            color: '#EEC830'
        },
        {
            label: t('累计收益'),
            value: 0,
            color: '#DE83C4'
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
                            history.push(`/device?activeKey=OverView&id=${record.id}&title=${record.name||""}&type=${record.deviceTypeId||""}`)
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
            address: '',
        });
        setTitle('新增设备');
        setIsOpen(!isOpen);
    }
 
    const delDevice = async () => {
        let { data } = await deleteDtu({ id: record.id });
        if (data.code=='ok') {
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
        const { data } = await getFetchPlantList();
        let arr = [];
        data.data?.map(it => {
            arr.push({
                label: it.name,
                value: it.plantId,
                key: it.plantId
            })
        })
        activitesRef.current = arr;
        setDataOption([...arr]);
        changePlant(arr[0].value);
    }
    const changPage = (page) => {
        setCurrent(page);
    }
    const changePlant = async (val) => {
        let { data } = await getDtusOfPlant({
            plantId: val
        });
        data?.data === '' ? setData([]) : setData(JSON.parse(String(data?.data)))
        setCurrentPlantId(val);
        let { data: dataEnergy } = await getBurEnergyStats2({ plantId: val });
        let { data: deviceStats } = await getDeviceStats({ plantId: val });
        setDatadataTotal(deviceStats?.data);
        setDataEle(dataEnergy?.data);
    }
    const topData =[
        {
            icon: <PieChartOutlined />,
            name: t("设备总数"),
            color: '#00C1BE',
            key: 'deviceCount',
            value: '',
            unit: t('个')
        },
        {
            icon: <AlertOutlined />,
            name: t("实时告警"),
            color: '#FFA049',
            key: 'nowAlarmCount',
            value: '',
            unit: t('个')
        },
        {
            icon: <ScheduleOutlined />,
            name: t("在线"),
            color: '#F8CC00',
            key: 'onlineCount',
            value: '',
            unit: t('个')
        },
        {
            icon: <HistoryOutlined />,
            name: t("离线"),
            color: '#00C1BE',
            key: 'offlineCount',
            value: '',
            unit: t('个')
        },
    ];

    if (tableColum.length===7&&user?.roleId == 1) {
        tableColum[5]={};
    }

    const getAllRevenue = async () => {
        const res = await getAllRevenueServe({plantId: currentPlantId});
        if(res?.data?.data){
            const data = res?.data?.data;
            const newIncomeData = JSON.parse(JSON.stringify(incomeData));
            newIncomeData[0].value = data?.dayEarning;
            newIncomeData[1].value = data?.monthEarning;
            newIncomeData[2].value = data?.allEarning;
            setIncomeData(newIncomeData);
        }
    }

    useEffect(()=>{
        if(currentPlantId) getAllRevenue();
    }, [currentPlantId])

    return (
        <>
            <div className={styles.head}>
                <Select
                    style={{width: 240,}}
                    onChange={(val) => changePlant(val)}
                    key={dataOption[0]?.value}
                    defaultValue={dataOption[0]?.value}
                >
                    {dataOption && dataOption?.map(item => {
                        return (<Option key={item.value} value={item.value}>{item.label}</Option>);
                    })
                    }
                </Select>
            </div>
            <div className={styles.wrap}>
                <div className={styles.first}>
                    <CardModel
                        title={t('电量统计')}
                        bgc={'#0D1430'}
                        content={
                            <div className={styles.topContent} style={{ backgroundColor: token.areaCardBgc, borderRadius: 8 }}>
                                {eleData.map(it => {
                                    return (
                                        <div className={styles.topItem} style={{ color: it.color,  }}>
                                            <div className={styles.topItemTitle}>
                                                <span style={{ color: token.smallTitleColor, fontWeight: 500, marginLeft: '3px' }}>{it.label}</span>
                                            </div>
                                            <div className={styles.topVaue} style={{  fontWeight: 400, }} >
                                                {dataEle[it.name]}
                                                <span style={{ fontSize: '16px', fontWeight: 400, marginLeft: '10px', height: '10%', lineHeight: '150%' }}>{it.unit}</span>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        }
                    />
                </div>
                <div className={styles.second}>
                    <CardModel
                        title={t('设备统计')}
                        bgc={'#0D1430'}
                        content={
                            <div className={styles.secondContent}>
                                {topData.map(it => {
                                    return (
                                        <div className={styles.topItem} style={{ color: it.color, backgroundColor: token.areaCardBgc, borderRadius: 8}}>
                                            <div className={styles.leftIcon}>
                                                {it.icon}
                                            </div>
                                            <div className={styles.rightAll}>
                                                <div className={styles.topItemTitle}>
                                                    <span style={{ color: token.smallTitleColor, fontWeight: 500,  marginLeft: '3px' }}>{it.name}</span>
                                                </div>
                                                <div className={styles.topVaue} style={{  fontWeight: 400, }} >
                                                    {dataTotal[it.key]}
                                                    <span style={{ fontSize: '16px', fontWeight: 400, marginLeft: '10px', height: '10%', lineHeight: '150%' }}>{it.unit}</span>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })}

                            </div>
                        }
                    />
                </div>

                <div className={styles.third}>
                    <CardModel
                        title={t('收益统计')}
                        bgc={'#0D1430'}
                        content={
                            <div className={styles.content}>
                                <div className={styles.contentLeft}>
                                    {incomeData?.map(item => {
                                        return <div>{item.label}</div>
                                    })}
                                </div>
                                <div className={styles.contentRight}>
                                    {incomeData?.map(item => {
                                        return <div><span style={{color:item.color, fontSize: 20}}>{item.value}</span> {t('元')}</div>
                                    })}
                                </div>
                            </div>
                        }
                    />
                </div>

                <div className={styles.content} >
                    {
                        (user?.roleId==2||user?.roleId==3)&&
                        <div className={styles.title}>
                            <div className={styles.buttons}>
                                <Button type="primary" onClick={changIsOpen}>
                                    {t('新增')}
                                </Button>
                            </div>
                        </div>
                    }
                    <Table
                        columns={tableColum}
                        dataSource={data}
                        scroll={{ y: scroolY }}
                    />
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
        </>
    )
}

export default RealtimeAlarm;