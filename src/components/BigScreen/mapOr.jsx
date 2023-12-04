
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader'
import { MAP_KEY } from '@/utils/utils'
import styles from "./map.less";
import { useDispatch, useSelector,history } from "umi";

function MapContainer() {
    let map = null // 地图实例
    const dispatch = useDispatch();
    const { allPlant } = useSelector(function (state) {
        return state.device
    });
    const getAllPlants = async () => {
        await dispatch({ type: 'device/getAllPlants' });
    }
    useEffect(() => {
        getAllPlants();
    }, [])
    useEffect(() => {
        initMap();
    }, [allPlant])
    const initMap = () => {
        const markerList = allPlant?.map(it => {
            return {
                position: {
                    longitude: it.longitude,
                    latitude: it.latitude
                },
                icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
                content:{
                    name:it.name,
                    address:it.position
                }
            }
        });
        AMapLoader.load({
            key: MAP_KEY, // 高德地图Web端开发者Key
            version: '2.0',
            plugins: [] // 需要使用 的的插件列表(必填项)
        }).then((AMap) => {
            map = new AMap.Map('container', {
                viewMode: '2D', // 3D地图模式
                zoom: 4, // 地图比例尺
                center: [120, 30],// 初始化地图中心点位置
                mapStyle: 'amap://styles/fresh',
            });
            let infoWindow= new AMap.InfoWindow({ offset: new AMap.Pixel(10, -30),   })
            infoWindow.on('click',function(){
                history.push('/index/home')
            })
            markerList?.forEach(function (it) {
                let maker = new AMap.Marker({
                    map: map,
                    icon: it.icon,
                    // content: `<div class="${it.content.name}" style='color: red;'></div>`,
                    position: [it.position.longitude, it.position.latitude],
                    offset: new AMap.Pixel(-13, -90)
                });
                maker.content = `<P>场站名称：${it.content.name}</P><br/><P>地址：${it.content.address}</P>`;
                maker.on('click', markerClick);
                maker.emit('click', { target: maker })
            });
            function markerClick(e) {
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
            }
            
        }).catch(e => {
            console.log(e);
        })
    }
    return (
        <div id='containerParent' style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div className={styles.container} id="container" style={{ width: '100%', height: '100%' }}></div>
        </div>

    )
}

export default MapContainer
