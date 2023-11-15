
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Tabs } from 'antd';

function Com(props) {
    const [xxx, setXxx] = useState('')

    useEffect(() => {
        console.log('函数组件来咯',props.TabItem)
    }, [])

    return (
        <div className='content'>
            <Tabs
                defaultActiveKey="1"
                type="card"
                size='small'
                items={props.TabItem}
            />
        </div>
    )
}

export default Com