import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import {  Button} from "antd";
import styles from './index.less'

function Com(props) {
    const [xxx, setXxx] = useState('')

    useEffect(() => {
        console.log('函数组件来咯')
    }, [])

    return (
        <div className={styles.contents}>
            <CardModel
             title={
                "告警规则"
            }
            filterPart={
              <Button type='primary'>新增</Button>
            }
            />
        </div>
    )
}

export default Com