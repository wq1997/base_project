import styles from "./index.less";
import React, { useState } from "react";
import { Tooltip } from "antd";
import { useIntl, history, useSelector } from "umi";
import { Space, Button, theme } from "antd";
import "./index.less";
import { useEffect } from "react";

const Table = ({
    dataSource,
    changeIsOpenDel,
    edit,
}) => {
    const { token } = theme.useToken();
    const intl = useIntl();
    const [listData, setListData] = useState(dataSource);

    const { user } = useSelector(function (state) {
        return state.user
    });

    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }

    const columns = [
        {
            title: t('设备编码'),
            dataIndex: 'sn',
            key: 'sn',
            width: '180px'
        },
        {
            title: t('设备类型'),
            dataIndex: 'version',
            key: 'version',
            width: '230px'
        },
        {
            title: t('设备状态'),
            dataIndex: 'online',
            key: 'online',
            width: '120px'
        },
        {
            title: t('设备名称'),
            dataIndex: 'name',
            key: 'name',
            width: '150px'
        },
        {
            title: t('安装位置'),
            dataIndex: 'address',
            key: 'address',
            style: {
                flex: 1
            }
        },
        (user?.roleId === 2 || user?.roleId === 3) && {
            title: t('操作'),
            dataIndex: 'operation',
            key: 'operation',
            width: '150px',
            render: (text, record) => {
                return (
                    <Space>
                        <div type="link" style={{ color: '#FF0000', cursor: 'pointer' }} onClick={() => edit(record)}>{t('编辑')}</div>
                        <Button type="link" style={{ color: '#06FF00' }} onClick={() => changeIsOpenDel(record)}>{t('删除')}</Button>
                    </Space>
                )
            }
        },
        {
            title: t('详情'),
            dataIndex: 'details',
            key: 'details',
            width: '100px',
            render: (text, record) => {
                return (
                    <div
                        type="link"
                        style={{ color: '#54CFFF', cursor: 'pointer' }}
                        onClick={() => {
                            history.push(`/device?activeKey=OverView&id=${record.id}&title=${record.name || ""}&type=${record.deviceTypeId || ""}`)
                        }}
                    >
                        {t('详情')}
                    </div>
                )
            }
        },
    ]

    useEffect(() => {
        setListData(dataSource);
    }, [dataSource]);
    return (
        <div className={styles.table}>
            <div className={styles.row} style={{ background: token.color13 }}>
                {columns?.filter(item => item)?.map(column => (
                    <div className={styles.rowItem} style={{ width: column?.width, ...column?.style }}>{column?.title}</div>
                ))}
            </div>
            <div className={styles.valueWrapper}>
                {listData?.map((value, index) => (
                    <div className={styles.row} style={{ background: token.color15 }}>
                        {columns?.filter(item => item)?.map(column => {
                            if (column.render) {
                                return (
                                    <div
                                        className={styles.value}
                                        style={{
                                            width: column?.width,
                                            borderLeft: `2px solid ${token.color16}`,
                                            borderTop: `2px solid ${token.color16}`,
                                            color: token.color17,
                                            ...column?.style
                                        }}
                                    >
                                        {column.render('', value)}
                                    </div>
                                );
                            } else {
                                return (
                                    <Tooltip title={value[column.dataIndex]}>
                                        <div
                                            className={styles.value}
                                            style={{
                                                width: column?.width,
                                                borderLeft: `2px solid ${token.color16}`,
                                                borderTop: `2px solid ${token.color16}`,
                                                color: token.color17,
                                                ...column?.style
                                            }}
                                        >
                                            {value[column.dataIndex]}
                                        </div>
                                    </Tooltip>
                                )
                            }
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Table;