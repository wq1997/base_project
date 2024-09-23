import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'
import { getQueryString, downLoadExcelMode } from "@/utils/utils";
import { useEffect, useState } from 'react'
import { useSelector, useIntl } from "umi";
import styles from "./index.less";
import { Pagination, Select, Input, theme, Button, DatePicker } from "antd"
import { getGridPointList,  } from '@/services/plant'
import { getHistoryAlarmsByOptionsWithPage, getHistoryAlarmsStatistics } from "@/services/alarm"
import dayjs from 'dayjs';
const RealtimeAlarm = () => {
  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [level, setLevel] = useState();
  const [time, setTime] = useState([null, null]);
  const { token } = theme.useToken();
  const [screenH, setScreenH] = useState('');
  const [scroolY, setScroolY] = useState(200);
  const [grids, setGrids] = useState([]);
  const [currntGrid, setCurrntGrid] = useState();

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

  useEffect(() => {
    getGrid();
}, [token,])
  const getGrid = async () => {
    let { data: grid } = await getGridPointList({
        plantId: localStorage.getItem('plantId')
    })
    setGrids(grid?.data);
    // setCurrntGrid(grid?.data?.[0]?.id);
}
const changeGrid = (e) => {
  setCurrntGrid(e);
};
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
      label: t('低级'),
      value: '1',
      key: '低级',
    },
    {
      label: t('普通'),
      value: '2',
      key: '普通',
    },
    {
      label: t('严重'),
      value: '3',
      key: '严重',
    },
    {
      label: t('高级'),
      value: '4',
      key: '高级',
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
  }, [current, level, time,currntGrid]);

  const { currentPlantId } = useSelector(function (state) {
    return state.device
  });

  const getTableListData = async (page) => {
    const { data } = await getHistoryAlarmsByOptionsWithPage({
      plantId: currentPlantId || localStorage.getItem('plantId'),
      currentPage: page || 1,
      pageSize: 10,
      prior: level,
      begin: time?.length ? time[0]?.format('YYYY-MM-DD HH:mm:ss') : null,
      end: time?.length ? time[1]?.format('YYYY-MM-DD HH:mm:ss') : null,
      // gridPoint:currntGrid
    });
    setData(data.data);
  }
  const changPage = (page) => {
    setCurrent(page);
  }
  const changeLevel = (value) => {
    setLevel(value);
  }

  const changeTime = (value) => {
    setTime(value);
  }
  const downloadExcel = () => {
   let excData= data?.records.map(it=>{
      it.begin= dayjs(it.begin).format('YYYY-MM-DD HH:mm:ss');
      it.end= dayjs(it.end).format('YYYY-MM-DD HH:mm:ss');
      return{
        ...it,
        begin:dayjs(it.begin).format('YYYY-MM-DD HH:mm:ss'),
        end:dayjs(it.end).format('YYYY-MM-DD HH:mm:ss'),
      }
    })
    let fileName = t('历史告警');
    let sheetFilter = [ 'priorName', 'desc', 'deviceName', 'name', 'plantName', 'begin', 'end'];
    let sheetHeader = [ t('告警等级'), t('告警描述'), t('设备名称'), t('并网点'), t('电站名称'), t('开始时间'), t('结束时间'),];
    let sheetData = [...excData];
    let sheetName = '';
    downLoadExcelMode(fileName, sheetData, sheetFilter, sheetHeader, sheetName);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.content} style={{ backgroundColor: token.titleCardBgc }}>
        <div className={styles.title}>
          {/* <div className={styles.grid} style={{ backgroundColor: token.titleCardBgc, color: token.colorNormal,marginRight:'35px' }}>
            <Select
              style={{
                width: 200,
                marginLeft: '10px'
              }}
              // key={grids[0]?.id}
              // defaultValue={grids[0]?.id}
              placeholder={t('并网点')}
              onChange={changeGrid}
            >
              {grids && grids.map(item => {
                return (<Option key={item.id} value={item.id}>{item.gridPointName}</Option>);
              })
              }
            </Select>
          </div> */}
          <div className={styles.level} style={{marginRight:'35px'}}>
            <Select
              style={{ width: 150 }}
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
        <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data?.total} pageSize={data?.size} onChange={changPage} />

      </div>


    </div>

  )
}

export default RealtimeAlarm;