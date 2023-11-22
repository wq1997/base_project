
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Tab from '../components/Tab'
function Com(props) {
    const tabName=[
      {label:'总览',key:'总览',children:'总览'},
      {label:'历史数据',key:'历史数据',children:'历史数据'},
  ]
    useEffect(() => {
    }, [])
    return (
        <div className='content'>
            <Tab TabItem={tabName}/>
        </div>
    )
}

export default Com