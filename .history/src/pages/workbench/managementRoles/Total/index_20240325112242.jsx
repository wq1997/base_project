import { Select, Space } from 'antd';
import "./index.less";

const Total = () => {

    const allWorkorders =[
        
    ]

    return (
        <div className="total">
            <div className='all-workorders'>
                <div className='title'>
                    全部在途工单
                </div>
            </div>
            <div className='my-workorders'>
                <div className='title'>
                    我发起的
                </div>
            </div>
            <div className='task-board'>
                <div className='title'>
                    任务过程看板
                </div>
            </div>
        </div>
    );
};

export default Total;