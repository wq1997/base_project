
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Map, Markers } from 'react-amap';
import { MAP_KEY } from '@/utils/utils'
function MapCom(props) {
    useEffect(() => {
        console.log('函数组件来咯', MAP_KEY, props)
    }, []) 

    const content= [
        "<div",
        "<div ><b>高德软件有限公司</b>",
        "电话 : 010-84107000   邮编 : 100102",
        "地址 : 北京市望京阜通东大街方恒国际中心A座16层</div></div>"
    ];
    return (
        <div className='content' style={{ width: '100%', height: '800px' }}>
            <Map amapkey={MAP_KEY} zoom={10} center={props.mapData.mapCenter} mapStyle='amap://styles/fresh'>
                <Markers
                    markers={props.mapData.markers}
                />
            </Map>l
        </div>
    )
}

export default MapCom 