// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { Button, theme, Space, message, Modal, Table } from "antd";
import styles from './index.less'
import {getBmsOrPcsNowDataById } from '@/services/deviceTotal'
import { useSelector, useIntl } from "umi";
function Com({id}) {
    const [data, setData] = useState('')
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    useEffect(() => {
        getData();
        console.log('函数组件来咯')
        
    }, [id])
    const getData = async ()=>{
        let {data} =await getBmsOrPcsNowDataById({id})
        setData(data.data);
        console.log(data,1111111);
    }
    return (
        <div className='content'>
           {/* {data} */}
        </div>
    )
}

export default Com