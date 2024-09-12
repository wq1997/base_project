// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import useIcon from "@/hooks/useIcon";
import { history, useLocation, useIntl } from "umi";
import { Table,theme } from 'antd';

function Com({ data,table }) {
    const [height, setHeight] = useState('0fr');
    const { token } = theme.useToken();

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
        <div className='card_main' style={{background:token.detailsCardbgc,padding:'0.8333rem 1.0417rem',marginBottom:'0.4167rem',borderRadius:'0.4167rem'}}>
            <div className='card_title' style={{ fontSize: '1.0417rem', marginBottom: '1.0417rem',color:token.iconColor }}>
                <Icon type='icon-xiangyou' style={{ cursor: 'pointer',marginRight:'0.3125rem' }}></Icon>
                {t(data.title)}
            </div>
            <div className='card_contain' style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr ',
                marginBottom: '0.8333rem',
                padding: '0 1.0417rem',
                gridTemplateRows: height,
                transition: 'all .3s',
                overflow: 'hidden',
                fontSize: '.7813rem'
            }}>
                {data.data.map(it => {
                    return (
                        <>
                            <div style={{ marginBottom: '0.833rem', marginTop: '0.8333rem',color:token.color1}}>
                                {t(it.name)}{" "}:{" "}{t(it.value)}
                            </div>
                        </>
                    )
                })}
            </div>
            {table&&<div style={{
                padding: '0 1.0417rem',

            }}>
                <Table pagination={false} columns={table.tableClum1} dataSource={table.dataTable1}/>
            <Table pagination={false} columns={table.tableClum2} dataSource={table.dataTable1} style={{marginBottom:'1.6667rem'}}/> </div>  }
        </div>
    )
}

export default Com