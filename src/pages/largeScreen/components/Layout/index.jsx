import React, { useState, useEffect } from "react";
import useIcon from "@/hooks/useIcon";
import moment from "moment";
import { MAP_KEY } from '@/utils/utils';
import { WETHER_API, WETHER_KEY, AIR_API } from "@/utils/constants";
import AMapLoader from '@amap/amap-jsapi-loader'
import styles from "./index.less";
import Map from "../map";
import { Select } from "antd";
import { useSelector } from "umi";

const dayEnum = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六'
}

const Layout = (props) => {
    const { allPlant } = useSelector(function (state) {
        return state.device
    });
    const Icon = useIcon(); 
    const [currentTime, setCurrentTime] = useState(moment().format("YYYY/MM/DD HH:mm:ss"));
    const [wether, setWether] = useState(null);
    const [air, setAir] = useState(null);
    const [position,setPosition]=useState([]);
    const currentPlantId = props.plantId;
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

    const getWeather= async()=>{
            const url=`${WETHER_API}location=${position[1]},${position[0]}&key=${WETHER_KEY}`;
            const { daily } = await (await fetch(url)).json();
            if(daily?.length>0){
                setWether(daily[0]||{})
            }
    }

    const getAir = async ()=>{
        const url=`${AIR_API}location=${position[1]},${position[0]}&key=${WETHER_KEY}`;
        const data = await (await fetch(url)).json();
        if(data?.now){
            setAir(data?.now);
        }
    }


    useEffect(()=>{
        if(position.length>0){
            getWeather();
            getAir();
        }
    },[position])

    useEffect(()=>{
        refreshCurrentTime();
        refreshWeather();
    }, []);

    return (
        <div className={styles.screen}>
            <div className={styles.screenTop}>
                <div className={styles.screenTopLeft}>
                    <Icon 
                        type="icon-shijian"
                        style={{
                            fontSize: 20,
                            color: '#5565B6'
                        }}
                    />
                    <div className={styles.screenTopLeftTime}>{currentTime}</div>
                    <div className={styles.screenTopWeekday}>星期{dayEnum[moment().day()]}</div>
                </div>
                <div className={styles.title}>{props.title}</div>
                <div className={styles.screenTopRight}>
                    {
                        wether&&
                        <div className={styles.weather}>
                            <i class={`qi-${wether?.iconDay}`} style={{fontSize: 30, color: '#5565B6'}}/>
                            <div className={styles.weatherText}>
                                <div>{wether?.tempMin}℃ ~ {wether?.tempMax}℃</div>
                                <div>{wether?.textDay===wether?.textNight?`${wether?.textDay}`: `${wether?.textDay}转${wether?.textNight}`}</div>
                            </div>
                        </div>
                    }
                    {
                        air&&
                        <div className={styles.air}>
                            <Icon 
                                type="icon-fengxiang"
                                style={{
                                    fontSize: 30,
                                    color: '#5565B6'
                                }}
                            />
                            <div className={styles.airText}>
                                <div>{wether?.windDirDay}{wether?.windScaleDay}级</div>
                                <div>空气: {air?.category}</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className={styles.screenBottom}>
                <div className={styles.plant}>
                    <Select 
                        style={{width: 250}}
                        options={allPlant?.map(item => {
                            return {
                                label: item?.name,
                                value: item?.plantId
                            }
                        })}
                        onChange={value=>props.onChange&&props.onChange(value)}
                        value={currentPlantId}
                    />
                </div>
                <div className={styles.children}>
                   {props.children}
                </div>
                <div className={styles.map}>
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default Layout;