import { Button, Radio } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import styles from './index.less'
import { IconButton, Iconify } from '@/components';
import { useResponsive } from '@/hooks/use-reponsive';


export default function CalendarHeader({ now, view, onMove, onCreate, onViewTypeChange }) {
  const { screenMap } = useResponsive();
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
          今天
        </Button>
        <Radio.Group  className={styles.tabButton}>
          <Radio.Button value='prev' onClick={() => onMove('prev')}>
            <Iconify icon="solar:alt-arrow-left-outline"  size={20} />
          </Radio.Button>
          <Radio.Button value='next' onClick={() => onMove('next')}>
            <Iconify icon="solar:alt-arrow-right-outline" size={20} />
          </Radio.Button>
        </Radio.Group>
        <span className={styles.timeNow}>{dayjs(now).format('YYYY MMM DD')}</span>
      </div>

      <div className={styles.rightGroup}>
        <Button className="ml-2" type="primary" onClick={() => onCreate()}>
          <div className=" flex items-center justify-center">
            <Iconify icon="material-symbols:add" size={24} />
            新建策略
          </div>
        </Button>
        <Button className={styles.centerButton} type="primary" onClick={() => onCreate()}>
          创建策略执行日程                
        </Button>
        {screenMap.lg && (
          <Radio.Group value={view} onChange={handleMenuClick}>
            {items.map(item => {
              return (
                <Radio.Button value={item.view} key={item.label}>{item.label}</Radio.Button>
              )
            })}
          </Radio.Group>
        )
        }
      </div>
    </div>
  );
}
