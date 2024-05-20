import { useIntl } from "umi";
import { theme, Radio } from "antd";
import { Title, ScrollTable } from "@/components";
import SchematicDiagram from "./SchematicDiagram";
import styles from "./overview_2.0.less";
import { useState } from "react";
import leftTop1Img from "@/assets/imges/leftTop1.svg";
import leftTop2Img from "@/assets/imges/leftTop2.svg";
import leftTop3Img from "@/assets/imges/leftTop3.svg";
import leftTop4Img from "@/assets/imges/leftTop4.svg";
import leftTopBgImg from "@/assets/imges/leftTopBg.svg";
import leftTopBg2Img from "@/assets/imges/leftTopBg2.svg";
import xtxl1Img from "@/assets/imges/xtxl1.svg";
import xtxlBgImg from "@/assets/imges/xtxlBg.svg";
import leftBottom1Img from "@/assets/imges/leftBottom1.svg";
import leftBottom2Img from "@/assets/imges/leftBottom2.svg";
import leftBottom3Img from "@/assets/imges/leftBottom3.svg";
import leftBottom4Img from "@/assets/imges/leftBottom4.svg";
import leftBottomBg1Img from "@/assets/imges/leftBottomBg1.svg";
import leftBottomBg2Img from "@/assets/imges/leftBottomBg2.svg";
import bottomLeft1Img from "@/assets/imges/bottomLeft1.svg";
import bottomLeft2Img from "@/assets/imges/bottomLeft2.svg";
import bottomLeftBgImg from "@/assets/imges/bottomLeftBg.svg";
import MyRadio from "./MyRadio";

