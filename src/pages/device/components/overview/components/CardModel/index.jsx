import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './index.less'
import { theme } from "antd";
import {  useSelector,  } from 'umi'
import title_bg_default from '../../../../../../../public/images/title_bg_default.svg'
import title_bg from '../../../../../../../public/images/titleDes.svg'
function Com(props) {
    const { token } = theme.useToken();
    const [path,setPath] =useState(title_bg_default);
    const global = useSelector(state => state.global);
    useEffect(() => {
        setPath(global.theme == 'default' ? title_bg_default : title_bg) ;
    }, [global.theme]);

    return (
        <div className={styles.card} style={{ backgroundColor: props.bgc ? props.bgc : token.darkbgc }}>
            <div className={styles.header} style={{ width: '100%' }}>
                <div className={styles.title} style={{ width: '100%',
                   background: `url(${path}) left center no-repeat`,
                    color: token.iconColor,

                }} >
                    <span>{props.title}</span>
                </div>
            </div>
            {
                props.content && <div className={styles.content} >
                    {props.content}
                </div>
            }


        </div>
    )
}

export default Com