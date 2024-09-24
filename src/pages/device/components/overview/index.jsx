import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Out372 from './components/372'
import Out215 from './components/215'
import { getQueryString } from "@/utils/utils";
import { getBurDtuDevInfo2 } from "@/services/policy";
import { theme,  } from "antd";

function Com(props) {
    const [sn, setSn] = useState('')
    useEffect(() => {
        getData();
    }, [])
    const { token } = theme.useToken();

    const getData = async () => {
        let res = await getBurDtuDevInfo2({ dtuId: props.id });
            setSn(res?.data?.data?.[0]?.sn);
    }
    return (
        <div className='content' style={{ width: '100%', height: '100%', 
            padding: '1.0417rem  1.0417rem  .8333rem 1.0417rem',
            backgroundColor:token.titleCardBgc_2,
            minHeight:'36.4583rem'
        }}>
            {getQueryString('type') == 14 && <Out372 id={props.id} sn={sn}/>}
            {getQueryString('type') == 16 && <Out215 id={props.id} sn={sn} />}
        </div>
    )
}

export default Com