import Table from '@/components/Table.jsx'
import { alarmLevel } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useIntl, useSelector, FormattedMessage } from "umi";
import styles from "./index.less";
import { Pagination, Select, Cascader, theme, Button, DatePicker } from "antd"
import { downLoadExcelMode, getAlarmColor } from "@/utils/utils"
import {
  getFetchPlantList3 as getFetchPlantListServe,
  get215HistoryAlarm as get215HistoryAlarmServe,
} from "@/services";
import {
  getDtusOfPlant as getDtusOfPlantServe
} from "@/services/plant";
import dayjs from 'dayjs';

const RealtimeAlarm = () => {
  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [level, setLevel] = useState();
  const [type, setType] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [time, setTime] = useState([null, null]);
  const { token } = theme.useToken();
  const [sn, setSn] = useState();
  const [plantList, setPlantList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [plantId, setPlantId] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const { locale } = useSelector(state => state.global);

  const intl = useIntl();
  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }

  const alarmTableColums = [
    {
      title: <FormattedMessage id='SN号' />,
      dataIndex: 'sn',
      key: 'Sn',
    },
    {
      title: <FormattedMessage id='告警等级' />,
      dataIndex: 'prior',
      key: '告警等级',
      render(value) {
        const currentAlarm = alarmLevel?.find(alarm => alarm.value == value);
        if (currentAlarm) {
          const key = currentAlarm?.key;
          const value = currentAlarm?.value;
          return (
            <span style={{ color: getAlarmColor(value) }}>
              {t(key)}
            </span>
          );
        }
      }
    },
    {
      title: <FormattedMessage id='告警描述' />,
      dataIndex: 'desc',
      key: '告警描述',
    },
    {
      title: <FormattedMessage id='设备名称' />,
      dataIndex: 'deviceName',
      key: '设备名称',
    },

    {
      title: <FormattedMessage id='电站名称' />,
      dataIndex: 'plantName',
      key: '电站名称',
    },

    {
      title: <FormattedMessage id='开始时间' />,
      dataIndex: 'beginS',
      key: '开始时间',
    },
    {
      title: <FormattedMessage id='结束时间' />,
      dataIndex: 'endS',
      key: '结束时间',
    },
  ];

  const getPlanList = async () => {
    const res = await getFetchPlantListServe();
    if (res?.data?.data) {
      const data = res?.data?.data;
      const plantList = data?.plantList?.map((item, index) => {
        return {
          value: item.plantId,
          label: item.name
        }
      })
      setPlantList(plantList);
    }
  }

  const getDtusOfPlant = async (plantList, plantId) => {
    const res = await getDtusOfPlantServe({ plantId });
    if (res?.data?.data) {
      let data = res?.data?.data;
      if (data) {
        try {
          data = JSON.parse(data);
        } catch {
          data = [];
        }
        data = data?.length > 0 ? data?.map(item => {
          return {
            value: item.id,
            label: item.name || intl.formatMessage({ id: '设备无名称' })
          }
        }) : [];
        setDeviceList(data);
      }
    }
  }

  const initPlantDevice = async () => {
    const res = await getFetchPlantListServe();
    if (res?.data?.data) {
      const data = res?.data?.data;
      const plantList = data?.plantVoList?.map((item, index) => {
        return {
          value: item.plantId,
          label: item.name,
          alarms: item?.alarms
        }
      })
      setPlantList(plantList);
    }
  }

  useEffect(() => {
    getTableListData(current);
  }, [current, type, time, pageSize, locale]);

  useEffect(() => {
    initPlantDevice()
  }, [])

  const downLoadFoodModel = () => {  // 菜品模板下载
    let fileName = t('历史告警');
    let sheetData = data?.list;
    let sheetFilter = [];
    let sheetHeader = [];
    alarmTableColums.map(it => {
      sheetFilter.push(it.dataIndex);
      sheetHeader.push(t(it.key));
    })
    let nowtime = new Date()
    let sheetName = `${nowtime.getFullYear()}-${nowtime.getMonth() + 1}-${nowtime.getDate()}`
    downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader, sheetName)
  };

  const getTableListData = async (page) => {
    const { data } = await get215HistoryAlarmServe({
      currentPage: page || 1,
      pageSize,
      prior: level,
      begin: time?.length ? time[0]?.format('YYYY-MM-DD HH:mm:ss') : null,
      end: time?.length ? time[1]?.format('YYYY-MM-DD HH:mm:ss') : null,
      plantId,
      dtuId: deviceId,
    }) || {};
    setData(data?.data);
  }
  const changPage = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  }
  const changeLevel = (value) => {
    setLevel(value);
  }

  const changePlant = (value) => {
    setPlantId(value);
  }

  const changeTime = (value) => {
    setTime(value);
  }
  const upData = () => {
    getTableListData();
  }

  const changeSn = (e) => {
    setSn(e.target.value);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.title}>
          {/* <Select
            style={{ width: 180 }}
            options={plantList}
            placeholder={t('请选择电站')}
            allowClear
            onChange={changePlant}
          /> */}
          {/* <div className={styles.sn}>
            <Input placeholder={t('请输入') + t('设备编码')} style={{ width: 240 }} onChange={changeSn} />
          </div> */}
          <Select
            options={plantList}
            onChange={async value => {
              if (value) {
                getDtusOfPlant(plantId, value)
              }
              setPlantId(value);
              setDeviceId(undefined);
              setLevel(undefined);
            }}
            style={{ width: '250px', marginRight: 30 }}
            placeholder={`${t('请选择电站')}`}
            value={plantId}
          />
          <Select
            options={deviceList}
            onChange={async value => {
              setDeviceId(value);
            }}
            style={{ width: '250px', marginRight: 30 }}
            placeholder={`${t('请选择设备')}`}
            value={deviceId}
            allowClear
          />
          <div className={styles.level}>
            <Select
              style={{ width: 180 }}
              onChange={changeLevel}
              options={plantId ? alarmLevel?.filter(level => {
                let value = level?.value;
                const plant = plantList?.find(plant => plant?.value === plantId);
                const alarmList = plant?.alarms?.split(',');
                return alarmList?.includes(value);
              }) : alarmLevel}
              allowClear
              placeholder={t('告警等级')}
              value={level}
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
          <Button type='primary' onClick={upData}>{t('查询')}</Button>
          <div className={styles.buttons}>
            <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={downLoadFoodModel} >
              {t('导出')} Excel
            </Button>
          </div>
        </div>
        <Table
          columns={alarmTableColums}
          data={data?.list}
          pagination={false}
          scroll={{ y: "calc(100vh - 350px)" }}
        />
        {
          data?.list?.length > 0 &&
          <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data?.total} pageSizeOptions={[10, 20, 30]} onChange={changPage} />
        }
      </div>
    </div>
  )
}

export default RealtimeAlarm;