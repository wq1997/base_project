import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import classnames from "classnames";
import styles from "./index.less";
import tree from "../../../../../public/icons/tree.svg";
import co2 from "../../../../../public/icons/CO₂.svg";
import coal from "../../../../../public/icons/coal.svg";
import Card from "../Card";
import dayjs from "dayjs";

const dateNums = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期日=五", "星期六"];

const Index = ({ data }) => {
    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        data && (
            <div className={styles.index}>
                {
                    data && <>
                    </>
                }
                
        )
    );
};

export default Index;
