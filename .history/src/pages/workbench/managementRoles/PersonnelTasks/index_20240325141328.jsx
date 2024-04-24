import { Select, Space } from 'antd';
import "./index.less";

const PersonnelTasks = () => {
    return (
        <div className="personnel-tasks">
<div className="title">
                    <span>任务过程看板{type}</span>
                    <Radio.Group defaultValue={"week"} onChange={e => setType(e.target.value)}>
                        <Radio.Button value="week">周</Radio.Button>
                        <Radio.Button value="month">月</Radio.Button>
                    </Radio.Group>
                </div>
                <div className="content">
                    <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
                </div>
        </div>
    ); 
};

export default PersonnelTasks;