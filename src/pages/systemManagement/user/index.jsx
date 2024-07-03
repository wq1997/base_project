
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import SuperAdmin from './component/SuperAdmin';
import NorMalUser from './component/NormalUser'
import { useSelector, } from "umi";

function User(props) {
    const { user } = useSelector(function (state) {
        return state.user
    });
    useEffect(() => {
    }, [])

    return (
        <div className='content' style={{ height: '100%' }}>
            {user?.roleId ==3 ?
                <SuperAdmin /> :
                <NorMalUser />
            }
        </div>
    )
}

export default User