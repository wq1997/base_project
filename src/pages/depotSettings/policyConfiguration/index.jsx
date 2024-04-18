
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Strategy } from '@/components';
import { CardModel } from "@/components";
import styles from './index.less'
import { theme, Calendar, Tree, Select } from "antd";
import dayjs from 'dayjs';
import moment from 'moment';
import { useSelector, useIntl } from "umi";

function Com(props) {
  useEffect(() => {
  }, []);
  const { token } = theme.useToken();
  const [date, setDate] = useState(new Date());
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
  const onPanelChange = (value, mode) => {
    setDate(value)
  };

  const treeData = [
    {
      title: '我的策略',
      key: '0-0',
      children: [
        {
          title: <span>默认策略1</span>,
          key: '0-0-0'
        },
        {
          title: <span>默认策略2</span>,
          key: '0-0-1'
        },
        {
          title: <span>默认策略3</span>,
          key: '0-0-2'
        }
      ],
    },
  ];

  return (
    <div className={styles.contents}>
      <div className={styles.hearder} style={{ backgroundColor: token.titleCardBgc,color:token.colorNormal}}>
        并网点: 
        <Select
          style={{ width: '200px',marginLeft:'10px' }}
        />
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
              checkable
              treeData={treeData}
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