import { theme, Table, DatePicker } from "antd";
import styles from "./index.less";
import arrow from "../images/主标题2.svg";
import listBg from "../images/告警列表-底框.svg";

const Index = () => {
    return (
        <div className={styles.index}>
            <div className={styles.title}>
                <div className={styles.left}>
                    <img src={arrow} alt="" className={styles.arrow} />
                    告警列表
                </div>
            </div>
        </div>
    );
};

export default Index;
