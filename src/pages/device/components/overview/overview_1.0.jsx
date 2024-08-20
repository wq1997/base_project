import { useIntl, useSelector } from "umi";
import { theme as antdTheme, Radio, Spin } from "antd";
import { Title, ScrollTable } from "@/components";
import SchematicDiagram from "./SchematicDiagram";
import styles from "./overview_1.0.less";
import { useState } from "react";
import leftTop1Img from "@/assets/imges/leftTop1.svg";
import leftTop2Img from "@/assets/imges/leftTop2.svg";
import leftTop3Img from "@/assets/imges/leftTop3.svg";
import leftTop4Img from "@/assets/imges/leftTop4.svg";
import leftTopBgImg from "@/assets/imges/leftTopBg.svg";
import leftTopWhiteBgImg from "@/assets/imges/leftWhiteTopBg.svg";
import xtxl1Img from "@/assets/imges/xtxl1.svg";
import xtxlWhiteBgImg from "@/assets/imges/leftTopBg2_white.svg";
import xtxlBgImg from "@/assets/imges/xtxlBg.svg";
import leftBottom1Img from "@/assets/imges/leftBottom1.svg";
import leftBottom2Img from "@/assets/imges/leftBottom2.svg";
import leftBottom3Img from "@/assets/imges/leftBottom3.svg";
import leftBottom4Img from "@/assets/imges/leftBottom4.svg";
import leftBottomBg1Img from "@/assets/imges/leftBottomBg1.svg";
import leftBottomWhiteBg1Img from "@/assets/imges/leftBottomWhiteBg1.svg";
import bottomLeft1Img from "@/assets/imges/bottomLeft1.svg";
import bottomLeft2Img from "@/assets/imges/bottomLeft2.svg";
import bottomLeftBgImg from "@/assets/imges/bottomLeftBg.svg";
import bottomLeft1WhiteImg from "@/assets/imges/bottomLeft1WhiteImg.svg"
import MyRadio from "./MyRadio";
import { useEffect } from "react";
import { getQueryString, cloneObject } from "@/utils/utils";
import {
    getDtuOverViews as getDtuOverViewsServe,
} from "@/services";
import classNames from "classnames";
import { useEmotionCss } from '@ant-design/use-emotion-css';

