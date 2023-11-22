
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
                defaultActiveKey="0"
                type="card"
                size='small'
                items={tabItem}
            />
        </div>
    )
}

export default Com