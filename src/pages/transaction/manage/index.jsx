import { Outlet, history, useLocation } from "umi";
import { Tabs } from 'antd';
import styles from "./index.less";

const items = [
    {
        key: '/transaction/manage/history',
        label: '电价历史数据',
    },
    {
      key: '/transaction/manage/prediction',
      label: '电价预测',
    },
];


const Manage = () => {
    const location = useLocation();
    const { pathname } = location;

    const onChange = (value) => {
        history.push(value);
    }

    return (
        <div>
            <Tabs defaultActiveKey={pathname} items={items} onChange={onChange} />
            <div className={styles.content}>
              <Outlet />
            </div>
        </div>
    )
}

export default Manage;