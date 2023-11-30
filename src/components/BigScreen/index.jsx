import React, { useState, useEffect, } from 'react';
import styles from "./index.less";
import Map from '../BigScreen/map'
import moment from "moment";
import { Select, Space } from "antd";
import ElectricityQuantity from "./component/electricityQuantity";
import Efficiency from './component/efficiency';
import Prediction from './component/prediction';
import Load from './component/load';
import SOC from './component/soc';
import HOC from './component/hoc';
import ScrollTable from "./component/ScorllTable";
import AMapLoader from '@amap/amap-jsapi-loader'
import { MAP_KEY } from '@/utils/utils';
import { WETHER_API, WETHER_KEY } from "@/utils/constants";
import AreaTitle from './component/areaTitle';
import ElectricTopLeftImg from "../../../public/images/electric_top_left.png";
import ElectricTopRightImg from "../../../public/images/electric_top_right.png";
import ElectricBottomLeftImg from "../../../public/images/electric_bottom_left.png";
import ElectricBottomRightImg from "../../../public/images/electric_bottom_right.png";

const dayEnum = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六'
}
function BigScreen() {
    const [currentTime, setCurrentTime] = useState(moment().format("YYYY/MM/DD HH:mm:ss"));
    const [position,setPosition]=useState([]);
    const [wether, setWether] = useState(null);
    const rightData = [
        {
            title: '总收益',
            data: '10000',
            unit: '万元'
        },
        {
            title: '日收益',
            data: '100',
            unit: '万元'
        },
        {
            title: '总设备',
            data: '1000',
            unit: '台'
        },
        {
            title: '设备在线数量',
            data: '900',
            unit: '台'
        },
        {
            title: '负载实时功率',
            data: '65',
            unit: 'kw'
        },
        {
            title: '储能实时功率',
            data: '1000',
            unit: 'kw'
        },
        {
            title: '设备离线数量',
            data: '80',
            unit: '台'
        },
        {
            title: '设备告警数量',
            data: '0',
            unit: '台'
        }
    ]
    const refreshCurrentTime = () => {
        setInterval(()=>{
            setCurrentTime(moment().format("YYYY/MM/DD HH:mm:ss"));
        }, 1000)
    }

    const refreshWeather = () => {
        getCurrentCity();
        setInterval(()=>{
            getCurrentCity();
        }, 1000 * 60 * 60)
    }


    const getWeather= async()=>{
            const url=`${WETHER_API}location=${position[1]},${position[0]}&key=${WETHER_KEY}`;
            const { daily } = await (await fetch(url)).json();
            if(daily?.length>0){
                setWether(daily[0]||{})
            }
    }

    useEffect(()=>{
        position.length>0? getWeather():null;
    },[position])
    
    const getCurrentCity = ()=>{
        AMapLoader.load({
            key: MAP_KEY, // 高德地图Web端开发者Key
            version: '2.0',
            plugins: [] // 需要使用 的的插件列表(必填项)
        }).then((AMap) => {
              AMap.plugin('AMap.Geolocation', function() {
                var geolocation = new AMap.Geolocation({
                  enableHighAccuracy: true, // 是否使用高精度定位，默认：true
                  timeout: 10000, // 设置定位超时时间，默认：无穷大
                  offset: [10, 20],  // 定位按钮的停靠位置的偏移量
                  zoomToAccuracy: true,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                  position: 'RB' //  定位按钮的排放位置,  RB表示右下
                })
                geolocation.getCurrentPosition(function(status,result){
                      if(status=='complete'){
                          onComplete(result)
                      }else{
                          onError(result)
                      }
                });
              
                function onComplete (data) {
                  setPosition(()=>{
                    return [data.position.lat?.toFixed(2),data.position.lng?.toFixed(2)]
                  })
                }
              
                function onError (data) {
                    setPosition(()=>{
                      return [31.22, 121.47]
                    })
                }
              })  
        }).catch(e => {
            setPosition(()=>{
                return [31.22, 121.47]
            })
        })
     }

    useEffect(()=>{
        refreshCurrentTime();
        refreshWeather();
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.contentTop}>
                {/* <div className={styles.time}>
                    <div className={styles.timeTop}>{currentTime}</div>
                    <div className={styles.timeBottom}>星期{dayEnum[moment().day()]}</div>
                </div> */}
                <div className={styles.title}>采日能源储能管理系统</div>
                {/* {
                    wether&&
                    <div className={styles.weather}>
                        <i class={`qi-${wether?.iconDay}`} style={{fontSize: 40, color: 'white'}}/>
                        <div className={styles.weatherText}>
                            <div>{wether?.textDay===wether?.textNight?`${wether?.textDay}`: `${wether?.textDay}转${wether?.textNight}`}</div>
                            <div>{wether?.tempMin}℃ ~ {wether?.tempMax}℃</div>
                        </div>
                    </div>
                } */}
            </div>
            <div className={styles.contentBottom}>
                <div className={styles.contentBottomLeft}>
                    <div className={styles.contentBottomLeftTop}>
                        <AreaTitle title={"电量统计"} />
                        <div className={styles.contentBottomLeftTopContent}>
                            <div className={styles.contentBottomLeftTopContentLeft}>
                                <div className={styles.contentBottomLeftTopContentLeftTop}>
                                    <div className={styles.contentBottomLeftTopContentLeftTopLeft}>
                                        <img src={ElectricTopLeftImg} />
                                        <div className={styles.contentBottomLeftTopContentLeftTopLeftContent}>
                                            <div className={styles.contentBottomLeftTopContentLeftTopLeftContentTop}>
                                                <div className={styles.contentBottomLeftTopContentLeftTopLeftContentTopData}>
                                                    750000
                                                </div>
                                                <div className={styles.contentBottomLeftTopContentLeftTopLeftContentTopUnit}>
                                                    kwh
                                                </div>
                                            </div>
                                            <div className={styles.contentBottomLeftTopContentLeftTopLeftContentBottom}>
                                                今日充电量
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.contentBottomLeftTopContentLeftTopRight}>
                                        <img src={ElectricTopRightImg} />
                                        <div className={styles.contentBottomLeftTopContentLeftTopRightContent}>
                                            <div className={styles.contentBottomLeftTopContentLeftTopRightContentTop}>
                                                <div className={styles.contentBottomLeftTopContentLeftTopRightContentTopData}>
                                                   750000
                                                </div>
                                                <div className={styles.contentBottomLeftTopContentLeftTopRightContentTopUnit}>
                                                    kwh
                                                </div>
                                            </div>
                                            <div className={styles.contentBottomLeftTopContentLeftTopRightContentBottom}>
                                                今日充电量
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.contentBottomLeftTopContentLeftBottom}>
                                    <div className={styles.contentBottomLeftTopContentLeftBottomLeft}>
                                        <img src={ElectricBottomLeftImg} />
                                        <div className={styles.contentBottomLeftTopContentLeftBottomLeftContent}>
                                            <div className={styles.contentBottomLeftTopContentLeftBottomLeftContentTop}>
                                                <div className={styles.contentBottomLeftTopContentLeftBottomLeftContentTopData}>
                                                   75000
                                                </div>
                                                <div className={styles.contentBottomLeftTopContentLeftBottomLeftContentTopUnit}>
                                                    kwh
                                                </div>
                                            </div>
                                            <div className={styles.contentBottomLeftTopContentLeftTopLeftContentBottom}>
                                                总充电量
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.contentBottomLeftBottomContentLeftTopRight}>
                                        <img src={ElectricBottomRightImg} />
                                        <div className={styles.contentBottomLeftBottomContentLeftTopRightContent}>
                                            <div className={styles.contentBottomLeftBottomContentLeftTopRightContentTop}>
                                                <div className={styles.contentBottomLeftBottomContentLeftTopRightContentTopData}>
                                                   75000
                                                </div>
                                                <div className={styles.contentBottomLeftBottomContentLeftTopRightContentTopUnit}>
                                                    kwh
                                                </div>
                                            </div>
                                            <div className={styles.contentBottomLeftBottomContentLeftTopRightContentBottom}>
                                                总充电量
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.contentBottomLeftTopContentRight}>
                                <div className={styles.contentBottomLeftTopContentRightItem}>
                                    <SOC />
                                </div>
                                <div className={styles.contentBottomLeftTopContentRightItem}>
                                    <HOC />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentBottomLeftCenter}>
                        <AreaTitle title={"近七日充放电电量"} />
                        <div className={styles.contentBottomLeftCenterContent}>
                            <ElectricityQuantity />
                        </div>
                    </div>
                    <div className={styles.contentBottomLeftBottom}>
                        <AreaTitle title={"近七日充放电效率"} />
                        <div className={styles.contentBottomLeftBottomContent}>
                            <Efficiency />
                        </div>
                    </div>
                </div>
                <div className={styles.contentBottomCenter}>
                    <AreaTitle title={"故障检测"} />
                    <div className={styles.contentBottomCenterContent}>
                        <ScrollTable 
                            headerLineColor="#6974C1"
                            columns={[
                                {
                                    title: '故障时间',
                                    key: 'time'
                                },
                                {
                                    title: '故障描述',
                                    key: 'description'
                                },
                                {
                                    title: '故障等级',
                                    key: 'level'
                                }
                            ]}
                            dataSource={[
                                {
                                    time: '2023-11-11',
                                    description: '失败警告',
                                    level: 1
                                },
                                {
                                    time: '2023-11-11',
                                    description: '失败警告',
                                    level: 1
                                },
                                {
                                    time: '2023-11-11',
                                    description: '失败警告',
                                    level: 1
                                },
                                {
                                    time: '2023-11-11',
                                    description: '失败警告',
                                    level: 1
                                },
                                {
                                    time: '2023-11-11',
                                    description: '失败警告',
                                    level: 1
                                },
                                {
                                    time: '2023-11-11',
                                    description: '失败警告',
                                    level: 1
                                },
                                {
                                    time: '2023-11-11',
                                    description: '失败警告',
                                    level: 1
                                },
                                {
                                    time: '2023-11-11',
                                    description: '失败警告',
                                    level: 1
                                }
                            ]}
                        />
                    </div>
                </div>
                <div className={styles.contentBottomRight}>
                    <div className={styles.contentBottomRightTop}>
                        <AreaTitle title={"电站设备统计"} />
                        <div className={styles.contentBottomRightTopContent}>
                            {
                                rightData?.map(item => {
                                    return (
                                        <div className={styles.contentBottomRightTopItem}>
                                            <div className={styles.subTitle}>{item?.title}</div>
                                            <div className={styles.contentBottomRightTopItemContent}>
                                                <div className={styles.contentBottomRightTopItemData}>{item?.data}</div>
                                                <div className={styles.contentBottomRightTopItemUnit}>{item?.unit}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.contentBottomRightCenter}>
                        <AreaTitle title={"储能充放电功率预测曲线"} />
                        <div className={styles.contentBottomRightCenterContent}>
                            <Prediction />
                        </div>
                    </div>
                    <div className={styles.contentBottomRightBottom}>
                        <AreaTitle title={"负荷预测曲线"} />
                        <div className={styles.contentBottomRightBottomContent}>
                            <Load/>
                        </div>
                    </div>
                </div>
                <div className={styles.contentBottomMap}>
                    <Map/>
                </div>
            </div>
        </div>
    )
}

export default BigScreen;