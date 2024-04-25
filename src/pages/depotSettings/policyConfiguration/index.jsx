
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Strategy } from '@/components';
import { CardModel } from "@/components";
import Detail from '@/components/FullCalendar/newStrategy/detail';
import styles from './index.less'
import { theme, Calendar, Tree, Select, Form } from "antd";
import dayjs from 'dayjs';
import { useSelector, useIntl } from "umi";
import { getGridPointList, getStrategyPlanList, getStrategyList, getStrategyInfo,saveStrategyPlan,getBasicParams } from '@/services/policy'
const { Option } = Select;

function Com(props) {
  const [seletOption, setSelectOption] = useState([]);
  const [gridId, setGridId] = useState();
  const [currentGrid, setCurrentGrid] = useState();
  const { token } = theme.useToken();
  const [date, setDate] = useState(new Date());
  const [form6] = Form.useForm(); // 策略详情
  const [editPlanOpen, setEditPlanOpen] = useState(false); // 策略详情
  const [strategyId, setStrategyId] = useState(); // 策略Id
  const [detailsData, setDetailsData] = useState(); // 策略详情
  const [planList, setPlanList] = useState([]); // 日程列表

  useEffect(() => {
    getInit();
  }, []);
  useEffect(() => {
    getDetails();
  }, [strategyId]);
  useEffect(() => {
    if (seletOption?.length) {
      getStrategy();
    }
  }, [gridId])
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
  const [strategyTreeData, setStrategyTreeData] = useState([
    {
      title: '我的策略',
      key: '0-0',
      selectable: false,
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

  const getDetails = async () => {
    let { data } = await getStrategyInfo({ strategyId });
    setDetailsData(data?.data)
  }
  const newPolicy=async(value)=>{
    let {data}=await saveStrategyPlan({...value,gridPoint:gridId});
  }
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
    setGridId(arr[0]?.value);
    setCurrentGrid(arr[0]);
  }
  const changeGrid = (val) => {
    setCurrentGrid(
    seletOption.find(it=>it.value==val)
    )
    setGridId(val);
  }

  const getPlanList = async (model) => {
    let { data } = await getStrategyPlanList({ gridPointId: gridId });
    let arr = [];
    data.data?.map((it, index) => {
      let i = model.findIndex(item => item.strategyId == it.strategyId)
      arr.push({
        id: it.planId,
        strategyId: it.strategyId,
        title: it.strategyName,
        remarks: it.remarks,
        allDay: true,
        start: dayjs(it.startDate).format('YYYY-MM-DD'),
        end: dayjs(it.endDate).add(1, 'day').format('YYYY-MM-DD'),
        color: token.chartLineColor[i]
      });
      console.log(dayjs(it.endDate).add(1, 'day').format('YYYY-MM-DD'));
    }); 
    setPlanList([...arr]);
    
  }
  const getStrategy = async () => {
    let { data } = await getStrategyList({ gridPointId: gridId });
    let arr = [];
    data.data.map((it, i) => {
      arr.push({
        ...it, title: it.strategyName, key: `0-0-${i}`
      })
    })
    setStrategyTreeData([{ ...strategyTreeData[0], children: [...arr] }]);
    getPlanList(arr);
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
              onSelect={(_, { node }) => {
                setEditPlanOpen(prv => !prv);
                setStrategyId(node?.strategyId);
              }}
            />
          }
        >
        </CardModel>
      </div>
      <div className={styles.right_Content} style={{ backgroundColor: token.titleCardBgc }}>
        <Strategy 
        date={date} 
        setDate={onSelect} 
        planList={planList} 
        strategy={strategyTreeData} 
        newPolicy={newPolicy}  
        getStrategy={getStrategy}
        currentGrid={currentGrid}
        />
      </div>
      <Detail
        form={form6}
        open={editPlanOpen}
        detailsData={detailsData}
        onChangeOpen={(value) => {
          setEditPlanOpen(value);
        }}
      />

    </div>
  )
}

export default Com