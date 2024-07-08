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
        },
        {
            title: t('设备名称'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('设备类型'),
            dataIndex: 'version',
            key: 'version',
        },
        {
            title: t('设备状态'),
            dataIndex: 'online',
            key: 'online',
        },
        {
            title: t('安装位置'),
            dataIndex: 'address',
            key: 'address',
        },
        user?.roleId===3&&{
            title: t('操作'),
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => {
                return (
                    <Space>
                        <div type="link" style={{ color: '#FF0000', cursor: 'pointer' }} onClick={() => edit(record)}>{t('编辑')}</div>
                        <Button type="link" style={{color: '#06FF00'}} onClick={() => changeIsOpenDel(record)}>{t('删除')}</Button>
                    </Space>
                )
            }
        },
        {
            title: t('详情'),
            dataIndex: 'details',
            key: 'details',
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

    useEffect(()=>{
        setListData(dataSource);
    }, [dataSource]);
    return (
        <div className={styles.table}>
            <div className={styles.row} style={{background: '#125686'}}>
                {columns?.filter(item => item)?.map(column => (
                    <div className={styles.tableTitle}>{column?.title}</div>
                ))}
            </div>
            <div className={styles.valueWrapper}>
                {listData?.map((value, index) => (
                    <div className={styles.row}>
                        {columns?.filter(item => item)?.map(column => {
                            if(column.render){
                                return (
                                    <div className={styles.value} style={{borderLeft: '2px solid #175785', borderTop: '2px solid #175785'}}>
                                        {column.render('',value)}
                                    </div>
                                );
                            }else{
                                return (
                                    <div className={styles.value} style={{borderLeft: '2px solid #175785', borderTop: '2px solid #175785'}}>
                                        <Tooltip title={value[column.dataIndex]}>
                                            {value[column.dataIndex]}
                                        </Tooltip>
                                    </div>
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