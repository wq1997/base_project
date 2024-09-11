import { Select, Space, theme as antdTheme } from "antd";
import Board from "./Board";
import Total from "./Total";
import PersonnelTasks from "./PersonnelTasks";
import { workbenchGetManagerWorkbenchData as workbenchGetManagerWorkbenchDataServe } from "@/services";
import styles from "./index.less";
import { useEffect, useState } from "react";

const ManagementRoles = () => {
    const { token } = antdTheme.useToken();
    const [data, setData] = useState({});

    const workbenchGetManagerWorkbenchData = async () => {
        const res = await workbenchGetManagerWorkbenchDataServe();
        if (res?.data?.status === "SUCCESS") {
            setData(res?.data?.data);
        }
    };

    useEffect(() => {
        workbenchGetManagerWorkbenchData();
    }, []);

    return (
        <div className="management-roles" style={{ background: token.color14 }}>
            <div className={styles.['board-Total']}>
                <Board data={data} />
                <Total data={data} />
            </div>
            <PersonnelTasks data={data} />
        </div>
    );
};

export default ManagementRoles;
