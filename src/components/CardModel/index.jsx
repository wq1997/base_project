import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
function Com(props) {
    const [xxx, setXxx] = useState('')

    useEffect(() => {
        console.log('函数组件来咯')
    }, [])

    return (
        <div className={styles.card} style={{ backgroundColor: `rgba(255, 255, 255, ${props.opacity})` }}>
            <div className={styles.header}>
                <div className={styles.title}>
                    {props.title}
                </div>
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