const OverView = () => {
    const intl = useIntl();
    const { token } = theme.useToken();

    const [electricityStatisticsDataSourceLeft, setElectricityStatisticsDataSourceLeft] = useState([
        {
            title: '日充电量',
            data: '10988',
            icon: leftTop1Img
        },
        {
            title: '日放电量',
            data: '10988',
            icon: leftTop2Img
        },
        {
            title: '累计充电量',
            data: '10988',
            icon: leftTop3Img
        },
        {
            title: '累计放电量',
            data: '10988',
            icon: leftTop4Img
        }
    ])

    const [electricityStatisticsDataSourceRight, setElectricityStatisticsDataSourceRight] = useState([
        {
            title: '前一日效率',
            data: '85',
            color: '#B95CFC'
        },
        {
            title: '累计效率',
            data: '85',
            color: '#FFE600'
        },
    ])

    const [systemEfficiencyDataSource, setSystemEfficiencyDataSource] = useState([
        {
            title: "累计效率",
            data: 85,
            color: '#72FFE3',
            type: 'left'
        },
        {
            title: "累计充电量",
            data: 10889,
            color: '#00CCFF',
            icon: leftTop3Img,
            type: 'right'
        },
        {
            title: "累计放电量",
            data: 10889,
            color: '#00CCFF',
            icon: leftTop4Img,
            type: 'right'
        }
    ]);

    const [benefitStatisticsDataSource, setBenefitStatisticsDataSource] = useState([
        {
            title: "日收益",
            data: 10988,
            color: '#FFE600',
            backgroundImg: leftBottomBg1Img,
            img: leftBottom1Img
        },
        {
            title: "周收益",
            data: 10988,
            color: '#72FFE3',
            backgroundImg: leftBottomBg2Img,
            img: leftBottom2Img
        },
        {
            title: "月收益",
            data: 10988,
            color: '#00C3FF',
            backgroundImg: leftBottomBg1Img,
            img: leftBottom3Img
        },
        {
            title: "累计收益",
            data: 10988,
            color: '#B95CFC',
            backgroundImg: leftBottomBg2Img,
            img: leftBottom4Img
        }
    ]);

    const [bmsInfoDataSource, setBmsInfoDataSource] = useState([
        {
            title: "单体最高",
            icon: bottomLeft1Img,
            data: [
                {
                    title: "温度/℃",
                    value: 0
                },
                {
                    title: "No.",
                    value: 0
                },
                {
                    title: "电压/mV",
                    value: 0
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
                    title: "温度/℃",
                    value: 0
                },
                {
                    title: "No.",
                    value: 0
                },
                {
                    title: "电压/mV",
                    value: 0
                },
                {
                    title: "No.",
                    value: 0
                }
            ]
        }
    ])

    const [communicationStatusDataSource, setCommunicationStatusDataSource] = useState([
        {
            label: 'BMS',
            key: "BMS",
            checked: true
        },
        {
            label: 'PCS',
            key: "PCS",
            checked: true
        },
        {
            label: 'UPS',
            key: "UPS",
            checked: false
        },
        {
            label: '计量电表',
            key: "JLDB",
            checked: true
        },
        {
            label: '负荷电表',
            key: "FHDB",
            checked: false
        },
    ])

    return (
        <div 
            className={styles.overView}
            style={{ 
                background: token.bgcColorB_l
            }}
        >
                <div className={styles.top}>
                    <div className={styles.topTitle}>东方日立1号储能柜</div>
                    <div className={styles.snTitle}>{intl.formatMessage({id:'SN号'})}：CH005000AADFH001</div>
                </div>
                <div className={styles.center}>
                    <div className={styles.centerLeft}>
                        <div className={styles.centerLeftOne}>
                            <div className={styles.title}>
                                <Title title={intl.formatMessage({id: '关口表电量统计'})} />
                            </div>
                            <div className={styles.centerLeftOneArea}>
                                <div  className={styles.centerLeftOneAreaLeft}>
                                    {
                                        electricityStatisticsDataSourceLeft?.map(item => {
                                            return (
                                                <div className={styles.item}>
                                                    <div className={styles.left}>
                                                        <img src={item.icon} style={{width: '100%'}} />
                                                    </div>
                                                    <div className={styles.right}>
                                                        <div className={styles.rightData}>
                                                            <div className={styles.rightData1}>{item.data}</div>
                                                            <div className={styles.rightData2}>{intl.formatMessage({id: item.title})}</div>
                                                        </div>
                                                        <img src={leftTopBgImg} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={styles.centerLeftOneAreaRight}>
                                    {
                                        electricityStatisticsDataSourceRight?.map(item => {
                                            return (
                                                <div className={styles.item}>
                                                    <img src={leftTopBg2Img} className={styles.backgroundImg}/>
                                                    <div className={styles.data}>
                                                        <div className={styles.data1} style={{color: item.color}}>{item.data}%</div>
                                                        <div className={styles.data2} >{intl.formatMessage({id: item.title})}</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles.centerLeftTwo}>
                            <div className={styles.title}>
                                <Title title={intl.formatMessage({id: 'PCS电量统计'})} />
                            </div>
                            <div className={styles.centerLeftTwoArea}>
                                {
                                    systemEfficiencyDataSource?.map(item => {
                                        return (
                                            <div className={item.type==="left"?styles.itemLeft:styles.itemRight}>
                                               {
                                                 item.type==="left"?
                                                    <>
                                                        <img src={leftTopBg2Img} className={styles.backgroundImg}/>
                                                        <div className={styles.data}>
                                                            <div className={styles.data1} style={{color: item.color}}>{item.data}%</div>
                                                            <div className={styles.data2} >{intl.formatMessage({id: item.title})}</div>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className={styles.left}>
                                                            <img src={item.icon} style={{width: '100%'}} />
                                                        </div>
                                                        <div className={styles.right}>
                                                            <div className={styles.rightData}>
                                                                <div className={styles.rightData1}>{item.data}</div>
                                                                <div className={styles.rightData2}>{intl.formatMessage({id: item.title})}</div>
                                                            </div>
                                                            <img src={leftTopBgImg} />
                                                        </div>
                                                    </>
                                               }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.centerLeftThree}>
                            <div className={styles.title}>
                                <Title title={intl.formatMessage({id: '收益统计'})} />
                            </div>
                            <div className={styles.centerLeftThreeArea}>
                                {
                                    benefitStatisticsDataSource?.map((item, index) => {
                                        const isZero = index%2===0;
                                        return (
                                            <div className={styles.item}>
                                                <img src={item.backgroundImg} className={styles.backgroundImg}/>
                                                <img src={item.img}  className={styles.img} style={{[isZero?'bottom': 'top']: '-7px'}}/>
                                                <div className={styles.data}>
                                                    <div className={isZero?styles.data1: styles.data2} style={{color: isZero&&item.color}}>{isZero?item.data:intl.formatMessage({id: item.title})}</div>
                                                    <div className={!isZero?styles.data1: styles.data2} style={{color: !isZero&&item.color}}>{!isZero?item.data:intl.formatMessage({id: item.title})}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.centerRight}>
                        <SchematicDiagram />
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.bottomOne}>
                        <div className={styles.title}>
                            <Title title={intl.formatMessage({id: 'BMS信息'})} />
                        </div>
                        <div className={styles.area}>
                            {
                                bmsInfoDataSource?.map(bmsItem => {
                                    return (
                                        <div>
                                            <div className={styles.subTitle}>
                                                <img src={bmsItem.icon}/>
                                                <div style={{fontSize: 18}}>{intl.formatMessage({id: bmsItem.title})}</div>
                                            </div>
                                            <div className={styles.subArea}>
                                                <div className={styles.subAreaLeft}>
                                                    <img src={bmsItem.icon}/>
                                                </div>
                                                <div className={styles.subAreaRight}>
                                                    {
                                                        bmsItem?.data?.map(item => {
                                                            return (
                                                                <div className={styles.subAreaRightItem}>
                                                                    <div className={styles.subAreaRightItemTitle}>{intl.formatMessage({id: item.title})}</div>
                                                                    <div className={styles.subAreaRightItemValue}>{item.value}</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <img src={bottomLeftBgImg} className={styles.subAreaBg} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.bottomTwo}>
                        <div className={styles.title}>
                            <Title title={intl.formatMessage({id: 'PCS信息'})} />
                        </div>
                        <div className={styles.area}>
                            <ScrollTable 
                                columns={[
                                    {title: "", key: "title"},
                                    {title: "A", key: "A"},
                                    {title: "B", key: "B"},
                                    {title: "C", key: "C"}
                                ]}
                                dataSource={[
                                    {
                                      A: "A",
                                      B: "B",
                                      C: "C",
                                      title: intl.formatMessage({id: '电流/A'})
                                    },
                                    {
                                      A: "A",
                                      B: "B",
                                      C: "C",
                                      title: intl.formatMessage({id: '电压/V'})
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <div className={styles.bottomThree}>
                        <div className={styles.title}>
                            <Title title={intl.formatMessage({id: '通讯状态'})} />
                        </div>
                        <div className={styles.area}>
                            {
                                communicationStatusDataSource?.map(item => {
                                    return (
                                        <div className={styles.item}>
                                            {intl.formatMessage({id: item.label})}
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