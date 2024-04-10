import { Select, Space } from 'antd';
import "./index.less";

const PersonnelTasks = () => {
     
    return (
        <div className="personnel-tasks">
            <div className="title">
                <span>人员任务统计</span>
                <Space>
                <SearchInput
                    label="数据维度"
                    type="select"
                    value={'2'}
                    options={[
                        {
                            name: "项目阶段图",
                            code: "1",
                        },
                        {
                            name: "项目类型图",
                            code: "2",
                        },
                    ]}
                />
                </Space>
            </div>
            <div className="content">
                <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default PersonnelTasks;