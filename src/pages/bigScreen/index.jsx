import React, { useState, useEffect, useMemo, useRef } from 'react';
import styles from "./index.less";
import { useSelector, useIntl, history, useDispatch } from "umi";
import { theme, Space, Table, Carousel, Dropdown, Tooltip,DatePicker} from "antd"
import dayjs from 'dayjs';
import pic1 from '@/assets/svg/default/闪电.svg'
import pic2 from '@/assets/svg/default/闪电底座.svg'
import pic3 from '@/assets/svg/default/告警统计.svg'
import pic4 from '@/assets/imges/energy1.jpg'
import pic5 from '@/assets/imges/energy2.jpg'
import pic6 from '@/assets/imges/energy3.jpg'
import pic7 from '@/assets/svg/dark/闪电.svg'
import pic8 from '@/assets/svg/dark/闪电底座.svg'
import HistoryCurve from "@/pages/bigScreen/components/HistoryCurve";
import StatisticCurve from "@/pages/bigScreen/components/StatisticCurve/index.jsx";
import PowerCurve from "@/pages/bigScreen/components/PowerCurve/index.jsx";
import EfficiencyCurve from "@/pages/bigScreen/components/EfficiencyCurve/index.jsx";
import {
    apiGetAllPlant,
    apiGetAllPlantAlarmDistribution, apiGetAllPlantEnergy, apiGetAllPlantEnergyByDay, apiGetAllPlantPowerCurves,
    apiGetPlantAlarmDistribution, apiGetPlantEnergy, apiGetPlantEnergyByDay,
    apiGetPlantList, apiGetPlantPowerCurves
} from "@/services/bigScreen";
import {
    LogoutOutlined,
} from '@ant-design/icons';
import languageChineseSvg from "@/assets/svg/language-chinese.svg";
import languageEnglishSvg from "@/assets/svg/language-english.svg";
import mySvg from "@/assets/svg/my.svg";
import useIcon from '@/hooks/useIcon';
import useLocale from "@/hooks/useLocale"
import { setLocalStorage, removeLocalStorage, } from "@/utils/utils";
import { FILE_URL } from "@/utils/constants";

import { updateLanguage } from "@/services/user";

