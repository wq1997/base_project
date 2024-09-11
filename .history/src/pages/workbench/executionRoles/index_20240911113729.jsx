import { Select, Space, theme as antdTheme } from "antd";
import Board from "./Board";
import Total from "./Total";
import PersonnelTasks from "./PersonnelTasks";
import {
    workbenchGetExecutorWorkbenchData as workbenchGetExecutorWorkbenchDataServe,
} from "@/services";
import styles from "./index.less";
import { useEffect, useState } from "react";

const ManagementRoles = () => {
    const { token } = antdTheme.useToken();
    const [data, setData] = useState({});

    const workbenchGetExecutorWorkbenchData = async () => {
        const res = await workbenchGetExecutorWorkbenchDataServe();
        if (res?.data?.status === "SUCCESS") {
            setData(res?.data?.data);
        }
    }

    useEffect(()=>{
        workbenchGetExecutorWorkbenchData();
    }, [])

    return (
        <div className={styles.managementRoles} style={{ background: token.color14 }}>
            <div className={styles.boardTotal}>
                <Board data={data} />
                <Total data={data} />
            </div>
            <PersonnelTasks data={data} />
        </div>
    );
};

export default ManagementRoles;
