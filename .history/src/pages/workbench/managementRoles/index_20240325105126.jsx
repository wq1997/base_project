import { Select, Space } from "antd";
import Board from "./Board";
import Total from "./Total";
import PersonnelTasks from "./PersonnelTasks";
import "./index.less";

const ManagementRoles = () => {
    return (
        <div className="management-roles">
            <Board />
            <Total />
            <PersonnelTasks />
        </div>
    );
};

export default ManagementRoles;
