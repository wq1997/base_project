import Table from '@/components/Table.jsx'
import { alarmTableColums, alarmLevel } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useIntl, useSelector } from "umi";
import styles from "./index.less";
import { Pagination, Select, Cascader, theme, Button, DatePicker } from "antd"
import { downLoadExcelMode } from "@/utils/utils"
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
  const [plantId, setPlantId] = useState(null);
  const [plantDeviceList, setPlantDeviceList] = useState([]);
  const [plantDeviceValue, setPlantDeviceValue] = useState([]);
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
        const currentIndex = plantList?.findIndex(item => item.value === plantId);
        plantList[currentIndex].children = data;
        setPlantDeviceList([...plantList]);
      }
    }
  }

  const initPlantDevice = async () => {
    const res = await getFetchPlantListServe();
    if (res?.data?.data) {
      const data = res?.data?.data;
      const plantList = data?.plantList?.map((item, index) => {
        return {
          value: item.plantId,
          label: item.name,
          disabled: data?.deviceCount?.[index] === 0,
          children: data?.deviceCount?.[index] && [
            {
              value: '',
              label: ''
            }
          ]
        }
      })
      setPlantDeviceList(plantList);
    }
  }

  useEffect(() => {
    getTableListData(current);
  }, [current, level, type, time, pageSize]);

  useEffect(() => {
    initPlantDevice()
    // getPlanList();
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
      plantId: plantDeviceValue?.[0],
      dtuId: plantDeviceValue?.[1],
    });
    setData(data.data);
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
          <Cascader
            changeOnSelect
            options={plantDeviceList}
            onChange={async value => {
              if (value?.length === 1) {
                getDtusOfPlant(plantDeviceList, value[0])
              }
              setPlantDeviceValue(value);
            }}
            style={{ width: '250px', marginRight: 30 }}
            placeholder={`${t('请选择电站')} / ${t('设备')}`}
          />
          <div className={styles.level}>
            <Select
              style={{ width: 180 }}
              onChange={changeLevel}
              options={alarmLevel}
              allowClear
              placeholder={t('告警等级')}
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
        <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data?.total} pageSizeOptions={[10, 20, 30]} onChange={changPage} />
      </div>
    </div>
  )
}

export default RealtimeAlarm;