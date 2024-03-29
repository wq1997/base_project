import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { theme } from "antd";
import Title from '../Title';

function Com(props) {
    const [xxx, setXxx] = useState('')
    const { token } = theme.useToken();

    useEffect(() => {
        console.log('函数组件来咯')
    }, [])

    return (
        <div className={styles.card} style={{ backgroundColor: token.titleCardBgc }}>
            <div className={styles.header}>
                {props.title&&<Title title={props.title} />}
                <div className={styles.filterPart}>
                    {props.filterPart}
                </div>
            </div>
            {
                props.content&&<div className={styles.content}>
                {props.content}
            </div>
            }
            

        </div>
    )
}

export default Com