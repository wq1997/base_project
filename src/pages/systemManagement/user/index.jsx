
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import SuperAdmin from './component/SuperAdmin';
import NorMalUser from './component/NormalUser'
import { useSelector, } from "umi";
import {  theme, } from 'antd';

function User(props) {
    const global = useSelector(state => state.global);
    const { user } = useSelector(function (state) {
        return state.user
    });
    useEffect(() => {
    }, [])
    const { token } = theme.useToken();

    return (
        <div className={`${global.theme=='default'?'mDefault content':'mDark content'}`} style={{height:'calc(100% - 10px)',backgroundColor:token.titleCardBgc }}>
            {(user.roleId == 1||user.roleId == 2 )?
                <NorMalUser /> :
                <SuperAdmin roleId={user.roleId}/>
            }
        </div>
    )
}

export default User