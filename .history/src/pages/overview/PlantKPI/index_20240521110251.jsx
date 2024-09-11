import { useState } from "react";
import styles from "./index.less";
import Item from "antd/es/list/Item";
import power from '../../../'

const Index = () => {
    const [datas, setDatas] = useState([
        { name: "当前功率", pic: "", data: "455.34", unit: "kW" },
        { name: "当日发电量", pic: "", data: "625.20", unit: "度" },
        { name: "当日收益", pic: "", data: "0.00", unit: "元" },
        { name: "累计发电量", pic: "", data: "5255.88", unit: "度" },
        { name: "逆变器额定功率", pic: "", data: "700.00", unit: "kW" },
        { name: "储能额定容量", pic: "", data: "0.00", unit: "度" },
    ]);

    return (
        <div className={styles.container}>
            {datas?.map(item => (
                <div>
                    <img src={item.pic} alt="" />
                    <div>
                        <span>{item.data}</span>
                        <span>{item.name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Index;
