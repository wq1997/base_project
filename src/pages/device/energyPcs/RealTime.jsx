
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Tab from '../components/Tab'
function Com(props) {
    const tabName=[
      
  ]
    useEffect(() => {
        // console.log('函数组件来咯')
    }, [])

    return (
        <div className='content'>
            <Tab TabItem={tabName}/>
        </div>
    )
}

export default Com