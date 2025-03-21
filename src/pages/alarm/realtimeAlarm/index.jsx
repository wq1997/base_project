import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector, useIntl, FormattedMessage } from "umi";
import { CardModel } from "@/components";
import styles from "./index.less";
import { Pagination, theme, Select } from "antd"
import { getNowAlarmsWithPage } from "@/services/alarm"
import dayjs from 'dayjs';

const clum = [
  {
    title: <FormattedMessage id='电站名称' />,
    dataIndex: 'plantName',
    key: 'plantName',
    width: '16.67%'
  },
  {
    title: <FormattedMessage id='设备编码' />,
    dataIndex: 'sn',
    key: 'sn',
    width: '16.67%'

  },
  {
    title: <FormattedMessage id='设备名称' />,
    dataIndex: 'deviceName',
    key: 'deviceName',
    width: '16.67%'

  },
  {
    title: <FormattedMessage id='告警等级' />,
    dataIndex: 'priorName',
    key: 'priorName',
    width: '16.67%',
    render: (val, record) => {
      if (record?.prior == 1) {
        return <div style={{ color: '#FF0000' }}>
          {val}
        </div>
      } else if (record?.prior == 2) {
        return <div style={{ color: '#FF7D00' }}>
          {val}
        </div>
      } else if (record.prior == 3) {
        return <div style={{ color: '#FFCD00' }}>
          {val}
        </div>
      } else if (record.prior == 4) {
        return <div style={{ color: '#00FF19' }}>
          {val}
        </div>
      }
    }
  },
  {
    title: <FormattedMessage id='告警描述' />,
    dataIndex: 'desc',
    key: 'desc',
    width: '16.67%',

  },
  {
    title: <FormattedMessage id='开始时间' />,
    dataIndex: 'begin',
    key: 'begin',
    width: '16.67%',
    render: (val) => {
      return val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  },
];
const RealtimeAlarm = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [currntGrid, setCurrntGrid] = useState();
  const [scroolY, setScroolY] = useState(500);
  const [screenH, setScreenH] = useState('');
  const global = useSelector(state => state.global);
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
    setScreenH(document.documentElement.clientHeight || document.body.clientHeight)
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])
  useEffect(() => {
    if (screenH < 1000) {
      setScroolY(500);
    } else if (screenH > 1000 && screenH < 1300) {
      setScroolY(600);
    } else if (screenH > 1300) {
      setScroolY(700);
    }
  }, [screenH])
  const handleWindowResize = () => {
    setScreenH(document.documentElement.clientHeight || document.body.clientHeight)
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [currntGrid]);
  useEffect(() => {
    let timer = setInterval(() => {
      getData();
    }, 24000);
    return () => clearInterval(timer)
  }, [])
  const { currentPlantId } = useSelector(function (state) {
    return state.device
  });
  const getData = async (page) => {
    const res = await getNowAlarmsWithPage({
      currentPage: page || 1,
      pageSize: 10,
      plantId: currentPlantId || localStorage.getItem('plantId'),
    });
    if (res?.data?.data) {
      setData(res?.data?.data);
    }
  }
  const changPage = (page) => {
    setCurrent(page);
    getData(page);
  }

  return (
    <div style={{ width: '100%', height: 'calc(100% - 10px)', padding: '0 0 10px 0', backgroundColor: token.titleCardBgc, }}>
      {/* <div className={styles.grid} style={{ backgroundColor: token.titleCardBgc, color: token.colorNormal, }}>
            <Select
              style={{
                width: 200,
                marginLeft: '30px',
                marginTop:'35px'
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
      <CardModel
        content={
          <div className={`${styles.alarmWrap} ${global.theme == 'default' ? 'mDefault' : 'mDark'}`} style={{ height: 'calc(100% - 87px)' }}>
            <Table
              columns={clum}
              data={data?.records}
              pagination={false}
              scroll={{ y: scroolY }}
            />
            <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data?.total} pageSize={data?.size} onChange={changPage} />
          </div>

        }
      />
    </div>


  )
}

export default RealtimeAlarm;