import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import AdvancedMap from '../BigScreen/map'
function Map(props) {
    const [mapData, setMapData] = useState({
        mapCenter: { longitude: 120, latitude: 35 },
        markers: [
            { position: { longitude: -90, latitude: -66 } },
            { position: { longitude: 90, latitude: 66 } },
            { position: { longitude: 99, latitude: 66 } }
        ]
    })

    useEffect(() => {
        console.log('函数组件来咯')
    }, [])

    return (
        <div className='content'>
            <AdvancedMap
                mapData={mapData}
            />
        </div>
    )
}

export default Map