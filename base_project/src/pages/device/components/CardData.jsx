
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector, history } from "umi";
import styles from "./cardData.less"
function Com(props) {

    useEffect(() => {
    }, [props])

    return (
        <div className={styles.content}>
            <div className={styles.title}>{props.data.title}</div>
            <div className={styles.DataSection}>
            {
               Object.keys(props.data.data).map((it, index) => {
                    return (
                        <div className={styles.oneData}>
                            <span className={styles.name}>{it}：</span>
                            <span className={styles.value}>{props.data.data[it]}</span>
                        </div>
                    )
                })
            }
            </div>
           

        </div>
    )
}

export default Com