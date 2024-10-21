
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import SuperAdmin from './component/SuperAdmin';
import NorMalUser from './component/NormalUser'
import { useSelector, } from "umi";
import {  theme, } from 'antd';

function User(props) {
    const { user } = useSelector(function (state) {
        return state.user
    });
    useEffect(() => {
    }, [])
    const { token } = theme.useToken();

    return (
        <div className='content' style={{height:'calc(100% - 10px)',backgroundColor:token.titleCardBgc }}>
            {user.roleId !== 1 ?
                <SuperAdmin roleId={user.roleId}/> :
                <NorMalUser />
            }
        </div>
    )
}

export default User