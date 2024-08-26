import styles from "./index.less";
import { theme, } from "antd";
import React, { useState, useEffect,  } from 'react';
import {  useSelector,  } from 'umi'

import title_bg_default from '../../../../../public/images/title_bg_default.svg'
import title_bg from '../../../../../public/images/title_bg.svg'
const Title = ({ title }) => {
    const { token } = theme.useToken();
    const [path,setPath] =useState(title_bg_default);
    const global = useSelector(state => state.global);

    useEffect(() => {
        setPath(global.theme == 'default' ? title_bg_default : title_bg) ;
    }, [global.theme]);
    
    return (
        <div className={styles.title}
            style={{
                width: '100%',
                color: token.iconColor,
                background: `url(${path}) left center no-repeat`
            }} >
            <span>{title}</span>
        </div>
    )
}

export default Title;