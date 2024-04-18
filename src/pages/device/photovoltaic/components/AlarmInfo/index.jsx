
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import ScrollTable from "@/components/ScorllTable/index";
import { CardModel } from "@/components";
import styles from './index.less'
import { theme } from "antd";
import { useIntl } from "umi";

function Com(props) {
    const [xxx, setXxx] = useState('')
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
        console.log('函数组件来咯')
    }, [])

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
                                title: t('故障时间'),
                                key: 'time'
                            },
                            {
                                title: t('故障描述'),
                                key: 'description'
                            },
                            {
                                title: t('故障等级'),
                                key: 'level'
                            }
                        ]}
                        dataSource={[
                            {
                                time: '2023-11-11',
                                description: '失败警告',
                                level: 1
                            },
                            {
                                time: '2023-11-11',
                                description: '失败警告',
                                level: 1
                            },
                            {
                                time: '2023-11-11',
                                description: '失败警告',
                                level: 1
                            },
                            {
                                time: '2023-11-11',
                                description: '失败警告',
                                level: 1
                            },
                            {
                                time: '2023-11-11',
                                description: '失败警告',
                                level: 1
                            },
                            {
                                time: '2023-11-11',
                                description: '失败警告',
                                level: 1
                            },
                            {
                                time: '2023-11-11',
                                description: '失败警告',
                                level: 1
                            },
                            {
                                time: '2023-11-11',
                                description: '失败警告',
                                level: 1
                            }
                        ]}
                    />
                }
            />

        </div>
    )
}

export default Com