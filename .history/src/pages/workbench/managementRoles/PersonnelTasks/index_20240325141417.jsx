import { Select, Space } from 'antd';
import "./index.less";

const PersonnelTasks = () => {
     
    return (
        <div className="personnel-tasks">
            <div className="title">
                <span>人员任务统计</span>
            
            </div>
            <div className="content">
                <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default PersonnelTasks;