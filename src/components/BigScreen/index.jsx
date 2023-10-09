import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

function Map(props) {
    const [xxx, setXxx] = useState('')

    useEffect(() => {
        console.log('函数组件来咯')
    }, [])

    return (
        <div className='content'>
            
        </div>
    )
}

export default Map