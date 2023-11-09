
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Map, Markers, InfoWindow } from 'react-amap';
import { MAP_KEY } from '@/utils/utils'
import styles from "./map.less";
import { useDispatch, useSelector } from "umi";
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

function MapCom(props) {

    useEffect(() => {
        dispatch({ type: 'device/getAllPlants' });
    }, [])

    const dispatch = useDispatch();
    const { allPlant } = useSelector(function (state) {
        return state.device
    });
    const { user } = useSelector(function (state) {
        return state.user
    });
    const [visible, setVisible] = useState(false);
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
            setVisible((pre)=>{
                return !pre
            });
            console.log(visible,11111111111);
        }
    }
    return (
        <div className={styles.container}>
            <Map
                amapkey={MAP_KEY}
                zoom={4}
                center={props.mapData.mapCenter}
                mapStyle='amap://styles/fresh'
            >
                <Markers
                    markers={markerList}
                    render={renderMarkerFn}
                    useCluster
                    events={markersEvents}
                >
                </Markers>
                <InfoWindow
                    position={markerList}
                    visible={visible}
                />
            </Map>
            <button onClick={() => { setVisible(()=>!visible) }}>Show Window 1</button>
        </div>
    
    )
}

export default MapCom 