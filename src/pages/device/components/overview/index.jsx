import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Out372 from './components/372'
import Out215 from './components/215'
import { getQueryString } from "@/utils/utils";
import { getBurDtuDevInfo2 } from "@/services/policy";
function Com(props) {
    const [sn, setSn] = useState('')

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        let res = await getBurDtuDevInfo2({ dtuId: props.id });
            setSn(res?.data?.data?.[0]?.sn);
            console.log(res);
    }
    return (
        <div className='content' style={{ width: '100%', height: '100%' }}>
            {getQueryString('type') == 14 && <Out372 id={props.id} sn={sn}/>}
            {getQueryString('type') == 16 && <Out215 id={props.id} sn={sn} />}
        </div>
    )
}

export default Com