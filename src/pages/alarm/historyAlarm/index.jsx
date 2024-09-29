import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'
import { getQueryString, downLoadExcelMode } from "@/utils/utils";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from 'react'
import { useSelector, useIntl } from "umi";
import styles from "./index.less";
import { Pagination, Select, Input, theme, Button, DatePicker } from "antd"
import { CardModel } from "@/components";
import { getHistoryAlarmsByOptionsWithPage, getHistoryAlarmsStatistics } from "@/services/alarm"
import {
  HistoryOutlined,
  ReconciliationOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
var colorList = ['red', '#ED750E','orange',  'green'];
const RealtimeAlarm = () => {
  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [dataTotal, setDatadataTotal] = useState([]);
  const [current, setCurrent] = useState(1);
  const [level, setLevel] = useState();
  const [type, setType] = useState();
  const [time, setTime] = useState([null, null]);
  const { token } = theme.useToken();
  const [screenH, setScreenH] = useState('');
  const [scroolY, setScroolY] = useState(200);
  const [options, setOptions] = useState({});

  useEffect(() => {
    getOptions();
  }, [token, dataTotal]);
  const getOptions = () => {
    dataTotal?.priorStatistics?.map(it => {
      it.label = {
        color: token.titleColor,
      }
    });
    setOptions({
      title: {
        text: sum(dataTotal?.priorStatistics),
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: '18px',
          fontWeight: 500,
          color: token.titleColor
        },
        subtextStyle: {
          color: token.titleColor,
          fontSize: '12px',
        },
      },
      legend: {
        show: true,
        // icon:"circle",
        top: "40%",
        left: '70%',
        width: 40,
        padding: [0, 10],
        itemGap: 10,
        textStyle: {
          color: token.titleColor,
        },
      },
      series: [
        {
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          type: 'pie',
          itemStyle: {
            normal: {
              color: function (params) {
                return colorList[params.dataIndex]
              }
            }
          },
          data: dataTotal?.priorStatistics
        }
      ]
    });
  };
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
    setScreenH(document.documentElement.clientHeight || document.body.clientHeight)
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  const handleWindowResize = () => {
    setScreenH(document.documentElement.clientHeight || document.body.clientHeight)
  }
  useEffect(() => {
    if (screenH < 1000) {
      setScroolY(300);
    } else if (screenH > 1000 && screenH < 1300) {
      setScroolY(400);
    } else if (screenH > 1300) {
      setScroolY(500);
    }
  }, [screenH])
  const alarmLevel = [
    {
      label: t('一级告警'),
      value: '1',
      key: '一级',
    },
    {
      label: t('二级告警'),
      value: '2',
      key: '二级',
    },
    {
      label: t('三级告警'),
      value: '3',
      key: '三级',
    },
    {
      label: t('四级告警'),
      value: '4',
      key: '四级',
    },
  ];
  const typeOfstation = [
    {
      label: t('储能'),
      value: '1',
      key: '储能',
    },
    {
      label: t('光伏'),
      value: '2',
      key: '光伏',
    },
    {
      label: t('充电桩'),
      value: '3',
      key: '充电桩',
    },
  ];



  useEffect(() => {
    getTableListData(current);
  }, [current, level, type, time]);

  useEffect(() => {
    getTotalData();
  }, [])
  const sum = (arr) => {
    return arr?.reduce((prev, cur) => {
      return prev + cur.value
    }, 0)
  }
  const { currentPlantId } = useSelector(function (state) {
    return state.device
  });
  const getTotalData = async () => {
    const { data = {} } = await getHistoryAlarmsStatistics({ plantId: currentPlantId || localStorage.getItem('plantId') });
    setDatadataTotal(data?.data)
  };
  const getTableListData = async (page) => {
    const { data = {} } = await getHistoryAlarmsByOptionsWithPage({
      plantId: currentPlantId || localStorage.getItem('plantId'),
      currentPage: page || 1,
      pageSize: 10,
      prior: level,
      type,
      begin: time?.length ? time[0]?.format('YYYY-MM-DD HH:mm:ss') : null,
      end: time?.length ? time[1]?.format('YYYY-MM-DD HH:mm:ss') : null
    });
    setData(data?.data);
  }
  const changPage = (page) => {
    setCurrent(page);
  }
  const changeLevel = (value) => {
    setLevel(value);
  }
  const changeType = (value) => {
    setType(value);
  }
  const changeTime = (value) => {
    setTime(value);
  }
  const downloadExcel = () => {
    let fileName = t('历史告警');
    let sheetFilter = ['type', 'priorName', 'desc', 'deviceName', 'name', 'plantName', 'begin', 'end'];
    let sheetHeader = [t('设备类型'), t('告警等级'), t('告警描述'), t('设备名称'), t('并网点'), t('电站名称'), t('开始时间'), t('结束时间'),];
    let sheetData = [...data.records];
    let sheetName = '';
    downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader, sheetName);
  }
  const topData = [
    {
      icon: <HistoryOutlined />,
      name: "严重告警历史总数",
      color: '#03B4B4',
      key: 'historyCount',
      value: '',
      unit: '个'
    },
    {
      icon: <ReconciliationOutlined />,
      name: "今日处理严重告警数",
      color: '#ED750E',
      key: 'currentCount',
      value: '',
      unit: '个'
    },
    {
      icon: <ScheduleOutlined />,
      name: "近半年严重告警平均处理时长",
      color: '#5B8FF9',
      key: 'avgCost',
      value: '',
      unit: ''
    },
  ];
  return (
    <div className={styles.wrap}>
      <div className={styles.heard}>
        <CardModel
          title='历史告警'
          content={
            <div className={styles.topContent}>
              <div className={styles.top}>
                {topData.map(it => {
                  return (
                    <div className={styles.topItem} style={{ color: it.color, backgroundColor: token.cardBgc, boxShadow: token.cardShadow }}>
                      <div className={styles.topItemTitle}>
                        {it.icon}
                        <span style={{ color: token.smallTitleColor, fontWeight: 500, fontSize: '16px', marginLeft: '3px' }}>{t(it.name)}</span>
                      </div>
                      <div className={styles.topVaue} >
                        {dataTotal[it.key] || 0}
                        <span style={{ fontSize: '16px', fontWeight: 400, marginLeft: '10px', height: '10%', lineHeight: '150%' }}>{it.unit}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className={styles.pieItem}>
                <ReactECharts option={options} style={{ height: '100%', }} />
                <div className={styles.pieItem_bottom} style={{ color: token.smallTitleColor }}>{t('告警等级分布')}</div>
              </div>
              {/* <div className={styles.pieItem}>
                <PieEcharts
                  top={'50%'}
                  allData={{
                    total: sum(dataTotal?.typeStatistics), subtext: t('总数'), data: dataTotal?.typeStatistics
                  }}>
                  </PieEcharts>
                <div className={styles.pieItem_bottom} style={{ color: token.smallTitleColor }}>{t("告警类别分布")}</div>

              </div> */}
            </div>
          }
        />
      </div>


      <div className={styles.content} style={{ backgroundColor: token.titleCardBgc }}>
        <div className={styles.title}>
          <div className={styles.level}>
            <Select
              style={{ width: 150 }}
              onChange={changeLevel}
              options={alarmLevel}
              allowClear
              placeholder={t('告警等级')}
            />
          </div>
          <div className={styles.dataItem}>
            <Select
              style={{ width: 150 }}
              onChange={changeType}
              options={typeOfstation}
              allowClear
              placeholder={t('设备类型')}
            />
          </div>
          <div className={styles.date}>
            <RangePicker
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
              }}
              format="YYYY-MM-DD HH:mm:ss"
              onChange={changeTime}
            />
          </div>

          <div className={styles.buttons}>
            <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downloadExcel}>
              {t('导出')} Excel
            </Button>
          </div>
        </div>
        <Table
          columns={alarmTableColums}
          data={data?.records}
          pagination={false}
          scroll={{ y: scroolY }}
        />
        <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data?.total} onChange={changPage} />

      </div>


    </div>

  )
}

export default RealtimeAlarm;