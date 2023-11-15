import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Ma from '../BigScreen/mapOr'
import MaE from '../BigScreen/mapEchart'

function Map(props) {
    const [mapData, setMapData] = useState({
        mapCenter: { longitude: 120, latitude: 35 },
      
    })

    useEffect(() => {
        // console.log('函数组件来咯')
    }, [])

    return (
        <div className='content'>
            <Ma/>
            <MaE/>
        </div>
    )
}

export default Map