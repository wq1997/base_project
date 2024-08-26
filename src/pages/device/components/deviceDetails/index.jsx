import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Out372 from './components/372'
import Out215 from './components/215'
import { getQueryString } from "@/utils/utils";
import { theme,  } from "antd";

function Com(props) {
    const [xxx, setXxx] = useState('')
    const { token } = theme.useToken();

    useEffect(() => {
    }, [])

    return (
        <div className='content' style={{width:'100%',height:'100%', 
            padding: '1.3021rem 1.0417rem  .8333rem 1.0417rem',
            backgroundColor:token.titleCardBgc,
            overflow:'scroll'}}>
            {getQueryString('type')==14&&<Out372 id={props.id}/>}
            {getQueryString('type')==16&&<Out215 id={props.id}/>}
        </div>
    )
}

export default Com