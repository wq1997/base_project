
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import SuperAdmin from './component/SuperAdmin'
function User(props) {
    const [xxx, setXxx] = useState('')

    useEffect(() => {
        console.log('函数组件来咯')
    }, [])

    return (
        <div className='content'>
          <SuperAdmin/>
        </div>
    )
}

export default User