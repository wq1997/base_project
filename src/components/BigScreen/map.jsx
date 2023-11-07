
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Map, Markers, InfoWindow } from 'react-amap';
import AMapLoader from '@amap/amap-jsapi-loader';
import { MAP_KEY } from '@/utils/utils'
import styles from "./map.less";
import { useDispatch, useSelector } from "umi";
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

function MapCom(props) {

    useEffect(() => {
        dispatch({ type: 'device/getAllPlants' });
        AMapLoader.load({
            key: MAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap) => {
                map = new AMap.Map("container", {
                    // 设置地图容器id
                    zoom: 10, // 初始化地图级别
                    center: [116.397428, 39.90923], // 初始化地图中心点位置
                });
                map.addControl(new AMap.Scale());
                  map.addControl(new AMap.ToolBar())
        map.add(new AMap.Marker({
            position:map.getCenter()
        }));
            })
            .catch((e) => {
                console.log(e);
            });

        return () => {
            map?.destroy();
        };
    }, [])

    const dispatch = useDispatch();
    const [maker, setMaker] = useState([])
    const { allPlant } = useSelector(function (state) {
        return state.device
    });
    const { user } = useSelector(function (state) {
        return state.user
    });
    const [visible, setVisible] = useState(true);
    const content = [
        "<div",
        "<div ><b>高德软件有限公司</b>",
        "电话 : 010-84107000   邮编 : 100102",
        "地址 : 北京市望京阜通东大街方恒国际中心A座16层</div></div>"
    ];


    const markerList = allPlant?.map(it => {
        return {
            position: {
                longitude: it.longitude,
                latitude: it.latitude
            },


        }
    });
    const markerStyle = {
        padding: '5px',
        border: '1px solid #ddd',
        background: '#fff',
    };

    const renderMarkerFn = () => {
        return <div style={markerStyle}>A</div>
    }
        ;
    const markersEvents = {
        click(e, marker) {
            setVisible(true);
        }
    }

    let map = null;

    return (
        // <div className={styles.content}>
        //     <Map
        //         amapkey={MAP_KEY}
        //         zoom={4}
        //         center={props.mapData.mapCenter}
        //         mapStyle='amap://styles/fresh'
        //     >
        //         <Markers
        //             markers={markerList}
        //             render={renderMarkerFn}
        //             useCluster
        //             events={markersEvents}
        //         >
        //         </Markers>
        //         <InfoWindow
        //             position={markerList}
        //             closeWhenClickMap
        //             visible={visible}
        //             offset={[2, -40]}
        //             events={{
        //                 close: () => {
        //                     setIwPosition(undefined);
        //                     setIwValue(undefined);
        //                     setVisible(()=>!visible);
        //                 }
        //             }}
        //             isCustom
        //         />
        //     </Map>
        //     <button onClick={() => { setVisible(()=>!visible) }}>Show Window 1</button>
        // </div>
        <div
            id="container"
            className={styles.container}
            
        >

        </div>
    )
}

export default MapCom 