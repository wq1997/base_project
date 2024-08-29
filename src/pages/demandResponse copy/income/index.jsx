import { Outlet, history, useLocation, useSelector } from "umi";
import { Tabs } from "antd";
import { CardPage } from "@/components";
import styles from "./index.less";
import { hasPerm } from "@/utils/utils";

const Income = () => {
    const location = useLocation();
    const { user } = useSelector(state => state.user);
    const { pathname } = location;

    const items = [
        hasPerm(user, "op:profit_dashboard") && {
            key: "/vpp/demandResponse/income/overview",
            label: "收益看板",
        },
        hasPerm(user, "op:profit_invite") && {
            key: "/vpp/demandResponse/income/invitation",
            label: "邀约收入明细",
        },
        hasPerm(user, "op:profit_task") && {
            key: "/vpp/demandResponse/income/task",
            label: "任务收入明细",
        },
    ];

    const onChange = value => {
        history.push(value);
    };

    return (
        <CardPage>
            <Tabs defaultActiveKey={pathname} activeKey={pathname} items={items} onChange={onChange} />
            <div className={styles.content}>
                <Outlet />
            </div>
        </CardPage>
    );
};

export default Income;
