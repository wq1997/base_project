import { useState } from "react";
import styles from "./index.less";

const Index = () => {
    const [datas, setDatas] = useState([
        { name: "当前功率", pic: "", data: "455.34", unit: "kW" },
        { name: "当日发电量", pic: "", data: "625.20", unit: "度" },
        { name: "当日收益", pic: "", data: "0.00", unit: "元" },
        { name: "累计发电量", pic: "", data: "5255.88", unit: "度" },
        { name: "逆变器额定功率", pic: "", data: "", unit: "kW" },
        { name: "储能额定容量", pic: "", data: "", unit: "度" },
    ]);

    return <div className={styles.container}>11111</div>;
};

export default Index;
