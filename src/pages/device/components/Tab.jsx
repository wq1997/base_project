
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Tabs } from 'antd';

function Com(props) {
    const [tabItem, setTabItem] = useState([])
    useEffect(() => {
        console.log('函数组件来咯', props.TabItem)
    }, [tabItem])
    useEffect(() => {
        console.log('函数组件来咯', props.TabItem, tabItem)
        setTabItem();
    }, [])
    const tabName=[
        {label:'总览',key:'总览',children:'总览'},
        {label:'电芯详情',key:'电芯详情',children:'电芯详情'},
        {label:'实时数据',key:'实时数据',children:'实时数据'},
        {label:'历史数据',key:'历史数据',children:'历史数据'},
        {label:'实时告警',key:'实时告警',children:'实时告警'},
    ]
    return (
        <div className='content'>
            <Tabs
                defaultActiveKey="0"
                type="card"
                size='small'
                items={tabName}
            />
        </div>
    )
}

export default Com