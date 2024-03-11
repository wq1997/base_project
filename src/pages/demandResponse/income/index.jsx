import { Outlet, history, useLocation } from "umi";
import { Tabs, Card } from 'antd';
import styles from "./index.less";

const items = [
    {
      key: '/vpp/demandResponse/income/overview',
      label: '收益看板',
    },
    {
      key: '/vpp/demandResponse/income/invitation',
      label: '邀约收入明细',
    },
    {
      key: '/vpp/demandResponse/income/task',
      label: '任务收入明细',
    },
];


const Income = () => {
    const location = useLocation();
    const { pathname } = location;

    const onChange = (value) => {
        history.push(value);
    }

    return (
        <Card>
            <Tabs defaultActiveKey={pathname} items={items} onChange={onChange} />
            <div className={styles.content}>
              <Outlet />
            </div>
        </Card>
    )
}

export default Income;