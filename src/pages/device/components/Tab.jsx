
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Tabs } from 'antd';

function Com(props) {
    const [tabItem, setTabItem] = useState([])
    useEffect(() => {
        setTabItem(props.TabItem);
    }, [tabItem])
    return (
        <div className='content'>
        <Tabs
            type="card"
            size='small'
            items={tabItem}
            onChange={props.onChange}
            activeKey={props.activeKey}
        />
        </div>
    )
}

export default Com