import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.less";
import tree from "../../../../../public/icons/tree.svg";
import co2 from "../../../../../public/icons/CO₂.svg";
import coal from "../../../../../public/icons/coal.svg";
import Card from "../Card";

const Index = ({ data }) => {
    const [list, setList] = useState({
        today: {
            tempMin: "",
            tempMax: "",
            date: "",
            weather: "",
        },
        daily: [
            { date: "", weather: "" },
            { date: "", weather: "" },
        ],
    });

    // useEffect(() => {
    //     const _list = list?.map(item => ({
    //         ...item,
    //         value: data?.[item.key],
    //     }));
    //     setList(_list);
    // }, [data]);

    return (
        <div style={{ height: "100%", display: "flex" }}>
             <div className={styles.today}>
                 <div cl>

                 </div>
             </div>
        </div>
    );
};

export default Index;
