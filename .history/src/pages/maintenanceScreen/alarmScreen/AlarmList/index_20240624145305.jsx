import { theme, Table, DatePicker } from "antd";
import styles from "./index.less";
import arrow from "../images/主标题2.svg";

const Index = () => {
    return (
        <div className={styles.index}>
            <div className={styles.title}>
                <img src={arrow} alt="" />
                告警列表
            </div>
        </div>
    );
};

export default Index;
