import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import styles from './index.less'
import { theme,Tooltip } from "antd";
import { getPvRunMetrics } from "@/services/deviceTotal";
import { useSelector,useIntl } from "umi";
import dayjs from 'dayjs';

import {
    ToolOutlined,
    CalendarOutlined,
    DatabaseOutlined,
    MonitorOutlined,
    ThunderboltOutlined,
    DisconnectOutlined,
    SettingOutlined,
} from '@ant-design/icons';
function Com(props) {
    const [xxx, setXxx] = useState('')
    const { token } = theme.useToken();
    const { currentPlantId } = useSelector(function (state) {
        return state.device
      });
    useEffect(() => {
        getData();
    }, [])

    const getData =async()=>{
        let {data}=await getPvRunMetrics({
            plantId:currentPlantId||localStorage.getItem('plantId'),
        });
        let top=[];
        let bottom=[];
        topData?.map((it,index)=>{
            index==1?
            it.value=dayjs(data?.data[it.key]).format('YYYY-MM-DD'):
            it.value=data?.data[it.key];
            top.push(it);
        });
        bottomData.map(it=>{
            it.value=data?.data[it.key];
            bottom.push(it)
        })
        setTopData([...top]);
        setBottomData([...bottom]);
    }
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const [topData,setTopData] =useState([
        {
            icon: <ToolOutlined />,
            name: "安装位置",
            color: '#FAC200',
            value: '',
            unit: '',
            key:'installationLocation'
        },
        {
            icon: <CalendarOutlined />,
            name: "投运日期",
            color: '#03B4B4',
            value: '',
            unit: '',
            key:'date'
        },
        {
            icon: <DatabaseOutlined />,
            name: "装机容量",
            color: '#2974ED',
            value: '',
            unit: 'kWh',
            key:'capacity'
        },
    ]); 
    const [bottomData,setBottomData] =useState([
        {
            icon: <MonitorOutlined />,
            name: "今日发电量",
            color: '#ED750E',
            value: '',
            unit: 'kWh',
            key:'todayGenerateElectricity'
        },
        {
            icon: <ThunderboltOutlined />,
            name: "今日并网量",
            color: '#6F2BF1',
            value: '',
            unit: 'kWh',
            key:'todayGridConnections'

        },
        {
            icon: <DisconnectOutlined />,
            name: "累计发电量",
            color: '#FAC200',
            value: '',
            unit: 'kWh',
            key:'totalGenerateElectricity'

        },
        {
            icon: <SettingOutlined />,
            name: "累计并网量",
            color: '#03B4B4',
            value: '',
            unit: 'kWh',
            key:'totalGridConnections'

        },

    ]) ;
    return (
        <div className={styles.content}>
            <CardModel
                title={
                    t("运行指标")
                }
                opacity={0.7}
                content={
                    <div className={styles.contentWrap}>
                        <div className={styles.topContent}>
                            {topData.map(it => {
                                return (
                                    <div className={styles.topItem} style={{ color: it.color,backgroundColor:token.cardBgc, boxShadow: token.cardShadow}}>
                                        <div className={styles.topItemTitle}>
                                            {it.icon}
                                            <span style={{ color: token.smallTitleColor, fontWeight: 500, fontSize: '16px', marginLeft: '3px' }}>{t(it.name)}</span>
                                        </div>
                                        <Tooltip title={it.value} >
                                        <div className={styles.topVaue} style={{color:it.color}}>
                                            {it.value}
                                            <span style={{color: token.smallTitleColor, fontSize: '16px', fontWeight: 400, marginLeft: '10px' }}>{it.unit}</span>
                                        </div>
                                        </Tooltip>
                                      
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.bottomContent}>
                            {bottomData.map(it => {
                                return (
                                    <div className={styles.bottomItem} style={{ color: it.color,backgroundColor:token.cardBgc , boxShadow:token.cardShadow}}>
                                        <div className={styles.bottomItemTitle}>
                                            {it.icon}
                                            <span style={{color: token.smallTitleColor, fontWeight: 500, fontSize: '16px', marginLeft: '3px' }}>{t(it.name)}</span>
                                        </div>
                                        <div className={styles.bottomVaue} style={{color:token.titleColor}}>
                                            {it.value}
                                            <span style={{ color: token.smallTitleColor,fontSize: '16px', fontWeight: 400, marginLeft: '10px' }}>{it.unit}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                }
            />
        </div>
    )
}

export default Com