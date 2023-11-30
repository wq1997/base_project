import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import 'echarts-liquidfill/src/liquidFill.js'
import styles from './battery.less'

const Battery = () => {
    const dataSource = [{ name: '山田', },];
    const renderCircleBoxItem = (name) => {
        return (<div className={styles.circleBoxItem}>
            <div className={styles.ball} />
            <div className={styles.name}>{name}</div>
        </div>);
    };
 

    return (
        <div className={styles.circleBoxWrap}>
        {dataSource.map((item, key) => (
            <div key={key} className={styles.circleBox}>
                {renderCircleBoxItem(item.name)}
            </div>))}
    </div>
    )
};

export default Battery