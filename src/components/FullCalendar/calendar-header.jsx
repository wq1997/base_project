import { Button, Radio } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import styles from './index.less'
import { Iconify } from '@/components';
import { useResponsive } from '@/hooks/use-reponsive';
import NewStrategy from './newStrategy';
import { useSelector, useIntl } from "umi";
import { theme } from "antd";

export default function CalendarHeader({ now, view, onMove, onCreate, onViewTypeChange }) {
  const { screenMap } = useResponsive();
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
  const items = useMemo(
    () => [
      {
        key: '1',
        label: 'Month',
        view: 'dayGridMonth',
        icon: <Iconify icon="mdi:calendar-month-outline" size={18} />,
      },
      {
        key: '2',
        label: 'Week',
        view: 'timeGridWeek',
        icon: <Iconify icon="mdi:calendar-weekend-outline" size={18} />,
      },
      {
        key: '3',
        label: 'Day',
        view: 'timeGridDay',
        icon: <Iconify icon="mdi:calendar-today-outline" size={18} />,
      },
    ],
    [],
  );

  const handleMenuClick = (e) => {
    onViewTypeChange(e.target.value);
  };

  return (
    <div className={styles.wrapHeard}>
      <div className={styles.leftGrop}>
        <Button type="primary" onClick={() => onMove('today')}>
          {t('今天')}
        </Button>
        <Radio.Group  className={styles.tabButton}>
          <Radio.Button value='prev' onClick={() => onMove('prev')}>
            <Iconify icon="solar:alt-arrow-left-outline"  size={20} />
          </Radio.Button>
          <Radio.Button value='next' onClick={() => onMove('next')}>
            <Iconify icon="solar:alt-arrow-right-outline" size={20} />
          </Radio.Button>
        </Radio.Group>
        <span className={styles.timeNow} style={{color:token.titleColor}}>{dayjs(now).format('YYYY MM DD')}</span>
      </div>

      <div className={styles.rightGroup}>
        <NewStrategy />
        <Button className={styles.centerButton} type="primary" onClick={() => onCreate()}>
        {t('创建策略执行日程')}               
        </Button>
        {/* {screenMap.lg && (
          <Radio.Group value={view} onChange={handleMenuClick}>
            {items.map(item => {
              return (
                <Radio.Button value={item.view} key={item.label}>{item.label}</Radio.Button>
              )
            })}
          </Radio.Group>
        )
        } */}
      </div>
    </div>
  );
}
