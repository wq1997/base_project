import { theme, Table, DatePicker } from "antd";
import "./index.less";
import AlarmList from "./AlarmList";

const Index = () => {
    return (
        <div className="index">
            <div className="header">
                <span className="companyName">储能电站运维大屏</span>
            </div>
            <div className="content">
                <div className="left"></div>
                <div className="right">
                    <AlarmList />
                </div>
            </div>
        </div>
    );
};

export default Index;
