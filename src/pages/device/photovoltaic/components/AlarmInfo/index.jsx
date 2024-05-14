
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import ScrollTable from "@/components/ScorllTable/index";
import { CardModel } from "@/components";
import styles from './index.less'
import { theme } from "antd";
import { useIntl } from "umi";
import {getNowAlarmsByPv}from '@/services/deviceTotal'

function Com(props) {
    const [data, setData] = useState([])
    const { token } = theme.useToken();
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
        getPvAlarm();
    }, [])
    const getPvAlarm=async()=>{
        let {data}=await getNowAlarmsByPv({plantId:localStorage.getItem('plantId')});
        setData(data?.data);
    }

    return (
        <div className={styles.content}>
            <CardModel
             title={
                t("告警信息")
            }
                content={
                    <ScrollTable
                        color={token.smallTitleColor}
                        headerLineColor={token.tableHead}
                        columns={[
                            {
                                title: t('告警设备'),
                                key: 'deviceName'
                            },
                            {
                                title: t('告警时间'),
                                key: 'time'
                            },
                            {
                                title: t('告警描述'),
                                key: 'desc'
                            },
                        ]}
                        dataSource={data}
                    />
                }
            />

        </div>
    )
}

export default Com