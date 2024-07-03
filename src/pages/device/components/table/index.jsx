import styles from "./index.less";
import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import { getDtusOfPlant } from "@/services/plant"
import { useIntl, history } from "umi";
import { Space, Button, theme } from "antd";
import "./index.less";

const Table = ({
    plantId,
    changeIsOpenDel,
    edit,
}) => {
    const intl = useIntl();
    const { token } = theme.useToken();
    const [listData, setListData] = useState([]);

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
        {
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

    const getList = async () => {
        let { data } = await getDtusOfPlant({
            plantId
        });
        data?.data === '' ? setListData([]) : setListData(JSON.parse(String(data?.data)))
    };

    useEffect(() => {
        getList();
    }, [plantId]);

    return (
        <div className={styles.table}>
            <div className={styles.row}>
                {columns?.map(column => (
                    <div className={styles.tableTitle}>{column?.title}</div>
                ))}
            </div>
            <div className={styles.valueWrapper}>
                {listData?.map((value, index) => (
                    <div className={styles.row}>
                        {columns?.map(column => {
                            if(column.render){
                                return (
                                    <div className={styles.value}>
                                        {column.render('',value)}
                                    </div>
                                );
                            }else{
                                return (
                                    <div className={styles.value}>
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