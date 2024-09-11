import { useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.less";
import Item from "antd/es/list/Item";
import power from "../../../../public/icons/power.svg";
import dayGeneration from "../../../../public/icons/dayGeneration.svg";
import dayIncome from "../../../../public/icons/dayIncome.svg";
import cumulativeGeneration from "../../../../public/icons/cumulativeGeneration.svg";
import capacity from "../../../../public/icons/capacity.svg";
import Card from '../Card'

const Index = () => {
    const [datas, setDatas] = useState([
        { name: "当前功率", pic: power, data: "455.34", unit: "kW" },
        { name: "当日发电量", pic: dayGeneration, data: "625.20", unit: "度" },
        { name: "当日收益", pic: dayIncome, data: "0.00", unit: "元" },
        { name: "累计发电量", pic: cumulativeGeneration, data: "5255.88", unit: "度" },
        { name: "逆变器额定功率", pic: power, data: "700.00", unit: "kW" },
        { name: "储能额定容量", pic: capacity, data: "0.00", unit: "度" },
    ]);

    return (
        <Card 
          title={}
        />
        <div className={styles.index}>
            <div className={styles.header}>
                <span className={styles.name}>
                    <div className={styles.cicle}></div>
                    电站KPI</span>
                <Popconfirm
                    title=""
                    icon=""
                    placement="bottom"
                    description={<div></div>}
                    onConfirm={() => {}}
                    onCancel={() => {}}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button
                        type="dashed"
                        icon={<DownOutlined style={{ color: "rgba(0, 0, 0, 0.15)" }} />}
                        iconPosition="end"
                    >
                        <span className={styles.tips}>请选择展示字段</span>
                    </Button>
                </Popconfirm>
            </div>
            <div className={styles.content}>
                {datas?.map(item => (
                    <div className={styles.item}>
                        <div className={styles.picWrapper}>
                            <img src={item.pic} className={styles.pic} />
                        </div>
                        <div className={styles.right}>
                            <div className={styles.data}>
                                {item.data}
                                <span className={styles.unit}>{item.unit}</span>
                            </div>
                            <div className={styles.name}>{item.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;
