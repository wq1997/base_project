import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import 'echarts-liquidfill/src/liquidFill.js'
import styles from './battery.less'

const Battery = () => {

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                SOC
            </div>
            <div className={styles.battery} >
            </div>
            <div className={styles.batteryCopy}>
                <div className={styles.gWave}></div>
                <div className={styles.gWave}></div>
                <div className={styles.gWave}></div>
            </div>
        </div>
    )
};

export default Battery