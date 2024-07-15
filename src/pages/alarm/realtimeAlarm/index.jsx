import Table from '@/components/Table.jsx'
import { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from "umi";
import styles from "./index.less";
import { Pagination, theme, Select, Cascader, Button, DatePicker } from "antd"
import { alarmLevel } from "@/utils/constants"
import {
  getFetchPlantList3 as getFetchPlantListServe,
  get215NowAlarm as get215NowAlarmServe,
} from "@/services";
import {
  getDtusOfPlant as getDtusOfPlantServe
} from "@/services/plant";

const alarmTableColums = [
  {
    title: <FormattedMessage id='SN号' />,
    dataIndex: 'sn',
    key: 'Sn',
  },
  {
    title: <FormattedMessage id='告警等级' />,
    dataIndex: 'priorDesc',
    key: '告警等级',
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
];
const RealtimeAlarm = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const { token } = theme.useToken();
  const [level, setLevel] = useState();
  const [sn, setSn] = useState();
  const [plantList, setPlantList] = useState([]);
  const [plantId, setPlantId] = useState(null);
  const [plantDeviceList, setPlantDeviceList] = useState([]);
  const [plantDeviceValue, setPlantDeviceValue] = useState([]);
  const intl = useIntl();
  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
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
    initPlantDevice();
    getData();
  }, []);
  useEffect(() => {
    let timer = setInterval(() => {
      getData();
    }, 24000);
    return () => clearInterval(timer)
  }, [])
  const getData = async (page) => {
    const { data } = await get215NowAlarmServe({
      currentPage: page || 1,
      pageSize: 20,
      prior: level,
      plantId: plantDeviceValue?.[0],
      sn: plantDeviceValue?.[1],
    });
    setData(data.data);
  }
  const changPage = (page) => {
    setCurrent(page);
    getData(page);
  }
  const changeLevel = (value) => {
    setLevel(value);
  }

  const changePlant = (value) => {
    setPlantId(value);
  }

  const changeSn = (e) => {
    setSn(e.target.value);
  }
  const upData = () => {
    getData();
  }
  return (
    <div style={{ width: '100%', height: '100%', paddingBottom: '10px'}}>
      <div className={styles.alarmWrap} style={{ padding: '35px 35px' }}>
        <div className={styles.title}>
          {/* <Select
              style={{ width: 180 }}
              options={plantList}
              placeholder={t('请选择电站')}
              allowClear
              onChange={changePlant}
          />
          <div className={styles.sn}>
            <Input placeholder={t('请输入') + t('设备编码')} style={{ width: 240 }} onChange={changeSn} />
          </div> */}
          <Cascader 
              changeOnSelect
              options={plantDeviceList}
              onChange={async value => {
                  if(value?.length===1){
                      getDtusOfPlant(plantDeviceList,value[0])
                  }
                  setPlantDeviceValue(value);
              }}
              style={{width: '250px', marginRight: 30}}
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
          <Button type='primary' onClick={upData}>{t('查询')}</Button>
        </div>
        <Table
          columns={alarmTableColums}
          data={data?.list}
          pagination={false}
        />
        <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data?.total} pageSize={data?.size} onChange={changPage} />
      </div>
    </div>


  )
}

export default RealtimeAlarm;