
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Strategy } from '@/components';
import { CardModel } from "@/components";
import styles from './index.less'
import { theme, Calendar, Tree, Select } from "antd";
import dayjs from 'dayjs';
import moment from 'moment';
import { useSelector, useIntl } from "umi";
import { getGridPointList, getStrategyPlanList,getStrategyList } from '@/services/policy'
const { Option } = Select;

function Com(props) {
  const [seletOption, setSelectOption] = useState([]);
  const [gridId, setGridId] = useState();
  const { token } = theme.useToken();
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    getInit();
  }, []);
  useEffect(() => {
    if (seletOption?.length) {
      getPlanList();
      getStrategy();
    }
  },[gridId])
  const onSelect = (value, mode) => {
    setDate(value)
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
  const [strategyTreeData,setStrategyTreeData] = useState([
    {
      title: '我的策略',
      key: '0-0',
      selectable:false,
      children: [
        // {
        //   title:'默认策略1',
        //   key: '0-0-0'
        // },
       
      ],
    },
  ]);
  const onPanelChange = (value, mode) => {
    setDate(value)
  };
  const getInit = async () => {
    let { data } = await getGridPointList({ plantId: localStorage.getItem('plantId') });
    let arr = [];
    data?.data.map(it => {
      arr.push({
        label: it.gridPointName,
        value: it.id,
        ...it
      })
    })
    setSelectOption([...arr]);
    setGridId(arr[0]?.value)
  }
  const changeGrid = (val) => {
    console.log(val, 1212);
    setGridId(val);
  }

  const getPlanList = async () => {
    let { data } = await getStrategyPlanList({ gridPointId: gridId });
  }
  const getStrategy = async () => {
    let { data } = await getStrategyList({ gridPointId: gridId });
    let arr=[];
    data.data.map((it,i)=>{
      arr.push({
        ...it,title:it.strategyName,key:`0-0-${i}`
      })
    })
    setStrategyTreeData([{...strategyTreeData[0],children:[...arr]}]);
  }
 
  return (
    <div className={styles.contents}>
      <div className={styles.hearder} style={{ backgroundColor: token.titleCardBgc, color: token.colorNormal }}>
        并网点:
        <Select
          style={{ width: '200px', marginLeft: '10px' }}
          key={seletOption[0]?.value}
          defaultValue={seletOption[0]?.value}
          onChange={changeGrid}
        >
          {seletOption && seletOption.map(item => {
            return (<Option key={item.value} value={item.value}>{item.label}</Option>);
          })
          }
        </Select>
      </div>
      <div className={styles.leftTop_Calendar}>
        <CardModel
          title={
            t("日历")
          }
          content={
            <Calendar fullscreen={false} onSelect={onSelect} onPanelChange={onPanelChange} value={dayjs(date)} />
          }
        ></CardModel>
      </div>
      <div className={styles.leftBottom_List}>
        <CardModel
          title={
            t("策略列表")
          }
          content={
            <Tree
              // checkable
              treeData={strategyTreeData}
              defaultExpandAll
            />
          }
        >
        </CardModel>
      </div>
      <div className={styles.right_Content} style={{ backgroundColor: token.titleCardBgc }}>
        <Strategy date={date} setDate={onSelect} />
      </div>
    </div>
  )
}

export default Com