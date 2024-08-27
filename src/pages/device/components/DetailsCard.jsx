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
        <div className='card_main' style={{background:token.detailsCardbgc,padding:'16px 20px',marginBottom:'8px',borderRadius:'8px'}}>
            <div className='card_title' style={{ fontSize: '20px', marginBottom: '20px',color:token.iconColor }}>
                <Icon type='icon-xiangyou' style={{ cursor: 'pointer',marginRight:'6px' }}></Icon>
                {t(data.title)}
            </div>
            <div className='card_contain' style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr ',
                marginBottom: '16px',
                padding: '0 20px',
                gridTemplateRows: height,
                transition: 'all .3s',
                overflow: 'hidden',
                fontSize: '.7813rem'
            }}>
                {data.data.map(it => {
                    return (
                        <>
                            <div style={{ marginBottom: '16px', marginTop: '16px',color:token.color1}}>
                                {t(it.name)}{" "}:{" "}{t(it.value)}
                            </div>
                        </>
                    )
                })}
            </div>
            {table&&<div style={{
                padding: '0 20px',

            }}>
                <Table pagination={false} columns={table.tableClum1} dataSource={table.dataTable1}/>
            <Table pagination={false} columns={table.tableClum2} dataSource={table.dataTable1} style={{marginBottom:'32px'}}/> </div>  }
        </div>
    )
}

export default Com