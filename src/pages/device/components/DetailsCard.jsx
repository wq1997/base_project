// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import useIcon from "@/hooks/useIcon";
import { history, useLocation, useIntl } from "umi";

function Com({ data }) {
    const [height, setHeight] = useState('0fr')
    const Icon = useIcon();
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    return (
        <div className='card_main' >
            <div className='card_title' style={{ fontSize: '20px', marginBottom: '20px' }}>
                <Icon type='icon-shixinjiantou-xiangshang-copy' style={{ cursor: 'pointer' }}></Icon>
                {t(data.title)}
            </div>
            <div className='card_contain' style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr ',
                marginBottom: '16px',
                padding: '0 20px',
                gridTemplateRows: height,
                transition: 'all .3s',
                overflow: 'hidden'
            }}>
                {data.data.map(it => {
                    return (
                        <>
                            <div style={{ marginBottom: '16px', marginTop: '16px',}}>
                                {t(it.name)}{" "}:{" "}{t(it.value)}
                            </div>
                        </>
                    )
                })}
            </div>

        </div>
    )
}

export default Com