
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import ScrollTable from "../../../components/ScorllTable/index";
import { CardModel } from "@/components";
import styles from './index.less'

function Com(props) {
    const [xxx, setXxx] = useState('')

    useEffect(() => {
        console.log('函数组件来咯')
    }, [])

    return (
        <div className={styles.content}>
            <CardModel
             title={
                "告警信息"
            }
                content={
                    <ScrollTable
                        color='#333333'
                        columns={[
                            {
                                title: '故障时间',
                                key: 'time'
                            },
                            {
                                title: '故障描述',
                                key: 'description'
                            },
                            {
                                title: '故障等级',
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