function Com(props) {
    const dispatch = useDispatch();
    const { token } = theme.useToken();
    const intl = useIntl();
    const t = (id) => intl.formatMessage({ id });
    const global = useSelector(state => state.global);
    const { user } = useSelector(state => state.user);
    const [tableData, setTableData] = useState([]);
    const [alarmData, setAlarmData] = useState([]);
    const [powerCurveData, setPowerCurveData] = useState([]);
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [powerCurveDataX, setPowerCurveDataX] = useState([]);
    const [powerCurveDataY, setPowerCurveDataY] = useState([]);
    const [powerCurveLegend, setPowerCurveLegend] = useState([]);
    const [realData, setRealData] = useState({});
    const [efficiencyX, setEfficiencyX] = useState([]);
    const [efficiencyY, setEfficiencyY] = useState([]);
    const [historyDataX, setHistoryDataX] = useState([]);
    const [historyDataCharge, setHistoryDataCharge] = useState([]);
    const [historyDataDisCharge, setHistoryDataDisCharge] = useState([]);
    const Icon = useIcon();

    const columns = [
        {
            title: t('电站名称'),
            dataIndex: 'name',
            key: 'name',
            width: '10%'
        },
        // {
        //     title: t('所属用户'),
        //     dataIndex: 'userName',
        //     key: 'userName',
        //     width: '10%'
        // },
        {
            title: t('电站类型'),
            dataIndex: 'typeName',
            key: 'typeName',
            width: '10%'
        },
        {
            title: t('建站日期'),
            dataIndex: 'installDateVo',
            key: 'installDateVo',
            width: '15%'
        },
        {
            title: t('装机容量'),
            dataIndex: 'capacity',
            key: 'capacity',
            width: '15%'
        },
        {
            title: t('电站位置'),
            dataIndex: 'position',
            key: 'position',
            width: '25%'
        },
        {
            title: t('操作'),
            key: 'action',
            width: '10%',
            render: (_, record) => (
                <Space size="middle" style={{ cursor: 'pointer' }}>
                    <span onClick={() => plantClick(record)} style={{ color: '#03B4B4' }}>{t('查看详情')}</span>
                </Space>
            ),
        },
    ];
    const plantClick = (record) => {
        console.log(1, record)
        localStorage.setItem('plantId', record.plantId);
        history.push("/index/home");
    }

    const getPlantList = async (roleId) => {
        let plantListRes, alarmRes, powerCurveRes, realRes, historyRes;
        if (roleId == 4) {
            plantListRes = await apiGetAllPlant();
            alarmRes = await apiGetAllPlantAlarmDistribution();
            powerCurveRes = await apiGetAllPlantPowerCurves({
                date
            });
            realRes = await apiGetAllPlantEnergy();
            historyRes = await apiGetAllPlantEnergyByDay();
        } else {
            plantListRes = await apiGetPlantList();
            alarmRes = await apiGetPlantAlarmDistribution();
            powerCurveRes = await apiGetPlantPowerCurves({
                date
            });
            realRes = await apiGetPlantEnergy();
            historyRes = await apiGetPlantEnergyByDay();
        }

        if (plantListRes?.data?.code == 200) {
            plantListRes?.data?.data.forEach((item, index) => {
                item.key = index;
            })
            setTableData(plantListRes?.data?.data);
        };

        if (alarmRes?.data?.code == 200) {
            let itemStyle = {}, temp = [];
            alarmRes?.data?.data?.forEach(item => {
                if (item?.type == 1) {
                    itemStyle = {
                        borderColor: "#FF0000",
                        borderWidth: 1,
                        color: "rgba(255,0,0,0.25)",
                    }
                    let it = { ...item, itemStyle }
                    temp.push(it);
                } else if (item?.type == 2) {
                    itemStyle = {
                        borderColor: "#FF5500",
                        borderWidth: 1,
                        color: "rgba(255,101,0,0.34)",
                    }
                    let it = { ...item, itemStyle }
                    temp.push(it);
                } else if (item?.type == 3) {
                    itemStyle = {
                        borderColor: "#00F8FF",
                        borderWidth: 1,
                        color: "rgba(0,248,255,0.21)",
                    }
                    let it = { ...item, itemStyle }
                    temp.push(it);
                } else if (item?.type == 4) {
                    itemStyle = {
                        borderColor: "#02FF00",
                        borderWidth: 1,
                        color: "rgba(2,255,0,0.25)",
                    }
                    let it = { ...item, itemStyle }
                    temp.push(it);
                }
            });
            setAlarmData(temp);
        };

        if (powerCurveRes?.data?.code == 200) {
            let tempX = [], tempY = [], legend = [];
            powerCurveRes?.data?.data.forEach((item, index) => {
                let dataY = [];
                if (index == 0) {
                    item?.value?.forEach(it => {
                        it.time = dayjs(it.time).format('HH:mm');
                        tempX.push(it.time);
                        dataY.push(it.value)
                    })
                } else {
                    item?.value?.forEach(it => {
                        dataY.push(it.value)
                    })
                }
                legend.push(item.label);
                tempY.push({
                    name: item.label,
                    type: 'line',
                    data: dataY,
                },)
            })
            setPowerCurveDataX(tempX);
            setPowerCurveDataY(tempY);
            setPowerCurveLegend(legend);
        };

        if (realRes?.data?.code === 200) {
            let data = realRes?.data?.data;
            let tempX = [], tempY = [];
            setRealData(data);

            let reversedData = [...(data?.efficiencyRanking ?? [])].reverse();
            reversedData?.forEach((item, index) => {
                const plantName = item?.plantName;
                const efficiency = item?.efficiency;

                tempX.push(plantName);
                tempY.push(efficiency);
            });

            setEfficiencyX(tempX);
            setEfficiencyY(tempY);
        }

        if (historyRes?.data?.code == 200) {
            let tempX = [], tempCharge = [], tempDisCharge = [];
            historyRes?.data?.data?.forEach(item => {
                tempX.push(dayjs(item.date).format('MM-DD'));
                tempCharge.push(item?.charge);
                tempDisCharge.push(item?.discharge);
            });
            setHistoryDataX(tempX);
            setHistoryDataCharge(tempCharge);
            setHistoryDataDisCharge(tempDisCharge);
        };
    }
    useEffect(() => {
        getPlantList(user.roleId);
    }, [token])
const getPowerCurve = async (date) => {
    let powerCurveRes;
    if (user.roleId == 4) {
        powerCurveRes = await apiGetAllPlantPowerCurves({
            date
        });
    } else {
        powerCurveRes = await apiGetPlantPowerCurves({
            date
        });
    }
    if (powerCurveRes?.data?.code == 200) {
        let tempX = [], tempY = [], legend = [];
        powerCurveRes?.data?.data.forEach((item, index) => {
            let dataY = [];
            if (index == 0) {
                item?.value?.forEach(it => {
                    it.time = dayjs(it.time).format('HH:mm');
                    tempX.push(it.time);
                    dataY.push(it.value)
                })
            } else {
                item?.value?.forEach(it => {
                    dataY.push(it.value)
                })
            }
            legend.push(item.label);
            tempY.push({
                name: item.label,
                type: 'line',
                data: dataY,
            },)
        })
        setPowerCurveDataX(tempX);
        setPowerCurveDataY(tempY);
        setPowerCurveLegend(legend);
    };
}
    const changeTheme = (theme) => {
        setLocalStorage("theme", theme);
        dispatch({
            type: 'global/changeTheme',
            payload: {
                theme
            }
        })
    }
    const changeLanguage = async (locale) => {
        let flag = false;
        if (locale === 'zh-CN') {
            let { data } = await updateLanguage({ language: 1 });
            flag = data;
        } else if (locale === 'en-US') {
            let { data } = await updateLanguage({ language: 3 });
            flag = data;
        }
        if (flag) {
            window.location.reload();
            setLocalStorage('locale', locale);
        }

    }
    return (
        <div className={`${styles.largeScreen} ${global.theme == 'default' ? 'mDefault' : 'mDark'}`}
            style={{ backgroundColor: token.bigScreenBgc, color: token.colorLargeScreen }}>
            <div className={global.theme == 'default' ? styles.title_default : styles.title_dark}>{t('储能电站监控大屏')}
                <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', right: '20px', bottom: '30px' }}>
                    {
                        global.theme === "default" ?
                            <Icon
                                type='icon-shense'
                                // src={themeDefaultSvg}
                                style={{ cursor: 'pointer', fontSize: "30px" }}
                                onClick={() => changeTheme('dark')}
                            />
                            :
                            <Icon
                                // src={themeDarkSvg}
                                type='icon-qianse'
                                style={{ cursor: 'pointer', fontSize: "30px", }}
                                onClick={() => changeTheme('default')}
                            />
                    }
                    {
                        global.locale === "zh-CN" ?
                            <img
                                src={languageEnglishSvg}
                                style={{ cursor: 'pointer', margin: '0px 40px', width: '30px', height: '30px' }}
                                onClick={() => changeLanguage('en-US')}
                            />
                            :
                            <img
                                src={languageChineseSvg}
                                style={{ cursor: 'pointer', margin: '0px 40px', width: '30px', height: '30px' }}
                                onClick={() => changeLanguage('zh-CN')}
                            />
                    }
                    <Dropdown
                        placement="bottom"
                        menu={{
                            items: [
                                {
                                    label: (<Space
                                        size={10}
                                        align="baseline"
                                        style={{ width: '100%', height: '100%' }}
                                        onClick={() => {

                                        }}
                                    >
                                        {/* <UserOutlined 
                                              style={{
                                                fontSize: 15,
                                              }}
                                            /> */}
                                        <span>{useLocale('退出登录')}</span>
                                    </Space>
                                    ),
                                    key: 'logout',
                                    icon: <LogoutOutlined />,
                                },
                                // {
                                //     label: useLocale('切换电站'),
                                //     key: 'changeAccount',
                                //     icon: <UserSwitchOutlined />,
                                // },
                            ],
                            onClick({ key }) {
                                if (key === "logout") {
                                    removeLocalStorage("Token");
                                    history.push('/login');
                                }
                                if (key === "changeAccount") {
                                    history.push('/largeScreen');
                                }
                            }
                        }}
                    >
                        <img
                            src={mySvg}
                            style={{ cursor: 'pointer', width: '30px', height: '30px' }}
                        />
                    </Dropdown>
                </div>
            </div>
            <div className={styles.container}
                style={{ backgroundColor: token.bigScreenBgc, color: token.colorLargeScreen }}>
                <div className={styles.real}
                    style={{ backgroundColor: token.titleCardBgc, color: token.colorLargeScreen }}>
                    <div className={global.theme == 'default' ? styles.lTitle_default : styles.lTitle_dark}>{t('电量统计')}
                    </div>
                    <div style={{ color: token.colorLittle }}>
                        <div>
                            <div>
                                <div style={{ color: '#03B4B4' }}>{realData?.dayChargeEnergy?.split(' ')[0]}</div>
                                <div style={{ color: token.bigColor1 }}>{realData?.dayChargeEnergy?.split(' ')[1]}</div>
                                <div style={{ color: token.colorLight }}>{t('日充电量')}</div>
                            </div>
                            <div>
                                <div>{realData?.totalChargeEnergy?.split(' ')[0]}</div>
                                <div style={{ color: token.bigColor1 }}>{realData?.totalChargeEnergy?.split(' ')[1]}</div>
                                <div style={{ color: token.colorLight }}>{t('累计充电量')}</div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.myPic}>
                                <img className={styles.animated_image} src={global.theme == 'default' ? pic1 : pic7} />
                                <img src={global.theme == 'default' ? pic2 : pic8} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <div style={{ color: '#03B4B4' }}>{realData?.dayDischargeEnergy?.split(' ')[0]}</div>
                                <div style={{ color: token.bigColor1 }}>{realData?.dayDischargeEnergy?.split(' ')[1]}</div>
                                <div style={{ color: token.colorLight }}>{t('日放电量')}</div>
                            </div>
                            <div>
                                <div>{realData?.totalDischargeEnergy?.split(' ')[0]}</div>
                                <div style={{ color: token.bigColor1 }}>{realData?.totalDischargeEnergy?.split(' ')[1]}</div>
                                <div style={{ color: token.colorLight }}>{t('累计放电量')}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.history}
                    style={{ backgroundColor: token.titleCardBgc, color: token.colorLargeScreen }}>
                    <div className={global.theme == 'default' ? styles.lTitle_default : styles.lTitle_dark}>{t('历史电量')}
                    </div>
                    <HistoryCurve dataX={historyDataX} charge={historyDataCharge} disCharge={historyDataDisCharge} />
                </div>
                <div className={styles.mv} style={{ backgroundColor: token.titleCardBgc, color: token.colorLargeScreen }}>
                    <Carousel autoplay arrows={true} adaptiveHeight={false} draggable={true} style={{ display: 'flex', alignItems: 'center', height: "100%" }}>
                        <div >
                            <img src={pic4} />
                        </div>
                        <div>
                            <img src={pic5} />
                        </div>
                        <div>
                            <img src={pic6} />
                        </div>
                    </Carousel>
                </div>
                <div className={styles.alarm}
                    style={{ backgroundColor: token.titleCardBgc, color: token.colorLargeScreen }}>
                    <div className={global.theme == 'default' ? styles.lTitle_default : styles.lTitle_dark}>{t('设备实时告警数(台)')}
                    </div>
                    <div className={styles.alarmBody}>
                        {[{ label: '1级告警', type: 1 }, { label: '2级告警', type: 2 }, { label: '3级告警', type: 3 }, { label: '4级告警', type: 4 }].map(it => {
                            return <div className={styles.alarmItem} style={{ backgroundImage: `url(${FILE_URL}/${global.theme === "default" ? `${it.type}级告警_浅色.svg` : `${it.type}级告警_深色.svg`})  `, backgroundSize: '85%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }}>
                                <div style={{ width: '60%' }}>
                                    <div style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', paddingLeft: '40%', fontFamily: 'DingTalkJinBuTi' }}>{(alarmData && alarmData?.find(item => item.type == it.type)?.value) || 0}</div>
                                    <Tooltip placement="top" title={t(it.label)} ><div style={{ fontSize: '14px', textAlign: 'center', paddingLeft: '40%' }}> {t(it.label)}</div></Tooltip>
                                </div>
                            </div>
                        })}
                    </div>
                    {/* <div style={{position: 'relative', height: 'calc(100% - 100px )'}}>
                        <div style={{height: '100%'}}>
                            <StatisticCurve data={alarmData}/>
                        </div>
                        <div
                            style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                            <div className={styles.gj}
                                 style={{position: 'relative', color: token.colorTextPlaceholder}}>
                                <div style={{color:token.alarmColor}}>
                                    {
                                        (alarmData && alarmData?.length > 0) ? alarmData?.reduce((acc, {value}) => acc + value, 0) : 0
                                    }
                                </div>
                                <div title={t('告警总数')} className={styles.totalGJ}>{t('告警总数')}</div>
                                <img src={global.theme == 'default' ? pic3 : pic9} style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    maxWidth: '160%',
                                    height: '174%',
                                    zIndex: '-1'
                                }}/>
                            </div>
                        </div>
                    </div> 
                    <div className={styles.gaojing} style={{color:token.colorLight}}>
                        <div className={styles.gaojing_item}>
                            <div>
                                {
                                    alarmData && alarmData?.some(item => item.type == 1) && (
                                        <div className={styles.gj2}>
                                            <span style={{
                                                background: 'rgba(255,0,0,0.25)',
                                                border: '1px solid #FF0000'
                                            }}></span>
                                            <span title={t('一级告警')}>{t('一级告警')}</span>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    alarmData && alarmData?.some(item => item.type == 2) && (
                                        <div className={styles.gj2}>
                                            <span style={{
                                                background: 'rgba(255,101,0,0.34)',
                                                border: '1px solid #FF6500'
                                            }}></span>
                                            <span title={t('二级告警')}>{t('二级告警')}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className={styles.gaojing_item}>
                            <div>
                                {
                                    alarmData && alarmData?.some(item => item.type == 3) && (
                                        <div className={styles.gj2}>
                                            <span style={{
                                                background: 'rgba(0,248,255,0.21)',
                                                border: '1px solid #00F8FF'
                                            }}></span>
                                            <span title={t('三级告警')}>{t('三级告警')}</span>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    alarmData && alarmData?.some(item => item.type == 4) && (
                                        <div className={styles.gj2}>
                                            <span style={{
                                                background: 'rgba(2,255,0,0.25)',
                                                border: '1px solid #02FF00'
                                            }}></span>
                                            <span title={t('四级告警')}>{t('四级告警')}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className={styles.curve}
                    style={{ backgroundColor: token.titleCardBgc, color: token.colorLargeScreen }}>
                    <div className={global.theme == 'default' ? styles.lTitle_default : styles.lTitle_dark} style={{display:'flex',justifyContent:'space-between',paddingRight:'10px'}}>{t('功率曲线')}
                    <DatePicker size='small' value={dayjs(date)} onChange={(date,dateString)=> {setDate(dateString);getPowerCurve(dateString)}} />
                    </div>
                    <PowerCurve dataX={powerCurveDataX} dataY={powerCurveDataY} legend={powerCurveLegend} />
                </div>
                <div className={styles.rank}
                    style={{ backgroundColor: token.titleCardBgc, color: token.colorLargeScreen }}>
                    <div className={global.theme == 'default' ? styles.lTitle_default : styles.lTitle_dark}>{t('效率排行')}
                    </div>
                    <EfficiencyCurve dataX={efficiencyX} dataY={efficiencyY} />
                </div>
                {/*<div className={styles.plantL}*/}
                <div className={`${styles.plantL} ${global.theme == 'default' ? styles.scrollDef : styles.scrollDark}`}
                    style={{ backgroundColor: token.titleCardBgc, color: token.colorLargeScreen }}>
                    <div className={global.theme == 'default' ? styles.lTitle_default : styles.lTitle_dark}>{t('电站列表')}
                    </div>
                    <div className={styles.plantL_table_one}>
                        <Table columns={columns} />
                    </div>
                    <div className={styles.plantL_table_two}>
                        <Table
                            pagination={{
                                hideOnSinglePage: true
                            }}
                            showHeader={false}
                            columns={columns} dataSource={tableData}
                        />
                    </div>
                </div>
                <div className={styles.contribute}
                    style={{ backgroundColor: token.titleCardBgc, color: token.colorLargeScreen }}>
                    <div className={global.theme == 'default' ? styles.lTitle_default : styles.lTitle_dark}>{t('社会贡献')}
                    </div>
                    <div style={{ color: token.colorLittle }}>
                        <div className={styles.socie}>
                            <div>
                                <span>{realData?.socialEffectVo?.coal}</span>
                                <span style={{ color: token.bigColor1, fontFamily: 'DingTalkJinBuTi' }}>{t('吨')}</span>
                            </div>
                            <div>{t('节约标准煤')}</div>
                            <div
                                className={global.theme == 'default' ? styles.mei_default : styles.mei_dark}></div>
                        </div>
                        <div className={styles.socie}>
                            <div>
                                <span>{realData?.socialEffectVo?.co2}</span>
                                <span style={{ color: token.bigColor1, fontFamily: 'DingTalkJinBuTi' }}>{t('吨')}</span>
                            </div>
                            <div>{t('CO2减排量')}</div>
                            <div
                                className={global.theme == 'default' ? styles.tan_default : styles.tan_dark}></div>
                        </div>
                        <div className={styles.socie}>
                            <div>
                                <span>{realData?.socialEffectVo?.tree}</span>
                                <span style={{ color: token.bigColor1, fontFamily: 'DingTalkJinBuTi' }}>{t('棵')}</span>
                            </div>
                            <div>{t('等效植树量')}</div>
                            <div
                                className={global.theme == 'default' ? styles.shu_default : styles.shu_dark}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Com