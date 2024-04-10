import { Select, Space } from 'antd';
import Board from './Board'
import Board from './Board'
import PersonnelTasks from './PersonnelTasks'
import "./index.less";

const ManagementRoles = () => {
    return (
        <div className="management-roles">
           <Board/>
           <Board/>
           <PersonnelTasks/>
        </div>
    );
};

export default ManagementRoles;
