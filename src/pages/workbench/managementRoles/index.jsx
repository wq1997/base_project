import { Select, Space, theme as antdTheme } from "antd";
import Board from "./Board";
import Total from "./Total";
import PersonnelTasks from "./PersonnelTasks";
import "./index.less";

const ManagementRoles = () => {
    const { token } = antdTheme.useToken();
    return (
        <div className="management-roles" style={{background: token.color14}}>
            <Board />
            <Total />
            <PersonnelTasks />
        </div>
    );
};

export default ManagementRoles;
