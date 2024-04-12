
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import styles from './index.less'
import { DatePicker } from 'antd';
import ReactECharts from "echarts-for-react";
import { theme } from "antd";
import { useSelector, useIntl } from "umi";
import { pvPowerGeneration } from "@/services/deviceTotal";
import dayjs from 'dayjs';

function Com(props) {
    const [xxx, setXxx] = useState('')
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const { currentPlantId } = useSelector(function (state) {
        return state.device
      });
    const [date, setDate] = useState(dayjs(new Date()));
    function onChange(date) {
        setDate(date);
    }
    const { token } = theme.useToken();
    const [options, setOptions] = useState({});
    useEffect(() => {
        getData();
    }, [date]);
    const getData=async()=>{
        let {data} = await pvPowerGeneration({
            // type:0,
            plantId:currentPlantId||localStorage.getItem('plantId'),
            // valueType:2,
            // time:date.format('YYYY-MM-DD'),
            // endTime:date.format('YYYY-MM-DD'),
        });
        let dataX=[];
        let dataY=[];
        data.data?.map(it=>{
            dataX.push(dayjs(it.date).format('YYYY-MM-DD'));
            dataY.push(it.dayOutEnergy);
        });
        setOptions({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: [...dataX],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    },

                }
            ],
            series: [
                {
                    name: t('发电量'),
                    type: 'bar',
                    barMaxWidth:'20%',
                    itemStyle: {
                        normal: {
                            color: token.colorPrimary
                        }
                    },
                    // barWidth: '60%',
                    data:[...dataY]
                }
            ]
        });
    }
    return (
        <div className={styles.content}>
            <CardModel
                title={
                    t("发电量统计")+'(kWh)'
                }
      
                content={
                    <ReactECharts option={options} style={{height: '100%'}}  />
                }
            />

        </div>
    )
}

export default Com