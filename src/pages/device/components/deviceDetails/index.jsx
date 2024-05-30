import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Out372 from './components/372'
import Out215 from './components/215'
import { getQueryString } from "@/utils/utils";

function Com(props) {
    const [xxx, setXxx] = useState('')

    useEffect(() => {
        console.log('函数组件来咯')
    }, [])

    return (
        <div className='content' style={{width:'100%',height:'100%'}}>
            {getQueryString('type')==14&&<Out372 id={props.id}/>}
            {getQueryString('type')==16&&<Out215 id={props.id}/>}
        </div>
    )
}

export default Com