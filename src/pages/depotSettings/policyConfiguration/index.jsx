
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Strategy } from '@/components';
import { CardModel } from "@/components";
import styles from './index.less'
import { theme, Calendar } from "antd";
import dayjs from 'dayjs';
import moment from 'moment';

function Com(props) {
  useEffect(() => {
  }, []);
  const { token } = theme.useToken();
  const [date, setDate] = useState(new Date());
  const onSelect = (value, mode) => {
    setDate(value)
  };

  const onPanelChange = (value, mode) => {
    setDate(value)
  };
  return (
    <div className={styles.contents}>
      <div className={styles.leftTop_Calendar}>
        <CardModel
          title={
            "日历"
          }
          content={
            <Calendar fullscreen={false} onSelect={onSelect} onPanelChange={onPanelChange} value={dayjs(date)} />
          }
        ></CardModel>
      </div>
      <div className={styles.leftBottom_List}>
        <CardModel
          title={
            "策略列表"
          }

        ></CardModel>
      </div>
      <div className={styles.right_Content} style={{ backgroundColor: token.titleCardBgc }}>
        <Strategy date={date} setDate={onSelect} />
      </div>
    </div>
  )
}

export default Com