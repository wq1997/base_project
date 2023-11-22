
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Tab from '../components/Tab'
import { getLocalStorage } from "@/utils/utils";

function Com(props) {
    const tabName=[
      {label:'总览',key:'总览',children:'总览'},
      {label:'实时数据',key:'实时数据',children:'实时数据'},
      {label:'历史数据',key:'历史数据',children:'历史数据'},
      {label:'实时告警',key:'实时告警',children:'实时告警'},
  ]
    useEffect(() => {
        console.log( 
            localStorage.getItem('allPlant')
            );
    }, [])

    return (
        <div className='content'>
            <Tab TabItem={tabName}/>
        </div>
    )
}

export default Com