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
            name: "",
            pic: "",
            key: "",
            value: "",
        },
        {
            name: "",
            pic: "",
            key: "",
            value: "",
        },
    ];

    return <Card title="工单情况" content={1} />;
};

export default Index;
