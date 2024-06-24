import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector, useIntl} from "umi";
import { CardModel } from "@/components";
import styles from "./index.less";
import { Pagination, theme,Select} from "antd"
import { getNowAlarmsWithPage } from "@/services/alarm"
import { getGridPointList,  } from '@/services/plant'

let clum=[...alarmTableColums];
clum[7]={};
const RealtimeAlarm = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [currntGrid, setCurrntGrid] = useState();
  const [grids, setGrids] = useState([]);

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
    getGrid();
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
    const { data } = await getNowAlarmsWithPage({
      currentPage: page || 1,
      pageSize: 20,
      plantId:currentPlantId||localStorage.getItem('plantId'),
      gridPoint:currntGrid

    });
    setData(data.data);
  }
  const changPage = (page) => {
    setCurrent(page);
    getData(page);
  }
  const changeGrid = (e) => {
    setCurrntGrid(e);
  };
  const getGrid = async () => {
    let { data: grid } = await getGridPointList({
        plantId: localStorage.getItem('plantId')
    })
    setGrids(grid?.data);
    // setCurrntGrid(grid?.data?.[0]?.id);
}
  return (
    <div style={{width:'100%',height:'100%',padding:'0 0 10px 0'}}>
      <div className={styles.grid} style={{ backgroundColor: token.titleCardBgc, color: token.colorNormal, }}>
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
          </div>
      <CardModel
        title={
          t('实时告警')
        }
        content={
          <div className={styles.alarmWrap}>
            <Table
              columns={clum}
              data={data.records}
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
            <Pagination style={{ marginTop: '20px', textAlign: 'right' }} size="default" current={current} total={data.total} pageSize={data.size} onChange={changPage} />
          </div>

        }
      />
    </div>


  )
}

export default RealtimeAlarm;