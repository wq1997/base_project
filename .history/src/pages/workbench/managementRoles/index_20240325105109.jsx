import { Select, Space } from 'antd';
import Board from './Board'
import "./index.less";

const ManagementRoles = () => {
    return (
        <div className="management-roles">
           <Board/>
           <Board/>
           <Board/>
        </div>
    );
};

export default ManagementRoles;
