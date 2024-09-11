import { theme, Table, DatePicker } from "antd";
import styles from "./index.less";
import Card from "../../Card";

const Index = () => {
    const works = [
        {
            name: "工单总数",
            pic: "",
            key: "",
            value: "",
        },
        {
            name: "在途异常工单",
            pic: "",
            key: "",
            value: "",
        },
        {
            name: "在途其他工单",
            pic: "",
            key: "",
            value: "",
        },
        {
            name: "已完成工单",
            pic: "",
            key: "",
            value: "",
        },
    ];

    return <Card title="工单情况" content={
        <div>
            {
                works?.map(item=><div>
                    
                </div>)
            }
        </div>
    } />;
};

export default Index;
