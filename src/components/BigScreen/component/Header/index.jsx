import React, { useState, useEffect, } from 'react';
import moment from "moment";
import AMapLoader from '@amap/amap-jsapi-loader'
import { MAP_KEY } from '@/utils/utils';
import { WETHER_API, WETHER_KEY } from "@/utils/constants";
import styles from "./index.less";

const dayEnum = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六'
}

const Header = ({
    currentDeviceType,
    currentAreaType,
    deviceTypeList,
    areaTypeList,
    onChangedDeviceType,
    onChangedAreaType
}) => {
    const [currentTime, setCurrentTime] = useState(moment().format("YYYY/MM/DD HH:mm"));
    const [position,setPosition]=useState([]);
    const [wether, setWether] = useState(null);
    const refreshCurrentTime = () => {
        setInterval(()=>{
            setCurrentTime(moment().format("YYYY/MM/DD HH:mm"));
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
    console.log("Awether", wether)
   const currentDeviceTypeTitle = deviceTypeList?.find(item=>item.key===currentDeviceType)?.title;
   const currentAreaTypeTitle = areaTypeList?.find(item=>item.key===currentAreaType)?.label;

    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <div className={styles.headerLeftLeft}>
                    {
                        deviceTypeList?.map(item => {
                            return (
                                <div 
                                    className={styles.headerLeftLeftItem} 
                                    style={{backgroundColor:item?.key===currentDeviceType?'#004170':'#001336'}}
                                    onClick={()=>onChangedDeviceType(item?.key)}
                                >
                                    {item?.label}
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.headerLeftRight}>
                    {
                        areaTypeList?.map(item => {
                            return (
                                <div 
                                    className={styles.headerLeftRightItem} 
                                    style={{backgroundColor:item?.key===currentAreaType?'#004170':'#001336'}}
                                    onClick={()=>onChangedAreaType(item?.key)}
                                >
                                    {item?.label}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.title}>能源数智化解决方案大屏({currentDeviceTypeTitle} / {currentAreaTypeTitle})</div>
            <div className={styles.headerRight}>
                <div className={styles.headerRightLeft}>
                    <div>{moment(currentTime).format("MM 月 DD 日")}</div>
                    <div>周{dayEnum[moment().day()]}</div>
                    <div>{moment(currentTime).format("HH:mm")}</div>
                </div>
                <div className={styles.headerRightRight}>
                    {
                        wether&&
                        <>
                            <i class={`qi-${wether?.iconDay}`} style={{fontSize: 30, color: '#F3DE15'}}/>
                            <div>{wether?.textDay===wether?.textNight?`${wether?.textDay}`: `${wether?.textDay}转${wether?.textNight}`}</div>
                            <div>{wether?.tempMin}℃~{wether?.tempMax}℃</div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;