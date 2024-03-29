// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { theme, Select, DatePicker, Button, Cascader, message } from "antd";
import styles from './index.less'
import ReactECharts from "echarts-for-react";
import { CardModel } from "@/components";
import { getBmsAnalyticsInitData, analyticsBmsDiffData, analyticsBmsData } from '@/services/deviceTotal'
import dayjs from 'dayjs';
import { getQueryString } from "@/utils/utils";
import { useSelector, useIntl } from "umi";
const { SHOW_CHILD } = Cascader;
function Com(props) {
  const { token } = theme.useToken();
  const [option, setOption] = useState([]);
  const [way, setWay] = useState(1);
  const [wayLabel, setWayLabel] = useState('日报表');
  const id = getQueryString('id') || 0;
  const [date, setDate] = useState(dayjs(new Date()));
  const [dateStr, setDateStr] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [dateBottom, setDateBottom] = useState(dayjs(new Date()));
  const [packReq, setPackReq] = useState([['0', '0-0']]);
  const [packList, setPackList] = useState([]);
  const [cellList, setCellList] = useState([]);
  const [cellReq, setCellReq] = useState(['0-0', '0-0-0']);
  const [optionEchartTem, setOptionEchartTem] = useState({})
  const [optionEchartVol, setOptionEchartVol] = useState({})
  const [optionEchartVolBot, setOptionEchartVolBot] = useState({})
  const [optionEchartTemBot, setOptionEchartTemBot] = useState({});
  const [dataVdiff, setDataVdiff] = useState([]);
  const [dataTdiff, setDataTdiff] = useState([]);

  const intl = useIntl();
  const wayOption = [{
    label: '日报表',
    value: 1,
  },
  {
    label: '周报表',
    value: 2,
  },
  {
    label: '月报表',
    value: 3,
  },
  {
    label: '年报表',
    value: 4,
  },
  {
    label: '总报表',
    value: 5,
  },
  ]
  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }
  const initOption = () => {
    setOptionEchartTem({});
  };
  useEffect(() => {
    initOption();
    getInitData();
    getChartData();
    getBottomChartData();
  }, [token, id]);

  const getInitData = async () => {
  
  }
  const getChartData = async () => {
    let dataTypeList = [];
    let dateList = [];
    if (way === 1) {
      dataTypeList = packReq?.map(it => {
        return it[1];
      });
      dateList = [dateStr];
      if (dataTypeList.length > 3) {
        message.warning('最多选择3个对比项');
        return
      }
    } else {
      dataTypeList = packReq[1];
      dateList = dateStr;
      if (dateList.length > 3) {
        message.warning('最多选择3个对比项');
        return
      }
    }
    let { data } = await analyticsBmsDiffData({
      id: 339,
      dataTypeList,
      dateList
    });
    let { tempInfo, volInfo } = data;
    handelData(volInfo, setOptionEchartVol, 1);
    handelData(tempInfo, setOptionEchartTem, 2);

  }
  const getBottomChartData = async () => {
    let { data } = await analyticsBmsData({
      id: 339,
      dataType: cellReq[1],
      date: dateBottom.format('YYYY-MM-DD')
    });
    dealDataBot(data.data?.tData, setOptionEchartTemBot, t("温度"));
    dealDataBot(data.data?.vData, setOptionEchartVolBot, t("电压"));

  }
  const dealDataBot = (data, setHandel, title) => {
    let arr = [];
    data?.map(it => {
      arr.push([dayjs(it.time).format('HH:mm:ss'), it.value])
    })
    setHandel({
   series: [{
        name: title,
        type: 'line',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: token.chartLineColor[0],
            lineStyle: {
              color: token.chartLineColor[0],
              width: 2
            },
          }
        },
        data: arr
      }]
    });

  }
  const handelData = (data, setHandel, val) => {
    let series = []
   
  }
  const changePack = (val) => {
    setPackReq(val)
  }
  const changeWay = (val,label) => {
    setWay(val);
    setWayLabel(label?.label);
    console.log(label,121212);
  }
  const changeDate = (val, str) => {
    setDateStr(str);
    setDate(val);
  }

  return (
    <>
      <CardModel
        title={t('数据对比')}
        content={
          <div className={styles.advancedAnalytics} style={{ color: token.titleColor }}>
            <div className={styles.searchHead}>
              <span >{t('报表类型')}:</span>
              <Select
                className={styles.margRL}
                style={{ width: 180 }}
                onChange={ changeWay}
                options={wayOption}
                defaultValue={wayOption[0].value}
              >
              </Select>
              <span >{t('对比日期')}:</span>
              <DatePicker className={styles.margRL}
                style={{ width: 240 }}
                multiple={way === 1 ? false : true}
                maxTagCount={1}
                onChange={(val, str) => changeDate(val, str)}
                defaultValue={date}
                key={way + 1}
                allowClear={false}
                needConfirm
              />
              <Button type="primary" className={styles.firstButton} onClick={getChartData}>
                {t('数据选择')}
              </Button>
              <Button type="primary" style={{ backgroundColor: token.defaultBg }} >
                {t('导出')}excel
              </Button>
            </div>
            <div className={styles.echartPart}>
              <div className={styles.echartPartCardwrap}>
              <div className={styles.title}>
                {dayjs(new Date()).format('YYYY.MM.DD')}{t(wayLabel)}
              </div>
              <div className={styles.content}></div>

              </div>
            </div>
          </div>
        }

      />
    </>

  )
}

export default Com