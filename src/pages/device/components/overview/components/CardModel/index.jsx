import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { theme } from "antd";
function Com(props) {
    const { token } = theme.useToken();

    useEffect(() => {
    }, [])

    return (
        <div className={styles.card} style={{ backgroundColor: props.bgc ? props.bgc : token.contentBgc }}>
            <div className={styles.header} style={{ width: '100%' }}>
                <div className={styles.title} style={{ width: '100%',}} >
                    <span>{props.title}</span>
                </div>
            </div>
            {
                props.content && <div className={styles.content} >
                    {props.content}
                </div>
            }


        </div>
    )
}

export default Com