const OverView = ({ deviceVersion, sn }) => {
    const id = getQueryString('id');
    const title = getQueryString('title')
    const intl = useIntl();
    const { token } = antdTheme.useToken();
    const { theme, locale } = useSelector(state => state.global);
    const [dataSource, setDataSource] = useState({});
    const [currentElectricType, setCurrentElectricType] = useState('JLDB');
    const [currentSystemEfficiency, setCurrentSystemEfficiency] = useState('ALL');

    const [electricityStatisticsDataSource, setElectricityStatisticsDataSource] = useState([
        {
            title: '日充电量',
            data: 0,
            icon: leftTop3Img
        },
        {
            title: '日放电量',
            data: 0,
            icon: leftTop4Img
        },
        {
            title: '累计充电量',
            data: 0,
            icon: leftTop1Img
        },
        {
            title: '累计放电量',
            data: 0,
            icon: leftTop2Img
        }
    ])

    const [systemEfficiencyDataSource, setSystemEfficiencyDataSource] = useState([
        {
            title: "PCS",
            data: 0,
            color: '#37EEFF'
        },
        {
            title: "计量电表",
            data: 0,
            color: '#B95CFC'
        }
    ]);

    const [benefitStatisticsDataSource, setBenefitStatisticsDataSource] = useState([
        {
            title: "日收益",
            data: 0,
            color: '#FFE600',
            backgroundImg: leftBottomBg1Img,
            img: leftBottom1Img
        },
        {
            title: "月收益",
            data: 0,
            color: '#00C3FF',
            backgroundImg: leftBottomBg1Img,
            img: leftBottom3Img
        },
        {
            title: "累计收益",
            data: 0,
            color: '#B95CFC',
            backgroundImg: leftBottomBg1Img,
            img: leftBottom4Img
        }
    ]);

    const [bmsInfoDataSource, setBmsInfoDataSource] = useState([
        {
            title: "单体最高",
            icon: bottomLeft1Img,
            data: [
                {
                    title: "温度",
                    value: 0,
                    unit: '℃'
                },
                {
                    title: "No.",
                    value: 0
                },
                {
                    title: "电压",
                    value: 0,
                    unit: 'V'
                },
                {
                    title: "No.",
                    value: 0
                }
            ]
        },
        {
            title: "单体最低",
            icon: bottomLeft2Img,
            data: [
                {
                    title: "温度",
                    value: 0,
                    unit: '℃'
                },
                {
                    title: "No.",
                    value: 0
                },
                {
                    title: "电压",
                    value: 0,
                    unit: 'V'
                },
                {
                    title: "No.",
                    value: 0
                }
            ]
        }
    ])

    const [pcsInfoDataSource, setPcsInfoDataSource] = useState([
        {
            title: `${intl.formatMessage({ id: '电流' })}(A)`,
            A: 0,
            B: 0,
            C: 0,
        }]
    );

    const [pcsInfoDataSource2, setPcsInfoDataSource2] = useState([
        {
            title: `${intl.formatMessage({ id: '电压' })}(V)`,
            AB: 0,
            BC: 0,
            AC: 0,
        }
    ])

    const [communicationStatusDataSource, setCommunicationStatusDataSource] = useState([
        {
            label: 'BMS',
            key: "BMS",
            checked: false
        },
        {
            label: 'PCS',
            key: "PCS",
            checked: false
        },
        {
            label: '计量电表',
            key: "JLDB",
            checked: false
        },
        {
            label: '负荷电表',
            key: "FHDB",
            checked: false
        },
    ])

    const getDataSource = async () => {
        const res = await getDtuOverViewsServe({ dtuId: id, type: deviceVersion });
        if (res?.data?.data) {
            setDataSource(res?.data?.data);
        }
    }


    useEffect(() => {
        const newElectricityStatisticsDataSource = cloneObject(electricityStatisticsDataSource); // 电量统计
        const newSystemEfficiencyDataSource = cloneObject(systemEfficiencyDataSource); // 系统效率(前一日)
        const newBenefitStatisticsDataSource = cloneObject(benefitStatisticsDataSource); //收益统计
        const newBmsInfoDataSource = cloneObject(bmsInfoDataSource); //BMS信息
        const newPcsInfoDataSource = cloneObject(pcsInfoDataSource); //PCS信息
        const newPcsInfoDataSource2 = cloneObject(pcsInfoDataSource2);
        const newCommunicationStatusDataSource = cloneObject(communicationStatusDataSource); //通讯状态

        // 电量统计
        if (currentElectricType === "PCS") {
            newElectricityStatisticsDataSource[0].data = dataSource?.pcs?.dayCEnergy || 0;
            newElectricityStatisticsDataSource[1].data = dataSource?.pcs?.dayDEnergy || 0;
            newElectricityStatisticsDataSource[2].data = dataSource?.pcs?.totalCEnergy || 0;
            newElectricityStatisticsDataSource[3].data = dataSource?.pcs?.totalDEnergy || 0;
        } else if (currentElectricType === "JLDB") {
            newElectricityStatisticsDataSource[0].data = dataSource?.gmeter?.dayChargeEnergy || 0;
            newElectricityStatisticsDataSource[1].data = dataSource?.gmeter?.dayDischargeEnergy || 0;
            newElectricityStatisticsDataSource[2].data = dataSource?.gmeter?.totalCEnergy || 0;
            newElectricityStatisticsDataSource[3].data = dataSource?.gmeter?.totalDEnergy || 0;
        }

        if (currentSystemEfficiency === "ALL") {
            // 系统效率(累计)
            newSystemEfficiencyDataSource[0].data = dataSource?.pcsEfficiency || 0;
            newSystemEfficiencyDataSource[1].data = dataSource?.meterEfficiency || 0;
        } else if (currentSystemEfficiency === "PRE") {
            newSystemEfficiencyDataSource[0].data = dataSource?.pcsEfficiencyDay || 0;
            newSystemEfficiencyDataSource[1].data = dataSource?.meterEfficiencyDay || 0;
        }

        //收益统计
        newBenefitStatisticsDataSource[0].data = dataSource?.gmeter?.dayEarning || 0;
        newBenefitStatisticsDataSource[1].data = dataSource?.gmeter?.monEarning || 0;
        newBenefitStatisticsDataSource[2].data = dataSource?.gmeter?.sumEarning || 0;

        //BMS信息
        newBmsInfoDataSource[0].data[0].value = dataSource?.bms?.cellTempMax || 0;
        newBmsInfoDataSource[0].data[1].value = dataSource?.bms?.cellTempMaxNo || 0;
        newBmsInfoDataSource[0].data[2].value = dataSource?.bms?.cellVolMax || 0;
        newBmsInfoDataSource[0].data[3].value = dataSource?.bms?.cellVolMaxNo || 0;

        newBmsInfoDataSource[1].data[0].value = dataSource?.bms?.cellTempMin || 0;
        newBmsInfoDataSource[1].data[1].value = dataSource?.bms?.cellTempMinNo || 0;
        newBmsInfoDataSource[1].data[2].value = dataSource?.bms?.cellVolMin || 0;
        newBmsInfoDataSource[1].data[3].value = dataSource?.bms?.cellVolMinNo || 0;

        // PCS信息
        newPcsInfoDataSource[0].title = `${intl.formatMessage({ id: '电流' })}(A)`;
        newPcsInfoDataSource[0].A = dataSource?.pcs?.phaseACur || 0;
        newPcsInfoDataSource[0].B = dataSource?.pcs?.phaseBCur || 0;
        newPcsInfoDataSource[0].C = dataSource?.pcs?.phaseCCur || 0;

        newPcsInfoDataSource2[0].title = `${intl.formatMessage({ id: '电压' })}(V)`;
        newPcsInfoDataSource2[0].AB = dataSource?.pcs?.lineAbVol || 0;
        newPcsInfoDataSource2[0].BC = dataSource?.pcs?.lineBcVol || 0;
        newPcsInfoDataSource2[0].AC = dataSource?.pcs?.lineAcVol || 0;

        //通讯状态
        newCommunicationStatusDataSource[0].checked = dataSource?.Status?.bms || 0;
        newCommunicationStatusDataSource[1].checked = dataSource?.Status?.pcs || 0;
        newCommunicationStatusDataSource[2].checked = dataSource?.Status?.gmeter || 0;
        newCommunicationStatusDataSource[3].checked = dataSource?.Status?.tmeter || 0;

        setElectricityStatisticsDataSource(newElectricityStatisticsDataSource); // 电量统计
        setSystemEfficiencyDataSource(newSystemEfficiencyDataSource); // 系统效率(前一日)
        setBenefitStatisticsDataSource(newBenefitStatisticsDataSource); // 收益统计
        setBmsInfoDataSource(newBmsInfoDataSource); //BMS信息
        setPcsInfoDataSource(newPcsInfoDataSource); //PCS信息 
        setPcsInfoDataSource2(newPcsInfoDataSource2);
        setCommunicationStatusDataSource(newCommunicationStatusDataSource); //通讯状态
    }, [dataSource, currentElectricType, currentSystemEfficiency, locale])

    useEffect(() => {
        getDataSource();
    }, [])

    const backgroundStyle = useEmotionCss(() => {
        return {
            background: token.color22
        }
    })

    const centerRightStyle = useEmotionCss(() => {
        return {
            background: token.color23
        }
    })
    
    return (
        <div
            className={styles.overView}
            style={{
                background: token.color29
            }}
        >
            <div className={classNames(styles.top, backgroundStyle)}>
                <div className={styles.topTitle}>{title ? decodeURI(title) : ''}</div>
                <div className={styles.snTitle} style={{ color: token.color27 }}>{intl.formatMessage({ id: 'SN号' })}：{sn}</div>
            </div>
            <div className={styles.center}>
                <div className={styles.centerLeft}>
                    <div className={classNames(styles.centerLeftOne, backgroundStyle)}>
                        <div className={styles.title}>
                            <Title title={`${intl.formatMessage({ id: '电量统计' })}/kWh`} />
                            <div>
                                <Radio.Group
                                    value={currentElectricType}
                                    onChange={e => setCurrentElectricType(e.target.value)}
                                >
                                    <Radio value={"JLDB"}>{intl.formatMessage({ id: '计量电表' })}</Radio>
                                    <Radio value={"PCS"}>PCS</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className={styles.centerLeftOneArea}>
                            {
                                electricityStatisticsDataSource?.map(item => {
                                    return (
                                        <div className={styles.item}>
                                            <div className={styles.left}>
                                                <img src={item.icon} style={{ width: '100%' }} />
                                            </div>
                                            <div className={styles.right}>
                                                <div className={styles.rightData}>
                                                    <div className={styles.rightData1}>{item.data}</div>
                                                    <div className={styles.rightData2} style={{ color: token.color25 }}>{intl.formatMessage({ id: item.title })}</div>
                                                </div>
                                                <img src={theme === "dark" ? leftTopBgImg : leftTopWhiteBgImg} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={classNames(styles.centerLeftTwo, backgroundStyle)}>
                        <div className={styles.title}>
                            <Title title={intl.formatMessage({ id: '系统效率' })} />
                            <div>
                                <Radio.Group
                                    value={currentSystemEfficiency}
                                    onChange={e => setCurrentSystemEfficiency(e.target.value)}
                                >
                                    <Radio value={"ALL"}>{intl.formatMessage({ id: '累计' })}</Radio>
                                    <Radio value={"PRE"}>{intl.formatMessage({ id: '前一日' })}</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className={styles.centerLeftTwoArea}>
                            {
                                systemEfficiencyDataSource?.map(item => {
                                    return (
                                        <div className={styles.item}>
                                            <img src={xtxl1Img} className={styles.img1} />
                                            <div className={styles.label}>{intl.formatMessage({ id: item.title })}</div>
                                            <div className={styles.data}>
                                                <div style={{ color: item.color }} className={styles.dataCount}>{item.data} %</div>
                                                <img src={theme === "dark" ? xtxlBgImg : xtxlWhiteBgImg} className={styles.img2} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={classNames(styles.centerLeftThree, backgroundStyle)}>
                        <div className={styles.title}>
                            <Title title={`${intl.formatMessage({ id: '收益统计' })}/${intl.formatMessage({ id: '元' })}`} />
                        </div>
                        <div className={styles.centerLeftThreeArea}>
                            {
                                benefitStatisticsDataSource?.map((item, index) => {
                                    return (
                                        <div className={styles.item}>
                                            <img src={theme === "dark" ? leftBottomBg1Img : leftBottomWhiteBg1Img} className={styles.backgroundImg} />
                                            {/* <img src={item.img}  className={styles.img} style={{bottom: '-7px'}}/> */}
                                            <div className={styles.data}>
                                                <div className={styles.data1} style={{ color: item.color }}>{item.data}</div>
                                                <div className={styles.data2} style={{ color: token.color25 }}>{intl.formatMessage({ id: item.title })}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.centerRight, centerRightStyle)}>
                    <SchematicDiagram
                        dataSource={dataSource?.flowDiagram || { totalActivePower: 0, power: 0, loadPower: 0 }}
                        allData={dataSource}
                    />
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={classNames(styles.bottomOne, backgroundStyle)}>
                    <div className={styles.title}>
                        <Title title={intl.formatMessage({ id: 'BMS信息' })} />
                    </div>
                    <div className={styles.area}>
                        {
                            bmsInfoDataSource?.map(bmsItem => {
                                return (
                                    <div>
                                        <div className={styles.subTitle}>
                                            <img src={bmsItem.icon} />
                                            <div style={{ fontSize: 18 }}>{intl.formatMessage({ id: bmsItem.title })}</div>
                                        </div>
                                        <div className={styles.subArea}>
                                            <div className={styles.subAreaLeft}>
                                                <img src={bmsItem.icon} />
                                            </div>
                                            <div className={styles.subAreaRight}>
                                                {
                                                    bmsItem?.data?.map(item => {
                                                        return (
                                                            <div className={styles.subAreaRightItem}>
                                                                <div className={styles.subAreaRightItemTitle}>{intl.formatMessage({ id: item.title })}</div>
                                                                <div className={styles.subAreaRightItemValue}>{item.value} {item?.unit}</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <img src={theme === "dark" ? bottomLeftBgImg : bottomLeft1WhiteImg} className={styles.subAreaBg} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={classNames(styles.bottomTwo, backgroundStyle)}>
                    <div className={styles.title}>
                        <Title title={intl.formatMessage({ id: 'PCS信息' })} />
                    </div>
                    <div className={styles.area}>
                        <div className={classNames(styles.areaItem, styles.areaItemHeader)} style={{ background: token.color30}}>
                            {['', 'A', 'B', 'C'].map(item => <div className={styles.areaItemContent}>{item}</div>)}
                        </div>
                        <div className={classNames(styles.areaItem, styles.areaItemContent)}>
                            {Object.values(pcsInfoDataSource[0] || {}).map((item, index) => <div className={styles.areaItemContent} style={{ color: index === 0 ? '#2193C3' : (theme === "dark" ? '#FFFF' : '#999') }}>{item}</div>)}
                        </div>
                        <div className={classNames(styles.areaItem, styles.areaItemHeader)} style={{ background: token.color30 }}>
                            {['', 'AB', 'BC', 'AC'].map(item => <div className={styles.areaItemContent}>{item}</div>)}
                        </div>
                        <div className={classNames(styles.areaItem, styles.areaItemContent)}>
                            {Object.values(pcsInfoDataSource2[0] || {}).map((item, index) => <div className={styles.areaItemContent} style={{ color: index === 0 ? '#2193C3' : (theme === "dark" ? '#FFFF' : '#999') }}>{item}</div>)}
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.bottomThree, backgroundStyle)}>
                    <div className={styles.title}>
                        <Title title={intl.formatMessage({ id: '通讯状态' })} />
                    </div>
                    <div className={styles.area}>
                        {
                            communicationStatusDataSource?.map(item => {
                                return (
                                    <div className={styles.item}>
                                        <span className={styles.itemLabel}>{intl.formatMessage({ id: item.label })}</span>
                                        <MyRadio checked={item.checked} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverView;