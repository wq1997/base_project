// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState } from 'react';
import useIcon from "@/hooks/useIcon";
import { history, useLocation, useIntl } from "umi";
import { Table, theme } from 'antd';

function Com({ data, table }) {
    const { token } = theme.useToken();
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
        <div
            className='card_main'
            style={{
                padding: '16px 20px',
                marginBottom: '8px',
                borderRadius: '8px',
            }}>
            <div style={{ fontSize: '20px', marginBottom: '20px', marginLeft: 50, color: token.color26, fontWeight: 500 }}>
                <Icon
                    type='icon-xiangyou'
                    style={{
                        cursor: 'pointer',
                        marginRight: '6px',
                    }}
                />
                {t(data.title)}
            </div>
            <div className='card_contain' style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                padding: '0 20px',
                gridTemplateRows: height,
                transition: 'all .3s',
                overflow: 'hidden',
                columnGap: 50
            }}>
                {data.data.map(it => {
                    return (
                        <>
                            <div style={{ marginBottom: '16px', marginTop: '16px', marginLeft: '60px' }}>
                                {t(it.name)}{" "}: {" "}{t(it.value)}
                            </div>
                        </>
                    )
                })}
            </div>
            {table && <div style={{
                padding: '0 20px',

            }}>
                <Table pagination={false} columns={table.tableClum1} dataSource={table.dataTable1} />
                <Table pagination={false} columns={table.tableClum2} dataSource={table.dataTable1} style={{ marginBottom: '32px' }} /> </div>}
        </div>
    )
}

export default Com