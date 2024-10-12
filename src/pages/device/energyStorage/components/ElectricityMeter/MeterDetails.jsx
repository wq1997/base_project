// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CardModel } from "@/components";
import { theme, Select } from "antd";
import styles from './index.less'
import { useSelector, useIntl } from "umi";
import { getMetersNowData } from '@/services/deviceTotal'

const { Option } = Select;
function Com({ id,gridPointId }) {
    const [data, setData] = useState('');
    const [currentClu, setCurrentClu] = useState(0);
    const { token } = theme.useToken();
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    useEffect(() => {
        getData();
    }, [gridPointId])

  
    const getData = async () => {
        let { data } = await getMetersNowData({ id:gridPointId });
        setData({...data?.data.tMeter,...data?.data.gMeter,...data?.data?.['load-meter']});
    }
   const modelData=[
    {
    lable:'总充电电量',
    key:'EiT1',
    value:''
   },
   {
    lable:'总放电电量',
    key:'EoT1',
    value:''
   },  {
    lable:'日充电量',
    key:'EiDay',
    value:''
   },  {
    lable:'日放电量',
    key:'EoDay',
    value:''
   },   {
    lable:'正向总有功电量',
    key:'EiT2',
    value:''
   },  {
    lable:'反向总有功电量',
    key:'EoT2',
    value:''
   },  {
    lable:'尖时段总充电电量',
    key:'EiR1',
    value:''
   },  {
    lable:'峰时段总充电电量',
    key:'EiR2',
    value:''
   },  {
    lable:'平时段总充电电量',
    key:'EiR3',
    value:''
   },  {
    lable:'谷时段总充电电量',
    key:'EiR4',
    value:''
   },  {
    lable:'尖时段总放电电量',
    key:'EoR1',
    value:''
   },  {
    lable:'峰时段总放电电量',
    key:'EoR2',
    value:''
   },  {
    lable:'平时段总放电电量',
    key:'EoR3',
    value:''
   },  {
    lable:'谷时段总放电电量',
    key:'EoR4',
    value:''
   },  {
    lable:'尖时段总有功电量',
    key:'ER1',
    value:''
   },  {
    lable:'峰时段总有功电量',
    key:'ER2',
    value:''
   },  {
    lable:'平时段总有功电量',
    key:'ER3',
    value:''
   }, 
    {
    lable:'谷时段总有功电量',
    key:'ER4',
    value:''
   },
//    {
//     lable:'储能总充放电功率',
//     key:'FA',
//     value:''
//    },  
   {
    lable:'当月最大需量',
    key:'Dm',
    value:''
   },  {
    lable:'当月最大需量发生时间',
    key:'DmDt',
    value:''
   },  {
    lable:'上月最大需量',
    key:'DmLast',
    value:''
   },  {
    lable:'上月最大需量发生时间',
    key:'DmLastDt',
    value:''
   }, 
    {
    lable:'总有功功率',
    key:'P',
    value:''
   },
   {
    lable:'A相有功功率',
    key:'Pa',
    value:''
   },
   {
    lable:'B相有功功率',
    key:'Pb',
    value:''
   },
   {
    lable:'C相有功功率',
    key:'Pc',
    value:''
   },
   {
    lable:'总无功功率',
    key:'Q',
    value:''
   },
   {
    lable:'A相无功功率',
    key:'Qa',
    value:''
   },
   {
    lable:'B相无功功率',
    key:'Qb',
    value:''
   },
   {
    lable:'C相无功功率',
    key:'Qc',
    value:''
   },
   {
    lable:'总视在功率',
    key:'S',
    value:''
   },
   {
    lable:'A相视在功率',
    key:'Sa',
    value:''
   },
   {
    lable:'B相视在功率',
    key:'Sb',
    value:''
   },
   {
    lable:'C相视在功率',
    key:'Sc',
    value:''
   },
   {
    lable:'A相电压',
    key:'Ua',
    value:''
   },
   {
    lable:'B相电压',
    key:'Ub',
    value:''
   },
   {
    lable:'C相电压',
    key:'Uc',
    value:''
   },
   {
    lable:'AB线电压',
    key:'Uab',
    value:''
   },
   {
    lable:'BC线电压',
    key:'Ubc',
    value:''
   },
   {
    lable:'AC线电压',
    key:'Uac',
    value:''
   },
   {
    lable:'A相电流',
    key:'Ia',
    value:''
   },
   {
    lable:'B相电流',
    key:'Ib',
    value:''
   },
   {
    lable:'C相电流',
    key:'Ic',
    value:''
   },
   {
    lable:'总频率',
    key:'Fa',
    value:''
   },
   {
    lable:'B相频率',
    key:'Fb',
    value:''
   },
   {
    lable:'C相频率',
    key:'Fc',
    value:''
   },
   {
    lable:'总功率因数',
    key:'PF',
    value:''
   },
   {
    lable:'A相功率因数',
    key:'PFa',
    value:''
   },
   {
    lable:'B相功率因数',
    key:'PFb',
    value:''
   },
   {
    lable:'C相功率因数',
    key:'PFc',
    value:''
   },
]
    return (
        <div className={styles.detailsWrap} >
            <div className={styles.heapRealTimeData}>
                <CardModel
                    title={t('电表数据')}
                    content={
                        <div className={styles.content} style={{backgroundColor: token.lightTreeBgc,}}>
                            {data && modelData?.map((it, index) => {
                                return (
                                    <div className={styles.item} style={{ color:token.colorLittle}}>
                                        <span className={styles.itemKeys}>{t(it?.lable)}:</span>
                                        <span className={styles.itemValues}>{data?.[0]?.[it?.key]}</span>
                                    </div>
                                )
                            })}
                        </div>
                    }
                />
            </div>


        </div>
    )
}

export default Com