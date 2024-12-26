// import Table from '@/components/Table.jsx'
import { useEffect, useState } from 'react'
import { useSelector, useIntl, history } from "umi";
import styles from "./index.less";
import { Select, theme, Button, Modal, message } from "antd"
import { deleteDtu, updateDtus } from "@/services/deviceTotal"
import { getBurEnergyStats2, getDeviceStats, getDtusOfPlant } from "@/services/plant"
import {
    getFetchPlantList as getFetchPlantListServe,
} from "@/services/deviceTotal";
import {
    ExclamationCircleFilled
} from '@ant-design/icons';
import Add from './components/addDevices'
import Title from './components/Title';
import DeviceRunDesc from './components/deviceRunDesc';
import ElectricityRanking from './components/electricityRanking';
import Table from "./components/table";
import { getUrlParams, setLocalStorage } from "@/utils/utils";
import RealPower from './components/RealPower';
import AlarmStatics from './components/AlarmStatics';
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

    const { token } = theme.useToken();
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const { user, } = useSelector(function (state) {
        return state.user
    });
    const { locale } = useSelector(state => state.global);

    const eleData = [
        {
            label: t('今日充电量'),
            name: 'dailyCharge',
            value: '',
            unit: 'kWh',
            // color: '#FF9D4F'
        },
        {
            label: t('今日放电量'),
            name: 'dailyDisCharge',
            value: '',
            unit: 'kWh',
            // color: '#FF9D4F'
        },
        {
            label: t('本月充电量'),
            name: 'monthCharge',
            value: '',
            unit: 'kWh',
            // color: '#03B4B4'
        },
        {
            label: t('本月放电量'),
            name: 'monthDisCharge',
            value: '',
            unit: 'kWh',
            // color: '#03B4B4'
        },
        {
            label: t('累计充电量'),
            name: 'totalCharge',
            value: '',
            unit: 'kWh',
            // color: '#DE83C4'
        },
        {
            label: t('累计放电量'),
            name: 'totalDisCharge',
            value: '',
            unit: 'kWh',
            // color: '#DE83C4'
        },

    ];

    useEffect(() => {
        const params = getUrlParams(window.location.search);
        if (params?.token) {
            setLocalStorage('Token', params.token);
            setLocalStorage("currentPlant", params.plantId);
            changePlant(params.plantId);
            history.push('/index/device');
        }
        getAllPlant();
    }, [locale])

    const changeIsOpenDel = (record) => {
        setIsOpenDel(!isOpenDel)
        setRecord(record)
    }
    const cancle = () => {
        setIsOpen(!isOpen);
    }

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
            address: currentPlant?.position || "",
        });
        setRecord({})
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
        const { data } = await updateDtus({ ...value, id: record?.id });
        if (data.data) {
            changePlant(currentPlantId)
        } else {
            message.error(data.msg)
        }
    }
    const getAllPlant = async () => {
        const res = await getFetchPlantListServe();
        const data = res?.data;
        if (data?.data?.plantList) {
            let arr = [];
            data.data?.plantList.map(it => {
                arr.push({
                    ...it,
                    label: it.name,
                    value: it.plantId,
                    key: it.plantId,
                })
            })
            setDataOption([...arr]);

            let plantId = "";
            const plantIdList = arr.map(item => item.value);
            const localPlantId = parseInt(localStorage.getItem("currentPlant"));
            if(plantIdList.includes(localPlantId)){
                plantId = localPlantId;
            }else{
                plantId = plantIdList?.[0];
            }
            changePlant(plantId);
        }
    }

    const changePlant = async (val) => {
        if (!val) return;
        let { data } = await getDtusOfPlant({
            plantId: val
        });
        data?.data === '' ? setData([]) : setData(JSON.parse(String(data?.data)));

        setCurrentPlantId(val);
        let res1 = await getBurEnergyStats2({ plantId: val });
        let res2 = await getDeviceStats({ plantId: val });

        setDataEle(res1?.data?.data);
        setDatadataTotal(res2?.data?.data);
        localStorage.setItem("currentPlant", val);
    }

    return (
        <div
            className={styles.content}
            style={{ backgroundColor: token.layoutContentBgc }}
        >
            <div className={styles.left}>
                <Select
                    style={{ width: '100%' }}
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
                <div className={styles.left1} style={{ backgroundColor: token.titleCardBgc }}>
                    <Title title={`${t('实时电量')}(${t('kWh')})`} />
                    <div className={styles.left1Content}>
                        {eleData.map(it => {
                            return (
                                <div className={styles.topItem}>
                                    <div className={styles.topVaue} style={{ fontWeight: 400, }} >
                                        <span className={styles.topVaueContent} title={dataEle[it.name]}>{dataEle[it.name]}</span>
                                    </div>
                                    <div className={styles.topItemTitle} title={it.label}>
                                        <span style={{ color: token.smallTitleColor }}>{it.label}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.left2} style={{ backgroundColor: token.titleCardBgc }}>
                    <Title title={t('设备运行情况')} />
                    <div className={styles.cardContent}>
                        <DeviceRunDesc
                            dataSource={dataTotal}
                        />
                    </div>
                </div>
                <div className={styles.left3} style={{ backgroundColor: token.titleCardBgc }}>
                    <Title title={t('告警统计')} />
                    <div className={styles.cardContent}>
                        <AlarmStatics plantId={currentPlantId}/>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.right1} style={{ backgroundColor: token.titleCardBgc }}>
                    <div></div>
                    <div className={styles.cardContent}>
                        <RealPower
                            plantId={currentPlantId}
                        />
                    </div>
                </div>
                <div className={styles.right2} style={{ backgroundColor: token.titleCardBgc }}>
                    <Title title={`${t('历史电量')}(${t('kWh')})`} />
                    <div className={styles.cardContent}>
                        <ElectricityRanking
                            currentPlantId={currentPlantId || dataOption[0]?.value}
                        />
                    </div>
                </div>
                <div className={styles.right3} style={{ backgroundColor: token.titleCardBgc }}>
                    <Title title={t('设备列表')} />
                    <div className={styles.add}>
                        {(user?.roleId === 2 || user?.roleId === 3) &&
                            <div className={styles.addBtn}>
                                <Button
                                    onClick={changIsOpen}
                                    type="primary"
                                >
                                    {t('新增设备')}
                                </Button>
                            </div>}
                    </div>
                    <div className={styles.cardContent} style={{ backgroundColor: token.titleCardBgc }}>
                        <Table
                            dataSource={data}
                            changeIsOpenDel={changeIsOpenDel}
                            edit={edit}
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
                title={[<><ExclamationCircleFilled style={{ color: '#FAAD14', marginRight: '0.5208rem' }} />{t('系统提示')}</>]}
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